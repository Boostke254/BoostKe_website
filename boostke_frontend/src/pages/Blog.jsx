import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../css/blog.css';
import blogService from '../services/blogService';
import NewsletterSignup from '../components/NewsletterSignup';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  FiberNew as FiberNewIcon,
  Star as StarIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
  FilterList as FilterListIcon,
  Article as ArticleIcon
} from '@mui/icons-material';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesData = await blogService.getCategories();
        const allCategory = { id: 'all', name: 'All Posts', count: 0 };
        const totalCount = categoriesData.reduce((sum, cat) => sum + (cat.post_count || 0), 0);
        allCategory.count = totalCount;
        setCategories([allCategory, ...categoriesData.map(cat => ({
          id: cat.slug,
          name: cat.name,
          count: cat.post_count || 0
        }))]);

        // Fetch featured posts
        const featuredData = await blogService.getFeaturedPosts();
        setFeaturedPosts(featuredData.posts || []);

        // Fetch all posts
        await fetchPosts();
        
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch posts based on current filters
  const fetchPosts = async () => {
    try {
      const data = await blogService.getPosts({
        page: currentPage,
        limit: postsPerPage,
        category: selectedCategory === 'all' ? '' : selectedCategory,
        search: searchTerm,
        sort: sortBy
      });
      
      setPosts(data.posts || []);
      // Update pagination info if provided by API
      if (data.pagination) {
        // Handle pagination from API response
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  // Refetch posts when filters change
  useEffect(() => {
    if (!loading) {
      fetchPosts();
    }
  }, [selectedCategory, sortBy, searchTerm, currentPage]);

  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case 'popular':
        return b.views - a.views;
      case 'liked':
        return b.likes - a.likes;
      default: // newest
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="blog-loader">
        <div className="loader-spinner"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog | BoostKe - Insights, Stories & Updates</title>
        <meta name="description" content="Stay updated with the latest insights, success stories, and updates from the BoostKe ecosystem. Discover tips, tutorials, and industry trends." />
        <meta name="keywords" content="BoostKe blog, Kenya business, digital marketplace, e-commerce tips, success stories, technology" />
        <meta property="og:title" content="BoostKe Blog - Insights & Stories" />
        <meta property="og:description" content="Stay updated with the latest insights from Kenya's leading digital marketplace." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <div className="blog-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <ArticleIcon className="hero-icon" />
              BoostKe Insights
            </h1>
            <p>Discover stories, insights, and updates from Kenya's leading digital marketplace ecosystem</p>
          </div>
          <div className="hero-search">
            <div className="search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search articles, tutorials, stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <section className="featured-section">
        <div className="section-header">
          <h2>
            <StarIcon />
            Featured Stories
          </h2>
          <p>Highlighted content from our community</p>
        </div>
        
        <div className="featured-grid">
          {featuredPosts.map((post, index) => (
            <NavLink 
              key={post.id} 
              to={`/blog/${post.id}`}
              className={`featured-card ${index === 0 ? 'featured-main' : ''}`}
            >
              <div className="featured-image">
                <img src={post.image} alt={post.title} />
                <div className="featured-badge">Featured</div>
              </div>
              <div className="featured-content">
                <div className="post-meta">
                  <span className="category">{post.category}</span>
                  <span className="read-time">
                    <AccessTimeIcon />
                    {post.readTime} min
                  </span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-footer">
                  <div className="author-info">
                    <PersonIcon />
                    <span>{post.author}</span>
                  </div>
                  <div className="post-stats">
                    <span>
                      <VisibilityIcon />
                      {post.views}
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="blog-main-content">
        {/* Sidebar */}
        <aside className="blog-sidebar">
          {/* Categories */}
          <div className="sidebar-section">
            <h3>
              <CategoryIcon />
              Categories
            </h3>
            <div className="categories-list">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="count">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Posts */}
          <div className="sidebar-section">
            <h3>
              <TrendingUpIcon />
              Trending Now
            </h3>
            <div className="popular-posts">
              {posts
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((post) => (
                  <NavLink 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="popular-post"
                  >
                    <img src={post.image} alt={post.title} />
                    <div className="popular-content">
                      <h4>{post.title}</h4>
                      <div className="popular-meta">
                        <span className="views">
                          <VisibilityIcon />
                          {post.views}
                        </span>
                        <span className="read-time">
                          {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>

          {/* Newsletter */}
          <NewsletterSignup className="sidebar-section newsletter" />
        </aside>

        {/* Posts Grid */}
        <div className="posts-content">
          {/* Filters */}
          <div className="posts-filters">
            <div className="filter-group">
              <FilterListIcon />
              <span>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Viewed</option>
                <option value="liked">Most Liked</option>
              </select>
            </div>
            <div className="results-count">
              Showing {currentPosts.length} of {sortedPosts.length} posts
            </div>
          </div>

          {/* Posts Grid */}
          <div className="posts-grid">
            {currentPosts.map((post) => (
              <NavLink 
                key={post.id} 
                to={`/blog/${post.id}`}
                className="post-card"
              >
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  {post.featured && <div className="featured-badge">Featured</div>}
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="category">{post.category}</span>
                    <span className="date">
                      <CalendarTodayIcon />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-footer">
                    <div className="author-info">
                      <PersonIcon />
                      <span>{post.author}</span>
                    </div>
                    <div className="post-stats">
                      <span>
                        <AccessTimeIcon />
                        {post.readTime} min
                      </span>
                      <span>
                        <VisibilityIcon />
                        {post.views}
                      </span>
                    </div>
                  </div>
                  <div className="read-more">
                    Read More
                    <ArrowForwardIcon />
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
