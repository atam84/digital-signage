import React, { Component } from 'react'

class TikTokContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      currentVideoIndex: 0,
      videos: [],
      isPlaying: false,
      autoSwipeTimer: null
    }
    this.containerRef = React.createRef()
    this.embedRefs = React.createRef()
  }

  componentDidMount() {
    this.loadTikTokContent()
    this.loadTikTokEmbedScript()
  }

  componentWillUnmount() {
    if (this.state.autoSwipeTimer) {
      clearInterval(this.state.autoSwipeTimer)
    }
  }

  loadTikTokEmbedScript = () => {
    // Load TikTok embed script if not already loaded
    if (!window.tiktokEmbedLoaded) {
      const script = document.createElement('script')
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      script.onload = () => {
        window.tiktokEmbedLoaded = true
        this.setState({ loading: false })
      }
      script.onerror = () => {
        this.setState({ error: 'Failed to load TikTok embed script', loading: false })
      }
      document.head.appendChild(script)
    } else {
      this.setState({ loading: false })
    }
  }

  loadTikTokContent = () => {
    const { videoUrls, videoIds, hashtagFilter, creatorFilter, maxVideos } = this.props.data

    try {
      let videos = []

      // Process video URLs and IDs
      if (videoUrls && videoUrls.length > 0) {
        videos = videos.concat(videoUrls.map(url => ({ url, type: 'url' })))
      }

      if (videoIds && videoIds.length > 0) {
        videos = videos.concat(videoIds.map(id => ({ id, type: 'id' })))
      }

      // Limit number of videos
      if (maxVideos && videos.length > maxVideos) {
        videos = videos.slice(0, maxVideos)
      }

      this.setState({ 
        videos,
        loading: false 
      }, () => {
        if (videos.length > 0 && this.props.data.autoSwipe) {
          this.startAutoSwipe()
        }
      })
    } catch (error) {
      this.setState({ 
        error: `Error loading TikTok content: ${error.message}`,
        loading: false 
      })
    }
  }

  startAutoSwipe = () => {
    const { swipeInterval } = this.props.data
    if (this.state.videos.length <= 1) return

    const timer = setInterval(() => {
      this.nextVideo()
    }, swipeInterval)

    this.setState({ autoSwipeTimer: timer })
  }

  stopAutoSwipe = () => {
    if (this.state.autoSwipeTimer) {
      clearInterval(this.state.autoSwipeTimer)
      this.setState({ autoSwipeTimer: null })
    }
  }

  nextVideo = () => {
    const { videos, currentVideoIndex } = this.state
    const nextIndex = (currentVideoIndex + 1) % videos.length
    
    this.setState({ 
      currentVideoIndex: nextIndex,
      isPlaying: true 
    })
  }

  previousVideo = () => {
    const { videos, currentVideoIndex } = this.state
    const prevIndex = currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1
    
    this.setState({ 
      currentVideoIndex: prevIndex,
      isPlaying: true 
    })
  }

  renderTikTokEmbed = (video, index) => {
    const { showCreator, showLikes, showComments, showShares, mute, autoPlay } = this.props.data
    const isActive = index === this.state.currentVideoIndex

    if (!isActive) return null

    let embedUrl = ''
    if (video.type === 'url') {
      embedUrl = video.url
    } else if (video.type === 'id') {
      embedUrl = `https://www.tiktok.com/embed/${video.id}`
    }

    return (
      <div key={index} className={`tiktok-embed-container ${isActive ? 'active' : ''}`}>
        <blockquote 
          className="tiktok-embed" 
          cite={embedUrl}
          data-video-id={video.id}
          data-embed-from="oembed"
          style={{ maxWidth: '100%', minWidth: '325px' }}
        >
          <section>
            <a 
              target="_blank" 
              title={`@${video.creator || 'tiktok'}`} 
              href={embedUrl}
            >
              {video.title || 'TikTok Video'}
            </a>
          </section>
        </blockquote>
      </div>
    )
  }

  renderPlaylistControls = () => {
    const { videos, currentVideoIndex } = this.state
    const { autoSwipe, showControls } = this.props.data

    if (videos.length <= 1 || !showControls) return null

    return (
      <div className="tiktok-controls">
        <button 
          onClick={this.previousVideo}
          className="control-btn prev-btn"
          disabled={videos.length <= 1}
        >
          ⬅️
        </button>
        
        <div className="video-counter">
          {currentVideoIndex + 1} / {videos.length}
        </div>
        
        <button 
          onClick={this.nextVideo}
          className="control-btn next-btn"
          disabled={videos.length <= 1}
        >
          ➡️
        </button>
        
        {autoSwipe && (
          <button 
            onClick={this.state.autoSwipeTimer ? this.stopAutoSwipe : this.startAutoSwipe}
            className="control-btn auto-btn"
          >
            {this.state.autoSwipeTimer ? '⏸️' : '▶️'}
          </button>
        )}
      </div>
    )
  }

  render() {
    const { loading, error, videos, currentVideoIndex } = this.state
    const { 
      displayMode, 
      floatingPosition, 
      aspectRatio, 
      backgroundColor, 
      borderColor, 
      borderWidth, 
      borderRadius,
      shadowStyle 
    } = this.props.data

    if (loading) {
      return (
        <div className="tiktok-widget loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading TikTok content...</p>
          </div>
          <style jsx>{`
            .tiktok-widget {
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
              border-top: 4px solid #ff0050;
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
        <div className="tiktok-widget error">
          <div className="error-message">
            <h3>🚫 TikTok Error</h3>
            <p>{error}</p>
            <button onClick={this.loadTikTokContent} className="retry-btn">
              Retry
            </button>
          </div>
          <style jsx>{`
            .tiktok-widget {
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
              background: #ff0050;
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

    if (videos.length === 0) {
      return (
        <div className="tiktok-widget empty">
          <div className="empty-message">
            <h3>📱 No TikTok Content</h3>
            <p>Please add TikTok video URLs or IDs in the widget settings.</p>
          </div>
          <style jsx>{`
            .tiktok-widget {
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
          `}</style>
        </div>
      )
    }

    return (
      <div 
        ref={this.containerRef}
        className={`tiktok-widget ${displayMode}`}
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
        <div className="tiktok-content">
          {videos.map((video, index) => this.renderTikTokEmbed(video, index))}
        </div>
        
        {this.renderPlaylistControls()}

        <style jsx>{`
          .tiktok-widget {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .tiktok-widget.floating {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
          
          .tiktok-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          
          .tiktok-embed-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .tiktok-embed-container.active {
            display: flex;
          }
          
          .tiktok-embed-container:not(.active) {
            display: none;
          }
          
          .tiktok-controls {
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
          
          .control-btn {
            background: #ff0050;
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
            background: #ff3366;
            transform: scale(1.1);
          }
          
          .control-btn:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
          }
          
          .video-counter {
            color: white;
            font-weight: bold;
            font-size: 14px;
            min-width: 60px;
            text-align: center;
          }
          
          /* Aspect ratio handling */
          .tiktok-widget[data-aspect="9:16"] .tiktok-content {
            aspect-ratio: 9/16;
            max-width: 400px;
            margin: 0 auto;
          }
          
          .tiktok-widget[data-aspect="16:9"] .tiktok-content {
            aspect-ratio: 16/9;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .tiktok-widget[data-aspect="1:1"] .tiktok-content {
            aspect-ratio: 1/1;
            max-width: 500px;
            margin: 0 auto;
          }
        `}</style>
      </div>
    )
  }
}

export default TikTokContent
