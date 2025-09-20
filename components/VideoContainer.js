import React from 'react'

/**
 * Universal Video Container Component for Digital Signage
 * Ensures all videos fit their containers without distortion
 * Removes all controls for signage use
 */
const VideoContainer = ({ 
  src, 
  width = '100%', 
  height = '100%', 
  className = '',
  style = {},
  platform = 'generic',
  autoplay = true,
  muted = true,
  loop = false,
  ...props 
}) => {
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#000',
    ...style
  }

  const videoStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    objectFit: 'contain', // Maintain aspect ratio without distortion
    border: 'none',
    outline: 'none'
  }

  // Platform-specific configurations
  const getPlatformConfig = () => {
    switch (platform) {
      case 'youtube':
        return {
          controls: 0,
          autoplay: autoplay ? 1 : 0,
          mute: muted ? 1 : 0,
          loop: loop ? 1 : 0,
          start: 0,
          cc_load_policy: 0,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          playsinline: 1
        }
      case 'youtube_shorts':
        return {
          controls: 0,
          autoplay: autoplay ? 1 : 0,
          mute: muted ? 1 : 0,
          loop: loop ? 1 : 0,
          start: 0,
          cc_load_policy: 0,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          playsinline: 1
        }
      default:
        return {
          autoplay: autoplay,
          muted: muted,
          loop: loop,
          controls: false,
          playsInline: true
        }
    }
  }

  const platformConfig = getPlatformConfig()

  if (platform === 'youtube' || platform === 'youtube_shorts') {
    // YouTube iframe with proper embed parameters
    const embedParams = new URLSearchParams(platformConfig).toString()
    const embedUrl = `${src}?${embedParams}`
    
    return (
      <div className={`video-container ${className}`} style={containerStyle}>
        <iframe
          src={embedUrl}
          width={width}
          height={height}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          {...props}
        />
      </div>
    )
  }

  if (platform === 'tiktok') {
    // TikTok embed with custom styling
    return (
      <div className={`video-container tiktok-container ${className}`} style={containerStyle}>
        <blockquote
          className="tiktok-embed"
          cite={src}
          data-video-id={src.split('/').pop()}
          style={{ 
            maxWidth: '100%', 
            minWidth: '100%',
            width: '100%',
            height: '100%'
          }}
        >
          <section></section>
        </blockquote>
        <style jsx>{`
          .tiktok-container :global(.tiktok-embed) {
            width: 100% !important;
            height: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
          }
          .tiktok-container :global(.tiktok-embed iframe) {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
          }
        `}</style>
      </div>
    )
  }

  if (platform === 'instagram') {
    // Instagram embed with custom styling
    return (
      <div className={`video-container instagram-container ${className}`} style={containerStyle}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={src}
          data-instgrm-version="14"
          style={{ width: '100%', height: '100%' }}
        />
        <style jsx>{`
          .instagram-container :global(.instagram-media) {
            width: 100% !important;
            height: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
          }
          .instagram-container :global(.instagram-media iframe) {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
          }
        `}</style>
      </div>
    )
  }

  if (platform === 'facebook') {
    // Facebook embed with custom styling
    return (
      <div className={`video-container facebook-container ${className}`} style={containerStyle}>
        <div 
          className="fb-post" 
          data-href={src}
          data-width="100%"
          data-height="100%"
          style={{ width: '100%', height: '100%' }}
        />
        <style jsx>{`
          .facebook-container :global(.fb-post) {
            width: 100% !important;
            height: 100% !important;
          }
          .facebook-container :global(.fb-post iframe) {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
          }
        `}</style>
      </div>
    )
  }

  if (platform === 'web') {
    // Generic web iframe
    return (
      <div className={`video-container web-container ${className}`} style={containerStyle}>
        <iframe
          src={src}
          width={width}
          height={height}
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          {...props}
        />
      </div>
    )
  }

  // Generic video element
  return (
    <div className={`video-container ${className}`} style={containerStyle}>
      <video
        src={src}
        style={videoStyle}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={false}
        playsInline
        {...props}
      />
    </div>
  )
}

export default VideoContainer
