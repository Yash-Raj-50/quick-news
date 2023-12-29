import React from 'react'
import { Card, Button } from 'antd'
import { usePathname } from 'next/navigation'

const { Meta } = Card;

const GridViewCard = ({ article, publishedDate, onFavClick, onSaveClick, openNewsClick }) => {
    const currentPath = usePathname();
    const handleFavClick = (e) => {
        e.stopPropagation();
        if (currentPath !== "/user/favourites") {
            onFavClick(article);
        }
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        if (currentPath !== "/user/saved") {
            onSaveClick(article);
        }
    };

    const handleNewsClick = () => {
        if (currentPath !== "/user/favourites") {
            openNewsClick(article);
        }
    }; 

    return (
        <div>
            <Card
                hoverable
                style={{ width: 350 }}
                cover={<img alt={article.title} src={article.urlToImage} />}
                onClick={handleNewsClick}
            >
                <Meta title={<div className='h-12 text-balance'><span className='whitespace-normal truncate'>{article.title}</span></div>} description={
                    <div className='flex justify-between'>
                        <span>{publishedDate}</span>
                        <span className='flex gap-2'>
                            {!(currentPath === "/user/favourites") && <Button onClick={handleFavClick} size='small' shape="circle" icon={<i class="bi bi-suit-heart"></i>} />}
                            {!(currentPath === "/user/saved") && <Button onClick={handleSaveClick} size='small' shape="circle" icon={<i class="bi bi-cloud-download"></i>} />}
                        </span>
                    </div>
                } />
            </Card>
        </div>
    )
}

export default GridViewCard