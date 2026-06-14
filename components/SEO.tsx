import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  const defaultTitle = "HM Robotics | Advanced System Interface";
  const defaultDescription = "HM Robotics provides cutting-edge industrial and medical robotics solutions, powered by scalable and secure tech infrastructure.";
  const siteUrl = "https://hm-robotics.com"; // Change this when the custom domain is available

  return (
    <Helmet>
      {/* Prime Meta Tags */}
      <title>{title ? `${title} | HM Robotics` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} | HM Robotics` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {canonical && <meta property="og:url" content={`${siteUrl}${canonical}`} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | HM Robotics` : defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
};

export default SEO;
