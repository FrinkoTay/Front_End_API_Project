import { getArticles } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"

const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles()
        .then((fetchedArticles) => {
            console.log(fetchedArticles)
            setArticles(fetchedArticles)
        })
    }, [])

    return <header>
        <h2> Articles: </h2>
        <div>
            {articles.map((article) => {
                return <ArticleCard key={article.article_id} article={article}/>
            })}
        </div>
    </header>
}

export default Articles