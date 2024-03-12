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

export const getCategories = () => {
    return shopApi.get('/categories')
    .then((response) => {
        return response.data
    })
}