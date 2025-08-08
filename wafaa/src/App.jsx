// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import NewArticleForm from './components/NewArticleForm';
import ArticlePage from './components/ArticlePage';
import Footer from './components/Footer';


import { Routes, Route } from 'react-router-dom';
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
    } catch {
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
      <Navbar />
      <h1>Mon Blog</h1>

      <Routes>
        <Route path="/" element={
          <>
            {loading && <p>Chargement des articles...</p>}
            {!loading && (
              <>
                <NewArticleForm onAddArticle={handleAddArticle} />
                <ArticleList articles={articles} onDelete={handleDeleteArticle} />
                {selectedArticle && <ArticleDetail article={selectedArticle} />}
              </>
            )}
          </>
        } />
        <Route path="/article/:id" element={<ArticlePage articles={articles} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
