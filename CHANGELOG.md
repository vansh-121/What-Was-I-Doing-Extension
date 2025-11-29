# Change Log

All notable changes to the "what-was-i-doing" extension will be documented in this file.

**[📥 Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=VanshSethi.what-was-i-doing)**

## [1.0.1] - 2025-11-29

### Added
- ✨ Professional extension icon for marketplace
- 📖 Enhanced documentation with marketplace link

### Fixed
- Fixed duplicate context detection logic

## [1.0.0] - 2025-11-29

### Added
- 🔄 Automatic activity tracking (file edits, cursor movements, active editors)
- ⏰ Smart idle detection with configurable timeout
- 🎯 Instant resume popup showing last work context
- 📋 Work session history with quick navigation
- 💾 Context preservation (file, line, function name, TODO comments)
- 📊 Status bar integration showing last activity time
- ⚙️ Full configuration support:
  - Customizable idle timeout
  - File exclusion patterns
  - TODO keyword detection
  - History size limits
  - Auto-popup toggle
- 🔒 Local-only storage (privacy-focused)
- 🚫 Duplicate context prevention (doesn't save same context repeatedly)

### Commands
- Show Last Context
- View History
- Save Current Context
- Clear History

### Initial Release
First public release of What Was I Doing extension on VS Code Marketplace.