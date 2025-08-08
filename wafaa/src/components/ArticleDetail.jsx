import React from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetail({ article, articles }) {
  const { id } = useParams();
  
  // If article is passed directly, use that
  // Otherwise find it from articles using id
  const displayedArticle = article || articles.find(a => a.id === parseInt(id));

  if (!displayedArticle) return <div>Article non trouvé</div>;

  return (
    <div>
      <h2>{displayedArticle.title}</h2>
      <p>{displayedArticle.content}</p>
    </div>
  );
}
export default ArticleDetail;  // Don't forget this export!
