import { getArticles, getTopics } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useParams } from 'react-router-dom';
import TopicBar from "./TopicBar";
import SortBar from "./SortBar";

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState('')
    const { topic } = useParams()
    const [sortBy, setSortBy] = useState({displayName:'Date', dbName:null})
    const [order, setOrder] = useState({displayName:'Descending', dbName:null})

    useEffect(() => {
        setIsLoading('Loading Articles...')
        getArticles([
            {name: 'topic', value: topic}, 
            {name: 'sort_by', value: sortBy.dbName}, 
            {name: 'order', value: order.dbName}
        ])
        .then((fetchedArticles) => {
            setArticles(fetchedArticles)
            setIsLoading('')
        })
    }, [topic, sortBy, order])

    const articlesToggle = () => {
        if (isLoading === '') {
            return articles.map((article) => {
                return <ArticleCard 
                key={article.article_id} 
                article={article}/>
            })
        } else {return ''}
    }

    return <header>
        <TopicBar/>
        <SortBar sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
        <h2> Articles: </h2>
        <h1> {isLoading} </h1>
        <div>
            {articlesToggle()}
        </div>
    </header>
}

export default Articles