import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { getTopics } from "../api"

const CategoryBar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getTopics()
        .then((fetchedCategories) => {
            setCategories([{
                slug: 'All',
                description: 'All Categories'
            }, ...fetchedCategories])
        })
    }, [])

    return <div>
        <h3>Categories</h3>
        <nav>
            {categories.map((category) => {
                return <Link key={category.description} 
                    to={`/articles?category=${category.slug}`}> 
                    {category.slug} </Link>
            })}
        </nav>
    </div>
}

export default CategoryBar