# Fix: Android Google Sign-In Error - "Something went wrong trying to finish signing in"

## 🔴 The Problem

You're seeing this error after selecting your Google account on Android:
> "Something went wrong trying to finish signing in. Please close this screen to go back to the app"

This happens because the **SHA-1 certificate fingerprint** is missing from your Firebase project configuration.

---

## ✅ Solution: Add SHA-1 Certificate to Firebase

### Step 1: Get Your SHA-1 Fingerprint

You need to get the SHA-1 fingerprint. Since you're using Expo, here are the working methods:

#### Option A: Build the App First, Then Get SHA-1 (Recommended)

The debug keystore is created when you first build the Android app. Run:

```bash
npx expo run:android
```

This will:
1. Create the debug keystore at `%USERPROFILE%\.android\debug.keystore`
2. Build and run your app on an Android device/emulator

After the build completes, run this PowerShell script I created for you:

```bash
powershell -ExecutionPolicy Bypass -File ".\get-sha1.ps1"
```

This script will automatically find keytool and extract your SHA-1 fingerprint.

#### Option B: Use EAS Build to Get SHA-1 (Easier, No Local Build)

If you don't want to build locally, use EAS:

```bash
npx eas build:configure
npx eas credentials
```

Then:
1. Select **Android**
2. Select **Keystore: Manage everything needed to build your project**
3. Select **Set up a new keystore**
4. The SHA-1 will be displayed - copy it

#### Option C: Manual Method (If You Have Android Studio)

1. Open Android Studio
2. Open your project
3. Click **Gradle** tab (right side)
4. Navigate to: `app` → `Tasks` → `android` → `signingReport`
5. Double-click it
6. Copy the **SHA1** value from the output

---

**IMPORTANT**: For now, let's use Option A. First, build the app to create the keystore.

---

### Step 2: Add SHA-1 to Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **`unspension`**
3. Click the **gear icon** ⚙️ → **Project settings**
4. Scroll down to **"Your apps"**
5. Find your Android app: **`com.oneretire.app`**
6. Click on it
7. Scroll to **"SHA certificate fingerprints"**
8. Click **"Add fingerprint"**
9. Paste your **SHA-1** fingerprint
10. Click **"Save"**

---

### Step 3: Download Updated google-services.json

After adding the SHA-1:

1. Still in Firebase Console → Project settings → Your Android app
2. Click **"Download google-services.json"**
3. **Replace** the existing `google-services.json` in your project root with the new one

---

### Step 4: Verify OAuth Configuration in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **`unspension`**
3. Go to **APIs & Services** → **Credentials**
4. Find your **Android OAuth 2.0 Client ID**:
   - Client ID: `343269736783-70bssqn90udf30ear3r843otin4nlkqd.apps.googleusercontent.com`
   - Type: **Android**
5. Click on it and verify:
   - **Package name**: `com.oneretire.app` ✅
   - **SHA-1 certificate fingerprint**: Should match what you added in Step 2 ✅

If the SHA-1 doesn't match or is missing:
- Click **"Add fingerprint"**
- Paste your SHA-1
- Click **"Save"**

---

### Step 5: Add Your Email to OAuth Consent Screen Test Users

1. In Google Cloud Console, go to **APIs & Services** → **OAuth consent screen**
2. Scroll to **"Test users"**
3. Click **"Add Users"**
4. Add **YOUR EMAIL** (the one you're testing with)
5. Click **"Save"**

---

### Step 6: Rebuild and Test

1. **Clean and rebuild** your app:
   ```bash
   cd "c:\Users\Shailesh Singh\Downloads\UNJSPF-Pension-App-main-app-ready-v5"
   npx expo prebuild --clean
   npx expo run:android
   ```

2. **Wait 5-10 minutes** for Google to propagate the changes

3. **Test Google Sign-In** again

---

## 🔍 Debugging: Check Console Logs

When you try to sign in, check the logs for detailed information:

```bash
npx expo start
# Then press 'a' for Android
```

Look for these logs:
```
✅ GoogleSignin configured with webClientId: 343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2...
🔄 Starting native Google Sign-In...
📱 Platform: android
✅ Google Play Services available
📱 Prompting for Google Sign-In...
✅ Google Sign-In result: {...}
✅ Got ID token, signing in with Firebase...
✅ Google sign-in successful: your-email@gmail.com
```

If you see errors, they'll help identify the issue.

---

## 🚨 Common Errors & Fixes

### Error: "Something went wrong trying to finish signing in"
**Cause**: SHA-1 fingerprint not added or mismatched

**Fix**:
1. Verify SHA-1 is added to Firebase (Step 2)
2. Verify SHA-1 matches in Google Cloud Console Android OAuth client (Step 4)
3. Download updated `google-services.json` (Step 3)
4. Rebuild the app (Step 6)

---

### Error: "Sign in cancelled" or "Error code 12501"
**Cause**: SHA-1 mismatch or `google-services.json` not updated

**Fix**:
1. Make sure you downloaded the **latest** `google-services.json` after adding SHA-1
2. Replace the old file in your project
3. Rebuild: `npx expo prebuild --clean`

---

### Error: "Access blocked: This app's request is invalid"
**Cause**: Your email is not in the OAuth consent screen test users

**Fix**:
1. Add your email to test users (Step 5)
2. Wait 5-10 minutes
3. Try again

---

### Error: "Developer Error" or "Error code 10"
**Cause**: Package name mismatch or SHA-1 not configured

**Fix**:
1. Verify package name in `app.json` matches Firebase: `com.oneretire.app`
2. Verify SHA-1 is added to both Firebase and Google Cloud Console
3. Rebuild the app

---

## ✅ Quick Checklist

- [ ] Got SHA-1 fingerprint from your keystore
- [ ] Added SHA-1 to Firebase Console (Project settings → Android app)
- [ ] Downloaded updated `google-services.json` and replaced old one
- [ ] Verified SHA-1 in Google Cloud Console Android OAuth client
- [ ] Added your test email to OAuth consent screen test users
- [ ] Cleaned and rebuilt the app: `npx expo prebuild --clean`
- [ ] Waited 5-10 minutes after making changes
- [ ] Tested again and checked console logs

---

## 📱 For Production Builds

When you create a production build, you'll need to:

1. Get the **production SHA-1** from your production keystore
2. Add it to Firebase (same steps as above)
3. Add it to Google Cloud Console Android OAuth client
4. Download updated `google-services.json`
5. Rebuild with production keystore

---

## 🧪 Testing Steps

1. **Run the app**: `npx expo run:android`
2. **Tap "Sign in with Google"**
3. **Select your email**
4. **Check console logs** for detailed error messages
5. If it works: ✅ You're done!
6. If it fails: Check the error in logs and refer to "Common Errors" section above

---

## 📝 Why This Happens

The native Google Sign-In on Android requires:
1. **Web Client ID** - Used for server-side authentication (already configured in your code ✅)
2. **Android OAuth Client** - Created automatically by Firebase (exists ✅)
3. **SHA-1 Fingerprint** - Proves your app is legitimate (THIS WAS MISSING ❌)

Without the SHA-1, Google doesn't trust that your app is really `com.oneretire.app`, so it blocks the sign-in.

---

## 🎯 Summary

The fix is simple:
1. Get your SHA-1 fingerprint
2. Add it to Firebase
3. Download updated `google-services.json`
4. Rebuild the app

That's it! The error should be gone. 🎉
