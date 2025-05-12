import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import usePublication from "../../shared/hooks/usePublication.jsx";
import "../../assets/style.css";
import PropTypes from "prop-types";

export default function DetailPublication() {
  const { id } = useParams();
  const {
    publication,
    loading,
    error,
    addComment,
    isSubmitting,
  } = usePublication(id);

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [commentError, setCommentError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentError("");

    if (!author.trim() || !content.trim()) {
      setCommentError("Both fields are required");
      return;
    }

    const success = await addComment({ author, content });
    if (success) {
      setAuthor("");
      setContent("");
    } else {
      setCommentError("Error adding comment");
    }
  };

  if (loading) return <p>Loading publication...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!publication) return <p>Publication not found.</p>;

  return (
  <div className="publication-detail">
    {/* Título y descripción */}
    <h1 className="publication-title">{publication.title}</h1>
    <p className="publication-description">{publication.content}</p>

    {/* Metadatos */}
    <div className="publication-meta">
      <span className="meta-item">📅 {new Date(publication.date).toLocaleDateString()}</span>
      <span className="meta-item">📘 {publication.course}</span>
      <span className="meta-item">🏷️ {publication.category}</span>
    </div>

    {/* Comentarios */}
    <section className="comments-section">
      <h2 className="comments-title">Comments ({publication.comments.length})</h2>
      {publication.comments.length === 0 ? (
        <p className="no-comments">No comments yet</p>
      ) : (
        <ul className="comments-list">
          {publication.comments.map((c) => (
            <li key={c._id} className="comment">
              <strong>{c.author}</strong>
              <p>{c.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>

    {/* Formulario para agregar comentario */}
    <section className="comment-form">
      <h2 className="form-title">💬 Add a Comment</h2>

      {commentError && <p className="error-message">{commentError}</p>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Your username"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            maxLength={30}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment" className="form-label">Comment</label>
          <textarea
            id="comment"
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={500}
            className="form-textarea"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </section>

    {/* Enlace de regreso */}
    <Link to="/publications" className="back-link">
      ← Back to all publications
    </Link>
  </div>
);
};

DetailPublication.propTypes = {
  publication: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    course: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
          .isRequired,
      })
    ),
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  refetch: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};
