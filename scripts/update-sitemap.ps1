param()
<#
Simple sitemap generator.
Set `$BaseUrl` to your website root (include trailing slash).
#>
$BaseUrl = 'https://example.com/'
$htmlFiles = Get-ChildItem -Path .. -Filter *.html -Recurse | Where-Object { $_.FullName -notmatch "\\.git" } | ForEach-Object { $_.FullName }

[xml]$sitemap = "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'></urlset>"

foreach($file in $htmlFiles){
    $rel = (Resolve-Path $file).Path.Replace((Get-Location).Path + '\\', '').Replace('\\','/')
    $url = $BaseUrl.TrimEnd('/') + '/' + $rel
    $u = $sitemap.CreateElement('url')
    $loc = $sitemap.CreateElement('loc')
    $loc.InnerText = $url
    $lastmod = $sitemap.CreateElement('lastmod')
    $lastmod.InnerText = (Get-Item $file).LastWriteTime.ToString('yyyy-MM-dd')
    $u.AppendChild($loc) | Out-Null
    $u.AppendChild($lastmod) | Out-Null
    $sitemap.urlset.AppendChild($u) | Out-Null
}

$sitemap.Save((Join-Path (Get-Location) '..\sitemap.xml'))
Write-Host "Sitemap generado en ../sitemap.xml";
