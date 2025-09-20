import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCompass, faRuler, faQrcode, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'

class InteractiveMapContent extends Component {
  constructor(props) {
    super(props)
    const {
      data: {
        displayDuration = 0,
        autoRotate = false,
        rotationInterval = 30,
        fadeTransition = true,
        animationType = 'fade',
        animationDuration = 1000,
        animationDelay = 0
      } = {}
    } = props

    this.state = {
      isVisible: true,
      currentRotation: 0,
      isAnimating: false,
      isFullscreen: false,
      mapLoaded: false
    }
    
    this.rotationTimer = null
    this.displayTimer = null
    this.animationTimeout = null
  }

  componentDidMount() {
    const { data: { displayDuration = 0, autoRotate = false, rotationInterval = 30, animationDelay = 0 } = {} } = this.props
    
    // Start display timer if duration is set
    if (displayDuration > 0) {
      this.startDisplayTimer()
    }
    
    // Start auto-rotation if enabled
    if (autoRotate) {
      this.startAutoRotation()
    }
    
    // Trigger initial animation
    if (animationDelay > 0) {
      this.animationTimeout = setTimeout(() => {
        this.triggerAnimation()
      }, animationDelay)
    } else {
      this.triggerAnimation()
    }
  }

  componentWillUnmount() {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer)
    }
    if (this.displayTimer) {
      clearTimeout(this.displayTimer)
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout)
    }
  }

  startDisplayTimer = () => {
    const { data: { displayDuration = 0 } = {} } = this.props
    this.displayTimer = setTimeout(() => {
      this.setState({ isVisible: false })
    }, displayDuration * 1000)
  }

  startAutoRotation = () => {
    const { data: { rotationInterval = 30 } = {} } = this.props
    this.rotationTimer = setInterval(() => {
      this.setState(prevState => ({
        currentRotation: (prevState.currentRotation + 1) % 360
      }))
    }, rotationInterval * 1000)
  }

  triggerAnimation = () => {
    const { data: { animationType = 'fade', animationDuration = 1000 } = {} } = this.props
    
    if (animationType !== 'none') {
      this.setState({ isAnimating: true })
      setTimeout(() => {
        this.setState({ isAnimating: false })
      }, animationDuration)
    }
  }

  toggleFullscreen = () => {
    this.setState(prevState => ({
      isFullscreen: !prevState.isFullscreen
    }))
  }

  generateQRCode = (content, size = 150) => {
    // Simple QR code generation using a QR code service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}`
    return qrUrl
  }

  render() {
    const {
      data: {
        mapType = 'roadmap',
        mapProvider = 'google',
        mapStyle = 'default',
        googleApiKey = '',
        latitude = 40.7128,
        longitude = -74.0060,
        zoom = 10,
        autoZoom = true,
        displayMode = 'embedded',
        floatingPosition = 'top-right',
        floatingSize = 'medium',
        showControls = true,
        showScale = true,
        showCompass = true,
        showQRCode = false,
        qrCodePosition = 'bottom-right',
        qrCodeSize = 'medium',
        qrCodeContent = 'https://maps.google.com/?q=40.7128,-74.0060',
        qrCodeLabel = 'Get Directions',
        animationType = 'fade',
        animationDuration = 1000,
        backgroundColor = '#ffffff',
        borderColor = '#cccccc',
        borderWidth = 2,
        borderRadius = 8,
        shadowStyle = 'subtle',
        showOverlay = false,
        overlayText = 'Welcome to Our Location',
        overlayPosition = 'center',
        overlayStyle = 'glass',
        overlayColor = '#000000',
        overlayOpacity = 0.7,
        overlayTextColor = '#ffffff',
        clickable = true,
        showMarkers = true,
        markerStyle = 'default',
        markerColor = '#ff0000',
        markerSize = 'medium',
        showInfoWindow = true,
        infoWindowContent = 'Our Business Location'
      } = {}
    } = this.props

    const { isVisible, currentRotation, isAnimating, isFullscreen, mapLoaded } = this.state

    if (!isVisible) {
      return null
    }

    // Generate map URL based on provider
    let mapUrl = ''
    if (mapProvider === 'google') {
      const mapStyleParam = mapStyle !== 'default' ? `&style=${mapStyle}` : ''
      const apiKeyParam = googleApiKey ? `&key=${googleApiKey}` : ''
      mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=600x400&maptype=${mapType}&markers=color:${markerColor.replace('#', '')}|${latitude},${longitude}${apiKeyParam}${mapStyleParam}`
    } else if (mapProvider === 'openstreetmap') {
      mapUrl = `https://tile.openstreetmap.org/${zoom}/${Math.floor((longitude + 180) / 360 * Math.pow(2, zoom))}/${Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))}.png`
    }

    // Size configurations
    const sizeConfig = {
      small: { width: 300, height: 200 },
      medium: { width: 400, height: 300 },
      large: { width: 600, height: 400 }
    }

    const currentSize = sizeConfig[floatingSize] || sizeConfig.medium

    // QR Code size
    const qrSizeConfig = {
      small: 100,
      medium: 150,
      large: 200
    }

    const qrSize = qrSizeConfig[qrCodeSize] || 150

    // Animation classes
    const animationClass = isAnimating ? `animate-${animationType}` : ''
    const rotationStyle = { transform: `rotate(${currentRotation}deg)` }

    return (
      <div 
        className={`interactive-map-widget ${displayMode} ${floatingPosition} ${floatingSize} ${animationClass} ${isFullscreen ? 'fullscreen' : ''}`}
        style={{
          backgroundColor,
          borderColor,
          borderWidth: `${borderWidth}px`,
          borderRadius: `${borderRadius}px`,
          ...rotationStyle
        }}
      >
        {/* Map Container */}
        <div className="map-container">
          {mapProvider === 'google' && !googleApiKey ? (
            <div className="map-placeholder">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" style={{ color: markerColor, marginBottom: '10px' }} />
              <h3>Interactive Map</h3>
              <p>Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
              <p>Zoom: {zoom}</p>
              <p><em>Google Maps API key required for live map</em></p>
            </div>
          ) : mapProvider === 'google' && googleApiKey ? (
            <img 
              src={mapUrl} 
              alt="Google Map" 
              className="map-image"
              onLoad={() => this.setState({ mapLoaded: true })}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                borderRadius: `${borderRadius - borderWidth}px`
              }}
            />
          ) : (
            <img 
              src={mapUrl} 
              alt="Map" 
              className="map-image"
              onLoad={() => this.setState({ mapLoaded: true })}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                borderRadius: `${borderRadius - borderWidth}px`
              }}
            />
          )}
          
          {/* Map Markers */}
          {showMarkers && (
            <div className="map-marker" style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              color: markerColor,
              fontSize: markerSize === 'small' ? '16px' : markerSize === 'large' ? '32px' : '24px'
            }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
          )}
        </div>

        {/* Controls */}
        {showControls && (
          <div className="map-controls">
            {showCompass && (
              <div className="control-item">
                <FontAwesomeIcon icon={faCompass} />
              </div>
            )}
            {showScale && (
              <div className="control-item">
                <FontAwesomeIcon icon={faRuler} />
              </div>
            )}
            <div className="control-item" onClick={this.toggleFullscreen}>
              <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            </div>
          </div>
        )}

        {/* QR Code */}
        {showQRCode && (
          <div className={`qr-code ${qrCodePosition}`}>
            <img 
              src={this.generateQRCode(qrCodeContent, qrSize)} 
              alt="QR Code" 
              style={{ 
                width: `${qrSize}px`, 
                height: `${qrSize}px`,
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                padding: '8px'
              }}
            />
            {qrCodeLabel && (
              <div className="qr-label" style={{ color: overlayTextColor, fontSize: '12px', marginTop: '4px' }}>
                {qrCodeLabel}
              </div>
            )}
          </div>
        )}

        {/* Overlay */}
        {showOverlay && (
          <div 
            className={`map-overlay ${overlayPosition} ${overlayStyle}`}
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
              color: overlayTextColor
            }}
          >
            {overlayText}
          </div>
        )}

        {/* Info Window */}
        {showInfoWindow && (
          <div className="info-window" style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '14px',
            maxWidth: '200px'
          }}>
            {infoWindowContent}
          </div>
        )}

        <style jsx>{`
          .interactive-map-widget {
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.3s ease;
            width: 100%;
            height: 100%;
          }

          .interactive-map-widget.embedded {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .interactive-map-widget.floating {
            position: fixed;
            z-index: 1000;
          }

          .interactive-map-widget.floating.top-right {
            top: 20px;
            right: 20px;
          }

          .interactive-map-widget.floating.top-left {
            top: 20px;
            left: 20px;
          }

          .interactive-map-widget.floating.bottom-right {
            bottom: 20px;
            right: 20px;
          }

          .interactive-map-widget.floating.bottom-left {
            bottom: 20px;
            left: 20px;
          }

          .interactive-map-widget.floating.center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .interactive-map-widget.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 9999;
            border-radius: 0 !important;
          }

          .interactive-map-widget.small {
            width: 300px;
            height: 200px;
          }

          .interactive-map-widget.medium {
            width: 400px;
            height: 300px;
          }

          .interactive-map-widget.large {
            width: 600px;
            height: 400px;
          }

          .map-container {
            position: relative;
            flex: 1;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .map-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
            color: #666;
          }

          .map-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .map-controls {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 8px;
          }

          .control-item {
            background: rgba(255, 255, 255, 0.9);
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.2s ease;
          }

          .control-item:hover {
            background: rgba(255, 255, 255, 1);
          }

          .qr-code {
            position: absolute;
            z-index: 10;
          }

          .qr-code.top-right {
            top: 10px;
            right: 10px;
          }

          .qr-code.top-left {
            top: 10px;
            left: 10px;
          }

          .qr-code.bottom-right {
            bottom: 10px;
            right: 10px;
          }

          .qr-code.bottom-left {
            bottom: 10px;
            left: 10px;
          }

          .qr-code.center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .qr-label {
            text-align: center;
            font-weight: bold;
          }

          .map-overlay {
            position: absolute;
            padding: 10px;
            border-radius: 4px;
            font-weight: bold;
            z-index: 5;
          }

          .map-overlay.center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .map-overlay.top {
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
          }

          .map-overlay.bottom {
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
          }

          .map-overlay.glass {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .map-overlay.solid {
            background: rgba(0, 0, 0, 0.8) !important;
          }

          .map-overlay.gradient {
            background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)) !important;
          }

          /* Animation classes */
          .animate-fade {
            animation: fadeIn ${animationDuration}ms ease-in-out;
          }

          .animate-slide {
            animation: slideIn ${animationDuration}ms ease-in-out;
          }

          .animate-zoom {
            animation: zoomIn ${animationDuration}ms ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }

          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          /* Shadow effects */
          .interactive-map-widget {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .shadow-subtle {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

          .shadow-dramatic {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    )
  }
}

export default InteractiveMapContent

