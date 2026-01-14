# Fix: Google Sign-In Not Working on Android/iOS (Works on Web)

## 🔴 The Problem

- ✅ Google Sign-In works on **Web**
- ❌ Google Sign-In **doesn't work** on **Android/iOS**
- Shows "Access blocked" or other OAuth errors

## ✅ Solution: Configure Redirect URIs for Native Apps

### Step 1: Get Your Redirect URI

The code now uses Expo's proxy, which generates a redirect URI like:
```
https://auth.expo.io/@your-username/unpensionappnativewind
```

**To find your exact redirect URI:**

1. Run your app on Android/iOS
2. Try to sign in with Google
3. Check the console logs - you'll see: `🔗 Redirect URI: https://auth.expo.io/...`
4. Copy that exact URI

**OR** you can calculate it:
- Format: `https://auth.expo.io/@YOUR_EXPO_USERNAME/unpensionappnativewind`
- Your Expo username is in your Expo account
- Your app slug is: `unpensionappnativewind` (from `app.json`)

### Step 2: Add Redirect URI to Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **`unspension`**
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID:
   - Look for: `343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com`
   - Type: **Web client**
5. Click on it to edit
6. Under **"Authorized redirect URIs"**, add:
   ```
   https://auth.expo.io/@your-expo-username/unpensionappnativewind
   ```
   **Replace `your-expo-username` with your actual Expo username!**
7. Under **"Authorized JavaScript origins"**, add:
   ```
   https://auth.expo.io
   ```
8. Click **"Save"**

### Step 3: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** → **OAuth consent screen**
2. Make sure it's configured:
   - **User Type**: External
   - **App name**: OneRetire
   - **Support email**: Your email
3. **IMPORTANT**: Add test users:
   - Scroll to **"Test users"**
   - Click **"Add Users"**
   - Add **YOUR EMAIL** (the one you're testing with)
   - Click **"Add"**
4. Save

### Step 4: Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **`unspension`**
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add these domains (if not already there):
   - `exp.host`
   - `expo.dev`
   - `auth.expo.io`
   - `localhost`
5. Click **"Add"** for each

### Step 5: Test Again

1. **Wait 5-10 minutes** for Google to update settings
2. Close and reopen your app
3. Try "Sign in with Google" again
4. Check console logs for the redirect URI being used

## 🔍 Debugging: Check Console Logs

The updated code now logs detailed information. When you try to sign in, look for:

```
🔄 Starting Google OAuth for native platform...
📱 Platform: android (or ios)
🔗 Redirect URI: https://auth.expo.io/@username/slug
🔑 Using Client ID: 343269736783-...
📱 Prompting for Google OAuth...
📥 OAuth result type: success/error/cancel
```

**If you see an error**, check:
- Does the redirect URI in logs match what's in Google Cloud Console?
- Is your email in the test users list?
- Did you wait 5-10 minutes after making changes?

## 🚨 Common Errors & Fixes

### Error: "redirect_uri_mismatch"
**Fix**: The redirect URI in Google Cloud Console doesn't match what the app is using.
- Check the console log for the exact redirect URI
- Make sure it's added to Google Cloud Console (exact match, including `https://`)

### Error: "Access blocked: This app's request is invalid"
**Fix**: 
- Your email is not in the test users list
- OAuth consent screen is not configured
- Add your email to test users in OAuth consent screen

### Error: "Invalid client ID"
**Fix**: 
- Make sure the client ID in code matches the one in Google Cloud Console
- The client ID should be the **Web client** from Firebase

### OAuth opens but closes immediately
**Fix**: 
- Check if redirect URI is properly configured
- Make sure `auth.expo.io` is in authorized JavaScript origins

## 📱 Alternative: Use App Scheme (For Production)

If the Expo proxy doesn't work, you can use your app's custom scheme:

1. Your app scheme is: `unjspf-pension` (from `app.json`)
2. The redirect URI would be: `unjspf-pension://`
3. Add this to Google Cloud Console authorized redirect URIs
4. Update code to use:
   ```typescript
   const redirectUri = AuthSession.makeRedirectUri({
     useProxy: false, // Use app scheme instead
   });
   ```

**Note**: App scheme works better for production builds, but Expo proxy is easier for development/testing.

## ✅ Quick Checklist

- [ ] Found your Expo username
- [ ] Calculated redirect URI: `https://auth.expo.io/@username/unpensionappnativewind`
- [ ] Added redirect URI to Google Cloud Console (exact match)
- [ ] Added `https://auth.expo.io` to authorized JavaScript origins
- [ ] Added your email to OAuth consent screen test users
- [ ] Added Firebase authorized domains (`auth.expo.io`, `exp.host`, `expo.dev`)
- [ ] Waited 5-10 minutes after changes
- [ ] Tested again and checked console logs

## 🧪 Testing Steps

1. **Check console logs** when signing in - note the redirect URI
2. **Verify in Google Cloud Console** - make sure redirect URI matches exactly
3. **Test with your email** - make sure it's in test users
4. **Check Firebase** - authorized domains are added
5. **Wait and retry** - Google caches settings for 5-10 minutes

## 📝 Next Steps

Once it works:
1. Test with multiple test users
2. For production, consider creating platform-specific OAuth clients (Android/iOS)
3. Publish OAuth consent screen when ready for production
