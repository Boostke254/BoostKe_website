import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const BlogAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured_image: '',
    author: '',
    published: false,
    featured: false
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: "Revolutionizing Kenya's Digital Marketplace",
        excerpt: "How BoostKe is transforming commerce...",
        category: "Business",
        author: "BoostKe Team",
        publishedAt: "2024-12-06",
        published: true,
        featured: true,
        views: 2340,
        likes: 156
      },
      {
        id: 2,
        title: "M-Pesa Integration Guide",
        excerpt: "Step-by-step integration process...",
        category: "Technology",
        author: "Tech Team",
        publishedAt: "2024-12-05",
        published: true,
        featured: false,
        views: 1890,
        likes: 98
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      // Update existing post
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...formData, updatedAt: new Date().toISOString() }
          : post
      ));
      setEditingPost(null);
    } else {
      // Create new post
      const newPost = {
        ...formData,
        id: Date.now(),
        publishedAt: new Date().toISOString(),
        views: 0,
        likes: 0
      };
      setPosts(prev => [newPost, ...prev]);
    }
    
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featured_image: '',
      author: '',
      published: false,
      featured: false
    });
    setShowCreateForm(false);
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingPost(post);
    setShowCreateForm(true);
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const togglePublished = (postId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, published: !post.published }
        : post
    ));
  };

  return (
    <div className="blog-admin">
      <div className="admin-header">
        <h1>Blog Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          <AddIcon />
          New Post
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUpIcon />
          </div>
          <div className="stat-content">
            <h3>{posts.length}</h3>
            <p>Total Posts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <VisibilityIcon />
          </div>
          <div className="stat-content">
            <h3>{posts.reduce((sum, post) => sum + post.views, 0)}</h3>
            <p>Total Views</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon published">
            <VisibilityIcon />
          </div>
          <div className="stat-content">
            <h3>{posts.filter(post => post.published).length}</h3>
            <p>Published</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon draft">
            <VisibilityOffIcon />
          </div>
          <div className="stat-content">
            <h3>{posts.filter(post => !post.published).length}</h3>
            <p>Drafts</p>
          </div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="admin-form-overlay">
          <div className="admin-form">
            <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                    <option value="Success Stories">Success Stories</option>
                    <option value="Tutorials">Tutorials</option>
                    <option value="Marketplace">Marketplace</option>
                    <option value="Franchise">Franchise</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Featured Image URL</label>
                  <input
                    type="url"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="15"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., Kenya, Technology, E-commerce"
                />
              </div>
              
              <div className="form-checkboxes">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                  />
                  <span>Publish immediately</span>
                </label>
                
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span>Featured post</span>
                </label>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingPost(null);
                    setFormData({
                      title: '',
                      excerpt: '',
                      content: '',
                      category: '',
                      tags: '',
                      featured_image: '',
                      author: '',
                      published: false,
                      featured: false
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>
                  <div className="post-title">
                    {post.title}
                    {post.featured && <span className="featured-badge">Featured</span>}
                  </div>
                </td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td>
                  <button
                    className={`status-btn ${post.published ? 'published' : 'draft'}`}
                    onClick={() => togglePublished(post.id)}
                  >
                    {post.published ? (
                      <>
                        <VisibilityIcon />
                        Published
                      </>
                    ) : (
                      <>
                        <VisibilityOffIcon />
                        Draft
                      </>
                    )}
                  </button>
                </td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
                <td>{new Date(post.publishedAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEdit(post)}
                    >
                      <EditIcon />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogAdmin;
