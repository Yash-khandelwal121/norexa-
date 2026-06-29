import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, image, canonicalUrl }) => {
  const siteTitle = title ? `${title} | Norexa` : 'Norexa — Premium Digital Products';
  const siteDescription = description || 'Buy premium eBooks, video courses, templates and more.';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default SEOHead;
