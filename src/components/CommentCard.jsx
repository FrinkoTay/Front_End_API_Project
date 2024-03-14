import UserContext from '../contexts/User';
import { useContext, useState } from "react"
import { deleteComment } from '../api';

const CommentCard = ({comment, setCommentsChanged}) => {
    const [deleteMsg, setDeleteMsg] = useState(null)
    const userLoggedIn = useContext(UserContext)

    const deleteButton = () => {
        if (deleteMsg) { return deleteMsg
        } else if (userLoggedIn === comment.author) {
            return (<button onClick={() => {removeComment()}}> Delete Comment </button> )
        } else {return ''}
    }

    const removeComment = () => {
        console.log(comment.comment_id)
        setDeleteMsg('Deleting Comment...')
        deleteComment(comment.comment_id)
        .then(() => {
            setDeleteMsg('Message Deleted.')
        })
        .catch((error) => {
            setDeleteMsg(`Sorry, we could not delete that comment. Error Message: ${error.response.data.msg}`)
        })
    }

    return <div className="comment-card">
        <h4> {comment.author} </h4>
        <p> {comment.body} </p>
        <p> {comment.created_at} </p>
        {deleteButton()}
    </div>
}

export default CommentCard