# Troubleshooting: QR Code Not Working

## Quick Checks:

### 1. **Check Network Connection**
- ✅ Phone and computer must be on the **same Wi-Fi network**
- ✅ Make sure Wi-Fi is enabled on both devices
- ❌ Mobile data won't work - must be Wi-Fi

### 2. **Check Expo Go App**
- ✅ Make sure Expo Go is installed: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- ✅ Make sure Expo Go is up to date
- ✅ Try closing and reopening Expo Go app

### 3. **Check Firewall**
- ✅ Windows Firewall might be blocking the connection
- ✅ Try temporarily disabling firewall to test
- ✅ Or allow Node.js/Expo through firewall

### 4. **Try Tunnel Mode** (If Same Wi-Fi Doesn't Work)
```bash
npx expo start --tunnel
```
This works even if devices aren't on same network.

### 5. **Check Terminal for Errors**
Look for error messages in the terminal where you ran `expo start`

### 6. **Try Manual URL Entry**
Instead of scanning QR code:
1. Copy the URL from terminal (starts with `exp://`)
2. In Expo Go app, tap "Enter URL manually"
3. Paste the URL

### 7. **Clear Cache**
```bash
npx expo start --clear
```

### 8. **Check What Happens After Scanning**
- Does Expo Go show "Connecting..."?
- Does it show an error message?
- Does it just stay on the scanner screen?
- Does it show a blank screen?

## Common Issues:

### Issue: "Unable to connect to Metro bundler"
**Solution:** Make sure `expo start` is still running in terminal

### Issue: "Network request failed"
**Solution:** 
- Check Wi-Fi connection
- Try tunnel mode: `npx expo start --tunnel`
- Check firewall settings

### Issue: App opens but shows blank screen
**Solution:** Check terminal for JavaScript errors - the app might be crashing

### Issue: QR code doesn't scan
**Solution:**
- Make sure QR code is fully visible
- Try increasing screen brightness
- Try manual URL entry instead

