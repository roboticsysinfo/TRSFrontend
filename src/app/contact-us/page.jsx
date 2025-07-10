import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import ContactMap from '@/components/contact/ContactMap';
import ContactUsContent from '@/components/contact/ContactUsContent';
import React from 'react';

export const metadata = {
    title: "Contact Us | True Real Story - Share Your Startup Story",
    description: "Connect with True Real Story to share your startup journey, ask questions. We’re here to support and inspire India’s entrepreneurs.",
    keywords: "contact True Real Story, startup contact India, share startup story, connect with True Real Story, startup support India, entrepreneur help, startup community, list your startup, inspire entrepreneurs"
}

const ContactUs = () => {
    return (
        <>

            <LayoutStyle7 breadCrumb="contact-us" title="Contact Us">
                <ContactUsContent />
            </LayoutStyle7>
            
        </>

    );
};

export default ContactUs;