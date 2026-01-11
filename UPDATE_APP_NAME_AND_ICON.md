# How to Update App Name and Icon

## ✅ What I've Fixed in Code

1. **App Name**: Changed from "UNJSPF Pension App" to "OneRetire"
2. **Version**: Updated to `1.0.1` (from `1.0.0`)
3. **Version Code**: Updated to `2` (from `1`) - required for Android updates
4. **Android Adaptive Icon**: Added configuration for better icon display

## 📱 Step 1: Update the Icon File

**IMPORTANT**: Make sure `./assets/images/icon.png` is the OneRetire logo!

### Icon Requirements:
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Content**: OneRetire logo (centered, with padding)
- **Background**: Transparent or white (for Android adaptive icon)

### If you need to replace the icon:
1. Get your OneRetire logo (1024x1024 PNG)
2. Replace `./assets/images/icon.png` with your logo
3. Make sure it's named exactly `icon.png`

## 🔨 Step 2: Build New Version

After updating the icon (if needed), build a new version:

```bash
eas build --platform android --profile production
```

This will:
- Create a new build with version `1.0.1` (version code `2`)
- Include the updated app name "OneRetire"
- Include the updated icon

**Build time**: ~15-20 minutes

## 📤 Step 3: Update in Google Play Console

### 3.1 Upload the New Build

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Go to **"Production"** (or your testing track)
4. Click **"Create new release"**
5. Upload the new `.aab` file from your build
6. Fill in:
   - **Release name**: `1.0.1 (2)` or `Version 1.0.1`
   - **Release notes**: "Updated app name to OneRetire and new icon"
7. Click **"Save"**

### 3.2 Update Store Listing (App Name)

1. Go to **"Store presence" → "Main store listing"**
2. Update **"App name"** to: `OneRetire`
3. Click **"Save"**

### 3.3 Update App Icon (512x512 for Store)

1. Still in **"Main store listing"**
2. Under **"Graphics"**, update **"App icon"**
3. Upload a 512x512 PNG version of your OneRetire logo
4. Click **"Save"**

### 3.4 Update Feature Graphic (Optional but Recommended)

1. In **"Main store listing"** → **"Graphics"**
2. Upload **"Feature graphic"** (1024x500 PNG)
   - Can include OneRetire branding
3. Click **"Save"**

## 🚀 Step 4: Submit the Update

1. Go back to **"Production"** (or your testing track)
2. Review your release
3. Click **"Review release"**
4. Review all sections
5. Click **"Start rollout to Production"** (or appropriate track)

## 📱 Step 5: Testers Will Get Update

- Testers will receive the update automatically
- They need to update the app from Google Play Store
- The new version will show:
  - **App name**: "OneRetire" (instead of "UNJSPF Pension App")
  - **App icon**: Your OneRetire logo

## ⚠️ Important Notes

1. **Version Code Must Increment**: I've updated it to `2` - each update needs a higher number
2. **Icon File**: Make sure `./assets/images/icon.png` is your OneRetire logo (1024x1024)
3. **Store Icon**: Different from app icon - needs 512x512 for Google Play listing
4. **Review Time**: Google usually reviews updates in 1-7 days

## 🔄 For Future Updates

Each time you update:
1. Increment `version` in `app.json` (e.g., `1.0.1` → `1.0.2`)
2. Increment `versionCode` in `app.json` (e.g., `2` → `3`)
3. Build: `eas build --platform android --profile production`
4. Upload to Google Play Console
5. Submit for review

## ✅ Quick Checklist

- [ ] Verify `./assets/images/icon.png` is OneRetire logo (1024x1024)
- [ ] Build new version: `eas build --platform android --profile production`
- [ ] Download the `.aab` file
- [ ] Upload to Google Play Console → Production → Create new release
- [ ] Update store listing: App name = "OneRetire"
- [ ] Upload store icon (512x512 PNG)
- [ ] Submit for review
- [ ] Wait for Google approval (1-7 days)
- [ ] Testers will get update automatically

