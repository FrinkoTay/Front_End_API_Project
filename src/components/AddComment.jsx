import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react"
import { postArticleComment } from '../api';
// import { setTimeout } from 'timers/promises'
import UserContext from '../contexts/User';

const AddComment = ({ setComments, setCommentsChanged }) => {
    const { article_id } = useParams()
    const [infoMsg, setInfoMsg] = useState(null)
    const [newComment, setNewComment] = useState('')
    const userLoggedIn = useContext(UserContext)
    
    const submitButton = () => {
        if (infoMsg) { 
            return <p>{infoMsg}</p>
        } else {
            return <button type="submit">Post Comment</button>
        }
    }

    const submitComment = (event) => {
        event.preventDefault()
        setInfoMsg('Posting Comment...')
        setComments((currComments) => {
            return [{
                author: 'jessjelly',
                body: newComment,
                votes: 0,
                comment_id: 0
            }, ...currComments]
        })
        // default user set to 'jessjelly'
        postArticleComment(article_id, userLoggedIn, newComment)
        .then(() => {
            setInfoMsg('Comment Posted! Please reload the page if you wish to add another comment.')
            setCommentsChanged((currCount) => {currCount++})
            // setTimeout(() => {
            //     setInfoMsg(null)
            // }, 5000)
        })
        .catch((error) => {
            setInfoMsg(`Sorry, there has been an issue with posting the comment. Error Message: "${error.response.data.msg}"`)
            setCommentsChanged((currCount) => {currCount++})
        })
    }

    const updateCommentText = (event) => {
        setNewComment(event.target.value)
    }

    return <div className="add-comment-card">
        <h3> Add a Comment: </h3>
        <form onSubmit={submitComment}>
            <label>
            Comment:
            <input
                value={newComment}
                onChange={(event) => updateCommentText(event)}
                type="text"
                name="commentBody"
                required
                />
            </label>
            {submitButton()}
        </form>
    </div>
}

export default AddComment