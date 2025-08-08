// src/App.jsx
import { useState, useEffect } from 'react';
import ArticleList from './ArticleList';
import ArticleDetail from './ArticleDetail';
import NewArticleForm from './NewArticleForm';

import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');

    try {
      const parsedArticles = JSON.parse(savedArticles);

      if (Array.isArray(parsedArticles) && parsedArticles.length > 0) {
        setArticles(parsedArticles);
        setLoading(false);
      } else {
        throw new Error("Aucun article valide dans localStorage");
      }
    } catch { // <-- on omet la variable pour éviter le warning
      fetch('https://dummyjson.com/posts?limit=8')
        .then(res => res.json())
        .then(data => {
          const formatted = data.posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.body
          }));
          setArticles(formatted);
          localStorage.setItem('articles', JSON.stringify(formatted));
          setLoading(false);
        })
        .catch(error => {
          console.error("Erreur lors du chargement de l'API :", error);
          setLoading(false);
        });
    }
  }, []);

  const handleAddArticle = (newArticle) => {
    const articleWithId = { ...newArticle, id: Date.now() };
    const updated = [articleWithId, ...articles];
    setArticles(updated);
    localStorage.setItem('articles', JSON.stringify(updated));
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
  };

  const handleDeleteArticle = (id) => {
    const confirmDelete = window.confirm("Supprimer cet article ?");
    if (confirmDelete) {
      const updated = articles.filter(article => article.id !== id);
      setArticles(updated);
      localStorage.setItem('articles', JSON.stringify(updated));
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    }
  };

  return (
    <div className="App">
      <h1>Mon Blog</h1>

      {loading && <p>Chargement des articles...</p>}

      {!loading && (
        <>
          <NewArticleForm onAddArticle={handleAddArticle} />

          <ArticleList 
            articles={articles} 
            onSelect={handleSelectArticle} 
            onDelete={handleDeleteArticle} 
          />

          {selectedArticle && <ArticleDetail article={selectedArticle} />}
        </>
      )}
    </div>
  );
}

export default App;
