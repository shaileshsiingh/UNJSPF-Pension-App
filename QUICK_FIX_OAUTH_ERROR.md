# Quick Fix: OAuth 2.0 Policy Error

## The Problem
Error: "doesn't comply with Google's OAuth 2.0 policy" - Error 400: invalid_request

**Cause:** The redirect URI `unjspf-pension://` is not authorized for your Firebase Web Client ID.

## ✅ Fix: Add Redirect URI to Google Cloud Console

### Step 1: Open Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Select project: **`unspension`** (project ID: 343269736783)

### Step 2: Find Your Web Client
1. Go to: **APIs & Services** → **Credentials**
2. Find: `343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com`
3. **Type:** Web client (or Web application)
4. **Click on it** to edit

### Step 3: Add Redirect URI
1. Scroll to **"Authorized redirect URIs"** section
2. Click **"ADD URI"** or the **"+"** button
3. Enter: `unjspf-pension://`
4. Click **"SAVE"**

### Step 4: Configure OAuth Consent Screen
1. Go to: **APIs & Services** → **OAuth consent screen**
2. Make sure:
   - **User Type:** External
   - **App name:** OneRetire
   - **Support email:** Your email
3. **IMPORTANT - Add Test User:**
   - Scroll to **"Test users"** section
   - Click **"ADD USERS"**
   - Add: `shaileshsiingh@gmail.com`
   - Click **"ADD"**
4. Click **"SAVE AND CONTINUE"** through all steps

### Step 5: Wait and Test
1. **Wait 5-10 minutes** for changes to take effect
2. **Close your app completely** (not just minimize)
3. **Restart your app**
4. **Try Google sign-in again**

## 🎯 What You Need to Do

1. ✅ Add `unjspf-pension://` to authorized redirect URIs
2. ✅ Add your email as a test user
3. ✅ Wait 5-10 minutes
4. ✅ Test again

## ⚠️ Important

- The redirect URI must be **exact**: `unjspf-pension://` (no trailing slash)
- Changes can take **5-10 minutes** to propagate
- You **must** add yourself as a test user if OAuth consent screen is in "Testing" mode
