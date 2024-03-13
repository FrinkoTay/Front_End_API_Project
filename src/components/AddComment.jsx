import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { postArticleComment } from '../api';

const AddComment = ({ setComments, setAddCommentCount }) => {
    const { article_id } = useParams()
    const [infoMsg, setInfoMsg] = useState('')
    const [newComment, setNewComment] = useState('')

    const submitComment = (event) => {
        event.preventDefault()
        setComments((currComments) => {
            return [{
                author: 'jessjelly',
                body: newComment,
                votes: 0,
                comment_id: 0
            }, ...currComments]
        })
        // default user set to 'jessjelly'
        postArticleComment(article_id, 'jessjelly', newComment)
        .then(() => {
            setInfoMsg('Comment Posted!')
            setAddCommentCount((currCount) => {currCount++})
        })
        .catch((error) => {
            setInfoMsg(`Sorry, there has been an issue with posting the comment. Error Message: "${error.response.data.msg}"`)
            setAddCommentCount((currCount) => {currCount++})
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
            <button type="submit">Post Comment</button>
        </form>
        <p> {infoMsg} </p>
    </div>
}

export default AddComment