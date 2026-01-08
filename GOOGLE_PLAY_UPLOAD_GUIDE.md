# Google Play Store Upload Guide - Step by Step

This guide will walk you through uploading your Android app to Google Play Store.

## Prerequisites ✅

- ✅ Google Play Developer Account (Client has this)
- ✅ EAS CLI installed
- ✅ Expo account logged in
- ✅ App configured in `app.json`

---

## Step 1: Login to EAS (If Not Already)

```bash
eas login
```

If you don't have an Expo account, create one at [expo.dev](https://expo.dev) (it's free).

---

## Step 2: Create App in Google Play Console

**Your client needs to do this (or give you access):**

1. Go to [Google Play Console](https://play.google.com/console)
2. Click **"Create app"** button
3. Fill in the form:
   - **App name**: `UNJSPF Pension App`
   - **Default language**: English (United States)
   - **App or game**: App
   - **Free or paid**: Free
   - Check the declarations (Privacy Policy, etc.)
4. Click **"Create app"**

**Important Notes:**
- The package name will be set when you upload the first build
- You'll need to complete the store listing later (screenshots, description, etc.)

---

## Step 3: Build the Android App Bundle (AAB)

Build the production version of your app:

```bash
eas build --platform android --profile production
```

**What happens:**
- EAS will ask you a few questions (first time only)
- Build will run on EAS servers (takes 15-20 minutes)
- You'll get a download link when it's done

**First time setup:**
- EAS will automatically create a keystore for signing your app
- Save the keystore credentials (EAS will store them securely)

**Monitor the build:**
- You can watch progress in the terminal
- Or visit [expo.dev/builds](https://expo.dev/builds) to see all builds

---

## Step 4: Download the AAB File

Once the build completes:

1. The terminal will show a download link, OR
2. Go to [expo.dev/builds](https://expo.dev/builds)
3. Find your Android production build
4. Click **"Download"** to get the `.aab` file

**File will be named something like:**
```
build-xxxxx.aab
```

---

## Step 5: Upload to Google Play Console

### Option A: Upload via Google Play Console Website (Recommended for First Upload)

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app (UNJSPF Pension App)
3. In the left sidebar, go to **"Production"** (or "Internal testing" for testing first)
4. Click **"Create new release"**
5. Under **"App bundles and APKs"**, click **"Upload"**
6. Select the `.aab` file you downloaded
7. Wait for Google to process the upload (may take a few minutes)
8. Fill in **"Release name"**: `1.0.0 (1)` or `Version 1.0.0`
9. Add **"Release notes"** (what's new in this version)
10. Click **"Save"**

### Option B: Upload via EAS Submit (Automated)

**First, you need a Service Account JSON key:**

1. In Google Play Console, go to **"Setup" → "API access"**
2. Click **"Create new service account"**
3. Follow the Google Cloud Platform link
4. Create a service account and download the JSON key
5. Grant the service account access in Play Console

**Then submit:**

```bash
eas submit --platform android
```

EAS will prompt you for the service account JSON file path.

---

## Step 6: Complete Store Listing (Required Before Publishing)

Before you can publish, you need to complete:

1. **App Content**:
   - Go to **"Policy" → "App content"**
   - Fill out Privacy Policy URL
   - Complete content rating questionnaire

2. **Store Listing**:
   - Go to **"Store presence" → "Main store listing"**
   - Add:
     - Short description (80 chars max)
     - Full description (4000 chars max)
     - App icon (512x512 PNG)
     - Feature graphic (1024x500 PNG)
     - Screenshots (at least 2, up to 8)
     - Phone screenshots: 16:9 or 9:16 ratio

3. **App Access**:
   - Set the package name (should match: `com.oneretire.app`)

4. **Content Rating**:
   - Complete the questionnaire
   - Get your rating (usually "Everyone" for most apps)

---

## Step 7: Submit for Review

Once you've:
- ✅ Uploaded the AAB file
- ✅ Completed store listing
- ✅ Completed app content requirements
- ✅ Set up pricing (Free)

1. Go to **"Production"** (or your testing track)
2. Review your release
3. Click **"Review release"**
4. Review all sections (they should all be green/complete)
5. Click **"Start rollout to Production"** (or appropriate track)

**Review Process:**
- Google reviews usually take 1-7 days
- You'll get an email when it's approved or if there are issues

---

## Quick Checklist

- [ ] EAS CLI installed and logged in
- [ ] App created in Google Play Console
- [ ] Build completed: `eas build --platform android --profile production`
- [ ] AAB file downloaded
- [ ] AAB uploaded to Google Play Console
- [ ] Store listing completed (description, screenshots, icon)
- [ ] Privacy Policy URL added
- [ ] Content rating completed
- [ ] Release submitted for review

---

## Troubleshooting

### Build Fails
- Check the build logs at [expo.dev/builds](https://expo.dev/builds)
- Common issues: missing dependencies, configuration errors

### Upload Fails
- Make sure package name matches: `com.oneretire.app`
- Check that version code is incremented for new uploads
- Ensure you have proper permissions in Google Play Console

### Review Rejected
- Check the rejection email for specific reasons
- Common issues: Missing privacy policy, incomplete store listing, policy violations

---

## Need Help?

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Google Play Console Help: https://support.google.com/googleplay/android-developer
- EAS Support: [expo.dev/accounts](https://expo.dev/accounts) → Support


