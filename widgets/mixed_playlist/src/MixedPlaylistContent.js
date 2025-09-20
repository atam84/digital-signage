import React, { Component } from 'react'
import axios from 'axios'

class MixedPlaylistContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      playlist: null,
      currentItemIndex: 0,
      currentItem: null,
      isPlaying: false,
      progress: 0,
      timeRemaining: 0,
      autoPlayTimer: null,
      progressTimer: null,
      refreshTimer: null
    }
    this.containerRef = React.createRef()
    this.itemRefs = {}
  }

  componentDidMount() {
    this.loadPlaylist()
    this.startAutoRefresh()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.playlistId !== this.props.data.playlistId) {
      this.loadPlaylist()
    }
  }

  componentWillUnmount() {
    this.clearTimers()
  }

  clearTimers = () => {
    if (this.state.autoPlayTimer) {
      clearTimeout(this.state.autoPlayTimer)
    }
    if (this.state.progressTimer) {
      clearInterval(this.state.progressTimer)
    }
    if (this.state.refreshTimer) {
      clearInterval(this.state.refreshTimer)
    }
  }

  loadPlaylist = async () => {
    const { playlistId } = this.props.data

    if (!playlistId) {
      this.setState({
        error: 'No playlist ID provided',
        loading: false
      })
      return
    }

    try {
      this.setState({ loading: true, error: null })

      const response = await axios.get(`http://localhost:9900/api/v1/mixed-playlists/${playlistId}`)
      const playlist = response.data.data

      if (!playlist || !playlist.items || playlist.items.length === 0) {
        this.setState({
          error: 'Playlist is empty or not found',
          loading: false
        })
        return
      }

      // Filter enabled items and sort by order
      const enabledItems = playlist.items
        .filter(item => item.enabled)
        .sort((a, b) => a.order - b.order)

      if (enabledItems.length === 0) {
        this.setState({
          error: 'No enabled items in playlist',
          loading: false
        })
        return
      }

      this.setState({
        playlist,
        currentItem: enabledItems[0],
        currentItemIndex: 0,
        loading: false
      }, () => {
        this.startPlayback()
      })

      // Track playlist view
      if (this.props.data.trackViews) {
        this.trackPlaylistView()
      }

    } catch (error) {
      console.error('Error loading playlist:', error)
      this.setState({
        error: `Failed to load playlist: ${error.message}`,
        loading: false
      })
    }
  }

  startAutoRefresh = () => {
    const { autoRefresh, refreshInterval } = this.props.data

    if (autoRefresh && refreshInterval > 0) {
      const timer = setInterval(() => {
        this.loadPlaylist()
      }, refreshInterval * 1000)

      this.setState({ refreshTimer: timer })
    }
  }

  startPlayback = () => {
    const { autoPlay, displayDuration, trackPlays } = this.props.data
    const { currentItem } = this.state

    if (!currentItem) return

    if (autoPlay) {
      this.setState({ isPlaying: true })
      
      if (trackPlays) {
        this.trackItemPlay()
      }

      // Start progress tracking
      this.startProgressTracking()

      // Auto-advance to next item
      const timer = setTimeout(() => {
        this.nextItem()
      }, displayDuration)

      this.setState({ autoPlayTimer: timer })
    }
  }

  startProgressTracking = () => {
    const { displayDuration } = this.props.data
    const interval = 100 // Update every 100ms

    const timer = setInterval(() => {
      this.setState(prevState => {
        const newProgress = Math.min(prevState.progress + (interval / displayDuration) * 100, 100)
        const newTimeRemaining = Math.max(0, displayDuration - (newProgress / 100) * displayDuration)
        
        return {
          progress: newProgress,
          timeRemaining: newTimeRemaining
        }
      })
    }, interval)

    this.setState({ progressTimer: timer })
  }

  nextItem = () => {
    const { loop, shuffle } = this.props.data
    const { playlist, currentItemIndex } = this.state

    if (!playlist) return

    const enabledItems = playlist.items
      .filter(item => item.enabled)
      .sort((a, b) => a.order - b.order)

    let nextIndex = currentItemIndex + 1

    if (nextIndex >= enabledItems.length) {
      if (loop) {
        nextIndex = 0
      } else {
        // End of playlist
        this.setState({ isPlaying: false })
        return
      }
    }

    this.setState({
      currentItemIndex: nextIndex,
      currentItem: enabledItems[nextIndex],
      progress: 0,
      timeRemaining: this.props.data.displayDuration
    }, () => {
      this.startPlayback()
    })
  }

  previousItem = () => {
    const { loop } = this.props.data
    const { playlist, currentItemIndex } = this.state

    if (!playlist) return

    const enabledItems = playlist.items
      .filter(item => item.enabled)
      .sort((a, b) => a.order - b.order)

    let prevIndex = currentItemIndex - 1

    if (prevIndex < 0) {
      if (loop) {
        prevIndex = enabledItems.length - 1
      } else {
        return
      }
    }

    this.setState({
      currentItemIndex: prevIndex,
      currentItem: enabledItems[prevIndex],
      progress: 0,
      timeRemaining: this.props.data.displayDuration
    }, () => {
      this.startPlayback()
    })
  }

  togglePlayback = () => {
    const { isPlaying } = this.state

    if (isPlaying) {
      this.clearTimers()
      this.setState({ isPlaying: false })
    } else {
      this.startPlayback()
    }
  }

  trackPlaylistView = async () => {
    const { playlistId } = this.props.data

    try {
      await axios.post(`http://localhost:9900/api/v1/mixed-playlists/${playlistId}/play`)
    } catch (error) {
      console.error('Error tracking playlist view:', error)
    }
  }

  trackItemPlay = async () => {
    // This would track individual item plays if needed
    // Implementation depends on specific tracking requirements
  }

  formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  renderContentItem = (item) => {
    const { platformSettings, showPlatform, showTitle, showDescription, showThumbnail } = this.props.data
    const platformConfig = platformSettings[item.platform] || {}

    return (
      <div key={item._id} className="content-item">
        {/* Platform Indicator */}
        {showPlatform && (
          <div className="platform-indicator">
            <span className={`platform-badge ${item.platform}`}>
              {item.platform.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        )}

        {/* Content Thumbnail */}
        {showThumbnail && item.thumbnail && (
          <div className="content-thumbnail">
            <img src={item.thumbnail} alt={item.title || 'Content'} />
          </div>
        )}

        {/* Content Details */}
        <div className="content-details">
          {showTitle && item.title && (
            <h3 className="content-title">{item.title}</h3>
          )}
          {showDescription && item.description && (
            <p className="content-description">{item.description}</p>
          )}
        </div>

        {/* Platform-specific content rendering */}
        <div className="platform-content">
          {this.renderPlatformContent(item, platformConfig)}
        </div>

        <style jsx>{`
          .content-item {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
          }

          .platform-indicator {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 10;
          }

          .platform-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            color: white;
            text-transform: uppercase;
          }

          .platform-badge.youtube {
            background: #ff0000;
          }

          .platform-badge.youtube_shorts {
            background: #ff0000;
          }

          .platform-badge.tiktok {
            background: #000000;
          }

          .platform-badge.instagram {
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          }

          .platform-badge.facebook {
            background: #1877f2;
          }

          .platform-badge.reddit {
            background: #ff4500;
          }

          .platform-badge.x_twitter {
            background: #1d9bf0;
          }

          .content-thumbnail {
            max-width: 300px;
            max-height: 300px;
            margin-bottom: 20px;
          }

          .content-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
          }

          .content-details {
            text-align: center;
            margin-bottom: 20px;
          }

          .content-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 10px 0;
            color: ${this.props.data.textColor};
          }

          .content-description {
            font-size: 16px;
            margin: 0;
            color: ${this.props.data.textColor};
            opacity: 0.8;
          }

          .platform-content {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    )
  }

  renderPlatformContent = (item, platformConfig) => {
    const { platform, contentId, metadata } = item

    switch (platform) {
      case 'youtube':
      case 'youtube_shorts':
        return (
          <div className="youtube-content">
            <iframe
              src={`https://www.youtube.com/embed/${contentId}?autoplay=${platformConfig.autoplay ? 1 : 0}&controls=${platformConfig.controls ? 1 : 0}&mute=${platformConfig.mute ? 1 : 0}&loop=${platformConfig.loop ? 1 : 0}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )

      case 'tiktok':
        return (
          <div className="tiktok-content">
            <blockquote
              className="tiktok-embed"
              cite={`https://www.tiktok.com/@tiktok/video/${contentId}`}
              data-video-id={contentId}
              style={{ maxWidth: '605px', minWidth: '325px' }}
            >
              <section>
                <a target="_blank" title={`@tiktok`} href={`https://www.tiktok.com/@tiktok/video/${contentId}`}>
                  @tiktok
                </a>
              </section>
            </blockquote>
          </div>
        )

      case 'instagram':
        return (
          <div className="instagram-content">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`https://www.instagram.com/p/${contentId}/`}
              data-instgrm-version="14"
            />
          </div>
        )

      case 'facebook':
        return (
          <div className="facebook-content">
            <div className="fb-post" data-href={`https://www.facebook.com/posts/${contentId}`} />
          </div>
        )

      case 'reddit':
        return (
          <div className="reddit-content">
            <iframe
              src={`https://www.redditmedia.com/r/${metadata?.subreddit || 'popular'}/comments/${contentId}/?embed=true`}
              width="100%"
              height="400"
              frameBorder="0"
            />
          </div>
        )

      case 'x_twitter':
        return (
          <div className="twitter-content">
            <blockquote
              className="twitter-tweet"
              data-theme="dark"
              data-conversation="none"
            >
              <a href={`https://twitter.com/i/status/${contentId}`}></a>
            </blockquote>
          </div>
        )

      case 'image':
        return (
          <div className="image-content">
            <img src={contentId} alt={item.title || 'Image'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        )

      case 'web':
        return (
          <div className="web-content">
            <iframe
              src={contentId}
              width="100%"
              height="100%"
              frameBorder="0"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
          </div>
        )

      default:
        return (
          <div className="unsupported-content">
            <p>Unsupported platform: {platform}</p>
          </div>
        )
    }
  }

  renderControls = () => {
    const { showControls, showProgress, showStats } = this.props.data
    const { isPlaying, progress, timeRemaining, playlist, currentItemIndex } = this.state

    if (!showControls) return null

    const enabledItems = playlist ? playlist.items.filter(item => item.enabled) : []

    return (
      <div className="playlist-controls">
        {/* Progress Bar */}
        {showProgress && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="time-display">
              <span>{this.formatTime(timeRemaining)}</span>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="control-buttons">
          <button 
            onClick={this.previousItem}
            className="control-btn prev-btn"
            disabled={currentItemIndex === 0}
          >
            ⏮️
          </button>
          
          <button 
            onClick={this.togglePlayback}
            className="control-btn play-btn"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <button 
            onClick={this.nextItem}
            className="control-btn next-btn"
            disabled={currentItemIndex >= enabledItems.length - 1}
          >
            ⏭️
          </button>
        </div>

        {/* Item Counter */}
        <div className="item-counter">
          {currentItemIndex + 1} / {enabledItems.length}
        </div>

        {/* Statistics */}
        {showStats && playlist && (
          <div className="playlist-stats">
            <span>Views: {playlist.stats.totalViews}</span>
            <span>Plays: {playlist.stats.totalPlays}</span>
          </div>
        )}

        <style jsx>{`
          .playlist-controls {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            background: rgba(0, 0, 0, 0.8);
            padding: 15px 25px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
            min-width: 300px;
          }

          .progress-container {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .progress-bar {
            flex: 1;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            background: ${this.props.data.accentColor};
            transition: width 0.1s ease;
          }

          .time-display {
            font-size: 12px;
            color: ${this.props.data.textColor};
            min-width: 40px;
            text-align: right;
          }

          .control-buttons {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          .control-btn {
            background: ${this.props.data.accentColor};
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

          .control-btn:hover {
            background: ${this.props.data.accentColor};
            opacity: 0.8;
            transform: scale(1.1);
          }

          .control-btn:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
          }

          .item-counter {
            font-size: 14px;
            color: ${this.props.data.textColor};
            font-weight: bold;
          }

          .playlist-stats {
            display: flex;
            gap: 15px;
            font-size: 12px;
            color: ${this.props.data.textColor};
            opacity: 0.7;
          }
        `}</style>
      </div>
    )
  }

  render() {
    const { loading, error, playlist, currentItem } = this.state
    const { 
      displayMode, 
      floatingPosition, 
      backgroundColor, 
      borderColor, 
      borderWidth, 
      borderRadius,
      shadowStyle,
      showErrors
    } = this.props.data

    if (loading) {
      return (
        <div className="mixed-playlist-widget loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading playlist...</p>
          </div>
          <style jsx>{`
            .mixed-playlist-widget {
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
              border: 4px solid rgba(255, 255, 255, 0.3);
              border-top: 4px solid ${this.props.data.accentColor};
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
        <div className="mixed-playlist-widget error">
          <div className="error-message">
            <h3>🎵 Playlist Error</h3>
            <p>{error}</p>
            {showErrors && (
              <button onClick={this.loadPlaylist} className="retry-btn">
                Retry
              </button>
            )}
          </div>
          <style jsx>{`
            .mixed-playlist-widget {
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
              background: ${this.props.data.accentColor};
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

    if (!currentItem) {
      return (
        <div className="mixed-playlist-widget empty">
          <div className="empty-message">
            <h3>🎵 Empty Playlist</h3>
            <p>No content available in this playlist.</p>
          </div>
          <style jsx>{`
            .mixed-playlist-widget {
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
          `}</style>
        </div>
      )
    }

    return (
      <div 
        ref={this.containerRef}
        className={`mixed-playlist-widget ${displayMode}`}
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
        {/* Playlist Header */}
        {playlist && (
          <div className="playlist-header">
            <h2 className="playlist-name">{playlist.name}</h2>
            {playlist.description && (
              <p className="playlist-description">{playlist.description}</p>
            )}
          </div>
        )}

        {/* Current Content */}
        <div className="playlist-content">
          {this.renderContentItem(currentItem)}
        </div>
        
        {/* Controls */}
        {this.renderControls()}

        <style jsx>{`
          .mixed-playlist-widget {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .mixed-playlist-widget.floating {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
          
          .playlist-header {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            z-index: 10;
            text-align: center;
          }
          
          .playlist-name {
            margin: 0 0 5px 0;
            font-size: 20px;
            font-weight: bold;
            color: ${this.props.data.textColor};
          }
          
          .playlist-description {
            margin: 0;
            font-size: 14px;
            color: ${this.props.data.textColor};
            opacity: 0.8;
          }
          
          .playlist-content {
            flex: 1;
            overflow: hidden;
            position: relative;
          }
        `}</style>
      </div>
    )
  }
}

export default MixedPlaylistContent
