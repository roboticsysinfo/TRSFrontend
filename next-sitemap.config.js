/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://truerealstory.com',
    generateRobotsTxt: true, // robots.txt bhi banega
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/account/*'], // agar kuch routes exclude karne ho
};
