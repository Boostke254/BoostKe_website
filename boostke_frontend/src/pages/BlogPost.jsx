import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../css/blog.css';
import ShareButton from '../components/ShareButton';
import ReadingProgress from '../components/ReadingProgress';
import blogService from '../services/blogService';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Comment as CommentIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Article as ArticleIcon,
  LocalOffer as LocalOfferIcon
} from '@mui/icons-material';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [readTime, setReadTime] = useState(0);

  // Load post data from API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await blogService.getPost(postId);
        
        const postData = {
          ...data.post,
          author: {
            name: data.post.author_name,
            avatar: data.post.author_avatar,
            bio: data.post.author_bio
          },
          category: data.post.category_name,
          publishedAt: data.post.published_at,
          readTime: data.post.read_time,
          likes: data.post.likes_count || 0,
          views: data.post.views || 0,
          comments_count: data.post.comments_count || 0
        };
        
        setPost(postData);
        setLikes(postData.likes);
        setReadTime(postData.readTime);
        setRelatedPosts(data.relatedPosts || []);
        
        // Load comments
        const commentsData = await blogService.getComments(postId);
        setComments(commentsData || []);
        
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleLike = async () => {
    try {
      // You'll need to get the user ID from your auth context
      const userId = 1; // Replace with actual user ID from auth context
      const response = await blogService.toggleLike(postId, userId);
      
      setLiked(response.liked);
      setLikes(prev => response.liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      const userId = 1; // Replace with actual user ID from auth context
      const response = await blogService.toggleBookmark(postId, userId);
      
      setBookmarked(response.bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const userId = 1; // Replace with actual user ID from auth context
        const response = await blogService.addComment(postId, userId, newComment);
        
        // Add the new comment to the list
        const comment = {
          ...response.comment,
          author_name: "Current User", // Replace with actual user name
          created_at: new Date().toISOString()
        };
        
        setComments([comment, ...comments]);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('Failed to add comment. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="blog-loader">
        <div className="loader-spinner"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-error">
        <h2>Post not found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
        <NavLink to="/blog" className="btn-primary">Back to Blog</NavLink>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <ReadingProgress />
      
      <Helmet>
        <title>{post.title} | BoostKe Blog</title>
        <meta name="description" content={post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.title} />
        <meta property="og:image" content={post.featured_image} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Navigation */}
      <div className="blog-navigation">
        <button onClick={() => navigate('/blog')} className="back-btn">
          <ArrowBackIcon />
          Back to Blog
        </button>
      </div>

      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <div className="blog-meta">
            <span className="category">{post.category}</span>
            <div className="meta-items">
              <span className="meta-item">
                <CalendarTodayIcon />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              <span className="meta-item">
                <AccessTimeIcon />
                {readTime} min read
              </span>
              <span className="meta-item">
                <VisibilityIcon />
                {post.views} views
              </span>
            </div>
          </div>
          <h1 className="blog-title">{post.title}</h1>
          <div className="author-info">
            <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
            <div>
              <p className="author-name">{post.author.name}</p>
              <p className="author-bio">{post.author.bio}</p>
            </div>
          </div>
        </div>
        {post.featured_image && (
          <div className="blog-hero-image">
            <img src={post.featured_image} alt={post.title} />
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="blog-actions">
        <div className="action-group">
          <button 
            className={`action-btn ${liked ? 'active' : ''}`}
            onClick={handleLike}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span>{likes}</span>
          </button>
          
          <ShareButton 
            title={post.title}
            url={window.location.href}
            excerpt={post.title}
          />
          
          <button 
            className={`action-btn ${bookmarked ? 'active' : ''}`}
            onClick={handleBookmark}
          >
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            Save
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-main">
        <div className="blog-content-wrapper">
          {/* Article Content */}
          <article className="blog-article">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="blog-tags">
              <h4>Tags:</h4>
              <div className="tags-list">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <LocalOfferIcon />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="comments-section">
            <h3>
              <CommentIcon />
              Comments ({comments.length})
            </h3>
            
            {/* Comment Form */}
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows="4"
                />
              </div>
              <button type="submit" className="btn-primary">
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <PersonIcon />
                    <span className="comment-author">{comment.author_name || comment.author || 'Anonymous'}</span>
                    <span className="comment-time">
                      {new Date(comment.created_at || comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.content || comment.text}</p>
                </div>
              ))}
              
              {comments.length === 0 && (
                <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          {/* Related Posts */}
          <div className="sidebar-section">
            <h3>
              <TrendingUpIcon />
              Related Posts
            </h3>
            <div className="related-posts">
              {relatedPosts.map((relatedPost) => (
                <NavLink 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.id}`}
                  className="related-post"
                >
                  <img src={relatedPost.image} alt={relatedPost.title} />
                  <div className="related-post-content">
                    <h4>{relatedPost.title}</h4>
                    <p>{relatedPost.excerpt}</p>
                    <div className="related-post-meta">
                      <span className="category">{relatedPost.category}</span>
                      <span className="read-time">{relatedPost.readTime} min</span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="sidebar-section newsletter">
            <h3>Stay Updated</h3>
            <p>Get the latest insights from the BoostKe ecosystem delivered to your inbox.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;
