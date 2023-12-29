import React from 'react'
import { Card, Button } from 'antd'
import { usePathname} from 'next/navigation'

const ListViewCard = ({article, publishedDate, onFavClick, onDeleteClick, openNewsClick, onSaveClick, onRemoveSaved }) => {
    const currentPath = usePathname();
    
    const handleFavClick = (e) => {
        e.stopPropagation();
        if (currentPath !== "/user/favourites") {
            onFavClick(article);
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (currentPath === "/user/favourites") {
            onDeleteClick(article);
        }
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        if (currentPath !== "/user/saved") {
            onSaveClick(article);
        }
    };

    const handleNewsClick = () => {
            openNewsClick(article);
    }; 
    
    const handleRemoveSaved = (e) => {
        e.stopPropagation();
        if (currentPath === "/user/saved") {
            onRemoveSaved(article);
        }
    
    };

    return (
        <Card bordered={true} style={{ width: 450, height: 120 }} onClick={handleNewsClick} className='bg-white font-sans' hoverable>
            <div className='flex w-full gap-2 h-full'>
                <div className='w-4/12'><img src={article.urlToImage} alt={article.title} className='h-full rounded shadow-lg' /></div>
                <div className='w-8/12 h-full border-l-2 flex flex-col items-center justify-between px-2'>
                    <div className='flex w-full justify-between'>
                        <span>{publishedDate}</span>
                        <span className='flex gap-2'>
                            {(currentPath==="/user/saved") && <Button onClick={handleRemoveSaved} size='small' shape="circle" icon={<i class="bi bi-x-lg"></i>} />}
                            {(currentPath==="/user/favourites") && <Button onClick={handleDeleteClick} size='small' shape="circle" icon={<i class="bi bi-trash3"></i>} />}
                            {!(currentPath==="/user/favourites") && <Button onClick={handleFavClick} size='small' shape="circle" icon={<i class="bi bi-suit-heart"></i>} />}
                            {!(currentPath==="/user/saved") && <Button onClick={handleSaveClick} size='small' shape="circle" icon={<i class="bi bi-cloud-download"></i>} />}
                        </span>
                    </div>
                    <div className='h-3/5 overflow-y-hidden'><span className='font-semibold'>{article.title}</span></div>
                </div>
            </div>
        </Card>
    )
}

export default ListViewCard