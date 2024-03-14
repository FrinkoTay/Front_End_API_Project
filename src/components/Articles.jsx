import { getArticles, getTopics } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useSearchParams, Link } from 'react-router-dom';

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState('')
    const searchParams = useSearchParams()[0]
    const categoryName = searchParams.get('category')

    useEffect(() => {
        getTopics()
        .then((fetchedCategories) => {
            setCategories(fetchedCategories)
        })
    }, [])

    useEffect(() => {
        setIsLoading('Loading Articles...')
        getArticles(categoryName)
        .then((fetchedArticles) => {
            setArticles(fetchedArticles)
            setIsLoading('')
        })
    }, [categoryName])

    return <header>
        <h2> Articles: </h2>
        <h3>Categories</h3>
        <nav>
            {categories.map((category) => {
                return <Link key={category.description} 
                    to={`/articles?category=${category.slug}`}> 
                    {category.slug} </Link>
            })}
        </nav>
        <h1> {isLoading} </h1>
        <div>
            {articles.map((article) => {
                return <ArticleCard key={article.article_id} article={article}/>
            })}
        </div>
    </header>
}

export default Articles