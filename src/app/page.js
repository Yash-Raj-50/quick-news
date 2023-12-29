'use client';

import { auth } from '../app/firebase/config';
import { useRouter } from 'next/navigation';
import { useIdToken } from 'react-firebase-hooks/auth';
import { useState, useEffect, use } from 'react';
import React from 'react';
import { Radio } from 'antd';
import ListView from '../components/others/listView';
import GridView from '../components/others/gridView';
import dummyData from '../components/others/dummyData';

export default function Home() {

  const router = useRouter();
  const [user, loading, error] = useIdToken(auth);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setArticles((sessionStorage.getItem('articles')) ? (JSON.parse(sessionStorage.getItem('articles'))) : dummyData);
    }
  }, []); 

  const [view, setView] = useState('1');

  async function getData() {
    let url1 =
      'https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'pageSize=50&' +
      'apiKey=cf017675a683419e9f34d30589173d25';
    let url2 =
      'https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'pageSize=50&' +
      'apiKey=63f6b34cef304a01a5ce28096693a965';

    try {
      let response = await fetch(url1);
      let data = await response.json();

      if (data.articles.length > 0) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('articles', JSON.stringify(data.articles));
        }
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error.message);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('articles')) {
        getData();
      } else {
        setArticles(JSON.parse(sessionStorage.getItem('articles')));
      }
    }
  }, []);

  if (!loading) {
    if (!user) {
      router.push('/authentication/signin');
    }
  }

  return (
    <main className="bg-stone-200 home" style={{ height: "93%", }}>
      <div className='flex items-center justify-end px-8 w-full max-w-screen-xl mx-auto' style={{ height: "10%" }}>
        <Radio.Group
          defaultValue="1"
          style={{
            marginTop: 16,
          }}
          onChange={(e) => { setView(e.target.value) }}
        >
          <Radio.Button value="1"><i class="bi bi-list"></i><i class="bi bi-list"></i></Radio.Button>
          <Radio.Button value="2"><i class="bi bi-grid-3x3"></i></Radio.Button>
        </Radio.Group>
      </div>
      <div className='w-full pb-4' style={{ height: "90%" }}>
        {view === '1' && <ListView articles={articles} />}
        {view === '2' && <GridView articles={articles} />}
      </div>
    </main>
  )
}

  // if (loading) {
  //   return <div className='h-screen flex items-center justify-center'>Loading...</div>
  // }