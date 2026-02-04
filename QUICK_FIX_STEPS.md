# Quick Fix: Android Google Sign-In Error

## The Problem
You're seeing: **"Something went wrong trying to finish signing in"**

## The Solution (5 Steps)

### Step 1: Build the App to Create Keystore

```bash
npx expo run:android
```

Wait for the build to complete. This creates the debug keystore needed for SHA-1 extraction.

---

### Step 2: Get Your SHA-1 Fingerprint

After the build completes, run the script I created:

```bash
powershell -ExecutionPolicy Bypass -File ".\get-sha1.ps1"
```

**Copy the SHA-1 fingerprint** that it displays (it will also copy to clipboard automatically).

---

### Step 3: Add SHA-1 to Firebase

1. Go to: https://console.firebase.google.com/
2. Select project: **unspension**
3. Click ⚙️ → **Project settings**
4. Find your Android app: **com.oneretire.app**
5. Scroll to **"SHA certificate fingerprints"**
6. Click **"Add fingerprint"**
7. **Paste your SHA-1**
8. Click **"Save"**

---

### Step 4: Download Updated google-services.json

1. Still in Firebase → Project settings → Your Android app
2. Click **"Download google-services.json"**
3. **Replace** the existing file in your project root:
   ```
   c:\Users\Shailesh Singh\Downloads\UNJSPF-Pension-App-main-app-ready-v5\google-services.json
   ```

---

### Step 5: Add Your Email to Test Users

1. Go to: https://console.cloud.google.com/
2. Select project: **unspension**
3. Go to **APIs & Services** → **OAuth consent screen**
4. Scroll to **"Test users"**
5. Click **"Add Users"**
6. Add **your email** (the one you're testing with)
7. Click **"Save"**

---

### Step 6: Rebuild and Test

```bash
npx expo prebuild --clean
npx expo run:android
```

**Wait 5-10 minutes** after making the Google Cloud changes, then test Google Sign-In again.

---

## Why This Fixes It

The error happens because Google needs to verify your app is legitimate. The **SHA-1 fingerprint** is like a digital signature that proves your app is really `com.oneretire.app`.

Without it, Google blocks the sign-in for security reasons.

---

## If You Still Have Issues

Check the console logs when signing in. Look for:
- ✅ `GoogleSignin configured with webClientId`
- ✅ `Google Play Services available`
- ✅ `Prompting for Google Sign-In...`
- ✅ `Google sign-in successful`

If you see errors, they'll tell you what's wrong.

---

## Summary

1. ✅ Build app: `npx expo run:android`
2. ✅ Get SHA-1: `powershell -ExecutionPolicy Bypass -File ".\get-sha1.ps1"`
3. ✅ Add SHA-1 to Firebase
4. ✅ Download new `google-services.json`
5. ✅ Add email to test users
6. ✅ Rebuild: `npx expo prebuild --clean && npx expo run:android`

That's it! 🎉
