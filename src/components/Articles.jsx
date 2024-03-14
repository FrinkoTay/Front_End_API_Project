import { getArticles, getTopics } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useSearchParams, Link } from 'react-router-dom';
import CategoryBar from "./CategoryBar";

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState('')
    const searchParams = useSearchParams()[0]
    const categoryName = searchParams.get('category')

    useEffect(() => {
        setIsLoading('Loading Articles...')
        getArticles(categoryName)
        .then((fetchedArticles) => {
            setArticles(fetchedArticles)
            setIsLoading('')
        })
    }, [categoryName])

    return <header>
        <CategoryBar/>
        <h2> Articles: </h2>
        <h1> {isLoading} </h1>
        <div>
            {articles.map((article) => {
                return <ArticleCard key={article.article_id} article={article}/>
            })}
        </div>
    </header>
}

export default Articles