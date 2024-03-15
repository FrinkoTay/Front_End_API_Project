import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { getArticleById, patchArticleVotes } from '../api';

const SingleArticle = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [voteErrorMsg, setVoteErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [articleError, setArticleError] = useState('')

    const fetchArticle = () => {
        setIsLoading('Loading Article...')
        getArticleById(article_id)
        .then((fetchedArticles) => {
            setArticleError('')
            setArticle(fetchedArticles)
            setIsLoading('')
        })
        .catch((error) => {
            setIsLoading('')
            setArticleError(error.response.data.msg)
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
            setVoteErrorMsg('')
            setArticle(updatedArticle)
        })
        .catch((error) => {
            setVoteErrorMsg(`Sorry, there has been an issue with voting. Error Message: "${error.response.data.msg}"`)
            console.log(error.response.data.msg)
            fetchArticle()
        })
    }

    const articleContent = () => {
        if (articleError) {
            return <h1> {`Error: ${articleError}`} </h1>
        } else {
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
                <p> {voteErrorMsg} </p>
            </div>
        }
    }

    return <div>
        <h1>
            {isLoading}
        </h1>
        {articleContent()}
    </div>
}

export default SingleArticle