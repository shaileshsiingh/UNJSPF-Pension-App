# Fix: Google Sign-In "Access Blocked" Error

## 🔴 The Problem

When clicking "Sign in with Google", you see:
- **"Access blocked: This app's request is invalid"**
- **"Error 400: redirect_uri_mismatch"**
- **"This app isn't verified"**

## ✅ Solution: Configure Google OAuth Consent Screen

### Step 1: Go to Google Cloud Console

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **`unspension`** (from your Firebase config)
3. If you don't see it, check your Firebase project ID in `firebaseConfig.ts`

### Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to:
   - **APIs & Services** → **OAuth consent screen**

2. **User Type Selection:**
   - Choose **"External"** (unless you have a Google Workspace)
   - Click **"Create"**

3. **App Information:**
   - **App name**: `OneRetire` (or your app name)
   - **User support email**: Your email
   - **App logo**: Upload your OneRetire logo (optional)
   - **Application home page**: `https://www.harpandcode.io/` (or your website)
   - **Application privacy policy link**: Your privacy policy URL
   - **Application terms of service link**: (optional)
   - **Authorized domains**: Add `harpandcode.io` (if you have a domain)
   - **Developer contact information**: Your email
   - Click **"Save and Continue"**

4. **Scopes:**
   - Click **"Add or Remove Scopes"**
   - Add these scopes:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`
   - Click **"Update"** → **"Save and Continue"**

5. **Test Users (IMPORTANT for Testing):**
   - Click **"Add Users"**
   - Add **YOUR EMAIL ADDRESS** (the one you're testing with)
   - Add any other test emails
   - Click **"Add"** → **"Save and Continue"**

6. **Summary:**
   - Review everything
   - Click **"Back to Dashboard"**

### Step 3: Configure OAuth Client (Redirect URIs)

1. Go to **APIs & Services** → **Credentials**

2. Find your OAuth 2.0 Client ID:
   - Look for: `343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com`
   - Or find the one with type "Web client"

3. Click on the client ID to edit

4. **Authorized redirect URIs** - Add these:
   ```
   https://auth.expo.io/@your-expo-username/unpensionappnativewind
   exp://localhost:8081
   exp://192.168.1.1:8081
   ```
   
   **To find your exact Expo redirect URI:**
   - Run: `npx expo start`
   - Look for a line like: `exp://192.168.x.x:8081`
   - Or check the terminal output for the redirect URI

5. **Authorized JavaScript origins** - Add:
   ```
   https://auth.expo.io
   exp://localhost:8081
   ```

6. Click **"Save"**

### Step 4: Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **`unspension`**
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add these domains (if not already there):
   - `exp.host`
   - `expo.dev`
   - `auth.expo.io`
   - `localhost` (for development)
5. Click **"Add"** for each

### Step 5: Publish the App (For Production)

**For Testing (Current):**
- Keep OAuth consent screen in **"Testing"** mode
- Only test users you added can sign in

**For Production (When Ready):**
1. Go back to **OAuth consent screen**
2. Click **"PUBLISH APP"** button
3. This makes it available to all users (after Google review)

**Note:** Google may require verification for production apps with sensitive scopes.

## 🔍 Alternative: Use Different OAuth Client for Native

If the above doesn't work, you can create a separate OAuth client for mobile:

### Create Android OAuth Client:

1. In **Credentials**, click **"Create Credentials"** → **"OAuth client ID"**
2. Choose **"Android"**
3. Package name: `com.oneretire.app` (from your `app.json`)
4. SHA-1 certificate fingerprint:
   - For EAS builds, get it from: `eas credentials` or EAS dashboard
   - For local testing, run: `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android`
5. Click **"Create"**

### Create iOS OAuth Client:

1. Click **"Create Credentials"** → **"OAuth client ID"**
2. Choose **"iOS"**
3. Bundle ID: `com.oneretire.app`
4. Click **"Create"**

### Update Code to Use Platform-Specific Client:

Update `components/AuthContext.tsx`:

```typescript
// Replace line 103 with:
const clientId = Platform.select({
  ios: 'YOUR-IOS-CLIENT-ID.apps.googleusercontent.com',
  android: 'YOUR-ANDROID-CLIENT-ID.apps.googleusercontent.com',
  default: '343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com', // Web client
});
```

## ✅ Quick Checklist

- [ ] OAuth consent screen configured (External, app info filled)
- [ ] Test users added (your email)
- [ ] Redirect URIs added to OAuth client
- [ ] Firebase authorized domains updated
- [ ] App restarted after changes

## 🧪 Test Again

1. Close and reopen your app
2. Try "Sign in with Google" again
3. You should see the consent screen (not "Access blocked")

## 📝 Common Issues

### Still Getting "Access Blocked"?
- **Check**: Is your email in the test users list?
- **Check**: Is OAuth consent screen in "Testing" mode? (It should be for now)
- **Check**: Did you wait 5-10 minutes after making changes? (Google caches settings)

### "redirect_uri_mismatch" Error?
- **Check**: The redirect URI in code matches what's in Google Cloud Console
- **Check**: You added the Expo proxy URL: `https://auth.expo.io/@username/slug`

### App Not Verified Warning?
- This is normal for testing mode
- Click "Advanced" → "Go to OneRetire (unsafe)" to proceed
- For production, you'll need to verify the app with Google

## 🚀 Next Steps

Once testing works:
1. Test with multiple test users
2. When ready for production, publish the OAuth consent screen
3. Submit for Google verification (if required)
