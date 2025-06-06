# Consumer App - GitHub Packages Setup

## Current Configuration:
✅ .npmrc configured for GitHub Packages
✅ package.json updated to use @natashakediacts/shared-utils@1.0.1
✅ Ready to install from GitHub Packages

## Prerequisites:
1. Shared library must be published to GitHub Packages first
2. NPM_TOKEN environment variable must be set with GitHub Personal Access Token

## Commands to Update Consumer App:

### 1. Set Environment Variable (if not already set)
```powershell
$env:NPM_TOKEN = "ghp_your_actual_token_here"
```

### 2. Remove old package and install from GitHub Packages
```powershell
# Remove the old npm registry version
npm uninstall @natasha9012/shared-utils

# Clear npm cache
npm cache clean --force

# Install from GitHub Packages
npm install @natashakediacts/shared-utils@1.0.1

# Test the application
node index.js
```

### 3. Verify Installation
```powershell
# Check installed packages
npm list

# Run the application
npm start
```

## Expected Output:
After successful installation, running `node index.js` should display:
```
Consumer App - Shared Library Demo
=====================================

1. Capitalize Words: "Hello World From Shared Library!"
2. Generate ID: [random 8-character string]
3. Email Validation: test@example.com is valid: true
4. Date Formatting: Current date: [YYYY-MM-DD]
5. Debounced Function: Called after 500ms delay

✅ Consumer app successfully using shared library from GitHub Packages!
```
