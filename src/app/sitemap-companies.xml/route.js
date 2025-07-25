import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://truerealstory.com';

  const res = await fetch('https://api.truerealstory.com/api/companies?limit=1000', {
    next: { revalidate: 60 },
  });

  const json = await res.json();
  const companies = Array.isArray(json?.data) ? json.data : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  companies.forEach((company) => {
    const name = typeof company.name === 'string' ? company.name : 'company';
    const slug = slugify(name, { lower: true, strict: true });
    const lastmod = company.updatedAt
      ? new Date(company.updatedAt).toISOString()
      : new Date().toISOString();

    xml += `
  <url>
    <loc>${baseUrl}/company/${slug}/${company._id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
