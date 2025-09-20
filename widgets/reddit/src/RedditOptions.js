import React, { Component } from 'react'
import { Form, Input, Button, ButtonGroup, Switch, ColorPicker } from '../../../components/Form'

class RedditOptions extends Component {
  constructor(props) {
    super(props)
    const {
      subreddit = 'popular',
      sortBy = 'hot',
      timeFilter = 'day',
      postLimit = 10,
      showImages = true,
      showVideos = true,
      showTextPosts = true,
      showNSFW = false,
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'large',
      layout = 'list',
      minScore = 0,
      minComments = 0,
      keywords = [],
      excludeKeywords = [],
      autoRefresh = true,
      refreshInterval = 300,
      backgroundColor = '#1a1a1b',
      textColor = '#d7dadc',
      linkColor = '#0079d3',
      accentColor = '#ff4500',
      borderColor = '#343536',
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
      showScore = true,
      showComments = true,
      showTime = true,
      showSubreddit = true,
      showFlair = true,
      truncateText = true,
      maxTextLength = 200,
      embedMode = 'auto',
      showEmbedPreview = true,
      embedHeight = 400,
      contentModeration = false,
      hideDeleted = true,
      hideRemoved = true,
      showStickied = true
    } = props.data || {}

    this.state = {
      subreddit,
      sortBy,
      timeFilter,
      postLimit,
      showImages,
      showVideos,
      showTextPosts,
      showNSFW,
      displayMode,
      floatingPosition,
      floatingSize,
      layout,
      minScore,
      minComments,
      keywords,
      excludeKeywords,
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
      showScore,
      showComments,
      showTime,
      showSubreddit,
      showFlair,
      truncateText,
      maxTextLength,
      embedMode,
      showEmbedPreview,
      embedHeight,
      contentModeration,
      hideDeleted,
      hideRemoved,
      showStickied,
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
      subreddit,
      sortBy,
      timeFilter,
      postLimit,
      showImages,
      showVideos,
      showTextPosts,
      showNSFW,
      displayMode,
      floatingPosition,
      floatingSize,
      layout,
      minScore,
      minComments,
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
      showScore,
      showComments,
      showTime,
      showSubreddit,
      showFlair,
      truncateText,
      maxTextLength,
      embedMode,
      showEmbedPreview,
      embedHeight,
      contentModeration,
      hideDeleted,
      hideRemoved,
      showStickied,
      keywordsInput,
      excludeKeywordsInput,
      showPreview
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Reddit</h3>

          {/* Reddit Configuration */}
          <h4>Reddit Configuration</h4>
          
          <Input
            inline={true}
            label={'Subreddit'}
            type={'text'}
            name={'subreddit'}
            value={subreddit}
            placeholder={'popular, funny, news, etc.'}
            onChange={this.handleChange}
          />

          <ButtonGroup
            label={'Sort By'}
            name={'sortBy'}
            value={sortBy}
            options={[
              { label: 'Hot', value: 'hot' },
              { label: 'New', value: 'new' },
              { label: 'Top', value: 'top' },
              { label: 'Rising', value: 'rising' }
            ]}
            onChange={this.handleChange}
          />

          {sortBy === 'top' && (
            <ButtonGroup
              label={'Time Filter'}
              name={'timeFilter'}
              value={timeFilter}
              options={[
                { label: 'Hour', value: 'hour' },
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
                { label: 'Year', value: 'year' },
                { label: 'All Time', value: 'all' }
              ]}
              onChange={this.handleChange}
            />
          )}

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
            label={'Show NSFW Content'}
            name={'showNSFW'}
            checked={showNSFW}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Stickied Posts'}
            name={'showStickied'}
            checked={showStickied}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Minimum Score'}
            type={'number'}
            name={'minScore'}
            value={minScore}
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
            inline={false}
            label={'Keywords (comma-separated)'}
            type={'text'}
            name={'keywordsInput'}
            value={keywordsInput}
            placeholder={'funny, news, technology'}
            onChange={this.handleKeywordsChange}
          />

          <Input
            inline={false}
            label={'Exclude Keywords (comma-separated)'}
            type={'text'}
            name={'excludeKeywordsInput'}
            value={excludeKeywordsInput}
            placeholder={'politics, nsfw, spoiler'}
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
              { label: 'List', value: 'list' },
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
            label={'Show Author'}
            name={'showAuthor'}
            checked={showAuthor}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Score'}
            name={'showScore'}
            checked={showScore}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Comments Count'}
            name={'showComments'}
            checked={showComments}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Time Posted'}
            name={'showTime'}
            checked={showTime}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Subreddit'}
            name={'showSubreddit'}
            checked={showSubreddit}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Post Flair'}
            name={'showFlair'}
            checked={showFlair}
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
              min={60}
              max={3600}
              step={60}
              onChange={this.handleChange}
            />
          )}

          {/* Moderation */}
          <h4>Content Moderation</h4>
          
          <Switch
            label={'Enable Content Moderation'}
            name={'contentModeration'}
            checked={contentModeration}
            onChange={this.handleChange}
          />

          <Switch
            label={'Hide Deleted Posts'}
            name={'hideDeleted'}
            checked={hideDeleted}
            onChange={this.handleChange}
          />

          <Switch
            label={'Hide Removed Posts'}
            name={'hideRemoved'}
            checked={hideRemoved}
            onChange={this.handleChange}
          />

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
                  <strong>Subreddit:</strong> r/{subreddit} ({sortBy})
                </div>
                <div className="preview-details">
                  <strong>Posts:</strong> {postLimit} posts, {minScore}+ score
                </div>
                <div className="preview-details">
                  <strong>Content:</strong> {showImages ? 'Images' : ''} {showVideos ? 'Videos' : ''} {showTextPosts ? 'Text' : ''}
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

export default RedditOptions
