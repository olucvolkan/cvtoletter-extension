# CvToLetter Chrome Extension

A Chrome extension for the CvToLetter web application that allows users to easily generate personalized cover letters from job descriptions they find while browsing job sites.

## Features

- Automatically detects job descriptions on popular job sites (LinkedIn, Indeed, Glassdoor, Monster, ZipRecruiter)
- Single-click cover letter generation
- Google Sign-in integration with the CvToLetter web application
- Credits system for generating cover letters
- Copy generated cover letters to clipboard with one click

## Installation

### Development Mode

1. Clone this repository:
   ```
   git clone https://github.com/olucvolkan/cvtoletter-extension.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked" and select the folder containing the extension

5. The extension should now be installed and visible in your Chrome toolbar

## Usage

1. Navigate to a job posting on a supported site (LinkedIn, Indeed, Glassdoor, Monster, ZipRecruiter)

2. Click the CvToLetter extension icon in your toolbar

3. The extension will automatically detect the job description

4. If you're not logged in, click "Sign in with Google" and authorize the application

5. Once logged in, click "Generate Cover Letter" (requires credits)

6. When the cover letter is generated, you can copy it to your clipboard with one click

## Integration with CvToLetter

This extension integrates with the [CvToLetter web application](https://cvtoletter.com) and shares:

- User authentication
- Credit system
- Cover letter history
- AI generation capabilities

## Development

The extension is built using vanilla JavaScript, HTML, and CSS with Chrome Extension Manifest V3.

### Structure

```
cvtoletter-extension/
├── manifest.json              # Extension configuration
├── background.js              # Background script for authentication
├── popup/
│   ├── popup.html            # Extension popup UI
│   ├── popup.css             # Styles for the popup
│   └── popup.js              # Popup functionality
├── content/
│   ├── content-script.js     # Script to run on websites
│   └── jobDescriptionParser.js  # Job description extraction logic
├── assets/
│   ├── icon-16.png           # Extension icons
│   ├── icon-48.png
│   ├── icon-128.png
│   └── logo.svg
└── utils/
    ├── auth.js               # Authentication handling
    └── api.js                # API calls to your backend
```

## License

MIT
