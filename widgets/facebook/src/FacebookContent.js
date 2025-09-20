import React, { Component } from 'react'

class FacebookContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      posts: [],
      pageInfo: null,
      currentPostIndex: 0,
      autoRefreshTimer: null
    }
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.loadFacebookContent()
    this.loadFacebookEmbedScript()
    if (this.props.data.autoRefresh) {
      this.startAutoRefresh()
    }
  }

  componentWillUnmount() {
    if (this.state.autoRefreshTimer) {
      clearInterval(this.state.autoRefreshTimer)
    }
  }

  loadFacebookEmbedScript = () => {
    // Load Facebook embed script if not already loaded
    if (!window.fbEmbedLoaded) {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js'
      script.async = true
      script.onload = () => {
        window.fbEmbedLoaded = true
        if (window.FB) {
          window.FB.init({
            appId: 'your-app-id', // This would be configured in production
            version: 'v18.0'
          })
        }
      }
      script.onerror = () => {
        this.setState({ error: 'Failed to load Facebook embed script', loading: false })
      }
      document.head.appendChild(script)
    } else {
      this.setState({ loading: false })
    }
  }

  loadFacebookContent = async () => {
    const { 
      pageId, 
      accessToken, 
      postLimit, 
      showImages, 
      showVideos, 
      showTextPosts, 
      showLinks,
      minLikes,
      minComments,
      minShares,
      keywords,
      excludeKeywords,
      dateRange,
      useGraphAPI,
      apiVersion,
      fields
    } = this.props.data

    if (!pageId) {
      this.setState({ 
        error: 'Please provide a Facebook page ID or username',
        loading: false 
      })
      return
    }

    try {
      let posts = []
      let pageInfo = null

      if (useGraphAPI && accessToken) {
        // Use Facebook Graph API
        const apiUrl = `https://graph.facebook.com/${apiVersion}/${pageId}/posts?access_token=${accessToken}&fields=${fields}&limit=${postLimit}`
        
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`Facebook API error: ${response.status}`)
        }
        
        const data = await response.json()
        posts = data.data || []

        // Get page info
        const pageUrl = `https://graph.facebook.com/${apiVersion}/${pageId}?access_token=${accessToken}&fields=name,picture,cover,about`
        const pageResponse = await fetch(pageUrl)
        if (pageResponse.ok) {
          pageInfo = await pageResponse.json()
        }
      } else {
        // Fallback to embed-based approach
        posts = await this.loadFacebookEmbeds()
      }

      // Filter posts based on configuration
      posts = posts.filter(post => {
        // Content type filters
        if (!showImages && post.type === 'photo') return false
        if (!showVideos && post.type === 'video') return false
        if (!showTextPosts && !post.type && !post.full_picture) return false
        if (!showLinks && post.type === 'link') return false
        
        // Engagement filters
        if (post.likes && post.likes.summary && post.likes.summary.total_count < minLikes) return false
        if (post.comments && post.comments.summary && post.comments.summary.total_count < minComments) return false
        if (post.shares && post.shares.count < minShares) return false
        
        // Date filter
        if (dateRange < 365) {
          const postDate = new Date(post.created_time)
          const cutoffDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000)
          if (postDate < cutoffDate) return false
        }
        
        // Keyword filters
        if (keywords.length > 0) {
          const text = `${post.message || ''} ${post.story || ''}`.toLowerCase()
          if (!keywords.some(keyword => text.includes(keyword.toLowerCase()))) return false
        }
        
        if (excludeKeywords.length > 0) {
          const text = `${post.message || ''} ${post.story || ''}`.toLowerCase()
          if (excludeKeywords.some(keyword => text.includes(keyword.toLowerCase()))) return false
        }
        
        return true
      })

      this.setState({ 
        posts,
        pageInfo,
        loading: false,
        currentPostIndex: 0
      })
    } catch (error) {
      this.setState({ 
        error: `Error loading Facebook content: ${error.message}`,
        loading: false 
      })
    }
  }

  loadFacebookEmbeds = async () => {
    // Fallback method for when Graph API is not available
    // This would typically involve scraping or using embed codes
    // For now, return empty array as this requires more complex implementation
    return []
  }

  startAutoRefresh = () => {
    const { refreshInterval } = this.props.data
    const timer = setInterval(() => {
      this.loadFacebookContent()
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
    const diff = now - (new Date(timestamp).getTime() / 1000)
    const minutes = Math.floor(diff / 60)
    const hours = Math.floor(diff / 3600)
    const days = Math.floor(diff / 86400)
    
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  formatCount = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
    return count.toString()
  }

  renderPost = (post, index) => {
    const { 
      showAuthor, 
      showLikes, 
      showComments, 
      showShares, 
      showTime, 
      showPageName,
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
      <div key={post.id} className="facebook-post">
        {/* Post Header */}
        <div className="post-header">
          {showPageName && this.state.pageInfo && (
            <div className="page-info">
              <img 
                src={this.state.pageInfo.picture?.data?.url} 
                alt={this.state.pageInfo.name}
                className="page-avatar"
              />
              <span className="page-name">{this.state.pageInfo.name}</span>
            </div>
          )}
          {showTime && (
            <span className="time">
              {this.formatTime(post.created_time)}
            </span>
          )}
        </div>

        {/* Post Content */}
        <div className="post-content">
          {/* Post Text */}
          {post.message && (
            <div className="post-text">
              {truncateText && post.message.length > maxTextLength 
                ? `${post.message.substring(0, maxTextLength)}...`
                : post.message
              }
            </div>
          )}

          {/* Post Image */}
          {post.full_picture && (
            <div className="post-image">
              <img 
                src={post.full_picture} 
                alt={post.message || 'Facebook post'}
                style={{ maxHeight: embedHeight }}
              />
            </div>
          )}

          {/* Post Link */}
          {post.link && (
            <div className="post-link">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.link}
              </a>
            </div>
          )}

          {/* Facebook Embed */}
          {showEmbedPreview && post.id && (
            <div className="facebook-embed">
              <div 
                className="fb-post" 
                data-href={`https://www.facebook.com/${this.props.data.pageId}/posts/${post.id}`}
                data-width="500"
                data-show-text="true"
              />
            </div>
          )}
        </div>

        {/* Post Footer */}
        <div className="post-footer">
          {showLikes && post.likes && (
            <span className="likes">
              👍 {this.formatCount(post.likes.summary?.total_count || 0)}
            </span>
          )}
          {showComments && post.comments && (
            <span className="comments">
              💬 {this.formatCount(post.comments.summary?.total_count || 0)}
            </span>
          )}
          {showShares && post.shares && (
            <span className="shares">
              🔄 {this.formatCount(post.shares.count || 0)}
            </span>
          )}
        </div>

        <style jsx>{`
          .facebook-post {
            padding: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .post-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e4e6ea;
          }
          
          .page-info {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .page-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }
          
          .page-name {
            font-weight: bold;
            color: ${textColor};
          }
          
          .time {
            font-size: 12px;
            color: #8a8d91;
          }
          
          .post-text {
            color: ${textColor};
            line-height: 1.5;
            margin-bottom: 15px;
            font-size: 14px;
          }
          
          .post-image img {
            max-width: 100%;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          
          .post-link {
            margin-bottom: 15px;
          }
          
          .post-link a {
            color: ${linkColor};
            text-decoration: none;
            font-size: 14px;
          }
          
          .post-link a:hover {
            text-decoration: underline;
          }
          
          .facebook-embed {
            margin: 15px 0;
          }
          
          .post-footer {
            display: flex;
            gap: 20px;
            margin-top: auto;
            padding-top: 15px;
            border-top: 1px solid #e4e6ea;
            font-size: 14px;
            color: #8a8d91;
          }
          
          .likes, .comments, .shares {
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
      <div className="facebook-navigation">
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
      layout,
      showPageCover,
      pageInfo
    } = this.props.data

    if (loading) {
      return (
        <div className="facebook-widget loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Facebook content...</p>
          </div>
          <style jsx>{`
            .facebook-widget {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${backgroundColor};
            }
            .loading-spinner {
              text-align: center;
              color: ${this.props.data.textColor};
            }
            .spinner {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #1877f2;
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
        <div className="facebook-widget error">
          <div className="error-message">
            <h3>🚫 Facebook Error</h3>
            <p>{error}</p>
            <button onClick={this.loadFacebookContent} className="retry-btn">
              Retry
            </button>
          </div>
          <style jsx>{`
            .facebook-widget {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${backgroundColor};
            }
            .error-message {
              text-align: center;
              color: ${this.props.data.textColor};
              padding: 20px;
            }
            .retry-btn {
              background: #1877f2;
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
        <div className="facebook-widget empty">
          <div className="empty-message">
            <h3>📱 No Facebook Posts</h3>
            <p>No posts found matching your criteria.</p>
            <button onClick={this.loadFacebookContent} className="retry-btn">
              Refresh
            </button>
          </div>
          <style jsx>{`
            .facebook-widget {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${backgroundColor};
            }
            .empty-message {
              text-align: center;
              color: ${this.props.data.textColor};
              padding: 20px;
            }
            .retry-btn {
              background: #1877f2;
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
        className={`facebook-widget ${displayMode} ${layout}`}
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
        {/* Page Cover */}
        {showPageCover && pageInfo && pageInfo.cover && (
          <div className="page-cover">
            <img src={pageInfo.cover.source} alt="Page cover" />
          </div>
        )}

        <div className="facebook-content">
          {posts.map((post, index) => this.renderPost(post, index))}
        </div>
        
        {this.renderNavigation()}

        <style jsx>{`
          .facebook-widget {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .facebook-widget.floating {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
          
          .page-cover {
            width: 100%;
            height: 120px;
            overflow: hidden;
          }
          
          .page-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .facebook-content {
            flex: 1;
            overflow: hidden;
          }
          
          .facebook-navigation {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 15px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 20px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
          }
          
          .nav-btn {
            background: #1877f2;
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
            background: #166fe5;
            transform: scale(1.1);
          }
          
          .nav-btn:disabled {
            background: #8a8d91;
            cursor: not-allowed;
            transform: none;
          }
          
          .post-counter {
            color: #1c1e21;
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

export default FacebookContent
