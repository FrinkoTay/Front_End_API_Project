import { Link } from 'react-router-dom'

const ArticleCard = ({article}) => {
    return <div className="article-card">
        <Link className='text-link' to={`/articles/${article.article_id}`}> <h3>{article.title}</h3>
        <p>Author: {article.author} </p>
        <p>Topic: {article.topic} </p>
        <p>Comments: {article.comment_count} </p>
        <p>Votes: {article.votes}</p>
        <p>Date: {article.created_at}</p>
        <img className="article-img" src={ article.article_img_url }></img>
        </Link>
        {/*<Link to={`/${article.article_id}`}> See more... </Link>*/}
    </div>
}

export default ArticleCard