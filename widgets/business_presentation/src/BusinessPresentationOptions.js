/**
 * @fileoverview Options component for Business Presentation widget
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPresentation } from '@fortawesome/free-solid-svg-icons'

import { Form, Input, InlineInputGroup } from '../../../components/Form'
import BusinessPresentationContent from './BusinessPresentationContent'

config.autoAddCss = false

class BusinessPresentationOptions extends Component {
  constructor(props) {
    super(props)
    const {
      title = 'Welcome to Our Business',
      subtitle = 'Your trusted partner in success',
      description = 'We provide exceptional services and solutions tailored to your needs.',
      logoUrl = '',
      backgroundImage = '',
      displayMode = 'floating',
      floatingPosition = 'center',
      floatingSize = 'large',
      aspectRatio = '16:9',
      displayDuration = 0,
      autoAdvance = false,
      advanceInterval = 30,
      enableRepetition = false,
      repetitionInterval = 30,
      repetitionUnit = 'minutes',
      fadeTransition = true,
      transitionDuration = 1000,
      showQRCode = false,
      qrCodePosition = 'bottom-right',
      qrCodeSize = 'medium',
      qrCodeContent = 'https://ourbusiness.com',
      qrCodeLabel = 'Visit Our Website',
      animationType = 'fade',
      animationDuration = 1500,
      animationDelay = 0,
      entranceAnimation = 'slideInUp',
      exitAnimation = 'fadeOut',
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
      parallaxSpeed = 0.5,
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
    } = props.data || {}

    this.state = {
      title,
      subtitle,
      description,
      logoUrl,
      backgroundImage,
      displayMode,
      floatingPosition,
      floatingSize,
      aspectRatio,
      displayDuration,
      autoAdvance,
      advanceInterval,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      transitionDuration,
      showQRCode,
      qrCodePosition,
      qrCodeSize,
      qrCodeContent,
      qrCodeLabel,
      animationType,
      animationDuration,
      animationDelay,
      entranceAnimation,
      exitAnimation,
      backgroundColor,
      backgroundGradient,
      gradientColors,
      textColor,
      titleColor,
      accentColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      titleFontSize,
      subtitleFontSize,
      descriptionFontSize,
      titleFontWeight,
      subtitleFontWeight,
      descriptionFontWeight,
      fontFamily,
      textAlignment,
      contentLayout,
      logoPosition,
      logoSize,
      hoverEffects,
      showContactInfo,
      contactInfo,
      showOverlay,
      overlayType,
      overlayColor,
      overlayOpacity,
      overlayPattern,
      parallaxEffect,
      parallaxSpeed,
      showProgressIndicator,
      progressPosition,
      progressColor,
      progressHeight,
      showSocialMedia,
      socialMediaLinks,
      showTestimonials,
      testimonialText,
      testimonialAuthor,
      showCallToAction,
      callToActionText,
      callToActionColor,
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

  handleContactInfoChange = (field, value) => {
    const { onChange = () => {} } = this.props
    this.setState(
      {
        contactInfo: {
          ...this.state.contactInfo,
          [field]: value
        }
      },
      () => {
        onChange(this.state)
      }
    )
  }

  handleSocialMediaChange = (platform, value) => {
    const { onChange = () => {} } = this.props
    this.setState(
      {
        socialMediaLinks: {
          ...this.state.socialMediaLinks,
          [platform]: value
        }
      },
      () => {
        onChange(this.state)
      }
    )
  }

  render() {
    const {
      title,
      subtitle,
      description,
      logoUrl,
      backgroundImage,
      displayMode,
      floatingPosition,
      floatingSize,
      aspectRatio,
      displayDuration,
      autoAdvance,
      advanceInterval,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      transitionDuration,
      showQRCode,
      qrCodePosition,
      qrCodeSize,
      qrCodeContent,
      qrCodeLabel,
      animationType,
      animationDuration,
      animationDelay,
      entranceAnimation,
      exitAnimation,
      backgroundColor,
      backgroundGradient,
      gradientColors,
      textColor,
      titleColor,
      accentColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      titleFontSize,
      subtitleFontSize,
      descriptionFontSize,
      titleFontWeight,
      subtitleFontWeight,
      descriptionFontWeight,
      fontFamily,
      textAlignment,
      contentLayout,
      logoPosition,
      logoSize,
      hoverEffects,
      showContactInfo,
      contactInfo,
      showOverlay,
      overlayType,
      overlayColor,
      overlayOpacity,
      overlayPattern,
      parallaxEffect,
      parallaxSpeed,
      showProgressIndicator,
      progressPosition,
      progressColor,
      progressHeight,
      showSocialMedia,
      socialMediaLinks,
      showTestimonials,
      testimonialText,
      testimonialAuthor,
      showCallToAction,
      callToActionText,
      callToActionColor
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Business Presentation</h3>
          <p>Create professional business presentations with advanced positioning and interactive features.</p>

          <hr className='separator' />
          <span className='subheader'>Content</span>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Title'}
              type={'text'}
              name={'title'}
              value={title}
              placeholder={'Main presentation title'}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Subtitle'}
              type={'text'}
              name={'subtitle'}
              value={subtitle}
              placeholder={'Supporting subtitle'}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Description'}
              type={'text'}
              name={'description'}
              value={description}
              placeholder={'Detailed description'}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Logo URL'}
              type={'text'}
              name={'logoUrl'}
              value={logoUrl}
              placeholder={'https://example.com/logo.png'}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Background Image URL'}
              type={'text'}
              name={'backgroundImage'}
              value={backgroundImage}
              placeholder={'https://example.com/background.jpg'}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <hr className='separator' />
          <span className='subheader'>Display Settings</span>

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
              label={'Size'}
              type={'select'}
              name={'floatingSize'}
              value={floatingSize}
              choices={[
                { id: 'small', label: 'Small (400x300)' },
                { id: 'medium', label: 'Medium (600x400)' },
                { id: 'large', label: 'Large (800x600)' },
                { id: 'extra-large', label: 'Extra Large (1200x800)' }
              ]}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Aspect Ratio'}
              type={'select'}
              name={'aspectRatio'}
              value={aspectRatio}
              choices={[
                { id: '4:3', label: '4:3 (Traditional)' },
                { id: '16:9', label: '16:9 (Widescreen)' },
                { id: '21:9', label: '21:9 (Ultrawide)' },
                { id: '1:1', label: '1:1 (Square)' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
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
          <span className='subheader'>Typography</span>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Title Font Size (px)'}
              type={'number'}
              name={'titleFontSize'}
              value={titleFontSize}
              min={12}
              max={120}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Subtitle Font Size (px)'}
              type={'number'}
              name={'subtitleFontSize'}
              value={subtitleFontSize}
              min={10}
              max={60}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Description Font Size (px)'}
              type={'number'}
              name={'descriptionFontSize'}
              value={descriptionFontSize}
              min={8}
              max={32}
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
                { id: 'Verdana, sans-serif', label: 'Verdana' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Text Alignment'}
              type={'select'}
              name={'textAlignment'}
              value={textAlignment}
              choices={[
                { id: 'left', label: 'Left' },
                { id: 'center', label: 'Center' },
                { id: 'right', label: 'Right' }
              ]}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <hr className='separator' />
          <span className='subheader'>Colors & Styling</span>

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
              label={'Title Color'}
              type={'color'}
              name={'titleColor'}
              value={titleColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Text Color'}
              type={'color'}
              name={'textColor'}
              value={textColor}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'Accent Color'}
              type={'color'}
              name={'accentColor'}
              value={accentColor}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={backgroundGradient}
                  onChange={() => this.handleBooleanChange('backgroundGradient')}
                />
                Use Gradient Background
              </label>
            </div>
          </InlineInputGroup>

          {backgroundGradient && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Gradient Color 1'}
                type={'color'}
                name={'gradientColors'}
                value={gradientColors[0]}
                onChange={(name, value) => this.handleChange('gradientColors', [value, gradientColors[1]])}
              />
              <Input
                inline={false}
                label={'Gradient Color 2'}
                type={'color'}
                name={'gradientColors'}
                value={gradientColors[1]}
                onChange={(name, value) => this.handleChange('gradientColors', [gradientColors[0], value])}
              />
            </InlineInputGroup>
          )}

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
              max={50}
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
          <span className='subheader'>Contact Information</span>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showContactInfo}
                  onChange={() => this.handleBooleanChange('showContactInfo')}
                />
                Show Contact Information
              </label>
            </div>
          </InlineInputGroup>

          {showContactInfo && (
            <>
              <InlineInputGroup>
                <Input
                  inline={false}
                  label={'Phone'}
                  type={'text'}
                  name={'contactPhone'}
                  value={contactInfo.phone}
                  placeholder={'+1 (555) 123-4567'}
                  onChange={(name, value) => this.handleContactInfoChange('phone', value)}
                />
                <Input
                  inline={false}
                  label={'Email'}
                  type={'email'}
                  name={'contactEmail'}
                  value={contactInfo.email}
                  placeholder={'contact@business.com'}
                  onChange={(name, value) => this.handleContactInfoChange('email', value)}
                />
              </InlineInputGroup>

              <InlineInputGroup>
                <Input
                  inline={false}
                  label={'Website'}
                  type={'url'}
                  name={'contactWebsite'}
                  value={contactInfo.website}
                  placeholder={'https://business.com'}
                  onChange={(name, value) => this.handleContactInfoChange('website', value)}
                />
                <Input
                  inline={false}
                  label={'Address'}
                  type={'text'}
                  name={'contactAddress'}
                  value={contactInfo.address}
                  placeholder={'123 Business St, City, State'}
                  onChange={(name, value) => this.handleContactInfoChange('address', value)}
                />
              </InlineInputGroup>
            </>
          )}

          <hr className='separator' />
          <span className='subheader'>Call to Action</span>

          <InlineInputGroup>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={showCallToAction}
                  onChange={() => this.handleBooleanChange('showCallToAction')}
                />
                Show Call to Action Button
              </label>
            </div>
          </InlineInputGroup>

          {showCallToAction && (
            <InlineInputGroup>
              <Input
                inline={false}
                label={'Button Text'}
                type={'text'}
                name={'callToActionText'}
                value={callToActionText}
                placeholder={'Contact Us Today'}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Button Color'}
                type={'color'}
                name={'callToActionColor'}
                value={callToActionColor}
                onChange={this.handleChange}
              />
            </InlineInputGroup>
          )}

          <hr className='separator' />
          <span className='subheader'>Animation</span>

          <InlineInputGroup>
            <Input
              inline={false}
              label={'Entrance Animation'}
              type={'select'}
              name={'entranceAnimation'}
              value={entranceAnimation}
              choices={[
                { id: 'slideInUp', label: 'Slide In Up' },
                { id: 'slideInDown', label: 'Slide In Down' },
                { id: 'slideInLeft', label: 'Slide In Left' },
                { id: 'slideInRight', label: 'Slide In Right' },
                { id: 'fadeIn', label: 'Fade In' },
                { id: 'zoomIn', label: 'Zoom In' }
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
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={hoverEffects}
                  onChange={() => this.handleBooleanChange('hoverEffects')}
                />
                Enable Hover Effects
              </label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={parallaxEffect}
                  onChange={() => this.handleBooleanChange('parallaxEffect')}
                />
                Parallax Effect
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
              <BusinessPresentationContent data={this.state} />
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

export default BusinessPresentationOptions
