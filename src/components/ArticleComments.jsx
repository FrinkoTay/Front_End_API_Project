import { useState, useEffect } from "react"
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../api"
import { useParams } from 'react-router-dom';

const ArticleComments = () => {
    const [comments, setComments] = useState([])
    const { article_id } = useParams()
    const [isLoading, setIsLoading] = useState('')

    useEffect(() => {
        setIsLoading('Loading Commnets...')
        getCommentsByArticleId(article_id)
        .then((fetchedComments) => {
            setComments(fetchedComments)
            setIsLoading('')
        })
    }, [])

    return <header>
        <h2> Comments: </h2>
        <h1> {isLoading} </h1>
        <div>
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment}/>
            })}
        </div>
    </header>
}

export default ArticleComments