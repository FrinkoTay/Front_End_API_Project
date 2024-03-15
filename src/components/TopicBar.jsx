import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { getTopics } from "../api"

const TopicBar = ({topics, setTopics, isTopicsLoading, setIsTopicsLoading}) => {

    const categoryLink = (category) => {
        if (category.slug === 'All') {
            return <Link key={category.description} 
                to={`/articles`}> 
                {category.slug} </Link>
        }
        return <Link key={category.description} 
            to={`/articles/topics/${category.slug}`}> 
            {category.slug} </Link>
    }

    useEffect(() => {
        setIsTopicsLoading('Loading topics...')
        getTopics()
        .then((fetchedCategories) => {
            setIsTopicsLoading('')
            setTopics([{
                slug: 'All',
                description: 'All Categories'
            }, ...fetchedCategories])
        })
    }, [])

    return <div className="topic-box">
        <h2>Topics</h2>
        <h3> {isTopicsLoading} </h3>
        <nav>
            {topics.map((category) => {
                return categoryLink(category)
            })}
        </nav>
    </div>
}

export default TopicBar