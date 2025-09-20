import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faExpand, faCompress, faPhone, faEnvelope, faGlobe, faMapMarkerAlt, faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-solid-svg-icons'
import { faFacebook as faFacebookBrand, faTwitter as faTwitterBrand, faInstagram as faInstagramBrand, faLinkedin as faLinkedinBrand } from '@fortawesome/free-brands-svg-icons'

class BusinessPresentationContent extends Component {
  constructor(props) {
    super(props)
    const {
      data: {
        displayDuration = 0,
        autoAdvance = false,
        advanceInterval = 30,
        fadeTransition = true,
        transitionDuration = 1000,
        animationType = 'fade',
        animationDuration = 1500,
        animationDelay = 0,
        entranceAnimation = 'slideInUp',
        exitAnimation = 'fadeOut'
      } = {}
    } = props

    this.state = {
      isVisible: true,
      currentSlide: 0,
      isAnimating: false,
      isFullscreen: false,
      parallaxOffset: 0
    }
    
    this.advanceTimer = null
    this.displayTimer = null
    this.animationTimeout = null
    this.parallaxTimer = null
  }

  componentDidMount() {
    const { data: { displayDuration = 0, autoAdvance = false, advanceInterval = 30, animationDelay = 0, parallaxEffect = false, parallaxSpeed = 0.5 } = {} } = this.props
    
    // Start display timer if duration is set
    if (displayDuration > 0) {
      this.startDisplayTimer()
    }
    
    // Start auto-advance if enabled
    if (autoAdvance) {
      this.startAutoAdvance()
    }
    
    // Start parallax effect if enabled
    if (parallaxEffect) {
      this.startParallaxEffect(parallaxSpeed)
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
    if (this.advanceTimer) {
      clearInterval(this.advanceTimer)
    }
    if (this.displayTimer) {
      clearTimeout(this.displayTimer)
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout)
    }
    if (this.parallaxTimer) {
      clearInterval(this.parallaxTimer)
    }
  }

  startDisplayTimer = () => {
    const { data: { displayDuration = 0 } = {} } = this.props
    this.displayTimer = setTimeout(() => {
      this.setState({ isVisible: false })
    }, displayDuration * 1000)
  }

  startAutoAdvance = () => {
    const { data: { advanceInterval = 30 } = {} } = this.props
    this.advanceTimer = setInterval(() => {
      this.setState(prevState => ({
        currentSlide: (prevState.currentSlide + 1) % 2 // Simple 2-slide rotation
      }))
    }, advanceInterval * 1000)
  }

  startParallaxEffect = (speed) => {
    this.parallaxTimer = setInterval(() => {
      this.setState(prevState => ({
        parallaxOffset: (prevState.parallaxOffset + speed) % 360
      }))
    }, 50)
  }

