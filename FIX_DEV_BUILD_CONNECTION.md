# Fix: "Unable to load script" Error in Development Build

## The Problem
Your development build can't connect to the Metro bundler. This happens when:
- Metro bundler is not running
- Metro bundler is running but not in `--dev-client` mode
- Phone and computer are on different networks
- Firewall is blocking the connection

## ✅ Solution 1: Start Metro with Dev Client Flag (Most Common Fix)

**You MUST use `--dev-client` flag when starting Metro:**

```bash
npx expo start --dev-client
```

Or use the new script:
```bash
npm run dev
```

**Important:** Don't use `npx expo start` alone - it won't work with development builds!

## ✅ Solution 2: Use Tunnel Mode (If on Different Networks)

If your phone and computer are on different Wi-Fi networks:

```bash
npx expo start --dev-client --tunnel
```

Or:
```bash
npm run dev:tunnel
```

This creates a tunnel so your phone can connect even on different networks.

## ✅ Solution 3: USB Connection (If You Have ADB)

If you're using USB connection:

1. **Connect phone via USB**
2. **Enable USB Debugging** on your phone
3. **Run adb reverse:**
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```
4. **Start Metro:**
   ```bash
   npx expo start --dev-client
   ```

## ✅ Solution 4: Check Your Network Connection

1. **Make sure phone and computer are on the same Wi-Fi network** (unless using tunnel)
2. **Check firewall** - Windows Firewall might be blocking port 8081
3. **Try tunnel mode** if network issues persist

## 🔍 Step-by-Step Fix

### Step 1: Stop Any Running Metro Bundler
Press `Ctrl+C` in your terminal to stop any running Metro bundler.

### Step 2: Start Metro with Dev Client
```bash
npx expo start --dev-client
```

You should see:
```
Metro waiting on exp://192.168.x.x:8081
```

### Step 3: Open Development Build App
1. Open the **development build app** on your phone (not Expo Go)
2. It should automatically connect, OR
3. Shake your device and select "Configure Bundler"
4. Enter the URL shown in your terminal (e.g., `exp://192.168.1.100:8081`)

### Step 4: If Still Not Working, Use Tunnel
```bash
npx expo start --dev-client --tunnel
```

This will show a different URL like:
```
Metro waiting on exp://u.expo.dev/...
```

Then scan the QR code or enter this URL in your development build app.

## 🚨 Common Mistakes

❌ **Wrong:** `npx expo start` (without `--dev-client`)
✅ **Correct:** `npx expo start --dev-client`

❌ **Wrong:** Using Expo Go app
✅ **Correct:** Using the development build app you installed

❌ **Wrong:** Different Wi-Fi networks without tunnel
✅ **Correct:** Same network OR use `--tunnel` flag

## 📱 Quick Test

1. Run: `npx expo start --dev-client --tunnel`
2. Open development build app on phone
3. Shake device → "Configure Bundler" → Enter the URL from terminal
4. App should load!

## 🎯 Summary

**The fix is simple:**
1. Always use `--dev-client` flag: `npx expo start --dev-client`
2. If on different networks, add `--tunnel`: `npx expo start --dev-client --tunnel`
3. Make sure you're using the **development build app**, not Expo Go
