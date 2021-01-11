import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Layout from '../components/atoms/Layout';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(undefined);

  const getPosts = useCallback(async () => {
    console.log(`/api/get-posts${lastEvaluatedKey ? `?lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}` : ''}`)
    const fetchData = await fetch(`/api/get-posts${lastEvaluatedKey ? `?lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}` : ''}`, {
      method: 'GET',
    });
    const result = await fetchData.json();
    setPosts([...posts, ...result.Items]);
    setLastEvaluatedKey(result.LastEvaluatedKey);
    console.log(result);
  }, [lastEvaluatedKey]);

  const rssUpdate = async () => {
    console.log(`/api/parse-rss`)
    const fetchData = await fetch(`/api/parse-rss`);
    const result = await fetchData.json();
    console.log(result);
  };

  useEffect(() => {
    // console.log('?', Math.floor(Date.now() / 1000));
    getPosts();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next AppAA</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {lastEvaluatedKey && <button onClick={getPosts}>TEST</button>}
          {posts && posts.map((post) => {
            return (
              <h2 key={post.link.S}>{post.title.S}</h2>
            )
          })}
          <button onClick={rssUpdate}>RSS UPDATE</button>
        </main>
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
