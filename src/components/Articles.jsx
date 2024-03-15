import { getArticles, getTopics } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useParams } from 'react-router-dom';
import TopicBar from "./TopicBar";
import SortBar from "./SortBar";

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [isArticlesLoading, setIsArticlesLoading] = useState('')
    const [isTopicsLoading, setIsTopicsLoading] = useState('')
    const { topic } = useParams()
    const [sortBy, setSortBy] = useState({displayName:'Date', dbName:null})
    const [order, setOrder] = useState({displayName:'Descending', dbName:null})
    const [topicError, setTopicError] = useState('')

    useEffect(() => {
        setIsArticlesLoading('Loading articles...')
        getTopics()
        .then((fetchedTopics) => {
            setIsTopicsLoading('')
            const topicNames = fetchedTopics.map((category) => {
                return category.slug
            })
            if (!(topic === undefined) && !(topicNames.includes(topic))) {
                setTopicError(topic)
                return
            } else { setTopicError('') }
            setTopics([{
                slug: 'All',
                description: 'All Categories'
            }, ...fetchedTopics])
            return getArticles([
                {name: 'topic', value: topic}, 
                {name: 'sort_by', value: sortBy.dbName}, 
                {name: 'order', value: order.dbName}
            ])
        })
        .then((fetchedArticles) => {
            setArticles(fetchedArticles)
            setIsArticlesLoading('')
        })
    }, [topic, sortBy, order])

    const articlesToggle = () => {
        if (topicError) {
            return <h1> {`Error 404: ${topicError} is not a valid topic`} </h1>
        } else if (isArticlesLoading === '') {
            return articles.map((article) => {
                return <ArticleCard 
                key={article.article_id} 
                article={article}/>
            })
        } else {return ''}
    }

    return <header>
        <TopicBar topics={topics} 
            setTopics={setTopics} 
            isTopicsLoading={isTopicsLoading} 
            setIsTopicsLoading={setIsTopicsLoading}
        />
        <SortBar sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
        <h2> Articles: </h2>
        <h1> {isArticlesLoading} </h1>
        <div>
            {articlesToggle()}
        </div>
    </header>
}

export default Articles