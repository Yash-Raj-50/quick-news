import React from 'react'
import GridViewCard from '../antd/gridViewCard';
import { db } from '../../app/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const GridView = ({ articles }) => {

    const addFavourite = async (article) => {
        if(typeof window !== 'undefined'){
            const user = sessionStorage.getItem('user_id');
        }
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
        const savedArticles = JSON.parse(localStorage.getItem('saved_Articles')) || [];
        const isArticleSaved = savedArticles.some((savedArticle) => savedArticle.title === article.title);
        if (!isArticleSaved) {
            savedArticles.push(article);
            localStorage.setItem('saved_Articles', JSON.stringify(savedArticles));
            message.success('Article saved for Offline');
        } else {
            message.warning('Article already saved');
        }
    };

    const router = useRouter();
    const setDetailNews = (article) => {
        if(typeof window !== 'undefined'){
            sessionStorage.setItem('detailNews', JSON.stringify(article));
        }
        router.push('/news-detail');
    }

    return (
        <div className='h-full flex w-full justify-around overflow-y-scroll'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl gap-4 h-fit'>
                {articles.map((article, index) => {
                    const publishedDate = new Date(article.publishedAt).toLocaleDateString();
                    return (
                        <div className='flex justify-center items-center' key={index}>
                            <GridViewCard
                                article={article}
                                publishedDate={publishedDate}
                                onFavClick={(article) => { addFavourite(article); }}
                                onSaveClick={(article) => { saveArticle(article); }}
                                openNewsClick={(article) => { setDetailNews(article); }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GridView