import axios from 'axios'

const shopApi = axios.create({
    baseURL: "https://back-end-api-project-render.onrender.com/api"
})

export const getArticles = () => {
    console.log('in getArticles')
    return shopApi.get(`/articles`)
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