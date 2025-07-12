export async function GET() {
  const baseUrl = 'https://truerealstory.com';
  const staticPages = [
    '',
    '/about-us',
    '/contact-us',
    '/companies',
    '/stories',
    '/account',
    '/terms-and-conditions',
    '/privacy-policy',
    '/startup-stories',
    '/signin',
    '/signup',
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
