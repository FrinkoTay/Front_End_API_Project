import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { getArticleById, patchArticleVotes } from '../api';

const SingleArticle = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [voteErrorMsg, setVoteErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [articleError, setArticleError] = useState('')
    const [articleDate, setArticleDate] = useState(null)

    const loadDate = () => {
        if (articleDate === null) {
            return <p>Date Posted: Loading Date...</p>
        } else {
            return <p>Date Posted: {articleDate.toUTCString()} </p>
        }
    }

    const fetchArticle = () => {
        setIsLoading('Loading Article...')
        getArticleById(article_id)
        .then((fetchedArticle) => {
            setArticleError('')
            setArticle(fetchedArticle)
            setIsLoading('')
            setArticleDate(new Date(Date.parse(fetchedArticle.created_at)))
        })
        .catch((error) => {
            setIsLoading('')
            setArticleError({
                status: error.response.status,
                msg: error.response.data.msg
            })
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
            fetchArticle()
        })
    }

    const articleContent = () => {
        if (articleError) {
            return <h1> {`Error ${articleError.status}: ${articleError.msg}`} </h1>
        } else {
            return <div className="article-card">
                <h3>{article.title}</h3>
                <p>Author: {article.author} </p>
                {loadDate()}
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