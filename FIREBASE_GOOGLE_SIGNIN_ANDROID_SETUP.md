# Firebase Google Sign-In Android Setup

## Important: Firebase vs Google Cloud Console

For **Firebase Google Authentication**, you don't configure redirect URIs in Google Cloud Console like you would for standalone OAuth. Instead, you configure things in **Firebase Console**.

## ✅ Required Configuration in Firebase Console

### Step 1: Configure SHA-1 Fingerprint (CRITICAL for Android)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **`unspension`**
3. Go to **Project Settings** (gear icon) → **Your apps**
4. Find your Android app: `com.oneretire.app`
5. Click on it or add it if not present
6. Under **"SHA certificate fingerprints"**, you need to add your app's SHA-1

#### How to Get SHA-1 Fingerprint:

**For Development (Expo Go or Development Build):**
```bash
# If using Expo Go
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# If using EAS Build development build
eas credentials
```

**For Production:**
- Get from your keystore or EAS credentials

#### Add SHA-1 to Firebase:
1. Copy the SHA-1 fingerprint (the long string after "SHA1:")
2. In Firebase Console → Project Settings → Your apps → Android app
3. Click **"Add fingerprint"**
4. Paste the SHA-1
5. Click **"Save"**

### Step 2: Verify Package Name

Make sure the package name in Firebase matches: `com.oneretire.app`

### Step 3: Enable Google Sign-In Method

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Find **Google** in the list
3. Click on it
4. Make sure it's **Enabled**
5. The **Web client ID** should be: `343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com`
6. Click **"Save"**

## 🔧 Code Configuration

The code has been updated to use the **Firebase Web Client ID** for Android, which is the recommended approach for Firebase.

**Current setup:**
- **Web:** Uses Firebase Web Client ID (popup method)
- **Android:** Uses Firebase Web Client ID (OAuth flow)
- **iOS:** Uses iOS-specific Client ID

## 🔍 Troubleshooting

### Error: "10: The API key is not valid"
- **Cause:** SHA-1 fingerprint not configured in Firebase
- **Fix:** Add SHA-1 fingerprint in Firebase Console (Step 1 above)

### Error: "redirect_uri_mismatch"
- **Cause:** For Firebase, this shouldn't happen if using Web client ID
- **Fix:** Make sure you're using the Web client ID from Firebase, not a custom Android client

### Error: "OAuth consent screen"
- **Cause:** OAuth consent screen needs to be configured in Google Cloud Console
- **Fix:** 
  1. Go to Google Cloud Console → APIs & Services → OAuth consent screen
  2. Configure it (User Type, App name, etc.)
  3. Add test users if in testing mode

### Google Sign-In Opens But Fails
- **Cause:** SHA-1 fingerprint mismatch
- **Fix:** 
  1. Get the correct SHA-1 for your build
  2. Add it to Firebase Console
  3. Wait 5-10 minutes for changes to propagate
  4. Try again

## 📱 Testing Steps

1. **Add SHA-1 fingerprint** to Firebase Console
2. **Wait 5-10 minutes** for changes to propagate
3. **Restart your app**
4. **Try Google sign-in**
5. **Check console logs** for detailed error messages

## ✅ Quick Checklist

- [ ] SHA-1 fingerprint added to Firebase Console
- [ ] Package name matches: `com.oneretire.app`
- [ ] Google sign-in method enabled in Firebase
- [ ] Using Firebase Web Client ID in code (already done)
- [ ] OAuth consent screen configured in Google Cloud Console
- [ ] Test users added (if in testing mode)

## 🎯 Key Points

1. **For Firebase, use Web Client ID for Android** - This is the recommended approach
2. **SHA-1 fingerprint is CRITICAL** - Without it, Google sign-in won't work on Android
3. **No redirect URI needed** - Firebase handles this automatically
4. **Changes take 5-10 minutes** to propagate after updating Firebase Console
