param()
<#
Simple sitemap generator.
Generates extensionless production URLs for GitHub Pages.
#>
$BaseUrl = 'https://grimats.com/'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$htmlFiles = Get-ChildItem -Path $ProjectRoot -Filter *.html -Recurse |
    Where-Object { $_.FullName -notmatch "[\\/]\.git[\\/]" }

[xml]$sitemap = "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'></urlset>"

foreach($file in $htmlFiles){
    $rel = [System.IO.Path]::GetRelativePath($ProjectRoot, $file.FullName).Replace('\','/')

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
