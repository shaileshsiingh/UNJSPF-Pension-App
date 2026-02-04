# Fix Windows Firewall for Metro Bundler

## The Problem
Windows Firewall is blocking port 8081, preventing your phone from connecting to Metro bundler.

## ✅ Solution: Allow Port 8081 in Windows Firewall

### Method 1: Using Windows Firewall GUI (Easiest)

1. **Open Windows Defender Firewall:**
   - Press `Win + R`
   - Type: `wf.msc`
   - Press Enter

2. **Click "Inbound Rules"** in the left panel

3. **Click "New Rule"** in the right panel

4. **Select "Port"** → Click Next

5. **Select "TCP"** and **"Specific local ports"**
   - Enter: `8081`
   - Click Next

6. **Select "Allow the connection"** → Click Next

7. **Check all three boxes:**
   - Domain
   - Private
   - Public
   - Click Next

8. **Name it:** "Expo Metro Bundler" → Click Finish

9. **Repeat for Outbound Rules** (same steps, but select "Outbound Rules")

### Method 2: Using PowerShell (Faster)

Run these commands in PowerShell as Administrator:

```powershell
# Allow inbound on port 8081
New-NetFirewallRule -DisplayName "Expo Metro Bundler Inbound" -Direction Inbound -LocalPort 8081 -Protocol TCP -Action Allow

# Allow outbound on port 8081
New-NetFirewallRule -DisplayName "Expo Metro Bundler Outbound" -Direction Outbound -LocalPort 8081 -Protocol TCP -Action Allow
```

## After Fixing Firewall

1. **Restart Metro bundler:**
   ```bash
   npx expo start --dev-client --lan
   ```

2. **Try connecting again** with: `exp://172.20.10.3:8081`

## Alternative: Use USB Connection (If You Have ADB)

If firewall fix doesn't work, you can use USB:

1. Connect phone via USB
2. Enable USB Debugging on phone
3. Run: `adb reverse tcp:8081 tcp:8081`
4. Use: `exp://127.0.0.1:8081` in the app

But you mentioned you don't have Android SDK, so firewall fix is better.
