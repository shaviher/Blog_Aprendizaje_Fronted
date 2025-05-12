import { useState, useCallback } from 'react';
import { addComment as apiAddComment } from '../../services/api.jsx';

export const useComment = (publicationId) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const addComment = useCallback(
    async ({ author, content }, refetch) => {
      if (!publicationId) return false;
      setIsSubmitting(true);
      setCommentError(null);
      try {
        const resp = await apiAddComment(publicationId, { author, content });
        if (resp.error) throw new Error(resp.message);
        if (refetch) refetch();
        return true;
      } catch (err) {
        setCommentError(err.message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [publicationId]
  );

  return {
    addComment,
    isSubmitting,
    commentError
  };
};
