import UserContext from '../contexts/User';
import { useContext } from "react"

const CommentCard = ({comment}) => {
    const userLoggedIn = useContext(UserContext)

    return <div className="comment-card">
        <h4> {comment.author} </h4>
        <p> {comment.body} </p>
        <p> {comment.created_at} </p>
        <div> 
            {userLoggedIn === comment.author ?
            <button> Delete Comment </button> : ""} 
        </div>
    </div>
}

export default CommentCard