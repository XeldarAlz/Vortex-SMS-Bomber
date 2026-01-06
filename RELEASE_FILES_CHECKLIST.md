# GitHub Release v1.0.0 - Files Checklist

## 📦 Files to Upload

### Required Files (Upload These)

1. **VortexSMS-Setup-1.0.0.exe**
   - Location: `desktop/build/VortexSMS-Setup-1.0.0.exe`
   - Type: Windows Installer
   - Size: ~150 MB (approximate)
   - **✅ REQUIRED - Main installer**

2. **VortexSMS-Portable-1.0.0.exe**
   - Location: `desktop/build/VortexSMS-Portable-1.0.0.exe`
   - Type: Portable Executable
   - Size: ~150 MB (approximate)
   - **✅ REQUIRED - Portable version**

3. **latest.yml**
   - Location: `desktop/build/latest.yml`
   - Type: Auto-updater Manifest
   - Size: ~1 KB
   - **✅ REQUIRED - For automatic updates**

4. **VortexSMS-Setup-1.0.0.exe.blockmap**
   - Location: `desktop/build/VortexSMS-Setup-1.0.0.exe.blockmap`
   - Type: Block Map File
   - Size: ~50 KB (approximate)
   - **✅ REQUIRED - For incremental updates**

---

## 🚫 Files NOT to Upload

- ❌ `builder-debug.yml` - Debug file, not needed
- ❌ `win-unpacked/` folder - Unpacked files, not needed
- ❌ Any other files in the build directory

---

## 📋 GitHub Release Setup

### Release Title
```
VortexSMS v1.0.0 - Initial Release 🚀
```

### Tag Name
```
v1.0.0
```

### Release Description
Copy the entire content from `GITHUB_RELEASE_v1.0.0.md`

### Files to Attach (in order)
1. `VortexSMS-Setup-1.0.0.exe`
2. `VortexSMS-Portable-1.0.0.exe`
3. `latest.yml`
4. `VortexSMS-Setup-1.0.0.exe.blockmap`

---

## 📍 File Paths (Relative to Repository Root)

```
desktop/build/VortexSMS-Setup-1.0.0.exe
desktop/build/VortexSMS-Portable-1.0.0.exe
desktop/build/latest.yml
desktop/build/VortexSMS-Setup-1.0.0.exe.blockmap
```

---

## ✅ Quick Checklist

- [ ] Create new release on GitHub
- [ ] Set tag: `v1.0.0`
- [ ] Set title: `VortexSMS v1.0.0 - Initial Release 🚀`
- [ ] Copy description from `GITHUB_RELEASE_v1.0.0.md`
- [ ] Upload `VortexSMS-Setup-1.0.0.exe`
- [ ] Upload `VortexSMS-Portable-1.0.0.exe`
- [ ] Upload `latest.yml`
- [ ] Upload `VortexSMS-Setup-1.0.0.exe.blockmap`
- [ ] Mark as "Latest release" (if this is your first release)
- [ ] Publish release

---

## 🎯 Summary

**Total Files to Upload:** 4 files

**Total Size:** ~300 MB (approximate)

**Release Type:** Stable Release

**Platform:** Windows x64

---

*All files are located in the `desktop/build/` directory.*

