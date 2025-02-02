import React from 'react';
import '../style/newsCard.css';

export default function NewsCard({ card }) {
  return (
    <div className='newsCard_component'>
        <a href={card.link} target='_blank' className='newsCard_link'></a>
        <img className='newsCard_sourceImage' src={card.source_icon} alt="source_logo"/>
        <img className='newsCard_newsImage' src={card.image_url} alt="news_image"/>
        <div className="newsCard_mainContent">
            <h2 className='newsCard_title'>{card.title}</h2>
            <h3 className='newsCard_desc'>{card.description}</h3>
        </div>
    </div>
  )
}
