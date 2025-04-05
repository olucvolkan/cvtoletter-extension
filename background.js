// Handle authentication events and token management in the background

// Handle extension installation or update
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    // First install
    console.log('Extension installed');
    // Open onboarding page
    chrome.tabs.create({
      url: 'https://cvtoletter.com/extension-welcome'
    });
  } else if (details.reason === 'update') {
    // Extension updated
    console.log('Extension updated from version ' + details.previousVersion);
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle auth requests from popup
  if (message.action === 'getAuthToken') {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true, token });
      }
    });
    return true; // Keep the message channel open for async response
  }
  
  // Handle logout requests from popup
  else if (message.action === 'logout') {
    chrome.identity.getAuthToken({ interactive: false }, token => {
      if (token) {
        // Revoke token
        fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`)
          .then(() => {
            // Clear token
            chrome.identity.removeCachedAuthToken({ token }, () => {
              sendResponse({ success: true });
            });
          })
          .catch(error => {
            console.error('Error revoking token:', error);
            sendResponse({ success: false, error: error.message });
          });
      } else {
        sendResponse({ success: true });
      }
    });
    return true; // Keep the message channel open for async response
  }
  
  // Handle job description extraction requests
  else if (message.action === 'extractJobDescription') {
    try {
      // Get active tab
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0];
        
        // Execute content script to extract job description
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: () => {
            // This function is executed in the context of the web page
            const jobDescription = window.extractJobDescription();
            return jobDescription;
          }
        }, results => {
          if (chrome.runtime.lastError) {
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
          } else if (results && results[0] && results[0].result) {
            sendResponse({ success: true, jobDescription: results[0].result });
          } else {
            sendResponse({ success: false, error: 'No job description found' });
          }
        });
      });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
    return true; // Keep the message channel open for async response
  }
});

// Handle auth state changes
chrome.identity.onSignInChanged.addListener((account, signedIn) => {
  if (signedIn) {
    console.log(`User ${account.id} signed in`);
  } else {
    console.log(`User ${account.id} signed out`);
    // Clear user data from storage
    chrome.storage.local.remove(['user', 'userCredits']);
  }
});
