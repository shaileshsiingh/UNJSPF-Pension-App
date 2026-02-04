# Android Development Build Guide

## Why QR Code Doesn't Work in Expo Go

Your app has `expo-dev-client` installed, which means it requires a **development build**. The regular Expo Go app cannot run apps with custom native code or development clients.

## ✅ Solution: Build Development Build (No Android SDK Needed!)

You can build using **EAS Build** (cloud build) - no need to install Android SDK on your computer!

### Step 1: Install EAS CLI (if not already installed)

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
eas login
```

### Step 3: Build Development Build for Android

```bash
eas build --platform android --profile development
```

This will:
- Build your app in the cloud (no Android SDK needed!)
- Generate an APK file
- Give you a download link

**Note:** First build takes 10-15 minutes. Subsequent builds are faster.

### Step 4: Download and Install APK on Your Android Device

1. **Download the APK:**
   - EAS will give you a download link after the build completes
   - Or check: https://expo.dev/accounts/[your-username]/projects/unpensionappnativewind/builds

2. **Transfer to Android Phone:**
   - Download the APK file to your phone
   - Or use: `adb install path/to/app.apk` (if you have adb)

3. **Install on Android:**
   - Open the APK file on your phone
   - Allow "Install from Unknown Sources" if prompted
   - Install the app

### Step 5: Run Expo Dev Server

```bash
npx expo start --dev-client
```

Or:
```bash
npm run dev
```

### Step 6: Connect Development Build to Dev Server

1. **Open the development build app** on your Android phone (the one you just installed)
2. **Scan the QR code** from your terminal
3. Your app will load with all the latest changes!

## 🚀 Quick Commands

```bash
# Start dev server for development build
npx expo start --dev-client

# Or use tunnel mode if on different network
npx expo start --dev-client --tunnel

# Build development build
eas build --platform android --profile development
```

## 🔄 Updating Your App

After making code changes:
1. The dev server will automatically reload (hot reload)
2. If you add new native dependencies, you'll need to rebuild:
   ```bash
   eas build --platform android --profile development
   ```

## 📱 Alternative: Use Tunnel Mode

If you're on different networks (phone and computer), use tunnel:

```bash
npx expo start --dev-client --tunnel
```

This creates a tunnel so your phone can connect to your dev server.

## ⚠️ Troubleshooting

### QR Code Still Not Working?
- Make sure you're using the **development build app** (the one you installed), not Expo Go
- Try tunnel mode: `npx expo start --dev-client --tunnel`
- Make sure phone and computer are on the same network (unless using tunnel)

### Build Fails?
- Check that you're logged in: `eas whoami`
- Make sure your `app.json` and `eas.json` are configured correctly
- Check the build logs on expo.dev

### Want to Test on Emulator Instead?
If you want to use Android emulator (requires Android SDK):
1. Install Android Studio
2. Set up Android SDK
3. Create an emulator
4. Run: `npx expo start --dev-client --android`

But **cloud build is easier** - no SDK installation needed!

## 🎯 Summary

1. ✅ Build development build: `eas build --platform android --profile development`
2. ✅ Install APK on your phone
3. ✅ Run: `npx expo start --dev-client`
4. ✅ Scan QR code with the development build app (not Expo Go)
5. ✅ Your app loads with latest changes!
