# Quick Start - Deploy to App Stores

This is a condensed version of the deployment process. For detailed instructions, see `DEVELOPER_DEPLOYMENT_GUIDE.md`.

## Prerequisites Setup (One-Time)

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Verify connection**:
   ```bash
   eas whoami
   ```

## Step-by-Step Deployment

### Step 1: Configure App Stores

**Apple App Store**:
1. Go to [developer.apple.com](https://developer.apple.com) → Register bundle ID: `com.unjspf.pensionapp`
2. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → Create new app
   - Bundle ID: `com.unjspf.pensionapp`
   - App name: UNJSPF Pension App

**Google Play Store**:
1. Go to [play.google.com/console](https://play.google.com/console) → Create app
   - Package name: `com.unjspf.pensionapp`
   - App name: UNJSPF Pension App

### Step 2: Prepare Assets

**Required for both stores**:
- App icon: 1024x1024px (already in project)
- Screenshots (capture from running app)
- Privacy Policy URL (must be accessible)
- App description

**iOS specific**:
- 6.5" iPhone screenshots: 1284 x 2778px
- 5.5" iPhone screenshots: 1242 x 2208px

**Android specific**:
- Phone screenshots: At least 2
- Feature graphic: 1024 x 500px

### Step 3: Build Production Apps

**Build both platforms**:
```bash
eas build --platform all --profile production
```

This will take 15-30 minutes. You'll get a notification when builds complete.

### Step 4: Submit to Stores

**Submit both platforms**:
```bash
eas submit --platform all
```

**OR submit individually**:
```bash
# iOS only
eas submit --platform ios

# Android only
eas submit --platform android
```

### Step 5: Complete Store Listings

**While builds are processing, complete**:

**App Store Connect**:
- Upload screenshots
- Add app description
- Add keywords
- Add support URL
- Add privacy policy URL

**Google Play Console**:
- Complete store listing
- Upload screenshots
- Add app description
- Add privacy policy URL
- Complete content rating

### Step 6: Wait for Review

- **iOS**: Typically 24-48 hours
- **Android**: Few hours to 1 day

Monitor status in App Store Connect and Google Play Console.

## Common Commands

```bash
# Check build status
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Check credentials
eas credentials

# Update app version (before building)
# Edit app.json → version, buildNumber, versionCode

# Build for testing
eas build --platform all --profile preview
```

## Troubleshooting

**Build fails?**
- Check credentials: `eas credentials`
- Verify bundle IDs match exactly in stores and app.json

**Submission fails?**
- Ensure store listings are complete
- Verify privacy policy URL is accessible
- Check all required screenshots are uploaded

**Need help?**
- See `DEVELOPER_DEPLOYMENT_GUIDE.md` for detailed instructions
- Expo docs: [docs.expo.dev](https://docs.expo.dev)

## Next Update

When releasing an update:

1. Update `app.json`:
   - `version`: "1.0.1"
   - `ios.buildNumber`: "2"
   - `android.versionCode`: 2

2. Build and submit:
   ```bash
   eas build --platform all --profile production
   eas submit --platform all
   ```

---

**Estimated Time**: 
- Initial setup: 2-4 hours
- Build process: 30 minutes
- Store listing: 1-2 hours
- Review wait: 1-3 days

