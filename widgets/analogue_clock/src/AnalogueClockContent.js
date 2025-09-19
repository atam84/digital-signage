import React, { Component } from 'react'
import moment from 'moment'

class AnalogueClockContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: moment(),
    }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: moment() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {
      data: {
        showNumbers = true,
        showSeconds = true,
        showDate = false,
        clockFace = 'circle',
        hourHandColor = '#333333',
        minuteHandColor = '#333333',
        secondHandColor = '#ff0000',
        numbersColor = '#333333',
        backgroundColor = '#ffffff',
        borderColor = '#333333',
        borderWidth = 2,
        size = 200,
        dateFormat = 'MM/DD/YYYY',
        datePosition = 'bottom',
        dateColor = '#333333',
        dateFontSize = 14,
        dateFontStyle = 'normal',
        dateFontWeight = 'normal',
        shadowStyle = 'none',
        gradientStyle = 'none',
        gradientColors = ['#ffffff', '#f0f0f0'],
        centerDotStyle = 'simple',
        tickMarkStyle = 'simple',
        handStyle = 'classic',
        numberStyle = 'standard'
      } = {}
    } = this.props
    const { time } = this.state

    const hours = time.hours() % 12
    const minutes = time.minutes()
    const seconds = time.seconds()

    // Calculate angles
    const hourAngle = (hours * 30) + (minutes * 0.5) // 30 degrees per hour, 0.5 degrees per minute
    const minuteAngle = minutes * 6 // 6 degrees per minute
    const secondAngle = seconds * 6 // 6 degrees per second

    // Calculate hand positions
    const centerX = size / 2
    const centerY = size / 2
    const hourHandLength = handStyle === 'thin' ? size * 0.22 : size * 0.25
    const minuteHandLength = handStyle === 'thin' ? size * 0.32 : size * 0.35
    const secondHandLength = handStyle === 'thin' ? size * 0.38 : size * 0.4

    const hourX = centerX + hourHandLength * Math.sin(hourAngle * Math.PI / 180)
    const hourY = centerY - hourHandLength * Math.cos(hourAngle * Math.PI / 180)
    
    const minuteX = centerX + minuteHandLength * Math.sin(minuteAngle * Math.PI / 180)
    const minuteY = centerY - minuteHandLength * Math.cos(minuteAngle * Math.PI / 180)
    
    const secondX = centerX + secondHandLength * Math.sin(secondAngle * Math.PI / 180)
    const secondY = centerY - secondHandLength * Math.cos(secondAngle * Math.PI / 180)

    const displayDate = time.format(dateFormat)

    // Generate hour markers
    const hourMarkers = []
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30) - 90 // Start from 12 o'clock
      const radius = size * 0.4
      const x = centerX + radius * Math.cos(angle * Math.PI / 180)
      const y = centerY + radius * Math.sin(angle * Math.PI / 180)
      
      hourMarkers.push(
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.08}
          fill={numbersColor}
          fontFamily="Arial, sans-serif"
          fontWeight={numberStyle === 'bold' ? 'bold' : numberStyle === 'italic' ? 'normal' : 'bold'}
          fontStyle={numberStyle === 'italic' ? 'italic' : 'normal'}
          filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
        >
          {i}
        </text>
      )
    }

    // Generate minute markers
    const minuteMarkers = []
    if (tickMarkStyle !== 'minimal') {
      for (let i = 1; i <= 60; i++) {
        if (i % 5 !== 0) { // Skip positions where hour markers are
          const angle = (i * 6) - 90
          const radius = size * 0.42
          const x = centerX + radius * Math.cos(angle * Math.PI / 180)
          const y = centerY + radius * Math.sin(angle * Math.PI / 180)
          
          if (tickMarkStyle === 'elegant') {
            // Elegant tick marks - lines instead of circles
            const innerRadius = size * 0.40
            const outerRadius = size * 0.42
            const innerX = centerX + innerRadius * Math.cos(angle * Math.PI / 180)
            const innerY = centerY + innerRadius * Math.sin(angle * Math.PI / 180)
            const outerX = centerX + outerRadius * Math.cos(angle * Math.PI / 180)
            const outerY = centerY + outerRadius * Math.sin(angle * Math.PI / 180)
            
            minuteMarkers.push(
              <line
                key={`min-${i}`}
                x1={innerX}
                y1={innerY}
                x2={outerX}
                y2={outerY}
                stroke={numbersColor}
                strokeWidth={size * 0.003}
              />
            )
          } else {
            // Simple tick marks - circles
            minuteMarkers.push(
              <circle
                key={`min-${i}`}
                cx={x}
                cy={y}
                r={size * 0.008}
                fill={numbersColor}
              />
            )
          }
        }
      }
    }

    const clockFaceStyle = clockFace === 'square' ? {
      borderRadius: size * 0.1
    } : clockFace === 'modern' ? {
      borderRadius: size * 0.2
    } : clockFace === 'vintage' ? {
      borderRadius: size * 0.15,
      boxShadow: shadowStyle === 'dramatic' ? 'inset 0 0 20px rgba(0,0,0,0.3)' : 
                 shadowStyle === 'subtle' ? 'inset 0 0 10px rgba(0,0,0,0.1)' : 'none'
    } : clockFace === 'minimal' ? {
      borderRadius: size * 0.5
    } : clockFace === 'hexagon' ? {
      borderRadius: size * 0.1
    } : clockFace === 'octagon' ? {
      borderRadius: size * 0.05
    } : clockFace === 'rounded' ? {
      borderRadius: size * 0.3
    } : clockFace === 'flat' ? {
      borderRadius: 0
    } : {}

    return (
      <div className='analogue-clock-widget' style={{ width: size, height: size + (showDate ? size * 0.15 : 0) }}>
        {showDate && datePosition === 'top' && (
          <div 
            className='date-top' 
            style={{
              color: dateColor,
              fontSize: `${dateFontSize}px`,
              fontStyle: dateFontStyle,
              fontWeight: dateFontWeight
            }}
          >
            {displayDate}
          </div>
        )}
        
        <div className='clock-container' style={clockFaceStyle}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Define gradients */}
            <defs>
              {gradientStyle === 'radial' && (
                <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={gradientColors[0]} />
                  <stop offset="100%" stopColor={gradientColors[1]} />
                </radialGradient>
              )}
              {gradientStyle === 'linear' && (
                <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={gradientColors[0]} />
                  <stop offset="100%" stopColor={gradientColors[1]} />
                </linearGradient>
              )}
              {shadowStyle === 'dramatic' && (
                <filter id="dramaticShadow">
                  <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                </filter>
              )}
              {shadowStyle === 'subtle' && (
                <filter id="subtleShadow">
                  <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
                </filter>
              )}
            </defs>
            
            {/* Clock face */}
            {clockFace === 'hexagon' ? (
              <polygon
                points={`${centerX},${borderWidth} ${centerX + (centerX - borderWidth) * 0.866},${centerY - (centerX - borderWidth) * 0.5} ${centerX + (centerX - borderWidth) * 0.866},${centerY + (centerX - borderWidth) * 0.5} ${centerX},${size - borderWidth} ${centerX - (centerX - borderWidth) * 0.866},${centerY + (centerX - borderWidth) * 0.5} ${centerX - (centerX - borderWidth) * 0.866},${centerY - (centerX - borderWidth) * 0.5}`}
                fill={gradientStyle !== 'none' ? "url(#clockGradient)" : backgroundColor}
                stroke={borderColor}
                strokeWidth={borderWidth}
                filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
              />
            ) : clockFace === 'octagon' ? (
              <polygon
                points={`${centerX},${borderWidth} ${centerX + (centerX - borderWidth) * 0.707},${centerY - (centerX - borderWidth) * 0.707} ${centerX + (centerX - borderWidth) * 0.707},${centerY + (centerX - borderWidth) * 0.707} ${centerX},${size - borderWidth} ${centerX - (centerX - borderWidth) * 0.707},${centerY + (centerX - borderWidth) * 0.707} ${centerX - (centerX - borderWidth) * 0.707},${centerY - (centerX - borderWidth) * 0.707}`}
                fill={gradientStyle !== 'none' ? "url(#clockGradient)" : backgroundColor}
                stroke={borderColor}
                strokeWidth={borderWidth}
                filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
              />
            ) : (
              <circle
                cx={centerX}
                cy={centerY}
                r={centerX - borderWidth / 2}
                fill={gradientStyle !== 'none' ? "url(#clockGradient)" : backgroundColor}
                stroke={borderColor}
                strokeWidth={borderWidth}
                filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
              />
            )}
            
            {/* Minute markers */}
            {showNumbers && minuteMarkers}
            
            {/* Hour numbers */}
            {showNumbers && hourMarkers}
            
            {/* Hour hand */}
            <line
              x1={centerX}
              y1={centerY}
              x2={hourX}
              y2={hourY}
              stroke={hourHandColor}
              strokeWidth={handStyle === 'thin' ? size * 0.015 : handStyle === 'modern' ? size * 0.025 : size * 0.02}
              strokeLinecap={handStyle === 'modern' ? 'square' : 'round'}
              filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
            />
            
            {/* Minute hand */}
            <line
              x1={centerX}
              y1={centerY}
              x2={minuteX}
              y2={minuteY}
              stroke={minuteHandColor}
              strokeWidth={handStyle === 'thin' ? size * 0.010 : handStyle === 'modern' ? size * 0.020 : size * 0.015}
              strokeLinecap={handStyle === 'modern' ? 'square' : 'round'}
              filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
            />
            
            {/* Second hand */}
            {showSeconds && (
              <line
                x1={centerX}
                y1={centerY}
                x2={secondX}
                y2={secondY}
                stroke={secondHandColor}
                strokeWidth={handStyle === 'thin' ? size * 0.005 : size * 0.008}
                strokeLinecap={handStyle === 'modern' ? 'square' : 'round'}
                filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
              />
            )}
            
            {/* Center dot */}
            {centerDotStyle !== 'hidden' && (
              <circle
                cx={centerX}
                cy={centerY}
                r={centerDotStyle === 'elegant' ? size * 0.03 : size * 0.02}
                fill={centerDotStyle === 'elegant' ? hourHandColor : borderColor}
                stroke={centerDotStyle === 'elegant' ? borderColor : undefined}
                strokeWidth={centerDotStyle === 'elegant' ? size * 0.005 : 0}
                filter={shadowStyle !== 'none' ? `url(#${shadowStyle}Shadow)` : undefined}
              />
            )}
          </svg>
        </div>
        
        {showDate && datePosition === 'bottom' && (
          <div 
            className='date-bottom' 
            style={{
              color: dateColor,
              fontSize: `${dateFontSize}px`,
              fontStyle: dateFontStyle,
              fontWeight: dateFontWeight
            }}
          >
            {displayDate}
          </div>
        )}
        
        <style jsx>{`
          .analogue-clock-widget {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
          }
          
          .clock-container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .date-top, .date-bottom {
            font-family: Arial, sans-serif;
            margin: 5px 0;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default AnalogueClockContent
