import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import siteMetadata from '../../config'

type seoProps = {
  description?: string,
  lang?: string,
  meta?: ConcatArray<{ name: string; content: any; property?: undefined; }>,
  title?: string,
  image?: string,
  author?: string,
  publishDate?: string,
}

const SEO = ({ description = '', lang = 'ko', title, image, author, publishDate }: seoProps) => {
  const { pathname } = useRouter();
  const metaDescription = description || siteMetadata.description;
  const metaTitle = title || siteMetadata?.title;
  const metaAuthor = author || siteMetadata?.author.name;
  const metaPublishDate = publishDate;
  const defaultTitle = siteMetadata?.title;
  const defaultImage = siteMetadata?.image;
  const siteUrl = siteMetadata?.siteUrl;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Head>
      <title>{defaultTitle && title ? defaultTitle !== title ? `${defaultTitle} - ${title}` : null : defaultTitle}</title>
      <meta http-equiv="x-ua-compatible" content="ie=edge"></meta>
      {/* <link rel="manifest" href="/manifest.json"></link> */}
      {/* <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' /> */}
      {/* <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' /> */}
      {/* <link rel="apple-touch-icon" sizes='48x48' href="/apple-icon.png"></link> */}
      {/* <link rel="apple-touch-icon" sizes='72x72' href="/apple-icon.png"></link> */}
      {/* <link rel="apple-touch-icon" sizes='96x96' href="/apple-icon.png"></link> */}
      {/* <link rel="apple-touch-icon" sizes='144x144' href="/apple-icon.png"></link> */}
      {/* <link rel="apple-touch-icon" sizes='192x192' href="/apple-icon.png"></link> */}
      {/* <link rel="apple-touch-icon" sizes='256x256' href="/apple-icon.png"></link> */}
      {/* <link rel="apple-touch-icon" sizes='384x384' href="/apple-icon.png"></link> */}
      {/* <link rel="apple-touch-icon" sizes='512x512' href="/apple-icon.png"></link> */}
      <meta name='description' content={metaDescription} />
      <meta name='author' content={metaAuthor} />
      <meta itemProp='datePublished' content={metaPublishDate} />
      <meta property='article:published_time' content={metaPublishDate} />
      <meta property='og:url' content={`${siteUrl}${pathname}`} />
      <meta property='og:title' content={metaTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={`${siteUrl}${image || defaultImage}`} />
      <meta property='twitter:card' content='summary' />
      <meta property='twitter:creator' content={siteMetadata?.social?.twitter || ``} />
      <meta property='twitter:title' content={metaTitle} />
      <meta property='twitter:description' content={metaDescription} />
      <meta property='twitter:description' content={metaDescription} />
    </Head>
  );
};

export default SEO;
