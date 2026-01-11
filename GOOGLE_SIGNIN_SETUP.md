# Google Sign-In Setup for Android & iOS

This guide explains how to set up Google Sign-In for Android and iOS in your Expo app.

## ✅ What Has Been Fixed

The Google Sign-In implementation now supports:
- ✅ **Web**: Uses Firebase popup method (already working)
- ✅ **Android**: Uses `expo-auth-session` with Google OAuth
- ✅ **iOS**: Uses `expo-auth-session` with Google OAuth

## 🔧 Configuration Required

### Step 1: Get Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `unspension` (or the project ID from `firebaseConfig.ts`)
3. Navigate to **APIs & Services** → **Credentials**
4. Find or create an **OAuth 2.0 Client ID**

### Step 2: Configure OAuth Client

You have two options:

#### Option A: Use Existing Web Client (Easier for Development)
- Use your existing Web Client ID from Firebase
- In Firebase Console → Authentication → Sign-in method → Google
- Copy the **Web Client ID** (format: `xxxxx.apps.googleusercontent.com`)

#### Option B: Create Platform-Specific Clients (Recommended for Production)
- Create separate OAuth clients for Android and iOS
- Add authorized redirect URIs:
  - For Expo proxy (development): `https://auth.expo.io/@your-username/your-app-slug`
  - For production: Your app's bundle identifier

### Step 3: Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add these domains:
   - `exp.host` (for Expo development)
   - `expo.dev` (for Expo proxy)
   - `auth.expo.io` (for Expo auth proxy)

### Step 4: Update Client ID in Code (if needed)

If you created platform-specific clients, update `components/AuthContext.tsx`:

```typescript
// Replace this line (around line 99):
const clientId = '343269736783.apps.googleusercontent.com';

// With your actual OAuth Client ID:
const clientId = 'YOUR-ACTUAL-CLIENT-ID.apps.googleusercontent.com';
```

## 📱 Testing

1. **Test on Android:**
   ```bash
   npx expo start --android
   ```

2. **Test on iOS:**
   ```bash
   npx expo start --ios
   ```

3. **Test on Web (should already work):**
   ```bash
   npx expo start --web
   ```

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"
- **Cause**: The redirect URI in Google Cloud Console doesn't match Expo's proxy URL
- **Solution**: Add `https://auth.expo.io/@your-username/your-app-slug` to authorized redirect URIs

### Error: "Invalid client ID"
- **Cause**: The client ID format is incorrect
- **Solution**: Make sure the client ID is in the format: `xxxxx.apps.googleusercontent.com`

### Error: "OAuth consent screen not configured"
- **Cause**: Google OAuth consent screen needs to be configured
- **Solution**: 
  1. Go to Google Cloud Console
  2. Navigate to **APIs & Services** → **OAuth consent screen**
  3. Configure the consent screen (User Type, App name, etc.)

### Google Sign-In opens but closes immediately
- **Cause**: The redirect URI might not be properly configured
- **Solution**: 
  - Check the console logs for the actual redirect URI being used
  - Make sure it's added to Google Cloud Console authorized redirect URIs

## 📝 Notes

- The Expo auth proxy (`auth.expo.io`) is used in development
- For production builds, you may need to configure custom redirect URIs
- The web client ID works with Expo's proxy, but platform-specific IDs are recommended for production

## 🚀 Next Steps

After configuration:
1. Test Google Sign-In on Android device/emulator
2. Test Google Sign-In on iOS device/simulator
3. Build production versions and test again
4. Update authorized domains in Firebase if needed for production

