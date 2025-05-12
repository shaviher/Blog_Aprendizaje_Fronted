import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/blog/v1", timeout: 30000, httpAgent: false});

export const listPublications = async (data = {}) => {
    try {
      const response = await apiClient.post('/publication/listPublications', data); 
      return response.data;
    } catch (error) {
      return { 
        error: true, 
        message: error.response?.data?.message || error.message 
      };
    }
  };


  export const getPublicationById = async (id) => {
    try {
      const response = await apiClient.get(`/publication/getPublicationById/${id}`);
      return response.data;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || error.message,
      };
    }
  };
  
  export const addComment = async (pid, { author, content  }) => {
    try {
      const response = await apiClient.post(
        `/comment/addComment/${pid}`,
        { autor, contenido }
      );
      return response.data;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || error.message,
      };
    }
  };