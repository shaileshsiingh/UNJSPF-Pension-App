# PowerShell script to get SHA-1 fingerprint for Android debug keystore

Write-Host "🔍 Looking for Android debug keystore..." -ForegroundColor Cyan

$keystorePath = "$env:USERPROFILE\.android\debug.keystore"

if (-not (Test-Path $keystorePath)) {
    Write-Host "❌ Debug keystore not found at: $keystorePath" -ForegroundColor Red
    Write-Host ""
    Write-Host "This means you haven't built an Android app yet on this machine." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To generate the keystore, run:" -ForegroundColor Yellow
    Write-Host "  npx expo run:android" -ForegroundColor Green
    Write-Host ""
    exit 1
}

Write-Host "✅ Found keystore at: $keystorePath" -ForegroundColor Green
Write-Host ""

# Try to find keytool in common Java locations
$possibleJavaPaths = @(
    "$env:JAVA_HOME\bin\keytool.exe",
    "C:\Program Files\Java\*\bin\keytool.exe",
    "C:\Program Files (x86)\Java\*\bin\keytool.exe",
    "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe",
    "C:\Program Files\Android\Android Studio\jre\bin\keytool.exe"
)

$keytoolPath = $null

foreach ($path in $possibleJavaPaths) {
    $resolved = Resolve-Path $path -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($resolved) {
        $keytoolPath = $resolved.Path
        break
    }
}

if (-not $keytoolPath) {
    Write-Host "❌ keytool not found. Please install Java JDK or Android Studio." -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Use Android Studio to get SHA-1:" -ForegroundColor Yellow
    Write-Host "1. Open Android Studio" -ForegroundColor White
    Write-Host "2. Open your project" -ForegroundColor White
    Write-Host "3. Click Gradle tab (right side)" -ForegroundColor White
    Write-Host "4. Navigate to: app → Tasks → android → signingReport" -ForegroundColor White
    Write-Host "5. Double-click it and copy the SHA1 value" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✅ Found keytool at: $keytoolPath" -ForegroundColor Green
Write-Host ""
Write-Host "🔑 Extracting SHA-1 fingerprint..." -ForegroundColor Cyan
Write-Host ""

# Run keytool and extract SHA-1
$output = & $keytoolPath -list -v -keystore $keystorePath -alias androiddebugkey -storepass android -keypass android 2>&1

# Extract SHA-1 line
$sha1Line = $output | Select-String "SHA1:" | Select-Object -First 1

if ($sha1Line) {
    $sha1 = $sha1Line.ToString().Split(":")[1].Trim()
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "✅ SHA-1 FINGERPRINT:" -ForegroundColor Green
    Write-Host ""
    Write-Host "  $sha1" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Copy the SHA-1 above (the yellow text)" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Go to Firebase Console:" -ForegroundColor White
    Write-Host "   https://console.firebase.google.com/" -ForegroundColor Blue
    Write-Host ""
    Write-Host "3. Select project: unspension" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Click ⚙️ → Project settings" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Find your Android app: com.oneretire.app" -ForegroundColor White
    Write-Host ""
    Write-Host "6. Scroll to 'SHA certificate fingerprints'" -ForegroundColor White
    Write-Host ""
    Write-Host "7. Click 'Add fingerprint' and paste the SHA-1" -ForegroundColor White
    Write-Host ""
    Write-Host "8. Click 'Save'" -ForegroundColor White
    Write-Host ""
    Write-Host "9. Download the updated google-services.json and replace the old one" -ForegroundColor White
    Write-Host ""
    Write-Host "10. Rebuild: npx expo prebuild --clean && npx expo run:android" -ForegroundColor White
    Write-Host ""
    
    # Copy to clipboard if possible
    try {
        $sha1 | Set-Clipboard
        Write-Host "✅ SHA-1 copied to clipboard!" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "ℹ️  Could not copy to clipboard automatically. Please copy manually." -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "❌ Could not extract SHA-1 from keystore" -ForegroundColor Red
    Write-Host ""
    Write-Host "Full output:" -ForegroundColor Yellow
    Write-Host $output
}
