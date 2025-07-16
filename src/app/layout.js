// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-modal-video/css/modal-video.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-rangeslider/lib/index.css';

import '@/assets/css/animate.css';
import '@/assets/css/font-awesome.min.css';
import '@/assets/css/flaticon-set.css';
import '@/assets/css/nice-select.css';
import '@/assets/css/validnavs.css';
import '@/assets/css/helper.css';
import '@/assets/css/unit-test.css';
import '@/assets/css/style.css';

import Dependency from '@/components/utilities/Dependency';
import { ToastContainer } from 'react-toastify';
import { Manrope, Outfit } from 'next/font/google';
import ReduxProvider from '@/redux/ReduxProvider';

const manrope = Manrope({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'True Real Story | India’s Top Real Startup Stories Platform',
  description:
    "India’s most inspiring real startup stories, founder journeys, and business successes. True Real Story empowers and connects entrepreneurs across India.",
  keywords:
    "startup stories, India startup stories, entrepreneur journeys, founder success stories, startup case studies, inspirational business stories, True Real Story, startup ecosystem India, business success India, startup founders ",
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "True Real Story",
  "url": "https://truerealstory.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://truerealstory.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "True Real Story",
    "logo": {
      "@type": "ImageObject",
      "url": "https://truerealstory.com/logo.png" // 🔁 Replace with actual logo URL
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9556130869557106"
          crossorigin="anonymous"></script>

        <link
          rel="canonical"
          href="https://truerealstory.com"
        />
      </head>

      <body className={`${outfit.className} ${manrope.className}`}>
        <ReduxProvider>
          <ToastContainer />
          <Dependency />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
