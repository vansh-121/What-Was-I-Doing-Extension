# Publishing Checklist for "What Was I Doing?" Extension

## ✅ Completed Implementation

### Core Features
- ✅ Activity tracking with idle detection
- ✅ Context extraction (function names, TODO comments)
- ✅ State persistence using VS Code storage API
- ✅ Resume popup with navigation
- ✅ Work session history
- ✅ Status bar integration
- ✅ Full configuration support

### Files Created
- ✅ `src/types.ts` - Type definitions
- ✅ `src/activityTracker.ts` - Activity monitoring and idle detection
- ✅ `src/contextExtractor.ts` - Code context extraction
- ✅ `src/stateManager.ts` - Persistent storage
- ✅ `src/resumePopup.ts` - UI components
- ✅ `src/extension.ts` - Main extension entry point
- ✅ `package.json` - Extension manifest with commands and configuration
- ✅ `README.md` - Comprehensive documentation

## 📋 Before Publishing

### 1. Update package.json Metadata
Replace placeholders in `package.json`:
- `publisher`: Your VS Code Marketplace publisher name
- `author.name`: Your name
- `repository.url`: Your GitHub repository URL
- `bugs.url`: Your issues URL

### 2. Create Publisher Account
If you don't have one:
1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft/GitHub account
3. Create a publisher (this becomes your publisher ID)

### 3. Get Personal Access Token (PAT)
1. Go to https://dev.azure.com
2. Create organization if needed
3. User Settings → Personal Access Tokens
4. Create token with **Marketplace (Publish)** scope
5. Save the token securely

### 4. Install vsce (Publishing Tool)
```bash
npm install -g @vscode/vsce
```

### 5. Package Extension
```bash
vsce package
```
This creates a `.vsix` file you can test locally.

### 6. Test the Extension
1. Press `F5` in VS Code to launch Extension Development Host
2. Test all commands:
   - Show Last Context
   - View History
   - Save Current Context
   - Clear History
3. Test idle detection (wait 10+ minutes or adjust timeout in settings)
4. Test resume popup on restart
5. Test status bar integration

### 7. Publish to Marketplace
```bash
vsce publish
```
Or manually upload `.vsix` at https://marketplace.visualstudio.com/manage

## 🎨 Optional Enhancements

### Add Icon
1. Create 128x128 PNG icon
2. Add to package.json:
```json
"icon": "images/icon.png"
```

### Add Screenshots
Add screenshots to README showing:
- Resume popup in action
- History quick pick menu
- Status bar indicator
- Settings configuration

### Add Categories
Update categories in package.json for better discoverability:
```json
"categories": [
  "Other",
  "Productivity"
]
```

### Add Gallery Banner
```json
"galleryBanner": {
  "color": "#4A90E2",
  "theme": "dark"
}
```

## 🚀 Quick Start (After Setup)

### Test Locally
```bash
# Install dependencies
npm install

# Compile
npm run compile

# Run in debug mode
Press F5 in VS Code
```

### Build and Publish
```bash
# Update version
npm version patch  # or minor, or major

# Package
vsce package

# Publish
vsce publish
```

## 🌐 Publishing to Open VSX Registry (for VSCodium / Gitpod)

Open VSX Registry is an open-source alternative to the Microsoft VS Code Marketplace. Publishing here makes your extension available to developers using **VSCodium**, **Gitpod**, **GitHub Codespaces** (sometimes), and **Eclipse Theia**.

### 1. Create an Account & Namespace
1. Go to [open-vsx.org](https://open-vsx.org/) and sign in (GitHub log-in supported).
2. Go to your profile and request/create a namespace matching your publisher ID: `VanshSethi`. 
   *(Note: Namespaces starting with a user's GitHub username are usually auto-approved or approved quickly).*

### 2. Generate an Access Token
1. In Open VSX, go to **Settings** -> **Access Tokens**.
2. Generate a token and save it securely.

### 3. Publish via CLI (ovsx) with the Custom Open VSX README
Both `vsce` and `ovsx` pack the `README.md` file found in the root directory by default. To publish to Open VSX with your custom [README_OVSX.md](file:///e:/What%20Was%20I%20Doing%20Extension/README_OVSX.md), follow these commands to swap the READMEs temporarily during publishing:

#### On Windows (PowerShell):
```powershell
# 1. Temporarily swap READMEs
Rename-Item README.md README_MS.md
Rename-Item README_OVSX.md README.md

# 2. Package and Publish
npx @vscode/vsce package
npx ovsx publish what-was-i-doing-1.0.10.vsix -p <YOUR_OPEN_VSX_TOKEN>

# 3. Restore original READMEs
Rename-Item README.md README_OVSX.md
Rename-Item README_MS.md README.md
```

#### On macOS / Linux (Bash):
```bash
# 1. Temporarily swap READMEs
mv README.md README_MS.md
mv README_OVSX.md README.md

# 2. Package and Publish
npx @vscode/vsce package
npx ovsx publish what-was-i-doing-1.0.10.vsix -p <YOUR_OPEN_VSX_TOKEN>

# 3. Restore original READMEs
mv README.md README_OVSX.md
mv README_MS.md README.md
```

Alternatively, you can manually swap the files, run `npx @vscode/vsce package`, and upload the generated `.vsix` file directly through the web UI at [open-vsx.org/publish](https://open-vsx.org/publish).

---

## 📊 Version Management

Semantic versioning:
- **0.0.1** - Initial development (current)
- **0.1.0** - First beta release
- **1.0.0** - First stable release

Update in `package.json` and `CHANGELOG.md` for each release.

## 🔗 Useful Links

- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Marketplace](https://marketplace.visualstudio.com/)

## ✨ Current Status

**The extension is ready for testing and publishing!** 

All core functionality is implemented and compiled successfully. Follow the checklist above to publish to VS Code Marketplace.
