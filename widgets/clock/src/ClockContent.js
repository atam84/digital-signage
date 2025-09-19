/**
 * @fileoverview Digital Clock widget that displays current time and optionally date
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

class ClockContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: new Date()
    }
    this.timer = null
  }

  componentDidMount() {
    // Update clock every second
    this.timer = setInterval(() => {
      this.setState({ time: new Date() })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  formatTime = (date, format, showSeconds, showAMPM) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    
    if (format === '12') {
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12 // 0 should be 12
      
      let timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      
      if (showSeconds) {
        timeString += `:${seconds.toString().padStart(2, '0')}`
      }
      
      if (showAMPM) {
        timeString += ` ${ampm}`
      }
      
      return timeString
    } else {
      // 24 hour format
      let timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      
      if (showSeconds) {
        timeString += `:${seconds.toString().padStart(2, '0')}`
      }
      
      return timeString
    }
  }

  formatDate = (date, dateFormat) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`
      case 'MM/DD/YYYY':
      default:
        return `${month}/${day}/${year}`
    }
  }

  render() {
    const {
      data: {
        format = '12',
        showSeconds = true,
        showDate = false,
        color = '#ffffff',
        backgroundColor = '#2c3e50',
        fontSize = 48,
        fontFamily = 'monospace',
        dateFormat = 'MM/DD/YYYY',
        showAMPM = true
      } = {}
    } = this.props

    const { time } = this.state

    const widgetStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor,
      color: color,
      fontFamily: fontFamily,
      padding: '20px',
      boxSizing: 'border-box'
    }

    const timeStyle = {
      fontSize: `${fontSize}px`,
      fontWeight: 'bold',
      margin: '0',
      textAlign: 'center',
      lineHeight: 1
    }

    const dateStyle = {
      fontSize: `${Math.max(fontSize * 0.4, 16)}px`,
      margin: '10px 0 0 0',
      textAlign: 'center',
      opacity: 0.8
    }

    return (
      <div className='clockWidget' style={widgetStyle}>
        <div style={timeStyle}>
          {this.formatTime(time, format, showSeconds, showAMPM)}
        </div>
        {showDate && (
          <div style={dateStyle}>
            {this.formatDate(time, dateFormat)}
          </div>
        )}
      </div>
    )
  }
}

export default ClockContent
