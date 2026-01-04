# Deployment Checklist - Quick Reference

Use this checklist to ensure all steps are completed before and during deployment.

## Pre-Deployment Checklist

### Configuration
- [ ] Verify `app.json` has correct bundle identifiers
  - iOS: `com.unjspf.pensionapp`
  - Android: `com.unjspf.pensionapp`
- [ ] Version numbers are correct
  - Version: `1.0.0`
  - iOS buildNumber: `1`
  - Android versionCode: `1`
- [ ] App name is correct: "UNJSPF Pension App"
- [ ] App icon exists at `./assets/images/icon.png` (1024x1024)

### Accounts Setup
- [ ] Apple Developer Account created ($99/year)
- [ ] Google Play Developer Account created ($25 one-time)
- [ ] Expo account created and logged in
- [ ] EAS CLI installed: `npm install -g eas-cli`
- [ ] Logged into EAS: `eas login`

### Apple Developer Setup
- [ ] Bundle ID registered: `com.unjspf.pensionapp`
- [ ] App created in App Store Connect
- [ ] App information filled in App Store Connect
- [ ] Privacy Policy URL prepared and accessible

### Google Play Setup
- [ ] App created in Google Play Console
- [ ] Package name set: `com.unjspf.pensionapp`
- [ ] Privacy Policy URL prepared and accessible
- [ ] Content rating questionnaire completed

### Assets Prepared
- [ ] iOS Screenshots (6.5" iPhone: 1284 x 2778px)
- [ ] iOS Screenshots (5.5" iPhone: 1242 x 2208px)
- [ ] Android Screenshots (Phone: at least 2 screenshots)
- [ ] App description written
- [ ] App icon for store listing (512x512 for Android)
- [ ] Feature graphic for Android (1024 x 500px)

## Build Process

### iOS Build
- [ ] Run: `eas build --platform ios --profile production`
- [ ] Build completes successfully
- [ ] Download and test build (optional)

### Android Build
- [ ] Run: `eas build --platform android --profile production`
- [ ] Build completes successfully
- [ ] Download and test build (optional)

## Submission Process

### App Store Connect (iOS)
- [ ] All required screenshots uploaded
- [ ] App description added
- [ ] Keywords added
- [ ] Support URL added
- [ ] Privacy Policy URL added
- [ ] Contact information provided
- [ ] Demo account provided (if required)
- [ ] Version information completed
- [ ] Run: `eas submit --platform ios`
- [ ] Submission successful
- [ ] App submitted for review

### Google Play Console (Android)
- [ ] Store listing completed
- [ ] Screenshots uploaded
- [ ] App description added
- [ ] Privacy Policy URL added
- [ ] Contact details added
- [ ] Content rating obtained
- [ ] Data safety section completed
- [ ] Run: `eas submit --platform android`
- [ ] Submission successful
- [ ] App submitted for review

## Post-Submission

- [ ] Monitor App Store Connect for review status
- [ ] Monitor Google Play Console for review status
- [ ] Respond to any review feedback
- [ ] App approved and published
- [ ] Share app store links with client
- [ ] Monitor user reviews and feedback

## For Future Updates

- [ ] Update version in `app.json`
- [ ] Increment buildNumber (iOS) and versionCode (Android)
- [ ] Test changes thoroughly
- [ ] Build new version: `eas build --platform all --profile production`
- [ ] Submit update: `eas submit --platform all`
- [ ] Update "What's New" descriptions

---

**Quick Commands**:
```bash
# Build both platforms
eas build --platform all --profile production

# Submit both platforms
eas submit --platform all

# Check build status
eas build:list

# View credentials
eas credentials
```

