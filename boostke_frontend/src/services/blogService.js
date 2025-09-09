// Blog API Service - Handles all backend communication for the blog
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class BlogService {
  // Helper method for making API requests
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}/blog${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all blog posts with pagination and filtering
  async getPosts({
    page = 1,
    limit = 9,
    category = '',
    search = '',
    sort = 'newest',
    featured = false
  } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
    });

    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (featured) params.append('featured', 'true');

    return this.makeRequest(`/posts?${params}`);
  }

  // Get single blog post by ID
  async getPost(id) {
    return this.makeRequest(`/posts/${id}`);
  }

  // Get featured posts
  async getFeaturedPosts() {
    return this.makeRequest('/posts?featured=true&limit=3');
  }

  // Get popular posts
  async getPopularPosts(limit = 5) {
    return this.makeRequest(`/posts?sort=popular&limit=${limit}`);
  }

  // Get categories with post counts
  async getCategories() {
    return this.makeRequest('/categories');
  }

  // Like/unlike a post
  async toggleLike(postId, userId) {
    return this.makeRequest(`/posts/${postId}/like`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
    });
  }

  // Bookmark/unbookmark a post
  async toggleBookmark(postId, userId) {
    return this.makeRequest(`/posts/${postId}/bookmark`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
    });
  }

  // Get comments for a post
  async getComments(postId) {
    return this.makeRequest(`/posts/${postId}/comments`);
  }

  // Add comment to a post
  async addComment(postId, userId, content) {
    return this.makeRequest(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        content: content,
      }),
    });
  }

  // Subscribe to newsletter
  async subscribeNewsletter(email) {
    return this.makeRequest('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Admin Methods (require authentication)
  
  // Create new blog post
  async createPost(postData, authToken) {
    return this.makeRequest('/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(postData),
    });
  }

  // Update blog post
  async updatePost(postId, postData, authToken) {
    return this.makeRequest(`/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(postData),
    });
  }

  // Delete blog post
  async deletePost(postId, authToken) {
    return this.makeRequest(`/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
  }

  // Get all posts for admin (including drafts)
  async getAdminPosts(authToken) {
    return this.makeRequest('/admin/posts', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
  }

  // Get blog analytics
  async getAnalytics(authToken) {
    return this.makeRequest('/analytics', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
  }
}

// Export singleton instance
const blogService = new BlogService();
export default blogService;
