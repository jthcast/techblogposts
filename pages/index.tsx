import Layout from '../components/atoms/Layout';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(undefined);

  const getPosts = () => {
    const result = {
      Items: [
        {
          link: { S: `https://jthcast.dev/posts/how-to-make-dark-mode-with-css-variables/` },
          title: { S: `CSS변수를 활용하여 다크 모드 구현하기` },
          company: { S: `jthcast` },
          viewCount: { N: `123` },
          publishDate: { N: `1608422400000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/start-blog-development-with-atomic-design/` },
          title: { S: `Atomic Design으로 블로그 개발 시작하기` },
          company: { S: `jthcast` },
          viewCount: { N: `12` },
          publishDate: { N: `1608076800000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-efforts-to-preserve-web-standards-and-web-accessibility-are-required/` },
          title: { S: `웹 표준과 웹 접근성을 지키기 위한 노력이 필요한 이유` },
          company: { S: `jthcast` },
          viewCount: { N: `1` },
          publishDate: { N: `1608336000000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        },
      ],
      LastEvaluatedKey: null
    }
    setPosts([...posts, ...result.Items]);
    setLastEvaluatedKey(result.LastEvaluatedKey);
    console.log('done')
  };
  // const getPosts = useCallback(async () => {
  //   const fetchData = await fetch(`/api/get-posts${lastEvaluatedKey ? `?lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}` : ''}`, {
  //     method: 'GET',
  //   });
  //   const result = await fetchData.json();
  //   setPosts([...posts, ...result.Items]);
  //   setLastEvaluatedKey(result.LastEvaluatedKey);
  // }, [lastEvaluatedKey]);

  const rssUpdate = async () => {
    const fetchData = await fetch(`/api/parse-rss`);
    const result = await fetchData.json();
    console.log(result);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Layout>
      {lastEvaluatedKey && <button onClick={getPosts}>TEST</button>}
      {posts && posts.map((post) => {
        return (
          <h2 key={post.link.S}>{post.title.S}</h2>
        )
      })}
      {/* <button onClick={rssUpdate}>RSS UPDATE</button> */}
    </Layout>
  );
}
