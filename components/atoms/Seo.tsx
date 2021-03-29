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
  const keywords = siteMetadata?.keywords;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Head>
      <title>{defaultTitle && title ? defaultTitle !== title ? `${title} - ${defaultTitle}` : null : defaultTitle}</title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'></meta>
      <link rel="canonical" href={siteUrl}></link>
      <link rel="manifest" href="/manifest.json"></link>
      <link href='/favicon.svg' rel='icon' type='image/svg+xml' sizes='16x16'></link>
      <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32'></link>
      <meta name="theme-color" content="#ffffff"></meta>
      <link rel="apple-touch-icon" sizes='48x48' href="/icons/icon-48x48.png"></link>
      <link rel="apple-touch-icon" sizes='72x72' href="/icons/icon-72x72.png"></link>
      <link rel="apple-touch-icon" sizes='96x96' href="/icons/icon-96x96.png"></link>
      <link rel="apple-touch-icon" sizes='144x144' href="/icons/icon-144x144.png"></link>
      <link rel="apple-touch-icon" sizes='192x192' href="/icons/icon-192x192.png"></link>
      <link rel="apple-touch-icon" sizes='256x256' href="/icons/icon-256x256.png"></link>
      <link rel="apple-touch-icon" sizes='384x384' href="/icons/icon-384x384.png"></link>
      <link rel="apple-touch-icon" sizes='512x512' href="/icons/icon-512x512.png"></link>
      <meta name="keywords" content={keywords}></meta>
      <meta name='description' content={metaDescription} />
      <meta name='author' content={metaAuthor} />
      <meta itemProp='datePublished' content={metaPublishDate} />
      <meta property='article:published_time' content={metaPublishDate} />
      <meta property='og:url' content={`${siteUrl}${pathname}`} />
      <meta property='og:title' content={metaTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:type' content='website' />
      <meta name='image' property='og:image' content={`${siteUrl}${image || defaultImage}`} />
      <meta property='twitter:card' content='summary' />
      <meta property='twitter:creator' content={siteMetadata?.social?.twitter || ``} />
      <meta property='twitter:title' content={metaTitle} />
      <meta property='twitter:description' content={metaDescription} />
    </Head>
  );
};

export default SEO;
