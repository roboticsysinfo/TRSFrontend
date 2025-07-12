import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://truerealstory.com';
  const blogsRes = await fetch('https://api.truerealstory.com/api/get-all-blogs');
  const blogsJson = await blogsRes.json();
  const blogs = Array.isArray(blogsJson?.data) ? blogsJson.data : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  blogs.forEach((blog) => {
    const slug = slugify(blog.title || '', { lower: true, strict: true });
    xml += `
  <url>
    <loc>${baseUrl}/blog/${slug}/${blog._id}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
