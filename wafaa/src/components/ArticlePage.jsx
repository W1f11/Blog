import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArticlePage.css'; // ✅ Import du fichier CSS


function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localArticles = JSON.parse(localStorage.getItem('articles')) || [];
    const localArticle = localArticles.find(a => a.id.toString() === id);

    if (localArticle) {
      setArticle(localArticle);
      setLoading(false);
    } else {
      // Si pas trouvé localement, essayer de le récupérer via l’API
      fetch(`https://dummyjson.com/posts/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Article non trouvé');
          return res.json();
        })
        .then(data => {
          setArticle(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Erreur:", error);
          setArticle(null);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!article) return <p>Article non trouvé</p>;

  return (
    <div className="article-container">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-body">{article.body || article.content}</p> {/* Affiche body ou content */}
      <Link to="/" className="back-button">← Retour</Link>
    </div>
  );
}

export default ArticlePage;
