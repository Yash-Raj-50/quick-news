'use client';

import React, {useEffect} from 'react'
import { Button, Divider, message } from 'antd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../app/firebase/config';

const News_detail = () => {
    var article = {};
    if(typeof window !== 'undefined'){
        //  userSession = sessionStorage.getItem('user_id');
         article = JSON.parse(sessionStorage.getItem('detailNews'));
    }
    // console.log('local article', article);

    const addFavourite = async (article) => {
        var user = null;
        if(typeof window !== 'undefined'){
            user = sessionStorage.getItem('user_id');
        }else{
            user = null;
        }
        // const user = sessionStorage.getItem('user_id');
        const docRef = doc(db, 'users', user);

        try {
            const docSnap = await getDoc(docRef);
            const favourites = docSnap.data().favourites;
            if (!favourites.some((fav) => fav.title === article.title)) {
                favourites.push(article);
                await updateDoc(docRef, {
                    favourites: favourites,
                });
                message.success('Added to favourites');
            } else {
                message.warning('Already added to favourites');
            }
        } catch (error) {
            console.log('Error getting document:', error);
        }
    }

    const saveArticle = async (article) => {
        if(typeof window !== 'undefined'){
            const savedArticles = JSON.parse(localStorage.getItem('saved_Articles')) || [];
        }else{
            const savedArticles = null;
        }
        // const savedArticles = JSON.parse(localStorage.getItem('saved_Articles')) || [];
        const isArticleSaved = savedArticles.some((savedArticle) => savedArticle.title === article.title);
        if (!isArticleSaved) {
            savedArticles.push(article);
            if(typeof window !== 'undefined'){
                localStorage.setItem('saved_Articles', JSON.stringify(savedArticles));
            }
            // localStorage.setItem('saved_Articles', JSON.stringify(savedArticles));
            message.success('Article saved for Offline');
        } else {
            message.warning('Article already saved');
        }
    };

    const handleFavClick = () => {addFavourite(article)};
    const handleSaveCLick = () => {saveArticle(article)};

    const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <div className='h-full max-w-7xl mx-auto w-full flex p-4'>
            <div className='h-full w-full flex flex-col lg:flex-row gap-8'>
                <div className='lg:w-2/5 flex flex-col'>
                    <div className='h-full'>
                        <img src={article.urlToImage} alt={article.title} className='h-full w-full object-cover' />
                    </div>
                </div>
                <div className='lg:w-3/5 flex flex-col justify-between lg:h-full'>
                    <div className='w-full flex flex-col gap-8'>
                        <div className='font-bold text-3xl'>{article.title}</div>
                        <div className='text-xl text-fuchsia-600'><a href={article.url} target='_blank'>{article.url}</a></div>
                    </div>
                    <div className='flex flex-col my-6'>
                        <div className='flex justify-between text-gray-500'>
                            <span>{publishedDate}</span>
                            <span className='flex gap-4'>
                                <Button onClick={handleFavClick} size='default' shape="circle" icon={<i class="bi bi-suit-heart"></i>} />
                                <Button onClick={handleSaveCLick} size='default' shape="circle" icon={<i class="bi bi-cloud-download"></i>} />
                            </span>
                        </div>
                        <Divider />
                        <div><p>{article.description}</p></div>
                        <div><p>{article.content}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News_detail