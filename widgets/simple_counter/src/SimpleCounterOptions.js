/**
 * @fileoverview Options component for Simple Counter widget
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'

import { Form, Input, InlineInputGroup } from '../../../components/Form'
import SimpleCounterContent from './SimpleCounterContent'

config.autoAddCss = false

class SimpleCounterOptions extends Component {
  constructor(props) {
    super(props)
    const {
      targetValue = 1000,
      currentValue = 0,
      prefix = '',
      suffix = '',
      animationDuration = 2000,
      easing = 'easeOut',
      showPrefix = true,
      showSuffix = true,
      numberFormat = 'comma',
      decimalPlaces = 0,
      fontSize = 48,
      fontFamily = 'Arial, sans-serif',
      fontWeight = 'bold',
      color = '#ffffff',
      backgroundColor = '#2c3e50',
      autoStart = true,
      repeatAnimation = false,
      waitTime = 3000,
      showProgress = false,
      progressColor = '#3498db',
      alignment = 'center',
      verticalAlignment = 'center',
      showIcon = false,
      iconName = 'trophy',
      iconSize = 32,
      iconColor = '#f39c12',
      endAnimation = 'none',
      endAnimationDuration = 1000,
      endAnimationIntensity = 'medium',
      endAnimationColor = '#ffd700',
      combineEffects = false
    } = props.data || {}

    this.state = {
      targetValue,
      currentValue,
      prefix,
      suffix,
      animationDuration,
      easing,
      showPrefix,
      showSuffix,
      numberFormat,
      decimalPlaces,
      fontSize,
      fontFamily,
      fontWeight,
      color,
      backgroundColor,
      autoStart,
      repeatAnimation,
      waitTime,
      showProgress,
      progressColor,
      alignment,
      verticalAlignment,
      showIcon,
      iconName,
      iconSize,
      iconColor,
      endAnimation,
      endAnimationDuration,
      endAnimationIntensity,
      endAnimationColor,
      combineEffects
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
      targetValue,
      currentValue,
      prefix,
      suffix,
      animationDuration,
      easing,
      showPrefix,
      showSuffix,
      numberFormat,
      decimalPlaces,
      fontSize,
      fontFamily,
      fontWeight,
      color,
      backgroundColor,
      autoStart,
      repeatAnimation,
      waitTime,
      showProgress,
      progressColor,
      alignment,
      verticalAlignment,
      showIcon,
      iconName,
      iconSize,
      iconColor,
      endAnimation,
      endAnimationDuration,
      endAnimationIntensity,
      endAnimationColor,
      combineEffects
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Simple Counter</h3>
          <p>Configure your animated counter display preferences.</p>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Target Value'}
              type={'number'}
              name={'targetValue'}
              value={targetValue}
              min={0}
              max={999999999}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Starting Value'}
              type={'number'}
              name={'currentValue'}
              value={currentValue}
              min={0}
              max={999999999}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Prefix'}
              type={'text'}
              name={'prefix'}
              value={prefix}
              placeholder={'e.g., $, €, #'}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Suffix'}
              type={'text'}
              name={'suffix'}
              value={suffix}
              placeholder={'e.g., visitors, sales, users'}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Animation Duration (ms)'}
              type={'number'}
              name={'animationDuration'}
              value={animationDuration}
              min={100}
              max={10000}
              step={100}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Easing'}
              type={'select'}
              name={'easing'}
              value={easing}
              choices={[
                { id: 'linear', label: 'Linear' },
                { id: 'easeIn', label: 'Ease In' },
                { id: 'easeOut', label: 'Ease Out' },
                { id: 'easeInOut', label: 'Ease In/Out' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Wait Time (ms)'}
              type={'number'}
              name={'waitTime'}
              value={waitTime}
              min={0}
              max={30000}
              step={500}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <hr className='separator' />
          <span className='subheader'>End Animation Effects</span>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'End Animation'}
              type={'select'}
              name={'endAnimation'}
              value={endAnimation}
              choices={[
                { id: 'none', label: 'None' },
                { id: 'zoom', label: 'Zoom In/Out' },
                { id: 'pulse', label: 'Pulse' },
                { id: 'bounce', label: 'Bounce' },
                { id: 'shake', label: 'Shake' },
                { id: 'glow', label: 'Glow' },
                { id: 'rainbow', label: 'Rainbow' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Effect Duration (ms)'}
              type={'number'}
              name={'endAnimationDuration'}
              value={endAnimationDuration}
              min={100}
              max={5000}
              step={100}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Effect Intensity'}
              type={'select'}
              name={'endAnimationIntensity'}
              value={endAnimationIntensity}
              choices={[
                { id: 'low', label: 'Low' },
                { id: 'medium', label: 'Medium' },
                { id: 'high', label: 'High' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Effect Color'}
              type={'color'}
              name={'endAnimationColor'}
              value={endAnimationColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Number Format'}
              type={'select'}
              name={'numberFormat'}
              value={numberFormat}
              choices={[
                { id: 'comma', label: 'Comma (1,000)' },
                { id: 'space', label: 'Space (1 000)' },
                { id: 'none', label: 'None (1000)' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Decimal Places'}
              type={'number'}
              name={'decimalPlaces'}
              value={decimalPlaces}
              min={0}
              max={3}
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
              label={'Font Family'}
              type={'select'}
              name={'fontFamily'}
              value={fontFamily}
              choices={[
                { id: 'Arial, sans-serif', label: 'Arial' },
                { id: 'Helvetica, sans-serif', label: 'Helvetica' },
                { id: 'Georgia, serif', label: 'Georgia' },
                { id: 'Times New Roman, serif', label: 'Times New Roman' },
                { id: 'Courier New, monospace', label: 'Courier New' },
                { id: 'monospace', label: 'Monospace' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Font Weight'}
              type={'select'}
              name={'fontWeight'}
              value={fontWeight}
              choices={[
                { id: 'normal', label: 'Normal' },
                { id: 'bold', label: 'Bold' },
                { id: 'lighter', label: 'Light' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Alignment'}
              type={'select'}
              name={'alignment'}
              value={alignment}
              choices={[
                { id: 'left', label: 'Left' },
                { id: 'center', label: 'Center' },
                { id: 'right', label: 'Right' }
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

          {showProgress && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Progress Bar Color'}
                type={'color'}
                name={'progressColor'}
                value={progressColor}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Vertical Alignment'}
              type={'select'}
              name={'verticalAlignment'}
              value={verticalAlignment}
              choices={[
                { id: 'top', label: 'Top' },
                { id: 'center', label: 'Center' },
                { id: 'bottom', label: 'Bottom' }
              ]}
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
                  checked={showPrefix}
                  onChange={() => this.handleBooleanChange('showPrefix')}
                />
                Show Prefix
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showSuffix}
                  onChange={() => this.handleBooleanChange('showSuffix')}
                />
                Show Suffix
              </label>
            </div>
          </InlineInputGroup>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={autoStart}
                  onChange={() => this.handleBooleanChange('autoStart')}
                />
                Auto Start Animation
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={repeatAnimation}
                  onChange={() => this.handleBooleanChange('repeatAnimation')}
                />
                Repeat Animation
              </label>
            </div>
          </InlineInputGroup>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showProgress}
                  onChange={() => this.handleBooleanChange('showProgress')}
                />
                Show Progress Bar
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showIcon}
                  onChange={() => this.handleBooleanChange('showIcon')}
                />
                Show Icon
              </label>
            </div>
          </InlineInputGroup>

          {showIcon && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Icon'}
                type={'select'}
                name={'iconName'}
                value={iconName}
                choices={[
                  { id: 'trophy', label: 'Trophy' },
                  { id: 'users', label: 'Users' },
                  { id: 'dollar', label: 'Dollar' },
                  { id: 'heart', label: 'Heart' },
                  { id: 'star', label: 'Star' },
                  { id: 'chart', label: 'Chart' },
                  { id: 'cart', label: 'Shopping Cart' },
                  { id: 'globe', label: 'Globe' }
                ]}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Icon Size (px)'}
                type={'number'}
                name={'iconSize'}
                value={iconSize}
                min={16}
                max={64}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          {showIcon && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Icon Color'}
                type={'color'}
                name={'iconColor'}
                value={iconColor}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}
        </Form>

        <div className={'previewContainer'}>
          <p>Preview</p>
          <div className={'preview'}>
            <SimpleCounterContent data={this.state} />
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

export default SimpleCounterOptions
