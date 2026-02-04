# Fix: Google Sign-In Error (SHA-1 Already Added)

Since you already have the SHA-1 fingerprint configured from Expo, the issue is likely **missing test user** or **outdated google-services.json**.

## Quick Fix Steps

### Step 1: Add Your Email to OAuth Test Users

This is the **most common cause** when SHA-1 is already configured.

1. Go to: https://console.cloud.google.com/
2. Select project: **unspension**
3. Click on **APIs & Services** → **OAuth consent screen**
4. Scroll down to **"Test users"** section
5. Click **"+ ADD USERS"**
6. Enter **your email address** (the one you're testing with on Android)
7. Click **"Save"**

---

### Step 2: Download Updated google-services.json

After adding the SHA-1 on Expo, you need to download the updated file:

1. Go to: https://console.firebase.google.com/
2. Select project: **unspension**
3. Click ⚙️ (gear icon) → **Project settings**
4. Scroll down to **"Your apps"**
5. Find your Android app: **com.oneretire.app**
6. Click **"Download google-services.json"**
7. **Replace** the existing file in your project:
   ```
   c:\Users\Shailesh Singh\Downloads\UNJSPF-Pension-App-main-app-ready-v5\google-services.json
   ```

---

### Step 3: Verify SHA-1 is in Firebase

While you're in Firebase Project settings:

1. Find your Android app: **com.oneretire.app**
2. Scroll to **"SHA certificate fingerprints"**
3. **Verify** your SHA-1 is listed there
4. If not, add it now

---

### Step 4: Build and Test with EAS

Since you don't have Android SDK installed locally, use EAS Build:

```bash
npx eas build --profile development --platform android
```

Or if you want to test immediately, install the app from Expo Go or a development build you already have.

---

### Step 5: Wait and Test

1. **Wait 5-10 minutes** after adding your email to test users
2. **Close and reopen** your app completely
3. Try **"Sign in with Google"** again

---

## Alternative: Test Without Building Locally

If you have an existing build or are using Expo Go:

1. Make sure **test user email is added** (Step 1)
2. Make sure **google-services.json is updated** (Step 2)
3. **Wait 5-10 minutes**
4. **Restart the app** completely
5. Try signing in

---

## What to Check

### In Google Cloud Console

✅ **OAuth consent screen** → Test users → Your email is listed

### In Firebase Console

✅ **Project settings** → Android app → SHA-1 fingerprint is listed
✅ **Authentication** → Sign-in method → Google is enabled

---

## If It Still Doesn't Work

Check the app logs when you try to sign in. Look for:

```
✅ GoogleSignin configured with webClientId: 343269736783-...
✅ Google Play Services available
📱 Prompting for Google Sign-In...
```

If you see an error, share it and I can help diagnose further.

---

## Most Likely Solution

Based on your situation (SHA-1 already added), the fix is probably just:

1. ✅ Add your email to OAuth consent screen test users
2. ✅ Wait 5-10 minutes
3. ✅ Try again

That's it! 🎉
