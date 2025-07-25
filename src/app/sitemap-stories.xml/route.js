import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://truerealstory.com';

  try {
    const res = await fetch('https://api.truerealstory.com/api/stories?limit=1000', {
      next: { revalidate: 60 },
    });

    const json = await res.json();

    const stories = Array.isArray(json?.data?.stories) ? json.data.stories : [];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    stories.forEach((story) => {
      const safeTitle = typeof story.title === 'string' ? story.title : 'untitled';
      const slug = slugify(safeTitle, { lower: true, strict: true });
      const updatedAt = new Date(story.updatedAt || story.createdAt || new Date()).toISOString();

      xml += `
  <url>
    <loc>${baseUrl}/story/${slug}/${story._id}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
