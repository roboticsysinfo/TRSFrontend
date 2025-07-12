import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://truerealstory.com';
  const res = await fetch('https://api.truerealstory.com/api/startup-stories');
  const json = await res.json();
  
  // ✅ Correctly extract stories array
  const startupStories = Array.isArray(json?.data?.stories) ? json.data.stories : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  startupStories.forEach((ss) => {
    const slug = slugify(ss.title || '', { lower: true, strict: true });
    xml += `
  <url>
    <loc>${baseUrl}/story/${slug}/${ss._id}</loc>
    <lastmod>${new Date(ss.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
