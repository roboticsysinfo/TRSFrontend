import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://truerealstory.com';
  const res = await fetch('https://api.truerealstory.com/api/stories');
  const json = await res.json();
  const stories = Array.isArray(json?.data?.stories) ? json.data.stories : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  stories.forEach((story) => {
    const slug = slugify(story.title || '', { lower: true, strict: true });
    xml += `
  <url>
    <loc>${baseUrl}/story/${slug}/${story._id}</loc>
    <lastmod>${new Date(story.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
