# Google OAuth Android Setup - Complete Guide

## Current Configuration

Your app is using:
- **Redirect URI:** `unjspf-pension://` (your app scheme)
- **Android Client ID:** `610470496963-slov8eeuritmekudmppd9ufansrqg3v8.apps.googleusercontent.com`
- **OAuth Flow:** Authorization Code with PKCE

## ⚠️ Required: Configure Redirect URI in Google Cloud Console

The redirect URI `unjspf-pension://` **MUST** be added to your Android OAuth client in Google Cloud Console.

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Select project: **`unspension`** (or your Firebase project)
3. Navigate to: **APIs & Services** → **Credentials**

### Step 2: Find Your Android OAuth Client

1. Look for the client ID: `610470496963-slov8eeuritmekudmppd9ufansrqg3v8.apps.googleusercontent.com`
2. Click on it to edit

### Step 3: Add Redirect URI

1. Under **"Authorized redirect URIs"**, click **"ADD URI"**
2. Add: `unjspf-pension://`
3. Click **"SAVE"**

### Step 4: Verify App Package Name

Make sure the **Package name** matches: `com.oneretire.app` (from your `app.json`)

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"
- **Cause:** The redirect URI `unjspf-pension://` is not added in Google Cloud Console
- **Fix:** Follow Step 3 above to add the redirect URI

### Error: "PKCE code verifier not available"
- **Cause:** The OAuth flow is not properly handling PKCE
- **Fix:** The code has been updated to handle this better. Make sure you're using the latest code.

### Error: "No ID token received"
- **Cause:** Token exchange failed
- **Fix:** 
  1. Check that redirect URI is configured correctly
  2. Verify the Android client ID is correct
  3. Check console logs for detailed error messages

### OAuth Opens But Closes Immediately
- **Cause:** Redirect URI mismatch or not configured
- **Fix:** Add `unjspf-pension://` to authorized redirect URIs in Google Cloud Console

## 📱 Testing Steps

1. **Configure Google Cloud Console** (add redirect URI)
2. **Wait 2-3 minutes** for changes to propagate
3. **Test Google Sign-In** in your app
4. **Check console logs** for detailed error messages
5. **Verify** the OAuth flow completes successfully

## ✅ Expected Flow

1. User taps "Continue with Google"
2. Google OAuth screen opens
3. User selects account
4. App receives authorization code
5. App exchanges code for ID token (with PKCE)
6. Firebase signs in with ID token
7. User is logged in

## 🔑 Important Notes

- The redirect URI **must match exactly** in Google Cloud Console
- Changes in Google Cloud Console can take 2-3 minutes to propagate
- The Android client ID must be the OAuth client (not the Firebase Web client)
- PKCE is automatically handled by the code
