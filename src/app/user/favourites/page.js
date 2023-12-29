'use client';

import React from 'react'
import ListView from '../../../components/others/listView';
import { useState } from 'react';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../app/firebase/config';
import { useEffect } from 'react';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  var user = "okGkIooFqOg0lJBL6IrnvSilC9p1";
  if(typeof window !== 'undefined'){
    user = sessionStorage.getItem('user_id') || user;
  }

  const docRef = doc(db, 'users', user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();
        if (userData && userData.favourites) {
          setFavourites(userData.favourites);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(docRef, (doc) => {
      const userData = doc.data();
      if (userData && userData.favourites) {
        setFavourites(userData.favourites);
      }
      console.log(" snapshot ran here", favourites);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="bg-violet-100" style={{ height: "93%" }}>
      <div className='flex items-center justify-start text-3xl w-full max-w-screen-lg mx-auto' style={{ height: "10%" }}>
        Favourites
      </div>
      <div className='w-full pb-4' style={{ height: "90%" }}>
        <ListView articles={favourites} />
      </div>
    </main>
  )
}

export default Favourites