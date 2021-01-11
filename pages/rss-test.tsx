import Parser from 'rss-parser';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Layout from '../components/atoms/Layout';
import { useCallback, useEffect, useState } from 'react';

export default function rssTest() {

  const parser = new Parser({
    // timeout: 5000,
  });

  // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  const CORS_PROXY = '';
  const url = 'https://jthcast.dev/rss.xml';

  async function testRSS() {
    const feed = await parser.parseURL(`${CORS_PROXY}${url}`);
    const company = feed.title;
    const items = feed.items.reduce<Array<Record<string, string | number>>>((acc, item) => {
      acc.push({
        title: item.title,
        link: item.link,
        company,
        timestamp: new Date(item.pubDate).getTime().toString()
      })
      return acc;
    }, []);

    console.log(company, items)
  };

  useEffect(() => {
    testRSS();
  }, []);

  return (
    <Layout>
      <div>
        rss-test
      </div>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
