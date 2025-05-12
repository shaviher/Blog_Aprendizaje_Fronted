import { useState, useEffect, useCallback } from 'react';
import { getPublicationById, addComment as apiAddComment } from '../../services/api.jsx';

const usePublication = (id = '') => {
  const [publication, setPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPublication = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await getPublicationById(id);
      if (response.error) throw new Error(response.message);
      setPublication(response.publication);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPublication();
  }, [fetchPublication]);

  const handleAddComment = useCallback(
    async ({ author, content }) => {
      if (!id) return false;
      setIsSubmitting(true);
      setErrorMessage(null);
      try {
        const response = await apiAddComment(id, { author, content });
        if (response.error) throw new Error(response.message);

        await fetchPublication(); // Refetch the publication after adding the comment
        return true;
      } catch (err) {
        setErrorMessage(err.message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, fetchPublication]
  );

  return {
    publication,
    isLoading,
    errorMessage,
    refetch: fetchPublication,
    addComment: handleAddComment,
    isSubmitting
  };
};

export default usePublication;
