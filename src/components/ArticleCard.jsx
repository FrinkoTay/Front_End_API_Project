import { Link } from 'react-router-dom'

const ArticleCard = ({article}) => {
    const articleDate = new Date(Date.parse(article.created_at))
    return <div className="article-card">
        <Link className='text-link' to={`/articles/${article.article_id}`}> <h3>{article.title}</h3>
        <p>Author: {article.author} </p>
        <p>Topic: {article.topic} </p>
        <p>Comments: {article.comment_count} </p>
        <p>Votes: {article.votes}</p>
        <p>Date: {articleDate.toUTCString()}</p>
        <img className="article-img" src={ article.article_img_url }></img>
        </Link>
    </div>
}

export default ArticleCard