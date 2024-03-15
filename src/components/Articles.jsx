import { getArticles, getTopics } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useSearchParams, Link } from 'react-router-dom';
import CategoryBar from "./CategoryBar";
import SortBar from "./SortBar";

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [sortBy, setSortBy] = useState({displayName:'Date', dbName:null})
    const [order, setOrder] = useState({displayName:'Descending', dbName:null})

    useEffect(() => {
        setIsLoading('Loading Articles...')
        getArticles([
            {name: 'topic', value: category}, 
            {name: 'sort_by', value: sortBy.dbName}, 
            {name: 'order', value: order.dbName}
        ])
        .then((fetchedArticles) => {
            setArticles(fetchedArticles)
            setIsLoading('')
        })
    }, [category, sortBy, order])

    return <header>
        <CategoryBar/>
        <SortBar sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
        <h2> Articles: </h2>
        <h1> {isLoading} </h1>
        <div>
            {articles.map((article) => {
                return <ArticleCard 
                key={article.article_id} 
                article={article}/>
            })}
        </div>
    </header>
}

export default Articles