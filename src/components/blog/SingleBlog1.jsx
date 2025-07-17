import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';

const SingleBlog1 = ({ blog }) => {
    const { id, thumb, date, animationDelay, author, title, category, btnText } = blog;

    const slug = slugify(title, { lower: true });

    return (
        <div className="col-xl-3 col-md-6 mb-30 wow fadeInUp" data-wow-delay={animationDelay}>
            <div className="blog-style-one">
                <div className="thumb">
                    <Link href={`/blog/${slug}/${id}`}>
                        <Image src={thumb} alt={title} width={800} height={600} />
                    </Link>
                </div>
                <div className="info">
                    <div className="blog-meta">
                        <ul>
                            <li>
                                <Link href="#" scroll={false}>{category}</Link>
                            </li>
                            <li>{date}</li>
                        </ul>
                    </div>
                    <h4>
                        <Link href={`/blog/${slug}/${id}`}>{title}</Link>
                    </h4>
                    <Link href={`/blog/${slug}/${id}`} className="btn-simple">
                        <i className="fas fa-angle-right"></i>{btnText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog1;
