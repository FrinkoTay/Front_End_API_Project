import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { getArticleById } from '../api';

const SingleArticle = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})

    useEffect(() => {
        getArticleById(article_id)
        .then((fetchedArticles) => {
            return setArticle(fetchedArticles)
        })
    }, [])

    return <div className="article-card">
        <h3>{article.title}</h3>
        <p>Author: {article.author} </p>
        <p>Date Posted: {article.created_at} {/*
        article.created_at === undefined ? 
        ""
        : toLocaleString(Date(Date.parse(article.created_at)))
        */} </p>
        <p>Topic: {article.topic} </p>
        <p>Comments: {article.comment_count} </p>
        <p> {article.body} </p>
        <img className="article-img" src={ article.article_img_url }></img>
    </div>
}

export default SingleArticle