# Developer Deployment Guide - UNJSPF Pension App

This guide provides step-by-step instructions for deploying the UNJSPF Pension App to the App Store (iOS) and Google Play Store (Android).

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Expo CLI** - Already installed via dependencies
3. **EAS CLI** - Install globally: `npm install -g eas-cli`
4. **Apple Developer Account** ($99/year) - Required for iOS deployment
5. **Google Play Developer Account** ($25 one-time) - Required for Android deployment
6. **Expo Account** - Free account works, create at [expo.dev](https://expo.dev)

---

## Step 1: Install Dependencies and Setup

### 1.1 Install EAS CLI globally
```bash
npm install -g eas-cli
```

### 1.2 Login to Expo
```bash
eas login
```
Enter your Expo account credentials (create one at expo.dev if needed).

### 1.3 Verify EAS Project
The project is already linked to EAS (project ID: `c3d10625-1b38-4c6e-8d61-f437296007aa`).

Verify connection:
```bash
eas whoami
```

---

## Step 2: Configure App Information

### 2.1 Review `app.json`
Key configurations to verify:
- **App Name**: "UNJSPF Pension App"
- **Bundle Identifier (iOS)**: `com.unjspf.pensionapp`
- **Package Name (Android)**: `com.unjspf.pensionapp`
- **Version**: `1.0.0`
- **Version Code (Android)**: `1`
- **Build Number (iOS)**: `1`

**⚠️ IMPORTANT**: 
- Bundle identifiers must be unique and registered in App Store Connect and Google Play Console
- These identifiers are already set in `app.json`
- If your client wants different identifiers, update them before building

### 2.2 Update Version Numbers
For each new release:
- **Version** (e.g., `1.0.0` → `1.0.1`): Update in `app.json` → `version`
- **Version Code** (Android): Increment in `app.json` → `android.versionCode`
- **Build Number** (iOS): Increment in `app.json` → `ios.buildNumber`

---

## Step 3: Prepare App Icons and Assets

### 3.1 Verify App Icon
Ensure `./assets/images/icon.png` exists and is:
- **1024x1024 pixels** for iOS
- **1024x1024 pixels** for Android
- Square, no transparency, PNG format

### 3.2 Check Other Assets
- Favicon: `./assets/images/favicon.png`
- Logo: `./assets/images/logo.png`

---

## Step 4: Build for iOS (App Store)

### 4.1 Configure Apple Developer Account

1. **Register Bundle Identifier**:
   - Go to [Apple Developer Portal](https://developer.apple.com/account)
   - Navigate to "Certificates, Identifiers & Profiles"
   - Click "Identifiers" → "+" → "App IDs"
   - Register: `com.unjspf.pensionapp`
   - Enable required capabilities (Push Notifications, Sign in with Apple, etc. if needed)

2. **Create App in App Store Connect**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Click "My Apps" → "+" → "New App"
   - Fill in:
     - Platform: iOS
     - Name: UNJSPF Pension App
     - Primary Language: English
     - Bundle ID: `com.unjspf.pensionapp` (select the one you registered)
     - SKU: `unjspf-pension-app-001` (unique identifier)
     - User Access: Full Access

### 4.2 Build iOS App

```bash
eas build --platform ios --profile production
```

**What happens**:
- EAS will prompt you to configure credentials (first time only)
- Choose "Set up credentials now"
- EAS will automatically create certificates and provisioning profiles
- Build will be queued on EAS servers (takes ~15-30 minutes)

### 4.3 Submit to App Store

After the build completes:

```bash
eas submit --platform ios
```

**Requirements before submission**:
- App Store Connect app must be created (Step 4.1)
- Build must be completed successfully
- You may need to provide Apple ID and app-specific password

**Alternative Manual Submission**:
1. Download the `.ipa` file from EAS dashboard
2. Use Transporter app or Xcode to upload to App Store Connect

---

## Step 5: Build for Android (Google Play Store)

### 5.1 Create App in Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in:
   - App name: UNJSPF Pension App
   - Default language: English
   - App or game: App
   - Free or paid: Free (or Paid, as per client requirement)
   - Declarations: Check all that apply (Privacy Policy, Content Rating, etc.)

4. **Register Package Name**:
   - In App Content → App access, set Package name: `com.unjspf.pensionapp`
   - This must match exactly with `app.json`

### 5.2 Create Upload Key (First Time Only)

EAS can manage this automatically, but if you need manual control:

```bash
eas credentials
```

Select Android → production → Set up keystore credentials

### 5.3 Build Android App

```bash
eas build --platform android --profile production
```

**What happens**:
- EAS creates an AAB (Android App Bundle) file
- Build takes ~15-20 minutes
- Keystore is managed automatically by EAS

### 5.4 Submit to Google Play Store

After the build completes:

```bash
eas submit --platform android
```

**Requirements**:
- Google Play Console app must be created
- Service account JSON key (EAS can guide you through this)
- Build must be completed successfully

**Alternative Manual Submission**:
1. Download the `.aab` file from EAS dashboard
2. Go to Google Play Console → Your app → Production → Create new release
3. Upload the `.aab` file

---

## Step 6: Configure App Store Listings

### 6.1 App Store Connect (iOS)

In App Store Connect, complete:

1. **App Information**:
   - Category: Finance (or appropriate category)
   - Subcategory: as applicable

2. **Pricing and Availability**:
   - Price: Free (or set price)
   - Availability: Select countries

3. **Prepare for Submission**:
   - **Screenshots**: Upload required screenshots
     - 6.5" iPhone: 1284 x 2778 pixels (required)
     - 5.5" iPhone: 1242 x 2208 pixels (required)
     - iPad Pro: 2048 x 2732 pixels (optional but recommended)
   - **App Preview Video**: Optional but recommended
   - **Description**: Write app description
   - **Keywords**: Add relevant keywords (100 characters max)
   - **Support URL**: Provide support website URL
   - **Marketing URL**: Optional
   - **Privacy Policy URL**: Required (must be accessible)

4. **App Review Information**:
   - Contact information
   - Demo account (if required)
   - Notes for reviewer

5. **Version Information**:
   - What's New: First version description
   - Promotional Text: Optional

### 6.2 Google Play Console (Android)

In Google Play Console, complete:

1. **Store listing**:
   - App name: UNJSPF Pension App
   - Short description: 80 characters max
   - Full description: 4000 characters max
   - **Graphic assets**:
     - App icon: 512 x 512 pixels (PNG, no transparency)
     - Feature graphic: 1024 x 500 pixels
     - Screenshots: 
       - Phone: At least 2 screenshots (16:9 or 9:16)
       - Tablet: Optional but recommended
     - Promotional video: Optional
   - **Categorization**:
     - App category: Finance
     - Tags: Add relevant tags
   - **Contact details**:
     - Email address
     - Phone number (optional)
     - Website: Required
   - **Privacy Policy**: URL required (must be accessible)

2. **Content rating**:
   - Complete questionnaire
   - Get rating certificate

3. **Target audience**:
   - Set target age group
   - Content guidelines compliance

4. **Data safety**:
   - Declare data collection and usage
   - Explain data handling practices

---

## Step 7: Testing Before Release

### 7.1 Internal Testing (Recommended)

Before public release, test the production builds:

**iOS - TestFlight**:
```bash
eas build --platform ios --profile preview
```
- Distribute via TestFlight for internal testing
- Add testers in App Store Connect

**Android - Internal Testing Track**:
```bash
eas build --platform android --profile preview
```
- Upload to Google Play Console → Internal testing track
- Share download link with testers

### 7.2 Verify Production Build Locally

Download and test the production build:
```bash
eas build:list
# Download using the build ID from the list
```

---

## Step 8: Release Management

### 8.1 Update App Versions

For each new release:

1. Update `app.json`:
   ```json
   {
     "expo": {
       "version": "1.0.1",  // Semantic version
       "ios": {
         "buildNumber": "2"  // Increment for each build
       },
       "android": {
         "versionCode": 2  // Increment for each build
       }
     }
   }
   ```

2. Commit changes:
   ```bash
   git add app.json
   git commit -m "Bump version to 1.0.1"
   git push
   ```

3. Build and submit:
   ```bash
   eas build --platform all --profile production
   eas submit --platform all
   ```

### 8.2 Automated Builds with GitHub Actions (Optional)

Create `.github/workflows/build.yml` for CI/CD automation.

---

## Step 9: Post-Deployment

### 9.1 Monitor App Performance

- **App Store Connect**: Monitor downloads, ratings, reviews
- **Google Play Console**: Track installs, crashes, user feedback
- **Firebase Analytics**: Already configured in the app

### 9.2 Respond to Reviews

Regularly check and respond to user reviews on both platforms.

### 9.3 Update App Regularly

Plan for regular updates:
- Bug fixes
- New features
- OS compatibility updates

---

## Troubleshooting

### Common Issues

1. **Build Fails - Credentials Error**:
   ```bash
   eas credentials
   ```
   Reconfigure credentials as needed.

2. **Build Fails - Bundle Identifier Not Registered**:
   - Ensure bundle ID is registered in Apple Developer Portal (iOS)
   - Ensure package name matches exactly in Google Play Console (Android)

3. **Submission Fails - Missing Metadata**:
   - Check App Store Connect/Google Play Console for incomplete sections
   - Ensure privacy policy URL is accessible

4. **App Rejected**:
   - Review rejection reason in App Store Connect/Google Play Console
   - Fix issues and resubmit

### EAS CLI Commands Reference

```bash
# Check login status
eas whoami

# View builds
eas build:list

# View build details
eas build:view [BUILD_ID]

# Cancel a build
eas build:cancel [BUILD_ID]

# View credentials
eas credentials

# View submissions
eas submit:list

# Update EAS CLI
npm install -g eas-cli@latest
```

---

## Environment Variables (if needed)

If you need to use environment variables in builds:

1. Create `.env.production`:
   ```
   API_URL=https://api.example.com
   FIREBASE_API_KEY=your-key
   ```

2. Update `eas.json`:
   ```json
   {
     "build": {
       "production": {
         "env": {
           "API_URL": "https://api.example.com"
         }
       }
     }
   }
   ```

---

## Cost Estimate

- **Apple Developer Account**: $99/year (required)
- **Google Play Developer Account**: $25 one-time (required)
- **Expo EAS**: Free tier includes some builds/month
  - EAS Build: Free for limited builds, then paid per build
  - EAS Submit: Free for limited submissions, then paid per submission
  - Check current pricing: [expo.dev/pricing](https://expo.dev/pricing)

---

## Timeline Estimate

- **Initial Setup**: 2-4 hours
- **Build Process**: 15-30 minutes per platform
- **App Review (iOS)**: 1-3 days (typically 24-48 hours)
- **App Review (Android)**: Few hours to 1 day
- **Total Time to Live**: 2-5 days from submission

---

## Support Resources

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
- **EAS Build Guide**: [docs.expo.dev/build/introduction](https://docs.expo.dev/build/introduction)
- **App Store Connect Help**: [help.apple.com/app-store-connect](https://help.apple.com/app-store-connect)
- **Google Play Console Help**: [support.google.com/googleplay/android-developer](https://support.google.com/googleplay/android-developer)

---

## Next Steps

1. ✅ Review and update `app.json` if needed
2. ✅ Set up Apple Developer and Google Play Developer accounts
3. ✅ Run `eas build --platform all --profile production`
4. ✅ Complete app store listings
5. ✅ Submit for review
6. ✅ Monitor and respond to reviews

---

**Last Updated**: 2024
**Project ID**: c3d10625-1b38-4c6e-8d61-f437296007aa

