import { getArticles } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState('')

    useEffect(() => {
        setIsLoading('Loading Articles...')
        getArticles()
        .then((fetchedArticles) => {
            setArticles(fetchedArticles)
            setIsLoading('')
        })
    }, [])

    return <header>
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