import React from 'react';

const ContactInfo = () => {
    return (
        <>
            <div className="contact-style-one-info">
                <h2>Contact Information</h2>
                <p>
                    At True Real Story, we’re always excited to hear from you! Whether you have an inspiring startup story to share, a question about listing your company, general feedback — our team is here to help.
                </p>
                <ul>
                    {/* <li className="wow fadeInUp">
                        <div className="icon">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className="content">
                            <h5 className="title">Hotline</h5>
                            <a href="">+4733378901</a>
                        </div>
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="300ms">
                        <div className="icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="info">
                            <h5 className="title">Our Location</h5>
                            <p>
                                55 Main Street, The Grand Avenue 2nd Block, <br /> New York City
                            </p>
                        </div>
                    </li> */}
                    <li className="wow fadeInUp" data-wow-delay="500ms">
                        <div className="icon">
                            <i className="fas fa-envelope-open-text"></i>
                        </div>
                        <div className="info">
                            <h5 className="title">Official Email</h5>
                            <a href="mailto:truerealstory11@gmail.com">truerealstory11@gmail.com</a>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContactInfo;