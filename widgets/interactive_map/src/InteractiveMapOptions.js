/**
 * @fileoverview Options component for Interactive Map widget
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

import { Form, Input, InlineInputGroup } from '../../../components/Form'
import InteractiveMapContent from './InteractiveMapContent'

config.autoAddCss = false

class InteractiveMapOptions extends Component {
  constructor(props) {
    super(props)
    const {
      mapType = 'roadmap',
      mapProvider = 'google',
      mapStyle = 'default',
      googleApiKey = '',
      latitude = 40.7128,
      longitude = -74.0060,
      zoom = 10,
      autoZoom = true,
      zoomRange = [5, 18],
      displayMode = 'embedded',
      floatingPosition = 'top-right',
      floatingSize = 'medium',
      showControls = true,
      showScale = true,
      showCompass = true,
      displayDuration = 0,
      autoRotate = false,
      rotationInterval = 30,
      enableRepetition = false,
      repetitionInterval = 30,
      repetitionUnit = 'minutes',
      fadeTransition = true,
      showQRCode = false,
      qrCodePosition = 'bottom-right',
      qrCodeSize = 'medium',
      qrCodeContent = 'https://maps.google.com/?q=40.7128,-74.0060',
      qrCodeLabel = 'Get Directions',
      animationType = 'fade',
      animationDuration = 1000,
      animationDelay = 0,
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
    } = props.data || {}

    this.state = {
      mapType,
      mapProvider,
      mapStyle,
      googleApiKey,
      latitude,
      longitude,
      zoom,
      autoZoom,
      zoomRange,
      displayMode,
      floatingPosition,
      floatingSize,
      showControls,
      showScale,
      showCompass,
      displayDuration,
      autoRotate,
      rotationInterval,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      showQRCode,
      qrCodePosition,
      qrCodeSize,
      qrCodeContent,
      qrCodeLabel,
      animationType,
      animationDuration,
      animationDelay,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      showOverlay,
      overlayText,
      overlayPosition,
      overlayStyle,
      overlayColor,
      overlayOpacity,
      overlayTextColor,
      clickable,
      showMarkers,
      markerStyle,
      markerColor,
      markerSize,
      showInfoWindow,
      infoWindowContent,
      showPreview: true
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
      mapType,
      mapProvider,
      mapStyle,
      googleApiKey,
      latitude,
      longitude,
      zoom,
      autoZoom,
      displayMode,
      floatingPosition,
      floatingSize,
      showControls,
      showScale,
      showCompass,
      displayDuration,
      autoRotate,
      rotationInterval,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      showQRCode,
      qrCodePosition,
      qrCodeSize,
      qrCodeContent,
      qrCodeLabel,
      animationType,
      animationDuration,
      animationDelay,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      showOverlay,
      overlayText,
      overlayPosition,
      overlayStyle,
      overlayColor,
      overlayOpacity,
      overlayTextColor,
      showMarkers,
      markerStyle,
      markerColor,
      markerSize,
      showInfoWindow,
      infoWindowContent
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Interactive Map</h3>
          <p>Configure your interactive map display with advanced positioning and QR code features.</p>

          <hr className='separator' />
          <span className='subheader'>Map Settings</span>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Map Provider'}
              type={'select'}
              name={'mapProvider'}
              value={mapProvider}
              choices={[
                { id: 'google', label: 'Google Maps' },
                { id: 'openstreetmap', label: 'OpenStreetMap' },
                { id: 'mapbox', label: 'Mapbox' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Map Type'}
              type={'select'}
              name={'mapType'}
              value={mapType}
              choices={[
                { id: 'roadmap', label: 'Road Map' },
                { id: 'satellite', label: 'Satellite' },
                { id: 'hybrid', label: 'Hybrid' },
                { id: 'terrain', label: 'Terrain' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          {mapProvider === 'google' && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Google Maps API Key'}
                type={'text'}
                name={'googleApiKey'}
                value={googleApiKey}
                placeholder={'Enter your Google Maps API key'}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Latitude'}
              type={'number'}
              name={'latitude'}
              value={latitude}
              step={0.0001}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Longitude'}
              type={'number'}
              name={'longitude'}
              value={longitude}
              step={0.0001}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Zoom Level'}
              type={'number'}
              name={'zoom'}
              value={zoom}
              min={1}
              max={20}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Map Style'}
              type={'select'}
              name={'mapStyle'}
              value={mapStyle}
              choices={[
                { id: 'default', label: 'Default' },
                { id: 'dark', label: 'Dark' },
                { id: 'light', label: 'Light' },
                { id: 'colorful', label: 'Colorful' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <hr className='separator' />
          <span className='subheader'>Display Mode</span>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Display Mode'}
              type={'select'}
              name={'displayMode'}
              value={displayMode}
              choices={[
                { id: 'floating', label: 'Floating' },
                { id: 'fullscreen', label: 'Full Screen' },
                { id: 'embedded', label: 'Embedded' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Floating Position'}
              type={'select'}
              name={'floatingPosition'}
              value={floatingPosition}
              choices={[
                { id: 'top-left', label: 'Top Left' },
                { id: 'top-right', label: 'Top Right' },
                { id: 'bottom-left', label: 'Bottom Left' },
                { id: 'bottom-right', label: 'Bottom Right' },
                { id: 'center', label: 'Center' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Floating Size'}
              type={'select'}
              name={'floatingSize'}
              value={floatingSize}
              choices={[
                { id: 'small', label: 'Small (300x200)' },
                { id: 'medium', label: 'Medium (400x300)' },
                { id: 'large', label: 'Large (600x400)' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Display Duration (seconds)'}
              type={'number'}
              name={'displayDuration'}
              value={displayDuration}
              min={0}
              max={3600}
              placeholder={'0 = permanent'}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <hr className='separator' />
          <span className='subheader'>Repetition Settings</span>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={enableRepetition}
                  onChange={() => this.handleBooleanChange('enableRepetition')}
                />
                Enable Repetition
              </label>
            </div>
          </InlineInputGroup>

          {enableRepetition && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Repeat Every'}
                type={'number'}
                name={'repetitionInterval'}
                value={repetitionInterval}
                min={1}
                max={1440}
                placeholder={'30'}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Unit'}
                type={'select'}
                name={'repetitionUnit'}
                value={repetitionUnit}
                choices={[
                  { id: 'minutes', label: 'Minutes' },
                  { id: 'hours', label: 'Hours' }
                ]}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          <hr className='separator' />
          <span className='subheader'>QR Code Settings</span>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showQRCode}
                  onChange={() => this.handleBooleanChange('showQRCode')}
                />
                Show QR Code
              </label>
            </div>
          </InlineInputGroup>

          {showQRCode && (
            <>
              <InlineInputGroup>
                <Input
                  inline={false}
                  label={'QR Code Position'}
                  type={'select'}
                  name={'qrCodePosition'}
                  value={qrCodePosition}
                  choices={[
                    { id: 'top-left', label: 'Top Left' },
                    { id: 'top-right', label: 'Top Right' },
                    { id: 'bottom-left', label: 'Bottom Left' },
                    { id: 'bottom-right', label: 'Bottom Right' },
                    { id: 'center', label: 'Center' }
                  ]}
                  onChange={this.handleChange}
                />
                <Input
                  inline={false}
                  label={'QR Code Size'}
                  type={'select'}
                  name={'qrCodeSize'}
                  value={qrCodeSize}
                  choices={[
                    { id: 'small', label: 'Small (100px)' },
                    { id: 'medium', label: 'Medium (150px)' },
                    { id: 'large', label: 'Large (200px)' }
                  ]}
                  onChange={this.handleChange}
                />
              </InlineInputGroup>

              <InlineInputGroup>
                <Input
                  inline={false}
                  label={'QR Code Content'}
                  type={'text'}
                  name={'qrCodeContent'}
                  value={qrCodeContent}
                  placeholder={'URL or text for QR code'}
                  onChange={this.handleChange}
                />
                <Input
                  inline={false}
                  label={'QR Code Label'}
                  type={'text'}
                  name={'qrCodeLabel'}
                  value={qrCodeLabel}
                  placeholder={'Label below QR code'}
                  onChange={this.handleChange}
                />
              </InlineInputGroup>
            </>
          )}

          <hr className='separator' />
          <span className='subheader'>Animation & Timing</span>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Animation Type'}
              type={'select'}
              name={'animationType'}
              value={animationType}
              choices={[
                { id: 'none', label: 'None' },
                { id: 'fade', label: 'Fade In' },
                { id: 'slide', label: 'Slide In' },
                { id: 'zoom', label: 'Zoom In' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Animation Duration (ms)'}
              type={'number'}
              name={'animationDuration'}
              value={animationDuration}
              min={100}
              max={5000}
              step={100}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Animation Delay (ms)'}
              type={'number'}
              name={'animationDelay'}
              value={animationDelay}
              min={0}
              max={10000}
              step={100}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={autoRotate}
                  onChange={() => this.handleBooleanChange('autoRotate')}
                />
                Auto Rotate
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={fadeTransition}
                  onChange={() => this.handleBooleanChange('fadeTransition')}
                />
                Fade Transition
              </label>
            </div>
          </InlineInputGroup>

          {autoRotate && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Rotation Interval (seconds)'}
                type={'number'}
                name={'rotationInterval'}
                value={rotationInterval}
                min={1}
                max={300}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          <hr className='separator' />
          <span className='subheader'>Visual Settings</span>

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
              label={'Border Width (px)'}
              type={'number'}
              name={'borderWidth'}
              value={borderWidth}
              min={0}
              max={10}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Border Radius (px)'}
              type={'number'}
              name={'borderRadius'}
              value={borderRadius}
              min={0}
              max={20}
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
          </InlineInputGroup>

          <hr className='separator' />
          <span className='subheader'>Markers & Overlays</span>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showMarkers}
                  onChange={() => this.handleBooleanChange('showMarkers')}
                />
                Show Markers
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showInfoWindow}
                  onChange={() => this.handleBooleanChange('showInfoWindow')}
                />
                Show Info Window
              </label>
            </div>
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Marker Color'}
              type={'color'}
              name={'markerColor'}
              value={markerColor}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Marker Size'}
              type={'select'}
              name={'markerSize'}
              value={markerSize}
              choices={[
                { id: 'small', label: 'Small' },
                { id: 'medium', label: 'Medium' },
                { id: 'large', label: 'Large' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          {showInfoWindow && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Info Window Content'}
                type={'text'}
                name={'infoWindowContent'}
                value={infoWindowContent}
                placeholder={'Text to display in info window'}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showOverlay}
                  onChange={() => this.handleBooleanChange('showOverlay')}
                />
                Show Overlay
              </label>
            </div>
          </InlineInputGroup>

          {showOverlay && (
            <>
              <InlineInputGroup>
                <Input
                  inline={false}
                  label={'Overlay Text'}
                  type={'text'}
                  name={'overlayText'}
                  value={overlayText}
                  placeholder={'Text to display on overlay'}
                  onChange={this.handleChange}
                />
                <Input
                  inline={false}
                  label={'Overlay Position'}
                  type={'select'}
                  name={'overlayPosition'}
                  value={overlayPosition}
                  choices={[
                    { id: 'top', label: 'Top' },
                    { id: 'center', label: 'Center' },
                    { id: 'bottom', label: 'Bottom' }
                  ]}
                  onChange={this.handleChange}
                />
              </InlineInputGroup>

              <InlineInputGroup>
                <Input
                  inline={false}
                  label={'Overlay Style'}
                  type={'select'}
                  name={'overlayStyle'}
                  value={overlayStyle}
                  choices={[
                    { id: 'glass', label: 'Glass' },
                    { id: 'solid', label: 'Solid' },
                    { id: 'gradient', label: 'Gradient' }
                  ]}
                  onChange={this.handleChange}
                />
                <Input
                  inline={false}
                  label={'Overlay Opacity'}
                  type={'number'}
                  name={'overlayOpacity'}
                  value={overlayOpacity}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={this.handleChange}
                />
              </InlineInputGroup>

              <InlineInputGroup>
                <Input
                  inline={false}
                  label={'Overlay Color'}
                  type={'color'}
                  name={'overlayColor'}
                  value={overlayColor}
                  onChange={this.handleChange}
                />
                <Input
                  inline={false}
                  label={'Overlay Text Color'}
                  type={'color'}
                  name={'overlayTextColor'}
                  value={overlayTextColor}
                  onChange={this.handleChange}
                />
              </InlineInputGroup>
            </>
          )}

          <hr className='separator' />
          <span className='subheader'>Controls</span>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showControls}
                  onChange={() => this.handleBooleanChange('showControls')}
                />
                Show Controls
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showScale}
                  onChange={() => this.handleBooleanChange('showScale')}
                />
                Show Scale
              </label>
            </div>
          </InlineInputGroup>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showCompass}
                  onChange={() => this.handleBooleanChange('showCompass')}
                />
                Show Compass
              </label>
            </div>
          </InlineInputGroup>
        </Form>

        <div className={'previewContainer'}>
          <div className={'previewHeader'}>
            <h4>Live Preview</h4>
            <div className={'previewControls'}>
              <button 
                type="button" 
                className={'previewToggle'}
                onClick={() => this.setState({ showPreview: !this.state.showPreview })}
              >
                {this.state.showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
          </div>
          {this.state.showPreview && (
            <div className={'preview'}>
              <InteractiveMapContent data={this.state} />
            </div>
          )}
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
              width: 100%;
              height: 320px;
              border-radius: 8px;
              overflow: hidden;
              border: 2px solid #007bff;
              background-color: white;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .previewContainer {
              margin-left: 16px;
              width: 300px;
              background-color: #f8f9fa;
              border-radius: 8px;
              padding: 16px;
              border: 1px solid #e9ecef;
            }
            .previewHeader {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 1px solid #dee2e6;
            }
            .previewHeader h4 {
              margin: 0;
              font-family: 'Open Sans', sans-serif;
              font-size: 16px;
              font-weight: 600;
              color: #495057;
            }
            .previewControls {
              display: flex;
              gap: 8px;
            }
            .previewToggle {
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              padding: 6px 12px;
              font-size: 12px;
              cursor: pointer;
              transition: background-color 0.2s;
            }
            .previewToggle:hover {
              background-color: #0056b3;
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

export default InteractiveMapOptions
