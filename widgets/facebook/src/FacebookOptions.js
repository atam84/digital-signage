import React, { Component } from 'react'
import { Form, Input, Button, ButtonGroup, Switch, ColorPicker } from '../../../components/Form'

class FacebookOptions extends Component {
  constructor(props) {
    super(props)
    const {
      pageId = '',
      accessToken = '',
      postLimit = 10,
      showImages = true,
      showVideos = true,
      showTextPosts = true,
      showLinks = true,
      showEvents = false,
      minLikes = 0,
      minComments = 0,
      minShares = 0,
      keywords = [],
      excludeKeywords = [],
      dateRange = 30,
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'large',
      layout = 'feed',
      autoRefresh = true,
      refreshInterval = 600,
      backgroundColor = '#ffffff',
      textColor = '#1c1e21',
      linkColor = '#1877f2',
      accentColor = '#42b883',
      borderColor = '#dadde1',
      borderWidth = 1,
      borderRadius = 8,
      shadowStyle = 'subtle',
      enableRepetition = false,
      repetitionInterval = 30,
      repetitionUnit = 'minutes',
      fadeTransition = true,
      animationType = 'slide',
      animationDuration = 1000,
      animationDelay = 0,
      showAuthor = true,
      showLikes = true,
      showComments = true,
      showShares = true,
      showTime = true,
      showPageName = true,
      truncateText = true,
      maxTextLength = 200,
      embedMode = 'auto',
      showEmbedPreview = true,
      embedHeight = 400,
      showPageCover = false,
      showPageInfo = true,
      showCallToAction = false,
      showReactions = true,
      showStory = false,
      useGraphAPI = true,
      apiVersion = 'v18.0',
      fields = 'id,message,created_time,full_picture,link,story,type,likes,comments,shares'
    } = props.data || {}

    this.state = {
      pageId,
      accessToken,
      postLimit,
      showImages,
      showVideos,
      showTextPosts,
      showLinks,
      showEvents,
      minLikes,
      minComments,
      minShares,
      keywords,
      excludeKeywords,
      dateRange,
      displayMode,
      floatingPosition,
      floatingSize,
      layout,
      autoRefresh,
      refreshInterval,
      backgroundColor,
      textColor,
      linkColor,
      accentColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      animationType,
      animationDuration,
      animationDelay,
      showAuthor,
      showLikes,
      showComments,
      showShares,
      showTime,
      showPageName,
      truncateText,
      maxTextLength,
      embedMode,
      showEmbedPreview,
      embedHeight,
      showPageCover,
      showPageInfo,
      showCallToAction,
      showReactions,
      showStory,
      useGraphAPI,
      apiVersion,
      fields,
      keywordsInput: keywords.join(', '),
      excludeKeywordsInput: excludeKeywords.join(', '),
      showPreview: true
    }
  }