  triggerAnimation = () => {
    const { data: { animationType = 'fade', animationDuration = 1500 } = {} } = this.props
    
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
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}`
    return qrUrl
  }

  render() {
    const {
      data: {
        title = 'Welcome to Our Business',
        subtitle = 'Your trusted partner in success',
        description = 'We provide exceptional services and solutions tailored to your needs.',
        logoUrl = '',
        backgroundImage = '',
        displayMode = 'floating',
        floatingPosition = 'center',
        floatingSize = 'large',
        aspectRatio = '16:9',
        showQRCode = false,
        qrCodePosition = 'bottom-right',
        qrCodeSize = 'medium',
        qrCodeContent = 'https://ourbusiness.com',
        qrCodeLabel = 'Visit Our Website',
        animationType = 'fade',
        animationDuration = 1500,
        backgroundColor = '#ffffff',
        backgroundGradient = false,
        gradientColors = ['#667eea', '#764ba2'],
        textColor = '#333333',
        titleColor = '#2c3e50',
        accentColor = '#3498db',
        borderColor = '#e0e0e0',
        borderWidth = 0,
        borderRadius = 12,
        shadowStyle = 'dramatic',
        titleFontSize = 48,
        subtitleFontSize = 24,
        descriptionFontSize = 16,
        titleFontWeight = 'bold',
        subtitleFontWeight = 'normal',
        descriptionFontWeight = 'normal',
        fontFamily = 'Arial, sans-serif',
        textAlignment = 'center',
        contentLayout = 'centered',
        logoPosition = 'top',
        logoSize = 'medium',
        hoverEffects = true,
        showContactInfo = false,
        contactInfo = {
          phone: '',
          email: '',
          website: '',
          address: ''
        },
        showOverlay = false,
        overlayType = 'glass',
        overlayColor = '#000000',
        overlayOpacity = 0.3,
        overlayPattern = 'dots',
        parallaxEffect = false,
        showProgressIndicator = false,
        progressPosition = 'bottom',
        progressColor = '#3498db',
        progressHeight = 4,
        showSocialMedia = false,
        socialMediaLinks = {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        },
        showTestimonials = false,
        testimonialText = 'Great service and excellent results!',
        testimonialAuthor = 'Happy Customer',
        showCallToAction = false,
        callToActionText = 'Contact Us Today',
        callToActionColor = '#e74c3c'
      } = {}
    } = this.props

    const { isVisible, currentSlide, isAnimating, isFullscreen, parallaxOffset } = this.state

    if (!isVisible) {
      return null
    }

    // Size configurations
    const sizeConfig = {
      small: { width: 400, height: 300 },
      medium: { width: 600, height: 400 },
      large: { width: 800, height: 600 },
      'extra-large': { width: 1200, height: 800 }
    }

    // Aspect ratio configurations
    const aspectRatioConfig = {
      '4:3': { width: 800, height: 600 },
      '16:9': { width: 800, height: 450 },
      '21:9': { width: 800, height: 343 },
      '1:1': { width: 600, height: 600 }
    }

    const currentSize = aspectRatioConfig[aspectRatio] || sizeConfig[floatingSize] || sizeConfig.large

    // QR Code size
    const qrSizeConfig = {
      small: 100,
      medium: 150,
      large: 200
    }

    const qrSize = qrSizeConfig[qrCodeSize] || 150

    // Logo size
    const logoSizeConfig = {
      small: 60,
      medium: 80,
      large: 120
    }

    const logoSizePx = logoSizeConfig[logoSize] || 80

    // Animation classes
    const animationClass = isAnimating ? `animate-${animationType}` : ''
    const entranceClass = `entrance-${animationType}`

    // Background style
    const backgroundStyle = backgroundImage 
      ? { backgroundImage: `url(${backgroundImage})` }
      : backgroundGradient 
        ? { background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})` }
        : { backgroundColor }

    // Parallax effect
    const parallaxStyle = parallaxEffect 
      ? { transform: `translateY(${Math.sin(parallaxOffset * Math.PI / 180) * 10}px)` }
      : {}

    return (
      <div 
        className={`business-presentation-widget ${displayMode} ${floatingPosition} ${floatingSize} ${animationClass} ${entranceClass} ${isFullscreen ? 'fullscreen' : ''}`}
        style={{
          borderColor,
          borderWidth: `${borderWidth}px`,
          borderRadius: `${borderRadius}px`,
          ...currentSize,
          ...backgroundStyle,
          ...parallaxStyle
        }}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className="background-image"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.8,
              zIndex: 1
            }}
          />
        )}

        {/* Overlay */}
        {showOverlay && (
          <div 
            className={`overlay ${overlayType}`}
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2
            }}
          />
        )}

        {/* Main Content */}
        <div className="presentation-content" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          
          {/* Logo */}
          {logoUrl && logoPosition !== 'hidden' && (
            <div className={`logo-container ${logoPosition}`} style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img 
                src={logoUrl} 
                alt="Logo" 
                style={{ 
                  width: `${logoSizePx}px`, 
                  height: `${logoSizePx}px`,
                  objectFit: 'contain'
                }}
              />
            </div>
          )}

          {/* Title */}
          <h1 
            className="presentation-title"
            style={{
              color: titleColor,
              fontSize: `${titleFontSize}px`,
              fontWeight: titleFontWeight,
              fontFamily,
              textAlign: textAlignment,
              margin: '0 0 10px 0',
              lineHeight: 1.2
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 
              className="presentation-subtitle"
              style={{
                color: textColor,
                fontSize: `${subtitleFontSize}px`,
                fontWeight: subtitleFontWeight,
                fontFamily,
                textAlign: textAlignment,
                margin: '0 0 20px 0',
                opacity: 0.8
              }}
            >
              {subtitle}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p 
              className="presentation-description"
              style={{
                color: textColor,
                fontSize: `${descriptionFontSize}px`,
                fontWeight: descriptionFontWeight,
                fontFamily,
                textAlign: textAlignment,
                margin: '0 0 30px 0',
                lineHeight: 1.5,
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              {description}
            </p>
          )}

          {/* Contact Information */}
          {showContactInfo && (
            <div className="contact-info" style={{ textAlign: textAlignment, marginBottom: '20px' }}>
              {contactInfo.phone && (
                <div style={{ margin: '5px 0', color: textColor }}>
                  <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px', color: accentColor }} />
                  {contactInfo.phone}
                </div>
              )}
              {contactInfo.email && (
                <div style={{ margin: '5px 0', color: textColor }}>
                  <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', color: accentColor }} />
                  {contactInfo.email}
                </div>
              )}
              {contactInfo.website && (
                <div style={{ margin: '5px 0', color: textColor }}>
                  <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '8px', color: accentColor }} />
                  {contactInfo.website}
                </div>
              )}
              {contactInfo.address && (
                <div style={{ margin: '5px 0', color: textColor }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '8px', color: accentColor }} />
                  {contactInfo.address}
                </div>
              )}
            </div>
          )}

          {/* Social Media Links */}
          {showSocialMedia && (
            <div className="social-media" style={{ textAlign: textAlignment, marginBottom: '20px' }}>
              {socialMediaLinks.facebook && (
                <a href={socialMediaLinks.facebook} style={{ margin: '0 10px', color: accentColor, fontSize: '24px' }}>
                  <FontAwesomeIcon icon={faFacebookBrand} />
                </a>
              )}
              {socialMediaLinks.twitter && (
                <a href={socialMediaLinks.twitter} style={{ margin: '0 10px', color: accentColor, fontSize: '24px' }}>
                  <FontAwesomeIcon icon={faTwitterBrand} />
                </a>
              )}
              {socialMediaLinks.instagram && (
                <a href={socialMediaLinks.instagram} style={{ margin: '0 10px', color: accentColor, fontSize: '24px' }}>
                  <FontAwesomeIcon icon={faInstagramBrand} />
                </a>
              )}
              {socialMediaLinks.linkedin && (
                <a href={socialMediaLinks.linkedin} style={{ margin: '0 10px', color: accentColor, fontSize: '24px' }}>
                  <FontAwesomeIcon icon={faLinkedinBrand} />
                </a>
              )}
            </div>
          )}

          {/* Testimonials */}
          {showTestimonials && (
            <div className="testimonial" style={{ textAlign: textAlignment, marginBottom: '20px', fontStyle: 'italic' }}>
              <blockquote style={{ color: textColor, fontSize: '18px', margin: '0 0 10px 0' }}>
                "{testimonialText}"
              </blockquote>
              <cite style={{ color: accentColor, fontSize: '14px' }}>
                — {testimonialAuthor}
              </cite>
            </div>
          )}

          {/* Call to Action */}
          {showCallToAction && (
            <div className="call-to-action" style={{ textAlign: textAlignment }}>
              <button 
                style={{
                  backgroundColor: callToActionColor,
                  color: '#ffffff',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (hoverEffects) {
                    e.target.style.transform = 'scale(1.05)'
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (hoverEffects) {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.boxShadow = 'none'
                  }
                }}
              >
                {callToActionText}
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <div className="fullscreen-toggle" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
            <button
              onClick={this.toggleFullscreen}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                padding: '8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                color: textColor
              }}
            >
              <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            </button>
          </div>

          {/* QR Code */}
          {showQRCode && (
            <div className={`qr-code ${qrCodePosition}`} style={{ position: 'absolute', zIndex: 10 }}>
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
                <div style={{ color: textColor, fontSize: '12px', marginTop: '4px', textAlign: 'center' }}>
                  {qrCodeLabel}
                </div>
              )}
            </div>
          )}

          {/* Progress Indicator */}
          {showProgressIndicator && (
            <div 
              className={`progress-indicator ${progressPosition}`}
              style={{
                position: 'absolute',
                height: `${progressHeight}px`,
                backgroundColor: progressColor,
                zIndex: 10,
                ...(progressPosition === 'bottom' ? { bottom: 0, left: 0, right: 0 } : {}),
                ...(progressPosition === 'top' ? { top: 0, left: 0, right: 0 } : {}),
                ...(progressPosition === 'left' ? { top: 0, left: 0, bottom: 0, width: `${progressHeight}px` } : {}),
                ...(progressPosition === 'right' ? { top: 0, right: 0, bottom: 0, width: `${progressHeight}px` } : {})
              }}
            />
          )}
        </div>

        <style jsx>{`
          .business-presentation-widget {
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.3s ease;
            background-size: cover;
            background-position: center;
          }

          .business-presentation-widget.floating {
            position: fixed;
            z-index: 1000;
          }

          .business-presentation-widget.floating.top-right {
            top: 20px;
            right: 20px;
          }

          .business-presentation-widget.floating.top-left {
            top: 20px;
            left: 20px;
          }

          .business-presentation-widget.floating.bottom-right {
            bottom: 20px;
            right: 20px;
          }

          .business-presentation-widget.floating.bottom-left {
            bottom: 20px;
            left: 20px;
          }

          .business-presentation-widget.floating.center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .business-presentation-widget.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 9999;
            border-radius: 0 !important;
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

          .animate-flip {
            animation: flipIn ${animationDuration}ms ease-in-out;
          }

          .entrance-slideInUp {
            animation: slideInUp 1s ease-out;
          }

          .entrance-slideInDown {
            animation: slideInDown 1s ease-out;
          }

          .entrance-slideInLeft {
            animation: slideInLeft 1s ease-out;
          }

          .entrance-slideInRight {
            animation: slideInRight 1s ease-out;
          }

          .entrance-fadeIn {
            animation: fadeIn 1s ease-out;
          }

          .entrance-zoomIn {
            animation: zoomIn 1s ease-out;
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

          @keyframes flipIn {
            from { transform: rotateY(-90deg); opacity: 0; }
            to { transform: rotateY(0deg); opacity: 1; }
          }

          @keyframes slideInUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes slideInDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          /* Shadow effects */
          .business-presentation-widget {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .shadow-subtle {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

          .shadow-dramatic {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          }

          /* Overlay patterns */
          .overlay.glass {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .overlay.pattern::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}</style>
      </div>
    )
  }
}

export default BusinessPresentationContent
