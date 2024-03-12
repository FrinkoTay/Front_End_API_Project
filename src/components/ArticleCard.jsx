const ArticleCard = ({article}) => {
    return <div className="article-card">
        <h3>{article.title}</h3>
        <p>Author: {article.author} </p>
        <p>Topic: {article.topic} </p>
        <p>Comments: {article.comment_count} </p>
        <img className="article-img" src={ article.article_img_url }></img>
    </div>
}

export default ArticleCard