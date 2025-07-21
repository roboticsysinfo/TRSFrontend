import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://truerealstory.com';
  const res = await fetch('https://api.truerealstory.com/api/all-interviews');
  const json = await res.json();
  const interviews = Array.isArray(json?.data?.interviews) ? json.data.interviews : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  interviews.forEach((interview) => {
    const slug = slugify(interview.interviewTitle || '', { lower: true, strict: true });
    xml += `
  <url>
    <loc>${baseUrl}/story/${slug}/${interview._id}</loc>
    <lastmod>${new Date(interview.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
