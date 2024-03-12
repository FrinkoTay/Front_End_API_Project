import { useState, useEffect } from "react"
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../api"
import { useParams } from 'react-router-dom';

const ArticleComments = () => {
    const [comments, setComments] = useState([])
    const { article_id } = useParams()

    useEffect(() => {
        getCommentsByArticleId(article_id)
        .then((fetchedComments) => {
            setComments(fetchedComments)
        })
    }, [])

    return <header>
        <h2> Comments: </h2>
        <div>
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment}/>
            })}
        </div>
    </header>
}

export default ArticleComments