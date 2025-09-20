import React, { Component } from 'react'

class YoutubeShortsContent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isVisible: true,
      isLoaded: false,
      currentVideoIndex: 0,
      player: null,
      playlist: [],
      error: null,
      isPlaying: false
    }

    this.playerRef = React.createRef()
    this.loadYouTubeAPI = this.loadYouTubeAPI.bind(this)
    this.onPlayerReady = this.onPlayerReady.bind(this)
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    this.onPlayerError = this.onPlayerError.bind(this)
  }

  componentDidMount() {
    this.loadYouTubeAPI()
  }

  componentWillUnmount() {
    if (this.state.player) {
      this.state.player.destroy()
    }
    if (window.YT && window.YT.Player) {
      delete window.YT
    }
  }

  loadYouTubeAPI() {
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      this.initializePlayer()
      return
    }

    // Load YouTube IFrame Player API
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onload = () => {
      window.onYouTubeIframeAPIReady = () => {
        this.initializePlayer()
      }
    }
    document.head.appendChild(script)
  }

  initializePlayer() {
    const { data } = this.props
    const {
      playlistId = '',
      videoIds = [],
      autoPlay = true,
      loop = true,
      showControls = false,
      mute = true,
      startTime = 0,
      endTime = 0
    } = data || {}

    // Create playlist from video IDs or use playlist ID
    let playlist = []
    if (videoIds && videoIds.length > 0) {
      playlist = videoIds
    } else if (playlistId) {
      // For playlist ID, we'll use the playlist parameter
      playlist = [playlistId]
    }

    if (playlist.length === 0) {
      this.setState({ error: 'No playlist or video IDs provided' })
      return
    }

    this.setState({ playlist })

    const playerVars = {
      autoplay: autoPlay ? 1 : 0,
      loop: loop ? 1 : 0,
      controls: showControls ? 1 : 0,
      mute: mute ? 1 : 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      cc_load_policy: 0,
      fs: 0,
      playsinline: 1,
      start: startTime,
      end: endTime > 0 ? endTime : undefined
    }

    // If using individual video IDs, use playlist parameter for seamless autoplay
    if (videoIds && videoIds.length > 0) {
      playerVars.playlist = videoIds.join(',')
      playerVars.autoplay = 1 // Force autoplay for playlists
      playerVars.loop = loop ? 1 : 0
    } else if (playlistId) {
      playerVars.listType = 'playlist'
      playerVars.list = playlistId
    }

    try {
      const player = new window.YT.Player(this.playerRef.current, {
        height: '100%',
        width: '100%',
        playerVars,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
          onError: this.onPlayerError
        }
      })

      this.setState({ player })
    } catch (error) {
      this.setState({ error: `Failed to initialize player: ${error.message}` })
    }
  }

  onPlayerReady(event) {
    const { data } = this.props
    const { mute = true, autoPlay = true } = data || {}

    this.setState({ isLoaded: true, isPlaying: autoPlay })

    if (mute) {
      event.target.mute()
    }

    if (autoPlay) {
      event.target.playVideo()
    }
  }

  onPlayerStateChange(event) {
    const { data } = this.props
    const { loop = true } = data || {}

    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.setState({ isPlaying: true })
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      this.setState({ isPlaying: false })
    } else if (event.data === window.YT.PlayerState.ENDED) {
      this.setState({ isPlaying: false })
      // If loop is enabled and we have multiple videos, move to next video
      if (loop && this.state.playlist.length > 1) {
        setTimeout(() => {
          this.nextVideo()
        }, 1000)
      }
    }
  }

  onPlayerError(event) {
    const errorMessages = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found or private',
      101: 'Video not allowed in embedded players',
      150: 'Video not allowed in embedded players'
    }
    
    const errorMessage = errorMessages[event.data] || `Player error: ${event.data}`
    this.setState({ error: errorMessage })
  }

  nextVideo() {
    const { player, playlist, currentVideoIndex } = this.state
    if (player && playlist.length > 1) {
      const nextIndex = (currentVideoIndex + 1) % playlist.length
      this.setState({ currentVideoIndex: nextIndex })
      // Note: YouTube API doesn't support programmatic playlist navigation
      // This is a limitation we'll work around with manual playlist management
    }
  }

  render() {
    const { data } = this.props
    const {
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'medium',
      aspectRatio = '9:16',
      backgroundColor = '#000000',
      borderColor = '#cccccc',
      borderWidth = 2,
      borderRadius = 8,
      shadowStyle = 'subtle',
      animationType = 'fade',
      animationDuration = 1000,
      animationDelay = 0,
      fadeTransition = true
    } = data || {}

    const { isVisible, isLoaded, error, isPlaying } = this.state

    if (!isVisible) {
      return null
    }

    if (error) {
      return (
        <div className={`youtube-shorts-widget ${displayMode} ${floatingPosition} ${floatingSize} error`}>
          <div className="error-message">
            <h3>YouTube Shorts Error</h3>
            <p>{error}</p>
          </div>
          <style jsx>{`
            .youtube-shorts-widget {
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${backgroundColor};
              border: ${borderWidth}px solid ${borderColor};
              border-radius: ${borderRadius}px;
              color: white;
              text-align: center;
              padding: 20px;
            }
            .error-message h3 {
              color: #ff6b6b;
              margin-bottom: 10px;
            }
            .error-message p {
              color: #cccccc;
              font-size: 14px;
            }
          `}</style>
        </div>
      )
    }

    // Calculate dimensions based on aspect ratio
    const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number)
    const aspectRatioValue = widthRatio / heightRatio

    return (
      <div
        className={`youtube-shorts-widget ${displayMode} ${floatingPosition} ${floatingSize} ${animationType}`}
        style={{
          backgroundColor,
          borderColor,
          borderWidth: `${borderWidth}px`,
          borderRadius: `${borderRadius}px`,
          animationDuration: `${animationDuration}ms`,
          animationDelay: `${animationDelay}ms`
        }}
      >
        <div className="shorts-container" style={{ aspectRatio: aspectRatioValue }}>
          <div
            ref={this.playerRef}
            className="youtube-player"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: `${borderRadius - borderWidth}px`
            }}
          />
          
          {!isLoaded && (
            <div className="loading-overlay">
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading YouTube Shorts...</p>
              </div>
            </div>
          )}

          <div className="shorts-indicator">
            <span className="play-icon">{isPlaying ? '⏸️' : '▶️'}</span>
          </div>
        </div>

        <style jsx>{`
          .youtube-shorts-widget {
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.3s ease;
            width: 100%;
            height: 100%;
          }

          .youtube-shorts-widget.embedded {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .youtube-shorts-widget.floating {
            position: fixed;
            z-index: 1000;
          }

          .youtube-shorts-widget.floating.center {
            top: 50vh;
            left: 50vw;
            transform: translate(-50%, -50%);
          }

          .youtube-shorts-widget.floating.top-right {
            top: 20px;
            right: 20px;
          }

          .youtube-shorts-widget.floating.top-left {
            top: 20px;
            left: 20px;
          }

          .youtube-shorts-widget.floating.bottom-right {
            bottom: 20px;
            right: 20px;
          }

          .youtube-shorts-widget.floating.bottom-left {
            bottom: 20px;
            left: 20px;
          }

          .youtube-shorts-widget.small {
            width: 300px;
            height: 533px; /* 9:16 aspect ratio */
          }

          .youtube-shorts-widget.medium {
            width: 400px;
            height: 711px; /* 9:16 aspect ratio */
          }

          .youtube-shorts-widget.large {
            width: 500px;
            height: 889px; /* 9:16 aspect ratio */
          }

          .shorts-container {
            position: relative;
            width: 100%;
            height: 100%;
            background: #000;
            border-radius: ${borderRadius - borderWidth}px;
            overflow: hidden;
          }

          .youtube-player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }

          .loading-spinner {
            text-align: center;
            color: white;
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #333;
            border-top: 4px solid #ff0000;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .shorts-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
          }

          .play-icon {
            font-size: 16px;
          }

          .youtube-shorts-widget.fade {
            opacity: 0;
            animation: fadeIn ${animationDuration}ms ease-in-out ${animationDelay}ms forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .youtube-shorts-widget.slide {
            transform: translateX(100%);
            animation: slideIn ${animationDuration}ms ease-in-out ${animationDelay}ms forwards;
          }

          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          .youtube-shorts-widget.zoom {
            transform: scale(0.8);
            animation: zoomIn ${animationDuration}ms ease-in-out ${animationDelay}ms forwards;
          }

          @keyframes zoomIn {
            from { transform: scale(0.8); }
            to { transform: scale(1); }
          }
        `}</style>
      </div>
    )
  }
}

export default YoutubeShortsContent
