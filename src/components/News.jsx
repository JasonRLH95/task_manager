import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard';
import '../style/news.css';
const API_KEY = process.env.REACT_APP_API_KEY;

export default function News() {
    const [newsArr,setNewsArr] = useState(null);
    const [newsIndex,setNewsIndex] = useState(null);
    useEffect(()=>{
        if(newsArr === null){
            fetchNews();
        }
        if(newsArr !== null){
            renderNews();
        }
    },[newsIndex])
    
    const fetchNews=()=>{
        fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=israel&country=il&language=he&category=top`)
        .then(res => res.json())
        .then(data =>{
            setNewsArr(data.results);
            setNewsIndex(0);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    const renderNews =()=>{
        setTimeout(() => {
            if(newsIndex < newsArr.length-1 && newsIndex != null){
                setNewsIndex(newsIndex+1);
            }
            else{
                setNewsIndex(0);
            }    
        }, 5000);
    }
    const displayNews =()=>{
        if(newsArr !== null && newsIndex !== null){
            return <NewsCard card={newsArr[newsIndex]}/>
        }
    }
  return (
    <div>
        <div className="newsDisplay">
            {displayNews()}
        </div>
    </div>
  )
}
