'use client';
import React from 'react'
import ListView from '../../../components/others/listView';
import { useState, useEffect } from 'react';

const Saved = () => {
  const [saved_articles, setSavedArticles] = useState([]);

  useEffect(() => {
    if(typeof window !== 'undefined'){
      const savedArticlesFromLocalStorage = JSON.parse(localStorage.getItem('saved_Articles'));
    }
    setSavedArticles(savedArticlesFromLocalStorage || []);
  }, []);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', () => {
      const savedArticlesFromLocalStorage = JSON.parse(localStorage.getItem('saved_Articles'));
      setSavedArticles(savedArticlesFromLocalStorage || []);
    });
  }

  return (
    <main className="bg-zinc-200" style={{ height: "93%" }}>
      <div className='flex items-center justify-start text-3xl w-full max-w-screen-lg mx-auto' style={{ height: "10%" }}>
        Saved
      </div>
      <div className='w-full pb-4' style={{ height: "90%" }}>
        <ListView articles={saved_articles} />
        Hello
      </div>
    </main>
  )
}

export default Saved