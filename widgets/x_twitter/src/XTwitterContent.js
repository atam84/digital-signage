import React, { Component } from 'react'

class XTwitterContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      tweets: [],
      trending: [],
      currentTweetIndex: 0,
      autoRefreshTimer: null,
      streamConnection: null
    }
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.loadTwitterContent()
    this.loadTwitterEmbedScript()
    if (this.props.data.autoRefresh) {
      this.startAutoRefresh()
    }
    if (this.props.data.enableStreaming) {
      this.startStreaming()
    }
  }

  componentWillUnmount() {
    if (this.state.autoRefreshTimer) {
      clearInterval(this.state.autoRefreshTimer)
    }
    if (this.state.streamConnection) {
      this.state.streamConnection.close()
    }
  }

  loadTwitterEmbedScript = () => {
    // Load Twitter embed script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.onload = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load()
        }
        this.setState({ loading: false })
      }
      script.onerror = () => {
        this.setState({ error: 'Failed to load Twitter embed script', loading: false })
      }
      document.head.appendChild(script)
    } else {
      this.setState({ loading: false })
    }
  }

  loadTwitterContent = async () => {
    const { 
      username, 
      hashtag, 
      searchQuery, 
      tweetType,
      tweetLimit,
      bearerToken,
      useTwitterAPI,
      apiVersion
    } = this.props.data

    try {
      let tweets = []

      if (useTwitterAPI && bearerToken) {
        // Use Twitter API v2
        tweets = await this.fetchFromTwitterAPI()
      } else {
        // Fallback to embed-based approach or mock data
        tweets = await this.loadTwitterEmbeds()
      }

      // Filter tweets based on configuration
      tweets = this.filterTweets(tweets)

      this.setState({ 
        tweets,
        loading: false,
        currentTweetIndex: 0
      })
    } catch (error) {
      this.setState({ 
        error: `Error loading Twitter content: ${error.message}`,
        loading: false 
      })
    }
  }

  fetchFromTwitterAPI = async () => {
    const { 
      username, 
      hashtag, 
      searchQuery, 
      tweetType,
      tweetLimit,
      bearerToken,
      apiVersion,
      includeMetrics,
      includeMedia
    } = this.props.data

    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }

    let apiUrl = ''
    let params = new URLSearchParams()

    if (tweetType === 'timeline' && username) {
      // Get user timeline
      const userResponse = await fetch(`https://api.twitter.com/${apiVersion}/users/by/username/${username}`, { headers })
      const userData = await userResponse.json()
      
      if (userData.data) {
        apiUrl = `https://api.twitter.com/${apiVersion}/users/${userData.data.id}/tweets`
        params.append('max_results', Math.min(tweetLimit, 100))
        params.append('tweet.fields', 'created_at,public_metrics,attachments,context_annotations')
        if (includeMetrics) params.append('tweet.fields', 'public_metrics')
        if (includeMedia) params.append('expansions', 'attachments.media_keys')
      }
    } else if (tweetType === 'hashtag' && hashtag) {
      // Search for hashtag
      apiUrl = 'https://api.twitter.com/2/tweets/search/recent'
      params.append('query', `#${hashtag}`)
      params.append('max_results', Math.min(tweetLimit, 100))
      params.append('tweet.fields', 'created_at,public_metrics,attachments,context_annotations')
    } else if (tweetType === 'search' && searchQuery) {
      // Custom search
      apiUrl = 'https://api.twitter.com/2/tweets/search/recent'
      params.append('query', searchQuery)
      params.append('max_results', Math.min(tweetLimit, 100))
      params.append('tweet.fields', 'created_at,public_metrics,attachments,context_annotations')
    } else if (tweetType === 'trending') {
      // Get trending topics (this requires different endpoint)
      apiUrl = 'https://api.twitter.com/1.1/trends/place.json'
      params.append('id', '1') // Worldwide trends
    }

    if (apiUrl) {
      const response = await fetch(`${apiUrl}?${params.toString()}`, { headers })
      if (!response.ok) {
        throw new Error(`Twitter API error: ${response.status}`)
      }
      
      const data = await response.json()
      return data.data || []
    }

    return []
  }

  loadTwitterEmbeds = async () => {
    // Fallback method for when Twitter API is not available
    // This would typically involve using Twitter's embed API or mock data
    // For now, return empty array as this requires more complex implementation
    return []
  }

  filterTweets = (tweets) => {
    const { 
      showImages, 
      showVideos, 
      showRetweets, 
      showReplies, 
      showQuotes,
      minLikes,
      minRetweets,
      minReplies,
      language,
      excludeRetweets,
      excludeReplies,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWords,
      allowedLanguages
    } = this.props.data

    return tweets.filter(tweet => {
      // Content type filters
      if (!showImages && tweet.attachments?.media?.some(media => media.type === 'photo')) return false
      if (!showVideos && tweet.attachments?.media?.some(media => media.type === 'video')) return false
      if (!showRetweets && tweet.text?.startsWith('RT @')) return false
      if (!showReplies && tweet.referenced_tweets?.some(ref => ref.type === 'replied_to')) return false
      if (!showQuotes && tweet.referenced_tweets?.some(ref => ref.type === 'quoted')) return false

      // Engagement filters
      if (tweet.public_metrics) {
        if (tweet.public_metrics.like_count < minLikes) return false
        if (tweet.public_metrics.retweet_count < minRetweets) return false
        if (tweet.public_metrics.reply_count < minReplies) return false
      }

      // Language filters
      if (allowedLanguages.length > 0 && tweet.lang && !allowedLanguages.includes(tweet.lang)) return false

      // Content filters
      if (excludeRetweets && tweet.text?.startsWith('RT @')) return false
      if (excludeReplies && tweet.referenced_tweets?.some(ref => ref.type === 'replied_to')) return false
      if (!showSensitiveContent && tweet.possibly_sensitive) return false

      // Word filters
      if (blockWords.length > 0) {
        const text = tweet.text?.toLowerCase() || ''
        if (blockWords.some(word => text.includes(word.toLowerCase()))) return false
      }

      return true
    })
  }

  startAutoRefresh = () => {
    const { refreshInterval } = this.props.data
    const timer = setInterval(() => {
      this.loadTwitterContent()
    }, refreshInterval * 1000)

    this.setState({ autoRefreshTimer: timer })
  }

  stopAutoRefresh = () => {
    if (this.state.autoRefreshTimer) {
      clearInterval(this.state.autoRefreshTimer)
      this.setState({ autoRefreshTimer: null })
    }
  }

  startStreaming = () => {
    // Real-time streaming implementation would go here
    // This requires WebSocket connection to Twitter's streaming API
    // For now, we'll implement a placeholder
    console.log('Streaming not implemented yet - requires WebSocket connection')
  }

  nextTweet = () => {
    const { tweets, currentTweetIndex } = this.state
    if (tweets.length === 0) return
    
    const nextIndex = (currentTweetIndex + 1) % tweets.length
    this.setState({ currentTweetIndex: nextIndex })
  }

  previousTweet = () => {
    const { tweets, currentTweetIndex } = this.state
    if (tweets.length === 0) return
    
    const prevIndex = currentTweetIndex === 0 ? tweets.length - 1 : currentTweetIndex - 1
    this.setState({ currentTweetIndex: prevIndex })
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

  renderTweet = (tweet, index) => {
    const { 
      showAuthor, 
      showUsername, 
      showTimestamp, 
      showEngagement,
      showVerified,
      truncateText,
      maxTextLength,
      showMedia,
      showTweetActions,
      textColor,
      linkColor,
      accentColor
    } = this.props.data

    if (index !== this.state.currentTweetIndex) return null

    return (
      <div key={tweet.id} className="twitter-tweet">
        {/* Tweet Header */}
        <div className="tweet-header">
          {showAuthor && (
            <div className="user-info">
              <img 
                src={tweet.author?.profile_image_url} 
                alt={tweet.author?.name}
                className="user-avatar"
              />
              <div className="user-details">
                <span className="user-name">{tweet.author?.name}</span>
                {showUsername && (
                  <span className="user-handle">@{tweet.author?.username}</span>
                )}
                {showVerified && tweet.author?.verified && (
                  <span className="verified-badge">✓</span>
                )}
              </div>
            </div>
          )}
          {showTimestamp && (
            <span className="tweet-time">
              {this.formatTime(tweet.created_at)}
            </span>
          )}
        </div>

        {/* Tweet Content */}
        <div className="tweet-content">
          <div className="tweet-text">
            {truncateText && tweet.text && tweet.text.length > maxTextLength 
              ? `${tweet.text.substring(0, maxTextLength)}...`
              : tweet.text
            }
          </div>

          {/* Tweet Media */}
          {showMedia && tweet.attachments?.media && (
            <div className="tweet-media">
              {tweet.attachments.media.map((media, idx) => (
                <div key={idx} className="media-item">
                  {media.type === 'photo' && (
                    <img src={media.url} alt="Tweet media" />
                  )}
                  {media.type === 'video' && (
                    <video controls>
                      <source src={media.variants?.[0]?.url} type="video/mp4" />
                    </video>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tweet Embed */}
          {this.props.data.showEmbedPreview && tweet.id && (
            <div className="twitter-embed">
              <blockquote 
                className="twitter-tweet"
                data-theme="dark"
                data-conversation="none"
              >
                <a href={`https://twitter.com/${tweet.author?.username}/status/${tweet.id}`}></a>
              </blockquote>
            </div>
          )}
        </div>

        {/* Tweet Footer */}
        <div className="tweet-footer">
          {showEngagement && tweet.public_metrics && (
            <>
              <span className="replies">
                💬 {this.formatCount(tweet.public_metrics.reply_count || 0)}
              </span>
              <span className="retweets">
                🔄 {this.formatCount(tweet.public_metrics.retweet_count || 0)}
              </span>
              <span className="likes">
                ❤️ {this.formatCount(tweet.public_metrics.like_count || 0)}
              </span>
            </>
          )}
          
          {showTweetActions && (
            <div className="tweet-actions">
              <button className="action-btn reply-btn">💬</button>
              <button className="action-btn retweet-btn">🔄</button>
              <button className="action-btn like-btn">❤️</button>
            </div>
          )}
        </div>

        <style jsx>{`
          .twitter-tweet {
            padding: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .tweet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #2f3336;
          }
          
          .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .user-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
          }
          
          .user-details {
            display: flex;
            flex-direction: column;
          }
          
          .user-name {
            font-weight: bold;
            color: ${textColor};
            font-size: 16px;
          }
          
          .user-handle {
            color: #8b98a5;
            font-size: 14px;
          }
          
          .verified-badge {
            color: #1d9bf0;
            font-size: 16px;
            margin-left: 5px;
          }
          
          .tweet-time {
            font-size: 12px;
            color: #8b98a5;
          }
          
          .tweet-text {
            color: ${textColor};
            line-height: 1.5;
            margin-bottom: 15px;
            font-size: 16px;
          }
          
          .tweet-media {
            margin-bottom: 15px;
          }
          
          .media-item img, .media-item video {
            max-width: 100%;
            border-radius: 8px;
          }
          
          .twitter-embed {
            margin: 15px 0;
          }
          
          .tweet-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-top: 15px;
            border-top: 1px solid #2f3336;
            font-size: 14px;
            color: #8b98a5;
          }
          
          .tweet-footer span {
            margin-right: 15px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .tweet-actions {
            display: flex;
            gap: 10px;
          }
          
          .action-btn {
            background: transparent;
            border: none;
            color: #8b98a5;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.2s ease;
          }
          
          .action-btn:hover {
            background: rgba(29, 155, 240, 0.1);
            color: #1d9bf0;
          }
        `}</style>
      </div>
    )
  }

  renderNavigation = () => {
    const { tweets, currentTweetIndex } = this.state
    const { showControls } = this.props.data

    if (tweets.length <= 1 || !showControls) return null

    return (
      <div className="twitter-navigation">
        <button 
          onClick={this.previousTweet}
          className="nav-btn prev-btn"
          disabled={tweets.length <= 1}
        >
          ⬅️
        </button>
        
        <div className="tweet-counter">
          {currentTweetIndex + 1} / {tweets.length}
        </div>
        
        <button 
          onClick={this.nextTweet}
          className="nav-btn next-btn"
          disabled={tweets.length <= 1}
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
        
        {this.props.data.enableStreaming && (
          <button 
            className="nav-btn stream-btn"
            title="Live streaming active"
          >
            🔴
          </button>
        )}
      </div>
    )
  }

  renderTrending = () => {
    const { showTrending, trendingLocation } = this.props.data
    const { trending } = this.state

    if (!showTrending || trending.length === 0) return null

    return (
      <div className="trending-section">
        <h3>Trending in {trendingLocation}</h3>
        <div className="trending-list">
          {trending.slice(0, 5).map((trend, index) => (
            <div key={index} className="trend-item">
              <span className="trend-rank">#{index + 1}</span>
              <span className="trend-name">{trend.name}</span>
              <span className="trend-volume">{trend.tweet_volume}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    const { loading, error, tweets } = this.state
    const { 
      displayMode, 
      floatingPosition, 
      backgroundColor, 
      borderColor, 
      borderWidth, 
      borderRadius,
      shadowStyle,
      layout,
      showTrending
    } = this.props.data

    if (loading) {
      return (
        <div className="twitter-widget loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Twitter content...</p>
          </div>
          <style jsx>{`
            .twitter-widget {
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
              border: 4px solid #2f3336;
              border-top: 4px solid #1d9bf0;
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
        <div className="twitter-widget error">
          <div className="error-message">
            <h3>🐦 Twitter Error</h3>
            <p>{error}</p>
            <button onClick={this.loadTwitterContent} className="retry-btn">
              Retry
            </button>
          </div>
          <style jsx>{`
            .twitter-widget {
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
              background: #1d9bf0;
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

    if (tweets.length === 0) {
      return (
        <div className="twitter-widget empty">
          <div className="empty-message">
            <h3>🐦 No Tweets Found</h3>
            <p>No tweets found matching your criteria.</p>
            <button onClick={this.loadTwitterContent} className="retry-btn">
              Refresh
            </button>
          </div>
          <style jsx>{`
            .twitter-widget {
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
              background: #1d9bf0;
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
        className={`twitter-widget ${displayMode} ${layout}`}
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
        {/* Trending Section */}
        {showTrending && this.renderTrending()}

        <div className="twitter-content">
          {tweets.map((tweet, index) => this.renderTweet(tweet, index))}
        </div>
        
        {this.renderNavigation()}

        <style jsx>{`
          .twitter-widget {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .twitter-widget.floating {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
          
          .trending-section {
            padding: 15px;
            border-bottom: 1px solid #2f3336;
            background: rgba(29, 155, 240, 0.1);
          }
          
          .trending-section h3 {
            color: ${this.props.data.textColor};
            margin: 0 0 10px 0;
            font-size: 14px;
          }
          
          .trending-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .trend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            background: rgba(255, 255, 255, 0.1);
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            color: ${this.props.data.textColor};
          }
          
          .trend-rank {
            font-weight: bold;
            color: #1d9bf0;
          }
          
          .twitter-content {
            flex: 1;
            overflow: hidden;
          }
          
          .twitter-navigation {
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
            background: #1d9bf0;
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
            background: #1a8cd8;
            transform: scale(1.1);
          }
          
          .nav-btn:disabled {
            background: #2f3336;
            cursor: not-allowed;
            transform: none;
          }
          
          .stream-btn {
            background: #e0245e !important;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          .tweet-counter {
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

export default XTwitterContent
