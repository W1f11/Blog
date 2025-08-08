import React from 'react';
import { Link } from 'react-router-dom';


function ArticleList({ articles,onDelete }) {
  console.log('Articles reçus par ArticleList :', articles); // 🔍

  return (
    <div id="articles-section">
      <h2  style={{ textAlign: 'center', fontSize: '28px', marginTop: '100px' }}>Liste des articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <Link to={`/article/${article.id}`}>
              <button
                style={{
                  backgroundColor: '#28a745', // Vert Bootstrap
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '5px'
                }}
              >
                Voir plus
              </button>
            </Link>

            <button
              onClick={() => onDelete(article.id)}
              style={{
                marginLeft: '10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '5px'
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
