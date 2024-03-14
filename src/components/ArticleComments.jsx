import { useState, useEffect } from "react"
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../api"
import { useParams } from 'react-router-dom';
import AddComment from "./AddComment";

const ArticleComments = () => {
    const [comments, setComments] = useState([])
    const { article_id } = useParams()
    const [isLoading, setIsLoading] = useState('')
    const [commentsChanged, setCommentsChanged] = useState(0)

    useEffect(() => {
        setIsLoading('Loading Comments...')
        getCommentsByArticleId(article_id)
        .then((fetchedComments) => {
            setComments(fetchedComments)
            setIsLoading('')
        })
    }, [commentsChanged])

    return <header>
        <h2> Comments: </h2>
        <AddComment 
            setComments={setComments} 
            setCommentsChanged={setCommentsChanged}
        />
        <h1> {isLoading} </h1>
        <div>
            {comments.map((comment) => {
                return <CommentCard 
                key={comment.comment_id} 
                comment={comment}
                setCommentsChanged={setCommentsChanged}/>
            })}
        </div>
    </header>
}

export default ArticleComments