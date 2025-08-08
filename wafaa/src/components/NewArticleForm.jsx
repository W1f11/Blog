import React, { useState } from 'react';

function NewArticleForm({ onAdd, onAddArticle }) {
  const addFn = onAdd || onAddArticle; // supporte les deux noms de prop
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !content.trim()) {
      setError("Tous les champs sont obligatoires !");
      return;
    }

    if (typeof addFn !== 'function') {
      console.error("Aucune fonction d'ajout fournie au composant NewArticleForm. Props reçues :", { onAdd, onAddArticle });
      setError("Impossible de publier : action introuvable.");
      return;
    }

    try {
      setSubmitting(true);
      const newArticle = { id: Date.now(), title: title.trim(), content: content.trim() };

      // Appel synchrone au parent (mise à jour d'état/localStorage)
      addFn(newArticle);

      // pour debug
      console.log("Nouvel article envoyé au parent :", newArticle);

      setTitle('');
      setContent('');
      setSuccess('Article publié avec succès !');
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'article :", err);
      setError("Une erreur est survenue lors de la publication.");
    } finally {
      // on garde un court délai visuel pour voir le message de loading si besoin
      setTimeout(() => setSubmitting(false), 250);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Publier un nouvel article</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
      /><br />

      <textarea
        placeholder="Contenu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={submitting}
      ></textarea><br />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Publication…' : 'Publier'}
      </button>
    </form>
  );
}

export default NewArticleForm;
