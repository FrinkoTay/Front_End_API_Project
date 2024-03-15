import { useState, useEffect } from "react"
import { getTopics } from "../api"

const SortBar = ({sortBy, setSortBy, order, setOrder}) => {
    const [categories, setCategories] = useState([])
    const [sortByMsg, setSortByMsg] = useState('')
    const [orderMsg, setOrderMsg] = useState('')

    useEffect(() => {
        sortBy ? setSortByMsg(`Sorting by: ${sortBy.displayName}`): ''
    }, [sortBy])

    useEffect(() => {
        order ? setOrderMsg(`Ordering by: ${order.displayName}`): ''
    }, [order])

    useEffect(() => {
        getTopics()
        .then((fetchedCategories) => {
            setCategories([{
                slug: 'All',
                description: 'All Categories'
            }, ...fetchedCategories])
        })
    }, [])

    return <div className="sort-by-box">
        <h2>Sort By:</h2>
        <p> {sortByMsg} </p>
        <button key='date' 
            onClick={() => {setSortBy({displayName:'Date', dbName:'created_at'})}}> 
            Date
        </button>
        <button key='comment_count' 
            onClick={() => {setSortBy({displayName:'Comment Count', dbName:'comment_count'})}}> 
            Comment Count
        </button>            
        <button key='votes' 
            onClick={() => {setSortBy({displayName:'Votes', dbName:'votes'})}}> 
            Votes
        </button>        
        <h3> Order: </h3>
        <p> {orderMsg} </p>
        <button key='Ascending' 
            onClick={() => {setOrder({displayName:'Ascending', dbName:'asc'})}}> 
            Ascending
        </button>   
        <button key='Descending' 
            onClick={() => {setOrder({displayName:'Descending', dbName:'desc'})}}> 
            Descending
        </button> 
    </div>
}

export default SortBar