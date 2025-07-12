import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://truerealstory.com';
  const res = await fetch('https://api.truerealstory.com/api/companies');
  const json = await res.json();
  const companies = Array.isArray(json?.data) ? json.data : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  companies.forEach((company) => {
    const slug = slugify(company.name || '', { lower: true, strict: true });
    xml += `
  <url>
    <loc>${baseUrl}/company/${slug}/${company._id}</loc>
    <lastmod>${new Date(company.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
