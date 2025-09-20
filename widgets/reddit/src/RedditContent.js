import React, { Component } from 'react'

class RedditContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      posts: [],
      currentPostIndex: 0,
      autoRefreshTimer: null
    }
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.loadRedditPosts()
    if (this.props.data.autoRefresh) {
      this.startAutoRefresh()
    }
  }

  componentWillUnmount() {
    if (this.state.autoRefreshTimer) {
      clearInterval(this.state.autoRefreshTimer)
    }
  }

  loadRedditPosts = async () => {
    const { 
      subreddit, 
      sortBy, 
      timeFilter, 
      postLimit, 
      showImages, 
      showVideos, 
      showTextPosts, 
      showNSFW,
      minScore,
      minComments,
      keywords,
      excludeKeywords,
      hideDeleted,
      hideRemoved,
      showStickied
    } = this.props.data

    try {
      // Reddit API endpoint for getting posts
      const apiUrl = `https://www.reddit.com/r/${subreddit}/${sortBy}.json?limit=${postLimit}&t=${timeFilter}`
      
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`)
      }
      
      const data = await response.json()
      let posts = data.data.children.map(child => child.data)

      // Filter posts based on configuration
      posts = posts.filter(post => {
        // NSFW filter
        if (!showNSFW && post.over_18) return false
        
        // Content type filters
        if (!showImages && post.post_hint === 'image') return false
        if (!showVideos && (post.post_hint === 'video' || post.is_video)) return false
        if (!showTextPosts && !post.post_hint && !post.is_video) return false
        
        // Score and comments filter
        if (post.score < minScore) return false
        if (post.num_comments < minComments) return false
        
        // Deleted/removed filter
        if (hideDeleted && (post.selftext === '[deleted]' || post.title === '[deleted]')) return false
        if (hideRemoved && (post.selftext === '[removed]' || post.title === '[removed]')) return false
        
        // Sticky filter
        if (!showStickied && post.stickied) return false
        
        // Keyword filters
        if (keywords.length > 0) {
          const text = `${post.title} ${post.selftext}`.toLowerCase()
          if (!keywords.some(keyword => text.includes(keyword.toLowerCase()))) return false
        }
        
        if (excludeKeywords.length > 0) {
          const text = `${post.title} ${post.selftext}`.toLowerCase()
          if (excludeKeywords.some(keyword => text.includes(keyword.toLowerCase()))) return false
        }
        
        return true
      })

      this.setState({ 
        posts,
        loading: false,
        currentPostIndex: 0
      })
    } catch (error) {
      this.setState({ 
        error: `Error loading Reddit posts: ${error.message}`,
        loading: false 
      })
    }
  }

  startAutoRefresh = () => {
    const { refreshInterval } = this.props.data
    const timer = setInterval(() => {
      this.loadRedditPosts()
    }, refreshInterval * 1000)

    this.setState({ autoRefreshTimer: timer })
  }

  stopAutoRefresh = () => {
    if (this.state.autoRefreshTimer) {
      clearInterval(this.state.autoRefreshTimer)
      this.setState({ autoRefreshTimer: null })
    }
  }

  nextPost = () => {
    const { posts, currentPostIndex } = this.state
    if (posts.length === 0) return
    
    const nextIndex = (currentPostIndex + 1) % posts.length
    this.setState({ currentPostIndex: nextIndex })
  }

  previousPost = () => {
    const { posts, currentPostIndex } = this.state
    if (posts.length === 0) return
    
    const prevIndex = currentPostIndex === 0 ? posts.length - 1 : currentPostIndex - 1
    this.setState({ currentPostIndex: prevIndex })
  }

  formatTime = (timestamp) => {
    const now = Date.now() / 1000
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60)
    const hours = Math.floor(diff / 3600)
    const days = Math.floor(diff / 86400)
    
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  formatScore = (score) => {
    if (score >= 1000) return `${(score / 1000).toFixed(1)}k`
    return score.toString()
  }

  renderPost = (post, index) => {
    const { 
      showAuthor, 
      showScore, 
      showComments, 
      showTime, 
      showSubreddit, 
      showFlair,
      truncateText,
      maxTextLength,
      embedMode,
      showEmbedPreview,
      embedHeight,
      textColor,
      linkColor,
      accentColor
    } = this.props.data

    if (index !== this.state.currentPostIndex) return null

    return (
      <div key={post.id} className="reddit-post">
        {/* Post Header */}
        <div className="post-header">
          {showSubreddit && (
            <span className="subreddit-name">
              r/{post.subreddit}
            </span>
          )}
          {showAuthor && (
            <span className="author">
              u/{post.author}
            </span>
          )}
          {showTime && (
            <span className="time">
              {this.formatTime(post.created_utc)}
            </span>
          )}
        </div>

        {/* Post Title */}
        <h3 className="post-title">
          {showFlair && post.link_flair_text && (
            <span className="flair">{post.link_flair_text}</span>
          )}
          {post.title}
        </h3>

        {/* Post Content */}
        <div className="post-content">
          {post.post_hint === 'image' && post.url && (
            <div className="post-image">
              <img 
                src={post.url} 
                alt={post.title}
                style={{ maxHeight: embedHeight }}
              />
            </div>
          )}
          
          {post.is_video && post.media && (
            <div className="post-video">
              <video 
                src={post.media.reddit_video.fallback_url}
                controls
                style={{ maxHeight: embedHeight }}
              />
            </div>
          )}
          
          {post.selftext && (
            <div className="post-text">
              {truncateText && post.selftext.length > maxTextLength 
                ? `${post.selftext.substring(0, maxTextLength)}...`
                : post.selftext
              }
            </div>
          )}

          {/* Reddit Embed */}
          {showEmbedPreview && post.permalink && (
            <div className="reddit-embed">
              <blockquote 
                className="reddit-embed" 
                data-embed-media="media" 
                data-embed-parent="false" 
                data-embed-live="true"
                data-embed-height={embedHeight}
              >
                <a href={`https://www.reddit.com${post.permalink}`}>
                  {post.title}
                </a>
              </blockquote>
            </div>
          )}
        </div>

        {/* Post Footer */}
        <div className="post-footer">
          {showScore && (
            <span className="score">
              🔥 {this.formatScore(post.score)}
            </span>
          )}
          {showComments && (
            <span className="comments">
              💬 {post.num_comments}
            </span>
          )}
        </div>

        <style jsx>{`
          .reddit-post {
            padding: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .post-header {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 12px;
            color: #888;
          }
          
          .subreddit-name {
            color: ${accentColor};
            font-weight: bold;
          }
          
          .author {
            color: ${textColor};
          }
          
          .post-title {
            font-size: 18px;
            font-weight: bold;
            color: ${textColor};
            margin: 0 0 15px 0;
            line-height: 1.3;
          }
          
          .flair {
            background: ${accentColor};
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 10px;
            margin-right: 8px;
          }
          
          .post-content {
            flex: 1;
            overflow-y: auto;
          }
          
          .post-image img,
          .post-video video {
            max-width: 100%;
            border-radius: 8px;
            margin: 10px 0;
          }
          
          .post-text {
            color: ${textColor};
            line-height: 1.5;
            margin: 10px 0;
          }
          
          .reddit-embed {
            margin: 10px 0;
          }
          
          .post-footer {
            display: flex;
            gap: 15px;
            margin-top: 15px;
            font-size: 14px;
            color: #888;
          }
          
          .score, .comments {
            display: flex;
            align-items: center;
            gap: 5px;
          }
        `}</style>
      </div>
    )
  }

  renderNavigation = () => {
    const { posts, currentPostIndex } = this.state
    const { showControls } = this.props.data

    if (posts.length <= 1 || !showControls) return null

    return (
      <div className="reddit-navigation">
        <button 
          onClick={this.previousPost}
          className="nav-btn prev-btn"
          disabled={posts.length <= 1}
        >
          ⬅️
        </button>
        
        <div className="post-counter">
          {currentPostIndex + 1} / {posts.length}
        </div>
        
        <button 
          onClick={this.nextPost}
          className="nav-btn next-btn"
          disabled={posts.length <= 1}
        >
          ➡️
        </button>
        
        {this.props.data.autoRefresh && (
          <button 
            onClick={this.state.autoRefreshTimer ? this.stopAutoRefresh : this.startAutoRefresh}
            className="nav-btn refresh-btn"
          >
            {this.state.autoRefreshTimer ? '⏸️' : '🔄'}
          </button>
        )}
      </div>
    )
  }

  render() {
    const { loading, error, posts } = this.state
    const { 
      displayMode, 
      floatingPosition, 
      backgroundColor, 
      borderColor, 
      borderWidth, 
      borderRadius,
      shadowStyle,
      layout
    } = this.props.data

    if (loading) {
      return (
        <div className="reddit-widget loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Reddit posts...</p>
          </div>
          <style jsx>{`
            .reddit-widget {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${backgroundColor};
            }
            .loading-spinner {
              text-align: center;
              color: white;
            }
            .spinner {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #ff4500;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )
    }

    if (error) {
      return (
        <div className="reddit-widget error">
          <div className="error-message">
            <h3>🚫 Reddit Error</h3>
            <p>{error}</p>
            <button onClick={this.loadRedditPosts} className="retry-btn">
              Retry
            </button>
          </div>
          <style jsx>{`
            .reddit-widget {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${backgroundColor};
            }
            .error-message {
              text-align: center;
              color: white;
              padding: 20px;
            }
            .retry-btn {
              background: #ff4500;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 10px;
            }
          `}</style>
        </div>
      )
    }

    if (posts.length === 0) {
      return (
        <div className="reddit-widget empty">
          <div className="empty-message">
            <h3>📱 No Reddit Posts</h3>
            <p>No posts found matching your criteria.</p>
            <button onClick={this.loadRedditPosts} className="retry-btn">
              Refresh
            </button>
          </div>
          <style jsx>{`
            .reddit-widget {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${backgroundColor};
            }
            .empty-message {
              text-align: center;
              color: white;
              padding: 20px;
            }
            .retry-btn {
              background: #ff4500;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 10px;
            }
          `}</style>
        </div>
      )
    }

    return (
      <div 
        ref={this.containerRef}
        className={`reddit-widget ${displayMode} ${layout}`}
        style={{
          backgroundColor,
          borderColor,
          borderWidth: `${borderWidth}px`,
          borderRadius: `${borderRadius}px`,
          boxShadow: shadowStyle === 'none' ? 'none' : 
                     shadowStyle === 'subtle' ? '0 2px 8px rgba(0,0,0,0.1)' :
                     shadowStyle === 'medium' ? '0 4px 16px rgba(0,0,0,0.2)' :
                     '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        <div className="reddit-content">
          {posts.map((post, index) => this.renderPost(post, index))}
        </div>
        
        {this.renderNavigation()}

        <style jsx>{`
          .reddit-widget {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .reddit-widget.floating {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
          
          .reddit-content {
            flex: 1;
            overflow: hidden;
          }
          
          .reddit-navigation {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 15px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px 20px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
          }
          
          .nav-btn {
            background: #ff4500;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.3s ease;
          }
          
          .nav-btn:hover {
            background: #ff6b33;
            transform: scale(1.1);
          }
          
          .nav-btn:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
          }
          
          .post-counter {
            color: white;
            font-weight: bold;
            font-size: 14px;
            min-width: 60px;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default RedditContent
