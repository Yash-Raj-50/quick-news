import React from 'react';
import ListViewCard from '../antd/listViewCard';
import { db } from '../../app/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const ListView = ({ articles }) => {
    // console.log('articles recieved ', articles)
    const addFavourite = async (article) => {
        const user = sessionStorage.getItem('user_id');
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

    const deleteFavourite = async (article) => {
        const user = sessionStorage.getItem('user_id');
        const docRef = doc(db, 'users', user);

        try {
            const docSnap = await getDoc(docRef);
            const favourites = docSnap.data().favourites;
            const newFavourites = favourites.filter((fav) => fav.title !== article.title);
            await updateDoc(docRef, {
                favourites: newFavourites,
            });
            message.success('Removed from favourites');
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
        sessionStorage.setItem('detailNews', JSON.stringify(article));
        router.push('/news-detail');
        // console.log('button clicked');
    }

    const onRemoveSaved = (article) => {
        const savedArticles = JSON.parse(localStorage.getItem('saved_Articles')) || [];
        const newSavedArticles = savedArticles.filter((savedArticle) => savedArticle.title !== article.title);
        localStorage.setItem('saved_Articles', JSON.stringify(newSavedArticles));
        message.success('Removed from locally saved articles');
        window.dispatchEvent(new Event("storage"));
    }

    return (
        <div className='h-full flex w-full justify-around overflow-y-scroll'>

            <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl gap-4 h-fit'>
                {articles.map((article, index) => {
                    const publishedDate = new Date(article.publishedAt).toLocaleDateString();
                    return (
                        <div className='flex justify-center items-center' key={index}>
                            <ListViewCard article={article} publishedDate={publishedDate} 
                            onFavClick={(article) => { addFavourite(article); }}
                            onDeleteClick={(article) => { deleteFavourite(article); }}
                            openNewsClick={(article) => { setDetailNews(article);}}
                            onSaveClick={(article) => { saveArticle(article); }}
                            onRemoveSaved={(article) => { onRemoveSaved(article); }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListView