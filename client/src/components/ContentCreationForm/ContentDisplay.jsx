import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import './ContentDisplay.scss'; 

const ContentDisplay = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get(`/contents/${id}`);
        setTitle(response.data.title);
        setContent(DOMPurify.sanitize(response.data.body));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('You are not authorized to view this content.');
        } else {
          setError('Error fetching rich text content.');
        }
      }
    };

    fetchContent();
  }, [id]);

  if (error) {
    return <div className="content-error">{error}</div>;
  }

  return (
    <div className="content-container">
      <h2 className="content-title">{title}</h2>
      <div className="content-body" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ContentDisplay;
