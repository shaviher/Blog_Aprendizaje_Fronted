import { useState, useEffect } from 'react';
import { listPublications } from './../../services/api.jsx';

const usePublications = (category = '', course = '') => {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const filters = {};
        if (category) filters.category = category.toUpperCase();
        if (course) filters.course = course.toUpperCase();

        const response = await listPublications(filters);
        
        if (response?.error) {
          setErrorMessage(response.message || "Error fetching publications");
        } else {
          setPublications(response?.publications || []);
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || err.message || "Connection error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, [category, course]);

  return { publications, isLoading, errorMessage };
};

export default usePublications;
