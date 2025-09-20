import React, { Component } from 'react'

class InstagramContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      posts: [],
      stories: [],
      profile: null,
      currentPostIndex: 0,
      currentStoryIndex: 0,
      autoRefreshTimer: null,
      storyTimer: null
    }
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.loadInstagramContent()
    this.loadInstagramEmbedScript()
    if (this.props.data.autoRefresh) {
      this.startAutoRefresh()
    }
    if (this.props.data.showStories && this.props.data.storyAutoAdvance) {
      this.startStoryTimer()
    }
  }

  componentWillUnmount() {
    if (this.state.autoRefreshTimer) {
      clearInterval(this.state.autoRefreshTimer)
    }
    if (this.state.storyTimer) {
      clearInterval(this.state.storyTimer)
    }
  }

  loadInstagramEmbedScript = () => {
    // Load Instagram embed script if not already loaded
    if (!window.instgrm) {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process()
        }
        this.setState({ loading: false })
      }
      script.onerror = () => {
        this.setState({ error: 'Failed to load Instagram embed script', loading: false })
      }
      document.head.appendChild(script)
    } else {
      this.setState({ loading: false })
    }
  }

  loadInstagramContent = async () => {
    const { 
      username, 
      hashtag, 
      postType,
      postLimit,
      useInstagramAPI,
      accessToken,
      useManualMode,
      manualPosts
    } = this.props.data

    try {
      let posts = []
      let stories = []
      let profile = null

      if (useInstagramAPI && accessToken) {
        // Use Instagram Basic Display API
        posts = await this.fetchFromInstagramAPI()
      } else if (useManualMode && manualPosts.length > 0) {
        // Use manual configuration
        posts = manualPosts
      } else {
        // Fallback to embed-based approach
        posts = await this.loadInstagramEmbeds()
      }

      // Filter posts based on configuration
      posts = this.filterPosts(posts)

      this.setState({ 
        posts,
        stories,
        profile,
        loading: false,
        currentPostIndex: 0,
        currentStoryIndex: 0
      })
    } catch (error) {
      this.setState({ 
        error: `Error loading Instagram content: ${error.message}`,
        loading: false 
      })
    }
  }

  fetchFromInstagramAPI = async () => {
    const { 
      username, 
      hashtag, 
      postLimit,
      accessToken,
      apiVersion,
      includeMetrics,
      includeMedia
    } = this.props.data

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }

    let apiUrl = ''
    let params = new URLSearchParams()

    if (username) {
      // Get user media
      const userResponse = await fetch(`https://graph.instagram.com/${apiVersion}/me/media?access_token=${accessToken}`)
      if (!userResponse.ok) {
        throw new Error(`Instagram API error: ${userResponse.status}`)
      }
      
      const userData = await userResponse.json()
      posts = userData.data || []
    } else if (hashtag) {
      // Search for hashtag (requires Instagram Basic Display API)
      apiUrl = `https://graph.instagram.com/${apiVersion}/hashtag/${hashtag}/media`
      params.append('access_token', accessToken)
      params.append('fields', 'id,media_type,media_url,thumbnail_url,caption,timestamp,permalink')
      
      const response = await fetch(`${apiUrl}?${params.toString()}`)
      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status}`)
      }
      
      const data = await response.json()
      posts = data.data || []
    }

    return posts.slice(0, postLimit)
  }

  loadInstagramEmbeds = async () => {
    // Fallback method for when Instagram API is not available
    // This would typically involve using Instagram's embed API or mock data
    // For now, return empty array as this requires more complex implementation
    return []
  }

  filterPosts = (posts) => {
    const { 
      showImages, 
      showVideos, 
      showCarousel,
      showIGTV,
      showReels,
      minLikes,
      minComments,
      dateRange,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWords,
      allowedLanguages
    } = this.props.data

    return posts.filter(post => {
      // Content type filters
      if (!showImages && post.media_type === 'IMAGE') return false
      if (!showVideos && post.media_type === 'VIDEO') return false
      if (!showCarousel && post.media_type === 'CAROUSEL_ALBUM') return false
      if (!showIGTV && post.media_type === 'IGTV') return false
      if (!showReels && post.media_type === 'REELS') return false

      // Engagement filters
      if (post.like_count && post.like_count < minLikes) return false
      if (post.comments_count && post.comments_count < minComments) return false

      // Date filter
      if (dateRange < 365) {
        const postDate = new Date(post.timestamp)
        const cutoffDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000)
        if (postDate < cutoffDate) return false
      }

      // Content filters
      if (!showSensitiveContent && post.is_sensitive) return false

      // Word filters
      if (blockWords.length > 0) {
        const text = `${post.caption || ''}`.toLowerCase()
        if (blockWords.some(word => text.includes(word.toLowerCase()))) return false
      }

      return true
    })
  }

  startAutoRefresh = () => {
    const { refreshInterval } = this.props.data
    const timer = setInterval(() => {
      this.loadInstagramContent()
    }, refreshInterval * 1000)

    this.setState({ autoRefreshTimer: timer })
  }

  stopAutoRefresh = () => {
    if (this.state.autoRefreshTimer) {
      clearInterval(this.state.autoRefreshTimer)
      this.setState({ autoRefreshTimer: null })
    }
  }

  startStoryTimer = () => {
    const { storyDuration, storyAutoAdvance, storyLoop } = this.props.data
    const { stories } = this.state

    if (stories.length === 0) return

    const timer = setInterval(() => {
      this.setState(prevState => {
        const nextIndex = prevState.currentStoryIndex + 1
        if (nextIndex < prevState.stories.length) {
          return { currentStoryIndex: nextIndex }
        } else if (storyLoop) {
          return { currentStoryIndex: 0 }
        } else {
          clearInterval(timer)
          return null
        }
      })
    }, storyDuration)

    this.setState({ storyTimer: timer })
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
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  renderPost = (post, index) => {
    const { 
      showAuthor, 
      showUsername, 
      showTimestamp, 
      showEngagement,
      showVerified,
      showCaption,
      truncateCaption,
      maxCaptionLength,
      showHashtags,
      showMentions,
      showLocation,
      showProfilePicture,
      textColor,
      linkColor,
      accentColor
    } = this.props.data

    if (index !== this.state.currentPostIndex) return null

    return (
      <div key={post.id} className="instagram-post">
        {/* Post Header */}
        <div className="post-header">
          {showProfilePicture && (
            <img 
              src={post.profile_picture_url} 
              alt={post.username}
              className="profile-picture"
            />
          )}
          {showAuthor && (
            <div className="user-info">
              <span className="username">{post.username}</span>
              {showVerified && post.is_verified && (
                <span className="verified-badge">✓</span>
              )}
            </div>
          )}
          {showTimestamp && (
            <span className="post-time">
              {this.formatTime(post.timestamp)}
            </span>
          )}
        </div>

        {/* Post Media */}
        <div className="post-media">
          {post.media_type === 'IMAGE' && (
            <img src={post.media_url} alt={post.caption || 'Instagram post'} />
          )}
          {post.media_type === 'VIDEO' && (
            <video controls autoPlay muted loop>
              <source src={post.media_url} type="video/mp4" />
            </video>
          )}
          {post.media_type === 'CAROUSEL_ALBUM' && (
            <div className="carousel-container">
              <img src={post.media_url} alt={post.caption || 'Instagram carousel'} />
              {this.props.data.showCarouselIndicators && (
                <div className="carousel-indicators">
                  <span className="indicator active"></span>
                  <span className="indicator"></span>
                  <span className="indicator"></span>
                </div>
              )}
            </div>
          )}
          {post.media_type === 'IGTV' && (
            <div className="igtv-container">
              <video controls>
                <source src={post.media_url} type="video/mp4" />
              </video>
              <div className="igtv-label">IGTV</div>
            </div>
          )}
          {post.media_type === 'REELS' && (
            <div className="reels-container">
              <video controls autoPlay muted loop>
                <source src={post.media_url} type="video/mp4" />
              </video>
              <div className="reels-label">Reels</div>
            </div>
          )}
        </div>

        {/* Post Caption */}
        {showCaption && post.caption && (
          <div className="post-caption">
            <span className="caption-author">{post.username}</span>
            <span className="caption-text">
              {truncateCaption && post.caption.length > maxCaptionLength 
                ? `${post.caption.substring(0, maxCaptionLength)}...`
                : post.caption
              }
            </span>
          </div>
        )}

        {/* Post Footer */}
        <div className="post-footer">
          {showEngagement && (
            <>
              <span className="likes">
                ❤️ {this.formatCount(post.like_count || 0)}
              </span>
              <span className="comments">
                💬 {this.formatCount(post.comments_count || 0)}
              </span>
            </>
          )}
          
          {showLocation && post.location && (
            <span className="location">📍 {post.location.name}</span>
          )}
        </div>

        {/* Instagram Embed */}
        {this.props.data.showEmbedPreview && post.permalink && (
          <div className="instagram-embed">
            <blockquote 
              className="instagram-media"
              data-instgrm-permalink={post.permalink}
              data-instgrm-version="14"
            />
          </div>
        )}

        <style jsx>{`
          .instagram-post {
            padding: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .post-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #262626;
          }
          
          .profile-picture {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
          }
          
          .user-info {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .username {
            font-weight: bold;
            color: ${textColor};
            font-size: 14px;
          }
          
          .verified-badge {
            color: #0095f6;
            font-size: 14px;
          }
          
          .post-time {
            font-size: 12px;
            color: #8e8e8e;
            margin-left: auto;
          }
          
          .post-media {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }
          
          .post-media img, .post-media video {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
          }
          
          .carousel-container, .igtv-container, .reels-container {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .carousel-indicators {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 5px;
          }
          
          .indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
          }
          
          .indicator.active {
            background: ${accentColor};
          }
          
          .igtv-label, .reels-label {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
          
          .post-caption {
            margin-bottom: 15px;
            font-size: 14px;
            line-height: 1.4;
          }
          
          .caption-author {
            font-weight: bold;
            color: ${textColor};
            margin-right: 5px;
          }
          
          .caption-text {
            color: ${textColor};
          }
          
          .post-footer {
            display: flex;
            gap: 15px;
            margin-top: auto;
            padding-top: 15px;
            border-top: 1px solid #262626;
            font-size: 14px;
            color: #8e8e8e;
          }
          
          .likes, .comments, .location {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .instagram-embed {
            margin: 15px 0;
          }
        `}</style>
      </div>
    )
  }

  renderGrid = () => {
    const { posts } = this.state
    const { gridColumns, gridGap, gridAspectRatio, gridHoverEffect } = this.props.data

    return (
      <div className="instagram-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: `${gridGap}px`
      }}>
        {posts.map((post, index) => (
          <div key={post.id} className={`grid-item ${gridHoverEffect ? 'hover-effect' : ''}`}>
            {post.media_type === 'IMAGE' && (
              <img src={post.media_url} alt={post.caption || 'Instagram post'} />
            )}
            {post.media_type === 'VIDEO' && (
              <video controls muted>
                <source src={post.media_url} type="video/mp4" />
              </video>
            )}
            {post.media_type === 'CAROUSEL_ALBUM' && (
              <div className="carousel-preview">
                <img src={post.media_url} alt={post.caption || 'Instagram carousel'} />
                <div className="carousel-icon">📷</div>
              </div>
            )}
            {post.media_type === 'REELS' && (
              <div className="reels-preview">
                <video muted>
                  <source src={post.media_url} type="video/mp4" />
                </video>
                <div className="reels-icon">🎬</div>
              </div>
            )}
            
            <div className="grid-overlay">
              <div className="engagement">
                <span>❤️ {this.formatCount(post.like_count || 0)}</span>
                <span>💬 {this.formatCount(post.comments_count || 0)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  renderNavigation = () => {
    const { posts, currentPostIndex } = this.state
    const { showControls, layout } = this.props.data

    if (posts.length <= 1 || !showControls || layout === 'grid') return null

    return (
      <div className="instagram-navigation">
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
        <div className="instagram-widget loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Instagram content...</p>
          </div>
          <style jsx>{`
            .instagram-widget {
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
              border: 4px solid #262626;
              border-top: 4px solid #c13584;
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
        <div className="instagram-widget error">
          <div className="error-message">
            <h3>📷 Instagram Error</h3>
            <p>{error}</p>
            <button onClick={this.loadInstagramContent} className="retry-btn">
              Retry
            </button>
          </div>
          <style jsx>{`
            .instagram-widget {
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
              background: #c13584;
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
        <div className="instagram-widget empty">
          <div className="empty-message">
            <h3>📷 No Instagram Posts</h3>
            <p>No posts found matching your criteria.</p>
            <button onClick={this.loadInstagramContent} className="retry-btn">
              Refresh
            </button>
          </div>
          <style jsx>{`
            .instagram-widget {
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
              background: #c13584;
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
        className={`instagram-widget ${displayMode} ${layout}`}
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
        <div className="instagram-content">
          {layout === 'grid' ? this.renderGrid() : posts.map((post, index) => this.renderPost(post, index))}
        </div>
        
        {this.renderNavigation()}

        <style jsx>{`
          .instagram-widget {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .instagram-widget.floating {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
          
          .instagram-content {
            flex: 1;
            overflow: hidden;
            padding: 20px;
          }
          
          .instagram-grid {
            width: 100%;
            height: 100%;
          }
          
          .grid-item {
            position: relative;
            aspect-ratio: 1;
            overflow: hidden;
            border-radius: 8px;
            cursor: pointer;
          }
          
          .grid-item img, .grid-item video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .grid-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .grid-item:hover .grid-overlay {
            opacity: 1;
          }
          
          .engagement {
            color: white;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            gap: 15px;
          }
          
          .carousel-preview, .reels-preview {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .carousel-icon, .reels-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
          }
          
          .instagram-navigation {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 15px;
            background: rgba(0, 0, 0, 0.8);
            padding: 10px 20px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
          }
          
          .nav-btn {
            background: #c13584;
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
            background: #a0286a;
            transform: scale(1.1);
          }
          
          .nav-btn:disabled {
            background: #262626;
            cursor: not-allowed;
            transform: none;
          }
          
          .post-counter {
            color: ${this.props.data.textColor};
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

export default InstagramContent
