# Fix: "Access blocked: Authorization Error" - OAuth 2.0 Policy

## The Error
- **Error:** "You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy"
- **Error Code:** 400: invalid_request
- **Cause:** Redirect URI `unjspf-pension://` is not authorized in Google Cloud Console

## ✅ Solution: Add Redirect URI to Firebase Web Client

Since you're using Firebase Web Client ID (`343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com`), you need to add the redirect URI to **that specific client**.

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Select project: **`unspension`** (project ID: 343269736783)
3. Navigate to: **APIs & Services** → **Credentials**

### Step 2: Find the Firebase Web Client

1. Look for the client ID: `343269736783-srb627btq9fr895hsb72p9j0q8tjdlc2.apps.googleusercontent.com`
2. **Type:** Web client (or Web application)
3. Click on it to edit

### Step 3: Add Redirect URI

1. Scroll down to **"Authorized redirect URIs"**
2. Click **"ADD URI"** or **"+"**
3. Add: `unjspf-pension://`
4. Click **"SAVE"**

### Step 4: Verify OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** → **OAuth consent screen**
2. Make sure it's configured:
   - **User Type:** External (or Internal if using Google Workspace)
   - **App name:** OneRetire (or your app name)
   - **Support email:** Your email
   - **Developer contact:** Your email
3. **If in Testing mode:**
   - Scroll to **"Test users"**
   - Click **"ADD USERS"**
   - Add: `shaileshsiingh@gmail.com` (your email)
   - Click **"ADD"**
4. Click **"SAVE AND CONTINUE"** through all steps

### Step 5: Wait and Test

1. **Wait 5-10 minutes** for changes to propagate
2. **Restart your app**
3. **Try Google sign-in again**

## 🔍 Alternative: Use Android Client ID Instead

If the above doesn't work, you can switch back to using the Android-specific client ID. But you'll still need to configure it properly.

### Option: Switch to Android Client ID

Update `components/AuthContext.tsx` line ~100:
```typescript
const clientId = Platform.OS === 'ios' 
  ? GOOGLE_CLIENT_IDS.ios 
  : GOOGLE_CLIENT_IDS.android; // Use Android client instead
```

Then configure the Android client:
1. Find Android client: `610470496963-slov8eeuritmekudmppd9ufansrqg3v8.apps.googleusercontent.com`
2. Add redirect URI: `unjspf-pension://`
3. Verify package name: `com.oneretire.app`

## ⚠️ Important Notes

1. **Redirect URI must match exactly** - `unjspf-pension://` (no trailing slash, exact case)
2. **Changes take 5-10 minutes** to propagate
3. **Test users required** if OAuth consent screen is in "Testing" mode
4. **App verification** may be required for production (but not for testing)

## 🎯 Quick Checklist

- [ ] Added `unjspf-pension://` to Web client's authorized redirect URIs
- [ ] OAuth consent screen configured
- [ ] Test user added (if in testing mode): `shaileshsiingh@gmail.com`
- [ ] Waited 5-10 minutes after changes
- [ ] Restarted app and tried again

## 📱 Testing

After making changes:
1. Wait 5-10 minutes
2. Close and restart your app completely
3. Try Google sign-in
4. Check console logs for any new errors
