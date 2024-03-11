# Plan

### Routes

- /api/homepage
    functionality:
    - Welcoming message

- /api/articles
    functionality:
    - view list of all articles
    - sort articles

    endpoints:
    - GET /api/topics
    - GET /api/topics

- /api/articles/:articleId
    functionality:
    - view an individual article
    - view a list of comments associated with an article
    - vote on an article
    - post a new comment to an existing article
    - delete comments

    endpoints:
    - GET /api/articles/:article_id
    - GET /api/articles/:article_id/comments
    - POST /api/articles/:article_id/comments
    - PATCH /api/articles/:article_id
    - DELETE /api/comments/:comment_id

- /api/articles/topics/:topic
    functionality:
    - view a seperate page for each topic with a list of related articles
    - sort articles
    
    endpoints:
    - GET /api/articles?topic=<topic>