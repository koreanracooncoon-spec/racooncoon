# =====================================================================
#  images 폴더 그림의 흰 여백을 자동으로 잘라 주는 스크립트
#  - 사용법: 같은 폴더의 "그림여백자르기.bat" 을 더블클릭
#  - 원본은 images\_원본 폴더에 그대로 보관돼요 (몇 번을 돌려도 원본에서 다시 자름)
#  - style_sample 로 시작하는 파일은 건드리지 않아요
# =====================================================================
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class Trimmer {
    // 흰색(또는 투명)이 아닌 픽셀이 있는 영역을 찾음
    public static Rectangle FindBounds(Bitmap bmp, int threshold) {
        Rectangle rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
        BitmapData data = bmp.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        int stride = data.Stride;
        byte[] buf = new byte[stride * bmp.Height];
        Marshal.Copy(data.Scan0, buf, 0, buf.Length);
        bmp.UnlockBits(data);
        int minX = bmp.Width, minY = bmp.Height, maxX = -1, maxY = -1;
        for (int y = 0; y < bmp.Height; y++) {
            int row = y * stride;
            for (int x = 0; x < bmp.Width; x++) {
                int i = row + x * 4;
                byte b = buf[i], g = buf[i + 1], r = buf[i + 2], a = buf[i + 3];
                if (a > 20 && (r < threshold || g < threshold || b < threshold)) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
        if (maxX < 0) return Rectangle.Empty;
        return Rectangle.FromLTRB(minX, minY, maxX + 1, maxY + 1);
    }
}
"@

$imagesDir = Join-Path (Split-Path $PSScriptRoot -Parent) "images"
$backupDir = Join-Path $imagesDir "_원본"
$padding   = 0.06   # 잘라낸 뒤 둘레에 남길 여백 (그림 크기의 6%)
$threshold = 230    # 이 값보다 어두운 색을 '그림'으로 봄 (0~255)

if (-not (Test-Path $imagesDir)) { Write-Host "images 폴더가 없어요: $imagesDir"; exit 1 }
New-Item -ItemType Directory -Force $backupDir | Out-Null

$files = Get-ChildItem $imagesDir -Filter *.png | Where-Object { $_.Name -notlike "style_sample*" }
if ($files.Count -eq 0) { Write-Host "자를 png 그림이 없어요."; exit 0 }

foreach ($f in $files) {
    $backup = Join-Path $backupDir $f.Name
    $marker = "$backup.done"   # 마지막으로 잘라 낸 결과의 지문(해시)을 적어 두는 파일
    $hash = (Get-FileHash $f.FullName -Algorithm SHA256).Hash
    # 지금 파일이 예전에 이 스크립트가 잘라 낸 결과와 같으면 → 보관된 원본에서 다시 자름
    # 다르면 → 새로 그린(또는 바꾼) 그림이니 원본으로 보관
    $isOurOutput = (Test-Path $backup) -and (Test-Path $marker) -and ((Get-Content $marker -Raw).Trim() -eq $hash)
    if (-not $isOurOutput) { Copy-Item $f.FullName $backup -Force }

    $src = New-Object System.Drawing.Bitmap $backup
    $w0 = $src.Width; $h0 = $src.Height
    try {
        $box = [Trimmer]::FindBounds($src, $threshold)
        if ($box.IsEmpty) { Write-Host "  건너뜀 (빈 그림): $($f.Name)"; continue }

        # 정사각형 캔버스 가운데에 그림을 놓음
        $side = [int]([Math]::Max($box.Width, $box.Height) * (1 + 2 * $padding))
        $out = New-Object System.Drawing.Bitmap $side, $side
        $g = [System.Drawing.Graphics]::FromImage($out)
        $g.Clear([System.Drawing.Color]::White)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $dx = [int](($side - $box.Width) / 2)
        $dy = [int](($side - $box.Height) / 2)
        $dest = New-Object System.Drawing.Rectangle $dx, $dy, $box.Width, $box.Height
        $g.DrawImage($src, $dest, $box, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        $out.Save($f.FullName, [System.Drawing.Imaging.ImageFormat]::Png)
        $out.Dispose()
        (Get-FileHash $f.FullName -Algorithm SHA256).Hash | Set-Content $marker
        Write-Host ("  완료: {0}  ({1}x{2} → {3}x{3})" -f $f.Name, $w0, $h0, $side)
    } finally {
        $src.Dispose()
    }
}
Write-Host ""
Write-Host "끝! 원본은 images\_원본 폴더에 있어요."
