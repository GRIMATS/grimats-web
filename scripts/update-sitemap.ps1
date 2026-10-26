param()
<#
Simple sitemap generator.
Generates extensionless production URLs for GitHub Pages.
#>
$BaseUrl = 'https://grimats.com/'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$htmlFiles = Get-ChildItem -Path $ProjectRoot -Filter *.html -Recurse |
    Where-Object { $_.FullName -notmatch "[\\/]\.git[\\/]" } |
    Where-Object {
        $relativePath = ($_.FullName.Substring($ProjectRoot.Length) -replace '^[\\/]+', '').Replace('\','/')
        if ($relativePath -like 'portales-demos/propuesta-*') {
            return $false
        }

        # Las páginas privadas declaran noindex y nunca deben filtrarse al sitemap.
        $html = Get-Content -LiteralPath $_.FullName -Raw -Encoding UTF8
        $html -notmatch '(?is)<meta\s+[^>]*name\s*=\s*["'']robots["''][^>]*content\s*=\s*["''][^"'']*\bnoindex\b'
    }

[xml]$sitemap = "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'></urlset>"

foreach($file in $htmlFiles){
    $rel = ($file.FullName.Substring($ProjectRoot.Length) -replace '^[\\/]+', '').Replace('\','/')

    if ($rel -eq 'index.html') {
        $rel = ''
    }
    elseif ($rel.EndsWith('/index.html')) {
        $rel = $rel.Substring(0, $rel.Length - 'index.html'.Length)
    }
    else {
        $rel = $rel -replace '[.]html$', ''
    }

    $url = $BaseUrl.TrimEnd('/') + '/' + $rel
    $u = $sitemap.CreateElement('url')
    $loc = $sitemap.CreateElement('loc')
    $loc.InnerText = $url
    $lastmod = $sitemap.CreateElement('lastmod')
    $lastmod.InnerText = $file.LastWriteTime.ToString('yyyy-MM-dd')
    $u.AppendChild($loc) | Out-Null
    $u.AppendChild($lastmod) | Out-Null
    $sitemap.urlset.AppendChild($u) | Out-Null
}

$SitemapPath = Join-Path $ProjectRoot 'sitemap.xml'
$sitemap.Save($SitemapPath)
Write-Host "Sitemap generado en $SitemapPath";
