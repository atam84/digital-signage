/**
 * @fileoverview Options component for Analogue Clock widget
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import { Form, Input, InlineInputGroup } from '../../../components/Form'
import AnalogueClockContent from './AnalogueClockContent'

config.autoAddCss = false

class AnalogueClockOptions extends Component {
  constructor(props) {
    super(props)
    const {
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
    } = props.data || {}

    this.state = {
      showNumbers,
      showSeconds,
      showDate,
      clockFace,
      hourHandColor,
      minuteHandColor,
      secondHandColor,
      numbersColor,
      backgroundColor,
      borderColor,
      borderWidth,
      size,
      dateFormat,
      datePosition,
      dateColor,
      dateFontSize,
      dateFontStyle,
      dateFontWeight,
      shadowStyle,
      gradientStyle,
      gradientColors,
      centerDotStyle,
      tickMarkStyle,
      handStyle,
      numberStyle
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
      showNumbers,
      showSeconds,
      showDate,
      clockFace,
      hourHandColor,
      minuteHandColor,
      secondHandColor,
      numbersColor,
      backgroundColor,
      borderColor,
      borderWidth,
      size,
      dateFormat,
      datePosition,
      dateColor,
      dateFontSize,
      dateFontStyle,
      dateFontWeight,
      shadowStyle,
      gradientStyle,
      gradientColors,
      centerDotStyle,
      tickMarkStyle,
      handStyle,
      numberStyle
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Analogue Clock</h3>
          <p>Configure your analogue clock display preferences.</p>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Clock Face'}
              type={'select'}
              name={'clockFace'}
              value={clockFace}
              choices={[
                { id: 'circle', label: 'Circle' },
                { id: 'square', label: 'Square' },
                { id: 'modern', label: 'Modern (Rounded)' },
                { id: 'vintage', label: 'Vintage' },
                { id: 'minimal', label: 'Minimal' },
                { id: 'hexagon', label: 'Hexagon' },
                { id: 'octagon', label: 'Octagon' },
                { id: 'rounded', label: 'Rounded' },
                { id: 'flat', label: 'Flat' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Clock Size (px)'}
              type={'number'}
              name={'size'}
              value={size}
              min={100}
              max={500}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Shadow Style'}
              type={'select'}
              name={'shadowStyle'}
              value={shadowStyle}
              choices={[
                { id: 'none', label: 'None' },
                { id: 'subtle', label: 'Subtle' },
                { id: 'dramatic', label: 'Dramatic' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Gradient Style'}
              type={'select'}
              name={'gradientStyle'}
              value={gradientStyle}
              choices={[
                { id: 'none', label: 'None' },
                { id: 'radial', label: 'Radial' },
                { id: 'linear', label: 'Linear' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          {gradientStyle !== 'none' && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Gradient Color 1'}
                type={'color'}
                name={'gradientColors'}
                value={gradientColors[0]}
                onChange={(name, value) => {
                  const newColors = [...gradientColors]
                  newColors[0] = value
                  this.handleChange('gradientColors', newColors)
                }}
              />
              <Input
                inline={false}
                label={'Gradient Color 2'}
                type={'color'}
                name={'gradientColors'}
                value={gradientColors[1]}
                onChange={(name, value) => {
                  const newColors = [...gradientColors]
                  newColors[1] = value
                  this.handleChange('gradientColors', newColors)
                }}
              />
            </InlineInputGroup>
          )}

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Background Color'}
              type={'color'}
              name={'backgroundColor'}
              value={backgroundColor}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Border Color'}
              type={'color'}
              name={'borderColor'}
              value={borderColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Hour Hand Color'}
              type={'color'}
              name={'hourHandColor'}
              value={hourHandColor}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Minute Hand Color'}
              type={'color'}
              name={'minuteHandColor'}
              value={minuteHandColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Second Hand Color'}
              type={'color'}
              name={'secondHandColor'}
              value={secondHandColor}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Numbers Color'}
              type={'color'}
              name={'numbersColor'}
              value={numbersColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Border Width'}
              type={'number'}
              name={'borderWidth'}
              value={borderWidth}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Hand Style'}
              type={'select'}
              name={'handStyle'}
              value={handStyle}
              choices={[
                { id: 'classic', label: 'Classic' },
                { id: 'modern', label: 'Modern' },
                { id: 'thin', label: 'Thin' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Tick Mark Style'}
              type={'select'}
              name={'tickMarkStyle'}
              value={tickMarkStyle}
              choices={[
                { id: 'simple', label: 'Simple' },
                { id: 'elegant', label: 'Elegant' },
                { id: 'minimal', label: 'Minimal' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Number Style'}
              type={'select'}
              name={'numberStyle'}
              value={numberStyle}
              choices={[
                { id: 'standard', label: 'Standard' },
                { id: 'bold', label: 'Bold' },
                { id: 'italic', label: 'Italic' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Center Dot Style'}
              type={'select'}
              name={'centerDotStyle'}
              value={centerDotStyle}
              choices={[
                { id: 'simple', label: 'Simple' },
                { id: 'elegant', label: 'Elegant' },
                { id: 'hidden', label: 'Hidden' }
              ]}
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
                { id: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                { id: 'MMMM Do, YYYY', label: 'September 19th, 2025' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          {showDate && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Date Position'}
                type={'select'}
                name={'datePosition'}
                value={datePosition}
                choices={[
                  { id: 'top', label: 'Top' },
                  { id: 'bottom', label: 'Bottom' }
                ]}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Date Color'}
                type={'color'}
                name={'dateColor'}
                value={dateColor}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          {showDate && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Date Font Size (px)'}
                type={'number'}
                name={'dateFontSize'}
                value={dateFontSize}
                min={8}
                max={48}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Date Font Style'}
                type={'select'}
                name={'dateFontStyle'}
                value={dateFontStyle}
                choices={[
                  { id: 'normal', label: 'Normal' },
                  { id: 'italic', label: 'Italic' }
                ]}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          {showDate && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Date Font Weight'}
                type={'select'}
                name={'dateFontWeight'}
                value={dateFontWeight}
                choices={[
                  { id: 'normal', label: 'Normal' },
                  { id: 'bold', label: 'Bold' },
                  { id: 'lighter', label: 'Light' }
                ]}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          <hr className='separator' />
          <span className='subheader'>Display Options</span>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showNumbers}
                  onChange={() => this.handleBooleanChange('showNumbers')}
                />
                Show Numbers
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showSeconds}
                  onChange={() => this.handleBooleanChange('showSeconds')}
                />
                Show Second Hand
              </label>
            </div>
          </InlineInputGroup>

          <InlineInputGroup>
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
        </Form>

        <div className={'previewContainer'}>
          <p>Preview</p>
          <div className={'preview'}>
            <AnalogueClockContent data={this.state} />
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
              width: 300px;
              height: 300px;
              border-radius: 6px;
              overflow: hidden;
              border: 1px solid #ddd;
            }
            .previewContainer {
              margin-left: 16px;
              width: 300px;
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

export default AnalogueClockOptions