  handleChange = (name, value) => {
    this.setState(
      {
        [name]: value
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  handleKeywordsChange = (value) => {
    const keywords = value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0)
    this.setState(
      {
        keywords,
        keywordsInput: value
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  handleExcludeKeywordsChange = (value) => {
    const excludeKeywords = value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0)
    this.setState(
      {
        excludeKeywords,
        excludeKeywordsInput: value
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  render() {
    const {
      pageId,
      accessToken,
      postLimit,
      showImages,
      showVideos,
      showTextPosts,
      showLinks,
      showEvents,
      minLikes,
      minComments,
      minShares,
      autoRefresh,
      refreshInterval,
      backgroundColor,
      textColor,
      linkColor,
      accentColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      animationType,
      animationDuration,
      animationDelay,
      showAuthor,
      showLikes,
      showComments,
      showShares,
      showTime,
      showPageName,
      truncateText,
      maxTextLength,
      embedMode,
      showEmbedPreview,
      embedHeight,
      showPageCover,
      showPageInfo,
      showCallToAction,
      showReactions,
      showStory,
      useGraphAPI,
      apiVersion,
      keywordsInput,
      excludeKeywordsInput,
      showPreview
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Facebook</h3>

          {/* Facebook Configuration */}
          <h4>Facebook Configuration</h4>
          
          <Input
            inline={false}
            label={'Facebook Page ID or Username'}
            type={'text'}
            name={'pageId'}
            value={pageId}
            placeholder={'your-page-id or @yourpage'}
            onChange={this.handleChange}
          />

          <Input
            inline={false}
            label={'Access Token (Optional)'}
            type={'password'}
            name={'accessToken'}
            value={accessToken}
            placeholder={'Facebook access token for Graph API'}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Post Limit'}
            type={'number'}
            name={'postLimit'}
            value={postLimit}
            min={1}
            max={100}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Date Range (days)'}
            type={'number'}
            name={'dateRange'}
            value={dateRange}
            min={1}
            max={365}
            onChange={this.handleChange}
          />

          {/* Content Filters */}
          <h4>Content Filters</h4>
          
          <Switch
            label={'Show Images'}
            name={'showImages'}
            checked={showImages}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Videos'}
            name={'showVideos'}
            checked={showVideos}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Text Posts'}
            name={'showTextPosts'}
            checked={showTextPosts}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Links'}
            name={'showLinks'}
            checked={showLinks}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Events'}
            name={'showEvents'}
            checked={showEvents}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Minimum Likes'}
            type={'number'}
            name={'minLikes'}
            value={minLikes}
            min={0}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Minimum Comments'}
            type={'number'}
            name={'minComments'}
            value={minComments}
            min={0}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Minimum Shares'}
            type={'number'}
            name={'minShares'}
            value={minShares}
            min={0}
            onChange={this.handleChange}
          />

          <Input
            inline={false}
            label={'Keywords (comma-separated)'}
            type={'text'}
            name={'keywordsInput'}
            value={keywordsInput}
            placeholder={'news, events, updates'}
            onChange={this.handleKeywordsChange}
          />

          <Input
            inline={false}
            label={'Exclude Keywords (comma-separated)'}
            type={'text'}
            name={'excludeKeywordsInput'}
            value={excludeKeywordsInput}
            placeholder={'spam, ads, promotional'}
            onChange={this.handleExcludeKeywordsChange}
          />

          {/* Display Configuration */}
          <h4>Display Configuration</h4>
          
          <ButtonGroup
            label={'Display Mode'}
            name={'displayMode'}
            value={displayMode}
            options={[
              { label: 'Embedded', value: 'embedded' },
              { label: 'Floating', value: 'floating' }
            ]}
            onChange={this.handleChange}
          />

          {displayMode === 'floating' && (
            <>
              <ButtonGroup
                label={'Floating Position'}
                name={'floatingPosition'}
                value={floatingPosition}
                options={[
                  { label: 'Center', value: 'center' },
                  { label: 'Top Left', value: 'top-left' },
                  { label: 'Top Right', value: 'top-right' },
                  { label: 'Bottom Left', value: 'bottom-left' },
                  { label: 'Bottom Right', value: 'bottom-right' }
                ]}
                onChange={this.handleChange}
              />

              <ButtonGroup
                label={'Floating Size'}
                name={'floatingSize'}
                value={floatingSize}
                options={[
                  { label: 'Small', value: 'small' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Large', value: 'large' }
                ]}
                onChange={this.handleChange}
              />
            </>
          )}

          <ButtonGroup
            label={'Layout'}
            name={'layout'}
            value={layout}
            options={[
              { label: 'Feed', value: 'feed' },
              { label: 'Grid', value: 'grid' },
              { label: 'Card', value: 'card' }
            ]}
            onChange={this.handleChange}
          />

          {/* Styling */}
          <h4>Styling</h4>
          
          <ColorPicker
            label={'Background Color'}
            name={'backgroundColor'}
            value={backgroundColor}
            onChange={this.handleChange}
          />

          <ColorPicker
            label={'Text Color'}
            name={'textColor'}
            value={textColor}
            onChange={this.handleChange}
          />

          <ColorPicker
            label={'Link Color'}
            name={'linkColor'}
            value={linkColor}
            onChange={this.handleChange}
          />

          <ColorPicker
            label={'Accent Color'}
            name={'accentColor'}
            value={accentColor}
            onChange={this.handleChange}
          />

          <ColorPicker
            label={'Border Color'}
            name={'borderColor'}
            value={borderColor}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Border Width (px)'}
            type={'number'}
            name={'borderWidth'}
            value={borderWidth}
            min={0}
            max={10}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Border Radius (px)'}
            type={'number'}
            name={'borderRadius'}
            value={borderRadius}
            min={0}
            max={20}
            onChange={this.handleChange}
          />

          <ButtonGroup
            label={'Shadow Style'}
            name={'shadowStyle'}
            value={shadowStyle}
            options={[
              { label: 'None', value: 'none' },
              { label: 'Subtle', value: 'subtle' },
              { label: 'Medium', value: 'medium' },
              { label: 'Strong', value: 'strong' }
            ]}
            onChange={this.handleChange}
          />

          {/* Content Features */}
          <h4>Content Features</h4>
          
          <Switch
            label={'Show Page Name'}
            name={'showPageName'}
            checked={showPageName}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Page Info'}
            name={'showPageInfo'}
            checked={showPageInfo}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Page Cover'}
            name={'showPageCover'}
            checked={showPageCover}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Likes'}
            name={'showLikes'}
            checked={showLikes}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Comments Count'}
            name={'showComments'}
            checked={showComments}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Shares Count'}
            name={'showShares'}
            checked={showShares}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Time Posted'}
            name={'showTime'}
            checked={showTime}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Reactions'}
            name={'showReactions'}
            checked={showReactions}
            onChange={this.handleChange}
          />

          <Switch
            label={'Truncate Long Text'}
            name={'truncateText'}
            checked={truncateText}
            onChange={this.handleChange}
          />

          {truncateText && (
            <Input
              inline={true}
              label={'Max Text Length'}
              type={'number'}
              name={'maxTextLength'}
              value={maxTextLength}
              min={50}
              max={1000}
              onChange={this.handleChange}
            />
          )}

          {/* Embed Settings */}
          <h4>Embed Settings</h4>
          
          <ButtonGroup
            label={'Embed Mode'}
            name={'embedMode'}
            value={embedMode}
            options={[
              { label: 'Auto', value: 'auto' },
              { label: 'Image Only', value: 'image' },
              { label: 'Text Only', value: 'text' },
              { label: 'Mixed', value: 'mixed' }
            ]}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Embed Preview'}
            name={'showEmbedPreview'}
            checked={showEmbedPreview}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Embed Height (px)'}
            type={'number'}
            name={'embedHeight'}
            value={embedHeight}
            min={200}
            max={800}
            onChange={this.handleChange}
          />

          {/* API Configuration */}
          <h4>API Configuration</h4>
          
          <Switch
            label={'Use Graph API'}
            name={'useGraphAPI'}
            checked={useGraphAPI}
            onChange={this.handleChange}
          />

          {useGraphAPI && (
            <ButtonGroup
              label={'API Version'}
              name={'apiVersion'}
              value={apiVersion}
              options={[
                { label: 'v18.0', value: 'v18.0' },
                { label: 'v17.0', value: 'v17.0' },
                { label: 'v16.0', value: 'v16.0' }
              ]}
              onChange={this.handleChange}
            />
          )}

          {/* Auto Refresh */}
          <h4>Auto Refresh</h4>
          
          <Switch
            label={'Auto Refresh Content'}
            name={'autoRefresh'}
            checked={autoRefresh}
            onChange={this.handleChange}
          />

          {autoRefresh && (
            <Input
              inline={true}
              label={'Refresh Interval (seconds)'}
              type={'number'}
              name={'refreshInterval'}
              value={refreshInterval}
              min={300}
              max={3600}
              step={60}
              onChange={this.handleChange}
            />
          )}

          {/* Animation */}
          <h4>Animation & Transitions</h4>
          
          <Switch
            label={'Fade Transition'}
            name={'fadeTransition'}
            checked={fadeTransition}
            onChange={this.handleChange}
          />

          <ButtonGroup
            label={'Animation Type'}
            name={'animationType'}
            value={animationType}
            options={[
              { label: 'Slide', value: 'slide' },
              { label: 'Fade', value: 'fade' },
              { label: 'Zoom', value: 'zoom' }
            ]}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Animation Duration (ms)'}
            type={'number'}
            name={'animationDuration'}
            value={animationDuration}
            min={100}
            max={5000}
            step={100}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Animation Delay (ms)'}
            type={'number'}
            name={'animationDelay'}
            value={animationDelay}
            min={0}
            max={2000}
            step={100}
            onChange={this.handleChange}
          />

          {/* Repetition */}
          <h4>Repetition Settings</h4>
          
          <Switch
            label={'Enable Repetition'}
            name={'enableRepetition'}
            checked={enableRepetition}
            onChange={this.handleChange}
          />

          {enableRepetition && (
            <>
              <Input
                inline={true}
                label={'Repetition Interval'}
                type={'number'}
                name={'repetitionInterval'}
                value={repetitionInterval}
                min={1}
                max={1440}
                onChange={this.handleChange}
              />

              <ButtonGroup
                label={'Repetition Unit'}
                name={'repetitionUnit'}
                value={repetitionUnit}
                options={[
                  { label: 'Minutes', value: 'minutes' },
                  { label: 'Hours', value: 'hours' }
                ]}
                onChange={this.handleChange}
              />
            </>
          )}

          {/* Preview */}
          {showPreview && (
            <div className="preview-section">
              <h4>Preview</h4>
              <div className="preview-info">
                <div className="preview-details">
                  <strong>Page:</strong> {pageId || 'Not configured'}
                </div>
                <div className="preview-details">
                  <strong>Posts:</strong> {postLimit} posts, {dateRange} days
                </div>
                <div className="preview-details">
                  <strong>Content:</strong> {showImages ? 'Images' : ''} {showVideos ? 'Videos' : ''} {showTextPosts ? 'Text' : ''}
                </div>
                <div className="preview-details">
                  <strong>API:</strong> {useGraphAPI ? 'Graph API' : 'Embed fallback'}
                </div>
                <div className="preview-details">
                  <strong>Refresh:</strong> {autoRefresh ? `Every ${refreshInterval}s` : 'Manual'}
                </div>
              </div>
            </div>
          )}

        </Form>

        <style jsx>{`
          .container {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          h3 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
          }
          h4 {
            color: #555;
            margin: 25px 0 15px 0;
            padding-bottom: 5px;
            border-bottom: 2px solid #eee;
            font-size: 16px;
          }
          .preview-section {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
          }
          .preview-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
          }
          .preview-details {
            font-size: 12px;
            color: #888;
            margin: 5px 0;
          }
        `}</style>
      </div>
    )
  }
}

export default FacebookOptions
