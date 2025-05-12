import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePublications from "../../shared/hooks/usePublications.jsx";
import PropTypes from "prop-types";
import "../../assets/style.css";

export const DashboardPublication = () => {
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setCategory(queryParams.get("category") || "");
    setCourse(queryParams.get("course") || "");
  }, [location]);

  const { publications, loading, error } = usePublications(category, course);

  const navigate = useNavigate();

  if (loading) return <p>Loading publications...</p>;
  if (error) return <p>Error loading publications: {error}</p>;
  if (!publications.length) return <p>No publications available.</p>;

  return (
    <div className="publications-container">
      {publications.map((pub) => (
        <article key={pub._id} className="publication-card">
          <h2
            className="publication-title"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/publications/${pub._id}`)}
          >
            {pub.title}
          </h2>
          <p className="publication-description">{pub.content}</p>
          <div className="publication-meta">
            <span className="publication-author">{pub.course}</span>
            <span className="publication-date">{pub.date}</span>
            <span className="publication-category">{pub.category}</span>
          </div>
        </article>
      ))}
    </div>
  );
};

DashboardPublication.propTypes = {
  category: PropTypes.string,
  course: PropTypes.string,
};

export default DashboardPublication;
