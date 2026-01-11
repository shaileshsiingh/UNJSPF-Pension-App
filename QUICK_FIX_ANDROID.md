# Quick Fix: Press 'a' for Android

## The Issue
Pressing 'a' in Expo CLI tries to open on Android using `adb`, which requires Android SDK.

## ✅ Solution: Use Development Build (Gives Different QR Code)

If you want the "different QR code" for Android that you had before, you need a development build:

### Step 1: Build Development Build
```bash
eas build --platform android --profile development
```

This builds an APK you install on your Android device.

### Step 2: Install the APK
1. Download the APK from the build link
2. Transfer to your Android phone
3. Enable "Install from Unknown Sources" in Android settings
4. Install the APK

### Step 3: Run Expo Start
```bash
npm run dev
```

### Step 4: Open the Development Build App
- Open the development build app on your phone (the one you installed)
- It will show a QR code scanner
- Scan the QR code from your terminal
- This gives you the "different QR code" experience

## ✅ Alternative: Install Android SDK (If You Had It Before)

If you had Android SDK before and want to use 'a' key:

1. Install Android Studio
2. Set up Android SDK
3. Set ANDROID_HOME environment variable
4. Then pressing 'a' will work

But **this is optional** - you can use Expo Go or development build instead!

## 🎯 Quick Answer

**For now:** Just use the regular QR code with Expo Go - it works perfectly!

**If you want the development build QR code:** Build and install the development build APK first.

