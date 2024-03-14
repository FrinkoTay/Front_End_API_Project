import axios from 'axios'

const shopApi = axios.create({
    baseURL: "https://back-end-api-project-render.onrender.com/api"
})

export const getArticles = (category) => {
    console.log('in getArticles')
    let endpoint = '/articles'
    if (category && category !== 'All') {
        endpoint += `?topic=${category}`
    }
    return shopApi.get(endpoint)
    .then((response) => {
        return response.data
    })
}

export const getTopics = () => {
    console.log('in getTopics')
    return shopApi.get('/topics')
    .then((response) => {
        return response.data
    })
}

export const getArticleById = (article_id) => {
    console.log('in getArticleByID')
    return shopApi.get(`/articles/${article_id}`)
    .then((response) => {
        return response.data
    })
}

export const getCommentsByArticleId = (article_id) => {
    console.log('in getCommentsByArticleId')
    return shopApi.get(`/articles/${article_id}/comments`)
    .then((response) => {
        return response.data
    })
}

export const patchArticleVotes = (article_id, increment) => {
    console.log('in patchArticleVotes')
    return shopApi.patch(`/articles/${article_id}`, {
        inc_votes: increment
    })
    .then((response) => {
        return response.data
    })
}

export const postArticleComment = (article_id, user, commentBody) => {
    return shopApi.post(`/articles/${article_id}/comments`, {
        username: user,
        body:commentBody
    })
}

export const deleteComment = (comment_id) => {
    return shopApi.delete(`/comments/${comment_id}`)
}