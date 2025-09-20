import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faUsers, faDollarSign, faHeart, faStar, faChartLine, faShoppingCart, faGlobe } from '@fortawesome/free-solid-svg-icons'

class SimpleCounterContent extends Component {
  constructor(props) {
    super(props)
    const {
      data: {
        currentValue = 0,
        targetValue = 1000,
        animationDuration = 2000,
        easing = 'easeOut',
        repeatAnimation = false,
        waitTime = 3000
      } = {}
    } = props

          this.state = {
            displayValue: currentValue,
            isAnimating: false,
            isWaiting: false,
            showEndEffect: false,
            endEffectType: null
          }
    
    this.animationFrame = null
    this.startTime = null
           this.startValue = currentValue
           this.endValue = targetValue
           this.waitTimeout = null
           this.endEffectTimeout = null
  }

  componentDidMount() {
    const { data: { autoStart = true } = {} } = this.props
    if (autoStart) {
      this.startAnimation()
    }
  }

  componentDidUpdate(prevProps) {
    const { data: { targetValue, repeatAnimation = false } = {} } = this.props
    const prevTargetValue = prevProps.data?.targetValue
    
    // Start animation when target value changes
    if (targetValue !== prevTargetValue) {
      this.startAnimation()
    }
  }

  componentWillUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    if (this.waitTimeout) {
      clearTimeout(this.waitTimeout)
    }
    if (this.endEffectTimeout) {
      clearTimeout(this.endEffectTimeout)
    }
  }

  startAnimation = () => {
    const { data: { animationDuration = 2000, easing = 'easeOut', repeatAnimation = false, waitTime = 3000 } = {} } = this.props
    
    // Clear any existing timeouts or animations
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    if (this.waitTimeout) {
      clearTimeout(this.waitTimeout)
    }
    if (this.endEffectTimeout) {
      clearTimeout(this.endEffectTimeout)
    }
    
    // Reset to start value if repeat animation is enabled
    if (repeatAnimation) {
      this.startValue = this.props.data.currentValue || 0
      this.endValue = this.props.data.targetValue || 1000
      this.setState({ 
        displayValue: this.startValue, 
        isAnimating: true, 
        isWaiting: false 
      }, () => {
        this.startTime = Date.now()
        this.animate()
      })
    } else {
      this.startValue = this.state.displayValue
      this.endValue = this.props.data.targetValue || 1000
      this.startTime = Date.now()
      this.setState({ isAnimating: true, isWaiting: false })
      this.animate()
    }
  }

  animate = () => {
    const { data: { animationDuration = 2000, easing = 'easeOut' } = {} } = this.props
    const elapsed = Date.now() - this.startTime
    const progress = Math.min(elapsed / animationDuration, 1)
    
    // Apply easing function
    let easedProgress = progress
    switch (easing) {
      case 'easeIn':
        easedProgress = progress * progress
        break
      case 'easeOut':
        easedProgress = 1 - Math.pow(1 - progress, 2)
        break
      case 'easeInOut':
        easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
        break
      case 'linear':
      default:
        easedProgress = progress
        break
    }
    
    const currentValue = this.startValue + (this.endValue - this.startValue) * easedProgress
    
    this.setState({ displayValue: currentValue })
    
    if (progress < 1) {
      this.animationFrame = requestAnimationFrame(this.animate)
    } else {
      this.setState({ isAnimating: false })
      
      // Trigger end animation effect
      this.triggerEndEffect()
      
      // Handle repeat animation with wait time
      const { data: { repeatAnimation = false, waitTime = 3000 } = {} } = this.props
      if (repeatAnimation) {
        this.setState({ isWaiting: true })
        this.waitTimeout = setTimeout(() => {
          this.startAnimation()
        }, waitTime)
      }
    }
  }

  triggerEndEffect = () => {
    const { data: { endAnimation = 'none', endAnimationDuration = 1000 } = {} } = this.props
    
    if (endAnimation !== 'none') {
      this.setState({ 
        showEndEffect: true, 
        endEffectType: endAnimation 
      })
      
      // Clear the effect after duration
      this.endEffectTimeout = setTimeout(() => {
        this.setState({ 
          showEndEffect: false, 
          endEffectType: null 
        })
      }, endAnimationDuration)
    }
  }

  formatNumber = (value) => {
    const { data: { numberFormat = 'comma', decimalPlaces = 0 } = {} } = this.props
    
    const num = typeof value === 'number' ? value : parseFloat(value) || 0
    
    // Apply decimal places
    const formatted = decimalPlaces > 0 ? num.toFixed(decimalPlaces) : Math.round(num).toString()
    
    // Apply number formatting
    switch (numberFormat) {
      case 'comma':
        return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      case 'space':
        return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      case 'none':
      default:
        return formatted
    }
  }

  getIcon = (iconName) => {
    const iconMap = {
      trophy: faTrophy,
      users: faUsers,
      dollar: faDollarSign,
      heart: faHeart,
      star: faStar,
      chart: faChartLine,
      cart: faShoppingCart,
      globe: faGlobe
    }
    return iconMap[iconName] || faTrophy
  }

  render() {
    const {
      data: {
        prefix = '',
        suffix = '',
        showPrefix = true,
        showSuffix = true,
        fontSize = 48,
        fontFamily = 'Arial, sans-serif',
        fontWeight = 'bold',
        color = '#ffffff',
        backgroundColor = '#2c3e50',
        alignment = 'center',
        verticalAlignment = 'center',
        showProgress = false,
        progressColor = '#3498db',
        showIcon = false,
        iconName = 'trophy',
        iconSize = 32,
        iconColor = '#f39c12',
        endAnimation = 'none',
        endAnimationDuration = 1000,
        endAnimationIntensity = 'medium',
        endAnimationColor = '#ffd700',
        combineEffects = false
      } = {}
    } = this.props
    
    const { displayValue, showEndEffect, endEffectType } = this.state
    
    const formattedValue = this.formatNumber(displayValue)
    
    const alignmentStyles = {
      left: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      right: { justifyContent: 'flex-end' }
    }
    
    const verticalAlignmentStyles = {
      top: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      bottom: { alignItems: 'flex-end' }
    }
    
    const progressPercentage = this.props.data.targetValue > 0 
      ? (displayValue / this.props.data.targetValue) * 100 
      : 0

    // Generate CSS classes for end effects
    const endEffectClass = showEndEffect && endEffectType !== 'none' 
      ? `end-effect-${endEffectType} end-effect-${endAnimationIntensity}` 
      : ''

    // Generate CSS classes for content animation
    const contentAnimationClass = this.state.isAnimating 
      ? `content-animating content-${this.props.data.easing || 'easeOut'}` 
      : ''

    return (
      <div 
        className={`simple-counter-widget ${endEffectClass} ${contentAnimationClass}`}
        style={{
          backgroundColor,
          color,
          fontSize: `${fontSize}px`,
          fontFamily,
          fontWeight,
          ...alignmentStyles[alignment],
          ...verticalAlignmentStyles[verticalAlignment]
        }}
      >
        <div className='counter-content'>
          {showIcon && (
            <div className='counter-icon'>
              <FontAwesomeIcon 
                icon={this.getIcon(iconName)} 
                size="lg"
                style={{ 
                  fontSize: `${iconSize}px`, 
                  color: iconColor,
                  marginRight: '10px'
                }}
              />
            </div>
          )}
          
          <div className='counter-display'>
            {showPrefix && prefix && (
              <span className='prefix'>{prefix}</span>
            )}
            
            <span 
              className={`counter-value ${this.state.isAnimating ? 'counting' : ''}`}
              style={{
                transform: this.state.isAnimating ? 'scale(1.05)' : 'scale(1)',
                textShadow: this.state.isAnimating 
                  ? `0 0 10px ${color}, 0 0 20px ${color}` 
                  : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {formattedValue}
            </span>
            
            {showSuffix && suffix && (
              <span className='suffix'>{suffix}</span>
            )}
          </div>
        </div>
        
        {showProgress && (
          <div className='progress-container'>
            <div className='progress-bar'>
              <div 
                className='progress-fill'
                style={{
                  width: `${Math.min(progressPercentage, 100)}%`,
                  backgroundColor: progressColor
                }}
              />
            </div>
          </div>
        )}

        <style jsx>{`
          .simple-counter-widget {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
            position: relative;
          }
          
          .counter-content {
            display: flex;
            align-items: center;
            flex: 1;
            width: 100%;
          }
          
          .counter-icon {
            display: flex;
            align-items: center;
          }
          
          .counter-display {
            display: flex;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 4px;
          }
          
          .counter-value {
            font-size: 1em;
            line-height: 1;
            font-weight: inherit;
          }
          
          .prefix, .suffix {
            font-size: 0.8em;
            opacity: 0.9;
            font-weight: normal;
          }
          
          .progress-container {
            width: 100%;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            overflow: hidden;
            margin-top: 10px;
          }
          
          .progress-bar {
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          
          .progress-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
          }
          
          /* Content Animation Effects */
          
          .content-animating {
            animation: contentPulse 0.5s ease-in-out infinite alternate;
          }
          
          .content-easeIn {
            animation: contentEaseIn 0.3s ease-in-out infinite alternate;
          }
          
          .content-easeOut {
            animation: contentEaseOut 0.3s ease-in-out infinite alternate;
          }
          
          .content-easeInOut {
            animation: contentEaseInOut 0.4s ease-in-out infinite alternate;
          }
          
          .content-linear {
            animation: contentLinear 0.2s ease-in-out infinite alternate;
          }
          
          .counter-value.counting {
            animation: numberGlow 0.8s ease-in-out infinite alternate;
          }
          
          @keyframes contentPulse {
            0% { 
              filter: brightness(1) contrast(1);
              transform: scale(1);
            }
            100% { 
              filter: brightness(1.1) contrast(1.05);
              transform: scale(1.02);
            }
          }
          
          @keyframes contentEaseIn {
            0% { 
              filter: brightness(1) saturate(1);
              transform: scale(1);
            }
            100% { 
              filter: brightness(1.15) saturate(1.1);
              transform: scale(1.03);
            }
          }
          
          @keyframes contentEaseOut {
            0% { 
              filter: brightness(1) hue-rotate(0deg);
              transform: scale(1);
            }
            100% { 
              filter: brightness(1.2) hue-rotate(5deg);
              transform: scale(1.04);
            }
          }
          
          @keyframes contentEaseInOut {
            0% { 
              filter: brightness(1) contrast(1);
              transform: scale(1);
            }
            50% { 
              filter: brightness(1.25) contrast(1.1);
              transform: scale(1.05);
            }
            100% { 
              filter: brightness(1.1) contrast(1.05);
              transform: scale(1.02);
            }
          }
          
          @keyframes contentLinear {
            0% { 
              filter: brightness(1);
              transform: scale(1);
            }
            100% { 
              filter: brightness(1.1);
              transform: scale(1.01);
            }
          }
          
          @keyframes numberGlow {
            0% { 
              text-shadow: 0 0 5px currentColor;
              transform: scale(1);
            }
            50% { 
              text-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
              transform: scale(1.08);
            }
            100% { 
              text-shadow: 0 0 10px currentColor;
              transform: scale(1.05);
            }
          }
          
          /* Enhanced counter display animations */
          .counter-display {
            position: relative;
            overflow: visible;
          }
          
          .counter-value {
            position: relative;
            display: inline-block;
            transition: all 0.2s ease;
          }
          
          .counter-value.counting::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            border-radius: 4px;
            animation: shimmer 1.5s ease-in-out infinite;
            z-index: -1;
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          /* Progress bar enhanced animation */
          .progress-fill {
            position: relative;
            overflow: hidden;
          }
          
          .content-animating .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: progressShimmer 2s ease-in-out infinite;
          }
          
          @keyframes progressShimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          /* Icon animation during counting */
          .content-animating .counter-icon {
            animation: iconBounce 0.6s ease-in-out infinite alternate;
          }
          
          @keyframes iconBounce {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-3px) rotate(2deg); }
          }
          
          /* End Animation Effects */
          
          /* Zoom Effects */
          .end-effect-zoom {
            animation: zoomEffect 1s ease-in-out;
          }
          
          .end-effect-zoom.end-effect-low {
            animation: zoomEffectLow 0.5s ease-in-out;
          }
          
          .end-effect-zoom.end-effect-medium {
            animation: zoomEffect 1s ease-in-out;
          }
          
          .end-effect-zoom.end-effect-high {
            animation: zoomEffectHigh 1.5s ease-in-out;
          }
          
          @keyframes zoomEffect {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          
          @keyframes zoomEffectLow {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes zoomEffectHigh {
            0% { transform: scale(1); }
            30% { transform: scale(1.3); }
            60% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          
          /* Pulse Effects */
          .end-effect-pulse {
            animation: pulseEffect 1s ease-in-out;
          }
          
          .end-effect-pulse.end-effect-low {
            animation: pulseEffectLow 0.8s ease-in-out;
          }
          
          .end-effect-pulse.end-effect-medium {
            animation: pulseEffect 1s ease-in-out;
          }
          
          .end-effect-pulse.end-effect-high {
            animation: pulseEffectHigh 1.2s ease-in-out;
          }
          
          @keyframes pulseEffect {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.8; }
          }
          
          @keyframes pulseEffectLow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.9; }
          }
          
          @keyframes pulseEffectHigh {
            0%, 100% { transform: scale(1); opacity: 1; }
            25% { transform: scale(1.2); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 0.8; }
            75% { transform: scale(1.15); opacity: 0.75; }
          }
          
          /* Bounce Effects */
          .end-effect-bounce {
            animation: bounceEffect 1s ease-in-out;
          }
          
          .end-effect-bounce.end-effect-low {
            animation: bounceEffectLow 0.6s ease-in-out;
          }
          
          .end-effect-bounce.end-effect-medium {
            animation: bounceEffect 1s ease-in-out;
          }
          
          .end-effect-bounce.end-effect-high {
            animation: bounceEffectHigh 1.4s ease-in-out;
          }
          
          @keyframes bounceEffect {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
            70% { transform: translateY(-5px); }
          }
          
          @keyframes bounceEffectLow {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-5px); }
            70% { transform: translateY(-2px); }
          }
          
          @keyframes bounceEffectHigh {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-20px); }
            70% { transform: translateY(-10px); }
          }
          
          /* Shake Effects */
          .end-effect-shake {
            animation: shakeEffect 0.8s ease-in-out;
          }
          
          .end-effect-shake.end-effect-low {
            animation: shakeEffectLow 0.5s ease-in-out;
          }
          
          .end-effect-shake.end-effect-medium {
            animation: shakeEffect 0.8s ease-in-out;
          }
          
          .end-effect-shake.end-effect-high {
            animation: shakeEffectHigh 1s ease-in-out;
          }
          
          @keyframes shakeEffect {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          @keyframes shakeEffectLow {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          
          @keyframes shakeEffectHigh {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          
          /* Glow Effects */
          .end-effect-glow {
            animation: glowEffect 1s ease-in-out;
            box-shadow: 0 0 20px ${endAnimationColor};
          }
          
          .end-effect-glow.end-effect-low {
            animation: glowEffectLow 0.8s ease-in-out;
            box-shadow: 0 0 10px ${endAnimationColor};
          }
          
          .end-effect-glow.end-effect-medium {
            animation: glowEffect 1s ease-in-out;
            box-shadow: 0 0 20px ${endAnimationColor};
          }
          
          .end-effect-glow.end-effect-high {
            animation: glowEffectHigh 1.2s ease-in-out;
            box-shadow: 0 0 40px ${endAnimationColor};
          }
          
          @keyframes glowEffect {
            0%, 100% { 
              box-shadow: 0 0 20px ${endAnimationColor};
              filter: brightness(1);
            }
            50% { 
              box-shadow: 0 0 30px ${endAnimationColor};
              filter: brightness(1.2);
            }
          }
          
          @keyframes glowEffectLow {
            0%, 100% { 
              box-shadow: 0 0 10px ${endAnimationColor};
              filter: brightness(1);
            }
            50% { 
              box-shadow: 0 0 15px ${endAnimationColor};
              filter: brightness(1.1);
            }
          }
          
          @keyframes glowEffectHigh {
            0%, 100% { 
              box-shadow: 0 0 40px ${endAnimationColor};
              filter: brightness(1);
            }
            25% { 
              box-shadow: 0 0 60px ${endAnimationColor};
              filter: brightness(1.3);
            }
            50% { 
              box-shadow: 0 0 50px ${endAnimationColor};
              filter: brightness(1.2);
            }
            75% { 
              box-shadow: 0 0 55px ${endAnimationColor};
              filter: brightness(1.25);
            }
          }
          
          /* Rainbow Effects */
          .end-effect-rainbow {
            animation: rainbowEffect 1.5s ease-in-out;
          }
          
          .end-effect-rainbow.end-effect-low {
            animation: rainbowEffectLow 1s ease-in-out;
          }
          
          .end-effect-rainbow.end-effect-medium {
            animation: rainbowEffect 1.5s ease-in-out;
          }
          
          .end-effect-rainbow.end-effect-high {
            animation: rainbowEffectHigh 2s ease-in-out;
          }
          
          @keyframes rainbowEffect {
            0% { filter: hue-rotate(0deg) brightness(1); }
            25% { filter: hue-rotate(90deg) brightness(1.2); }
            50% { filter: hue-rotate(180deg) brightness(1.1); }
            75% { filter: hue-rotate(270deg) brightness(1.2); }
            100% { filter: hue-rotate(360deg) brightness(1); }
          }
          
          @keyframes rainbowEffectLow {
            0% { filter: hue-rotate(0deg) brightness(1); }
            50% { filter: hue-rotate(180deg) brightness(1.1); }
            100% { filter: hue-rotate(360deg) brightness(1); }
          }
          
          @keyframes rainbowEffectHigh {
            0% { filter: hue-rotate(0deg) brightness(1); }
            20% { filter: hue-rotate(72deg) brightness(1.3); }
            40% { filter: hue-rotate(144deg) brightness(1.1); }
            60% { filter: hue-rotate(216deg) brightness(1.2); }
            80% { filter: hue-rotate(288deg) brightness(1.3); }
            100% { filter: hue-rotate(360deg) brightness(1); }
          }
        `}</style>
      </div>
    )
  }
}

export default SimpleCounterContent
