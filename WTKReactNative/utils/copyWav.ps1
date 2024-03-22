# Edit these two variables for a new destination/source folder
$sourceFolder = "C:\Users\Admin\Desktop\Notes for WtK\lowE"
$destinationFolder = "C:\Users\Admin\Desktop\Making It\What-The Key\WTKReactNative\assets\sounds\lowE"

# Ensure the destination folder exists
if (-not (Test-Path -Path $destinationFolder)) {
    New-Item -ItemType Directory -Path $destinationFolder
}

# Copy all .wav files from the source to the destination
Get-ChildItem -Path $sourceFolder -Filter "*.wav" | ForEach-Object {
    $destFilePath = Join-Path -Path $destinationFolder -ChildPath $_.Name
    Copy-Item -Path $_.FullName -Destination $destFilePath
    Write-Host "Copied: $($_.Name)"
}
