import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { getTopics } from "../api"

const TopicBar = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState('')

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
        setIsLoading('Loading...')
        getTopics()
        .then((fetchedCategories) => {
            setIsLoading('')
            setCategories([{
                slug: 'All',
                description: 'All Categories'
            }, ...fetchedCategories])
        })
    }, [])

    return <div className="topic-box">
        <h2>Topics</h2>
        <h3> {isLoading} </h3>
        <nav>
            {categories.map((category) => {
                return categoryLink(category)
            })}
        </nav>
    </div>
}

export default TopicBar