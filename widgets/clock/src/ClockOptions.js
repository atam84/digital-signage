/**
 * @fileoverview Options component for Digital Clock widget
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import { Form, Input, InlineInputGroup } from '../../../components/Form'
import ClockContent from './ClockContent'

config.autoAddCss = false

class ClockOptions extends Component {
  constructor(props) {
    super(props)
    const { 
      format = '12',
      showSeconds = true,
      showDate = false,
      color = '#ffffff',
      backgroundColor = '#2c3e50',
      fontSize = 48,
      fontFamily = 'monospace',
      dateFormat = 'MM/DD/YYYY',
      showAMPM = true
    } = props.data || {}
    
    this.state = {
      format,
      showSeconds,
      showDate,
      color,
      backgroundColor,
      fontSize,
      fontFamily,
      dateFormat,
      showAMPM
    }
  }

  handleChange = (name, value) => {
    const { onChange = () => {} } = this.props
    this.setState(
      {
        [name]: value
      },
      () => {
        onChange(this.state)
      }
    )
  }

  handleBooleanChange = (name) => {
    const { onChange = () => {} } = this.props
    this.setState(
      {
        [name]: !this.state[name]
      },
      () => {
        onChange(this.state)
      }
    )
  }

  render() {
    const { 
      format, 
      showSeconds, 
      showDate, 
      color, 
      backgroundColor, 
      fontSize, 
      fontFamily, 
      dateFormat, 
      showAMPM 
    } = this.state

    return (
      <div className={'container'}>
        <Form>
          <h3>Widget: Digital Clock</h3>
          <p>Configure your digital clock display preferences.</p>
          
          <InlineInputGroup>
            <Input
              inline={false}
              label={'Time Format'}
              type={'select'}
              name={'format'}
              value={format}
              choices={[
                { id: '12', label: '12 Hour (AM/PM)' },
                { id: '24', label: '24 Hour' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Font Family'}
              type={'select'}
              name={'fontFamily'}
              value={fontFamily}
              choices={[
                { id: 'monospace', label: 'Monospace' },
                { id: 'Arial, sans-serif', label: 'Arial' },
                { id: 'Helvetica, sans-serif', label: 'Helvetica' },
                { id: 'Georgia, serif', label: 'Georgia' },
                { id: 'Times New Roman, serif', label: 'Times New Roman' },
                { id: 'Courier New, monospace', label: 'Courier New' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Font Size (px)'}
              type={'number'}
              name={'fontSize'}
              value={fontSize}
              min={12}
              max={200}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Date Format'}
              type={'select'}
              name={'dateFormat'}
              value={dateFormat}
              choices={[
                { id: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                { id: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                { id: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Text Color'}
              type={'color'}
              name={'color'}
              value={color}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Background Color'}
              type={'color'}
              name={'backgroundColor'}
              value={backgroundColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <hr className='separator' />
          <span className='subheader'>Display Options</span>
          
          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showSeconds}
                  onChange={() => this.handleBooleanChange('showSeconds')}
                />
                Show Seconds
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showDate}
                  onChange={() => this.handleBooleanChange('showDate')}
                />
                Show Date
              </label>
            </div>
          </InlineInputGroup>

          {format === '12' && (
            <InlineInputGroup>
              <div className='checkbox-group'>
                <label>
                  <input
                    type='checkbox'
                    checked={showAMPM}
                    onChange={() => this.handleBooleanChange('showAMPM')}
                  />
                  Show AM/PM
                </label>
              </div>
            </InlineInputGroup>
          )}
        </Form>
        
        <div className={'previewContainer'}>
          <p>Preview</p>
          <div className={'preview'}>
            <ClockContent data={this.state} />
          </div>
        </div>
        
        <style jsx>
          {`
            h3,
            p {
              font-family: 'Open Sans', sans-serif;
            }
            .container {
              display: flex;
              flex-direction: row;
            }
            .preview {
              display: block;
              width: 240px;
              height: 240px;
              border-radius: 6px;
              overflow: hidden;
              border: 1px solid #ddd;
            }
            .previewContainer {
              margin-left: 16px;
              width: 240px;
            }
            .separator {
              border: none;
              border-bottom: 1px solid #ededed;
              width: 100%;
            }
            .subheader {
              margin-right: 16px;
              color: #666666;
              font-family: 'Open Sans', sans-serif;
              font-weight: 600;
              display: inline-block;
              padding-top: 16px;
              padding-bottom: 16px;
            }
            .checkbox-group {
              padding: 8px 0;
              display: flex;
              align-items: center;
            }
            .checkbox-group label {
              display: flex;
              align-items: center;
              font-family: 'Open Sans', sans-serif;
              color: #333;
              cursor: pointer;
            }
            .checkbox-group input[type='checkbox'] {
              margin-right: 8px;
              transform: scale(1.2);
            }
          `}
        </style>
      </div>
    )
  }
}

export default ClockOptions
