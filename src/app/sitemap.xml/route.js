export async function GET() {
    const baseUrl = 'https://truerealstory.com';

    const [blogsRes, storiesRes, companiesRes] = await Promise.all([
        fetch('https://api.truerealstory.com/api/blogs'),
        fetch('https://api.truerealstory.com/api/stories'),
        fetch('https://api.truerealstory.com/api/companies'),
    ]);

    if (!blogsRes.ok || !storiesRes.ok || !companiesRes.ok) {
        return new Response('Error fetching data from backend', { status: 500 });
    }

    const blogs = await blogsRes.json();
    const stories = await storiesRes.json();
    const companies = await companiesRes.json();


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

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static
    staticPages.forEach((page) => {
        xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    blogs.forEach((blog) => {
        xml += `
  <url>
    <loc>${baseUrl}/blog/${blog._id}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    stories.forEach((story) => {
        xml += `
  <url>
    <loc>${baseUrl}/story/${story._id}</loc>
    <lastmod>${new Date(story.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    companies.forEach((company) => {
        xml += `
  <url>
    <loc>${baseUrl}/company/${company._id}</loc>
    <lastmod>${new Date(company.updatedAt).toISOString()}</lastmod>
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
