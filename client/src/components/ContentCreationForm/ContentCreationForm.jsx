import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ContentCreationForm.scss';
import api from "../../utils/api";
import useMessage from "../../hooks/useMessage";

const ContentCreationForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("draft");
  const { handleMessage } = useMessage();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please fill out all required fields.");
      return;
    }
    const formData = {
      title,
      body,
      status,
    };
    try {
    const response = await api.post('/contents', formData)
    handleMessage(response.data)
    navigate("/");
    } catch(error) {
      handleMessage(error.response.data)
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <h1>Create New Content</h1>
      <form className="content-creation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="label">Title:</label>
          <input type="text" id="title" className="input" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="body" className="label">Body:</label>
          <ReactQuill 
            id="body" 
            modules={modules} 
            formats={formats} 
            theme="snow" 
            value={body} 
            onChange={handleBodyChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="status" className="label">Status:</label>
          <select id="status" className="select" value={status} onChange={handleStatusChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="button-group">
          <button type="button" className="button cancel-button" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="button create-button">Create Content</button>
        </div>
      </form>
    </div>
  );
};

export default ContentCreationForm;
