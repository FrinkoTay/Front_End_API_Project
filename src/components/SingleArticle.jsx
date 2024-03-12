import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { getArticleById, patchArticleVotes } from '../api';

const SingleArticle = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    const fetchArticle = () => {
        getArticleById(article_id)
        .then((fetchedArticles) => {
            return setArticle(fetchedArticles)
        })
    }

    useEffect(() => {
        fetchArticle()
    }, [])

    const incrementCount = (increment) => {
        let optRendArticle = {...article}
        optRendArticle.votes += increment
        setArticle(optRendArticle)
        patchArticleVotes(article_id, increment)
        .then((updatedArticle) => {
            setErrorMsg('')
            setArticle(updatedArticle)
        })
        .catch((error) => {
            setErrorMsg(`Sorry, there has been an issue with voting. Error Message: "${error.response.data.msg}"`)
            console.log(error.response.data.msg)
            fetchArticle()
        })
    }

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
        <p>Votes:  {article.votes} </p>
        <button onClick={() => {incrementCount(1)}}> Upvote </button>
        <button onClick={() => {incrementCount(-1)}}> Downvote </button>
        <p> {errorMsg} </p>
    </div>
}

export default SingleArticle