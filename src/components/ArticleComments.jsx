import { useState, useEffect } from "react"
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../api"
import { useParams } from 'react-router-dom';
import AddComment from "./AddComment";

const ArticleComments = () => {
    const [comments, setComments] = useState([])
    const { article_id } = useParams()
    const [isLoading, setIsLoading] = useState('')
    const [addCommentCount, setAddCommentCount] = useState(0)

    useEffect(() => {
        setIsLoading('Loading Comments...')
        getCommentsByArticleId(article_id)
        .then((fetchedComments) => {
            setComments(fetchedComments)
            setIsLoading('')
        })
    }, [addCommentCount])

    return <header>
        <h2> Comments: </h2>
        <AddComment 
            setComments={setComments} 
            setAddCommentCount={setAddCommentCount}
        />
        <h1> {isLoading} </h1>
        <div>
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment}/>
            })}
        </div>
    </header>
}

export default ArticleComments