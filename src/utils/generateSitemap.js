
export const generateSitemap = () => {
  const baseUrl = 'https://webfokus.ba';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    {
      url: '/',
      priority: '1.0',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/#services',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/#portfolio',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/#pricing',
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/#contact',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: currentDate
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="bs" href="${baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}"/>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Function to download sitemap (for development)
export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};