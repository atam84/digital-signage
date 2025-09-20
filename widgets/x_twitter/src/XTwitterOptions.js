import React, { Component } from 'react'
import { Form, Input, Button, ButtonGroup, Switch, ColorPicker } from '../../../components/Form'

class XTwitterOptions extends Component {
  constructor(props) {
    super(props)
    const {
      username = '',
      hashtag = '',
      searchQuery = '',
      tweetType = 'timeline',
      tweetLimit = 20,
      showImages = true,
      showVideos = true,
      showRetweets = true,
      showReplies = true,
      showQuotes = true,
      minLikes = 0,
      minRetweets = 0,
      minReplies = 0,
      language = 'en',
      excludeRetweets = false,
      excludeReplies = false,
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'large',
      layout = 'timeline',
      autoRefresh = true,
      refreshInterval = 300,
      backgroundColor = '#000000',
      textColor = '#ffffff',
      linkColor = '#1d9bf0',
      accentColor = '#1d9bf0',
      borderColor = '#2f3336',
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
      showUsername = true,
      showTimestamp = true,
      showEngagement = true,
      showVerified = true,
      truncateText = true,
      maxTextLength = 280,
      showMedia = true,
      showThreads = true,
      embedMode = 'auto',
      showEmbedPreview = true,
      embedHeight = 400,
      showTweetActions = false,
      showTrending = false,
      trendingLocation = 'worldwide',
      showMentions = true,
      showHashtags = true,
      showLinks = true,
      showPolls = true,
      showSpaces = false,
      useTwitterAPI = true,
      apiVersion = 'v2',
      bearerToken = '',
      includeMetrics = true,
      includeMedia = true,
      enableStreaming = false,
      streamFilters = [],
      showLiveIndicator = false,
      filterProfanity = false,
      filterSpam = true,
      showSensitiveContent = false,
      blockWords = [],
      allowedLanguages = ['en']
    } = props.data || {}

    this.state = {
      username,
      hashtag,
      searchQuery,
      tweetType,
      tweetLimit,
      showImages,
      showVideos,
      showRetweets,
      showReplies,
      showQuotes,
      minLikes,
      minRetweets,
      minReplies,
      language,
      excludeRetweets,
      excludeReplies,
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
      showUsername,
      showTimestamp,
      showEngagement,
      showVerified,
      truncateText,
      maxTextLength,
      showMedia,
      showThreads,
      embedMode,
      showEmbedPreview,
      embedHeight,
      showTweetActions,
      showTrending,
      trendingLocation,
      showMentions,
      showHashtags,
      showLinks,
      showPolls,
      showSpaces,
      useTwitterAPI,
      apiVersion,
      bearerToken,
      includeMetrics,
      includeMedia,
      enableStreaming,
      streamFilters,
      showLiveIndicator,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWords,
      allowedLanguages,
      blockWordsInput: blockWords.join(', '),
      streamFiltersInput: streamFilters.join(', '),
      allowedLanguagesInput: allowedLanguages.join(', '),
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

  handleArrayChange = (name, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item.length > 0)
    this.setState(
      {
        [name]: array,
        [`${name}Input`]: value
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  render() {
    const {
      username,
      hashtag,
      searchQuery,
      tweetType,
      tweetLimit,
      showImages,
      showVideos,
      showRetweets,
      showReplies,
      showQuotes,
      minLikes,
      minRetweets,
      minReplies,
      language,
      excludeRetweets,
      excludeReplies,
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
      showUsername,
      showTimestamp,
      showEngagement,
      showVerified,
      truncateText,
      maxTextLength,
      showMedia,
      showThreads,
      embedMode,
      showEmbedPreview,
      embedHeight,
      showTweetActions,
      showTrending,
      trendingLocation,
      showMentions,
      showHashtags,
      showLinks,
      showPolls,
      showSpaces,
      useTwitterAPI,
      apiVersion,
      bearerToken,
      includeMetrics,
      includeMedia,
      enableStreaming,
      streamFiltersInput,
      showLiveIndicator,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWordsInput,
      allowedLanguagesInput,
      showPreview
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: X (Twitter)</h3>

          {/* Twitter Configuration */}
          <h4>Twitter Configuration</h4>
          
          <ButtonGroup
            label={'Tweet Source'}
            name={'tweetType'}
            value={tweetType}
            options={[
              { label: 'User Timeline', value: 'timeline' },
              { label: 'Hashtag', value: 'hashtag' },
              { label: 'Search Query', value: 'search' },
              { label: 'Trending', value: 'trending' }
            ]}
            onChange={this.handleChange}
          />

          {tweetType === 'timeline' && (
            <Input
              inline={false}
              label={'Twitter Username (without @)'}
              type={'text'}
              name={'username'}
              value={username}
              placeholder={'username'}
              onChange={this.handleChange}
            />
          )}

          {tweetType === 'hashtag' && (
            <Input
              inline={false}
              label={'Hashtag (without #)'}
              type={'text'}
              name={'hashtag'}
              value={hashtag}
              placeholder={'hashtag'}
              onChange={this.handleChange}
            />
          )}

          {tweetType === 'search' && (
            <Input
              inline={false}
              label={'Search Query'}
              type={'text'}
              name={'searchQuery'}
              value={searchQuery}
              placeholder={'search terms'}
              onChange={this.handleChange}
            />
          )}

          <Input
            inline={true}
            label={'Tweet Limit'}
            type={'number'}
            name={'tweetLimit'}
            value={tweetLimit}
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
            label={'Show Retweets'}
            name={'showRetweets'}
            checked={showRetweets}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Replies'}
            name={'showReplies'}
            checked={showReplies}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Quote Tweets'}
            name={'showQuotes'}
            checked={showQuotes}
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
            label={'Minimum Retweets'}
            type={'number'}
            name={'minRetweets'}
            value={minRetweets}
            min={0}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Minimum Replies'}
            type={'number'}
            name={'minReplies'}
            value={minReplies}
            min={0}
            onChange={this.handleChange}
          />

          <Switch
            label={'Exclude Retweets'}
            name={'excludeRetweets'}
            checked={excludeRetweets}
            onChange={this.handleChange}
          />

          <Switch
            label={'Exclude Replies'}
            name={'excludeReplies'}
            checked={excludeReplies}
            onChange={this.handleChange}
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
              { label: 'Timeline', value: 'timeline' },
              { label: 'Grid', value: 'grid' },
              { label: 'Card', value: 'card' },
              { label: 'Compact', value: 'compact' }
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
            label={'Show Username'}
            name={'showUsername'}
            checked={showUsername}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Timestamp'}
            name={'showTimestamp'}
            checked={showTimestamp}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Engagement Metrics'}
            name={'showEngagement'}
            checked={showEngagement}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Verified Badge'}
            name={'showVerified'}
            checked={showVerified}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Media'}
            name={'showMedia'}
            checked={showMedia}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Threads'}
            name={'showThreads'}
            checked={showThreads}
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
              max={500}
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
              { label: 'Tweet', value: 'tweet' },
              { label: 'Timeline', value: 'timeline' },
              { label: 'Follow', value: 'follow' }
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

          <Switch
            label={'Show Tweet Actions'}
            name={'showTweetActions'}
            checked={showTweetActions}
            onChange={this.handleChange}
          />

          {/* Twitter-Specific Features */}
          <h4>Twitter-Specific Features</h4>
          
          <Switch
            label={'Show Trending Topics'}
            name={'showTrending'}
            checked={showTrending}
            onChange={this.handleChange}
          />

          {showTrending && (
            <ButtonGroup
              label={'Trending Location'}
              name={'trendingLocation'}
              value={trendingLocation}
              options={[
                { label: 'Worldwide', value: 'worldwide' },
                { label: 'United States', value: '23424977' },
                { label: 'United Kingdom', value: '23424975' },
                { label: 'Canada', value: '23424775' }
              ]}
              onChange={this.handleChange}
            />
          )}

          <Switch
            label={'Show Mentions'}
            name={'showMentions'}
            checked={showMentions}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Hashtags'}
            name={'showHashtags'}
            checked={showHashtags}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Links'}
            name={'showLinks'}
            checked={showLinks}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Polls'}
            name={'showPolls'}
            checked={showPolls}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Spaces'}
            name={'showSpaces'}
            checked={showSpaces}
            onChange={this.handleChange}
          />

          {/* API Configuration */}
          <h4>API Configuration</h4>
          
          <Switch
            label={'Use Twitter API'}
            name={'useTwitterAPI'}
            checked={useTwitterAPI}
            onChange={this.handleChange}
          />

          {useTwitterAPI && (
            <>
              <ButtonGroup
                label={'API Version'}
                name={'apiVersion'}
                value={apiVersion}
                options={[
                  { label: 'v2', value: 'v2' },
                  { label: 'v1.1', value: 'v1.1' }
                ]}
                onChange={this.handleChange}
              />

              <Input
                inline={false}
                label={'Bearer Token (Optional)'}
                type={'password'}
                name={'bearerToken'}
                value={bearerToken}
                placeholder={'Twitter Bearer Token for API access'}
                onChange={this.handleChange}
              />

              <Switch
                label={'Include Metrics'}
                name={'includeMetrics'}
                checked={includeMetrics}
                onChange={this.handleChange}
              />

              <Switch
                label={'Include Media'}
                name={'includeMedia'}
                checked={includeMedia}
                onChange={this.handleChange}
              />
            </>
          )}

          {/* Real-time Features */}
          <h4>Real-time Features</h4>
          
          <Switch
            label={'Enable Streaming'}
            name={'enableStreaming'}
            checked={enableStreaming}
            onChange={this.handleChange}
          />

          {enableStreaming && (
            <>
              <Input
                inline={false}
                label={'Stream Filters (comma-separated)'}
                type={'text'}
                name={'streamFiltersInput'}
                value={streamFiltersInput}
                placeholder={'filter:media, filter:verified'}
                onChange={(value) => this.handleArrayChange('streamFilters', value)}
              />

              <Switch
                label={'Show Live Indicator'}
                name={'showLiveIndicator'}
                checked={showLiveIndicator}
                onChange={this.handleChange}
              />
            </>
          )}

          {/* Content Moderation */}
          <h4>Content Moderation</h4>
          
          <Switch
            label={'Filter Profanity'}
            name={'filterProfanity'}
            checked={filterProfanity}
            onChange={this.handleChange}
          />

          <Switch
            label={'Filter Spam'}
            name={'filterSpam'}
            checked={filterSpam}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Sensitive Content'}
            name={'showSensitiveContent'}
            checked={showSensitiveContent}
            onChange={this.handleChange}
          />

          <Input
            inline={false}
            label={'Block Words (comma-separated)'}
            type={'text'}
            name={'blockWordsInput'}
            value={blockWordsInput}
            placeholder={'spam, ads, promotional'}
            onChange={(value) => this.handleArrayChange('blockWords', value)}
          />

          <Input
            inline={false}
            label={'Allowed Languages (comma-separated)'}
            type={'text'}
            name={'allowedLanguagesInput'}
            value={allowedLanguagesInput}
            placeholder={'en, es, fr'}
            onChange={(value) => this.handleArrayChange('allowedLanguages', value)}
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
                  <strong>Source:</strong> {tweetType === 'timeline' ? `@${username}` : 
                                          tweetType === 'hashtag' ? `#${hashtag}` :
                                          tweetType === 'search' ? searchQuery : 'Trending'}
                </div>
                <div className="preview-details">
                  <strong>Tweets:</strong> {tweetLimit} tweets
                </div>
                <div className="preview-details">
                  <strong>Content:</strong> {showImages ? 'Images' : ''} {showVideos ? 'Videos' : ''} {showRetweets ? 'Retweets' : ''}
                </div>
                <div className="preview-details">
                  <strong>API:</strong> {useTwitterAPI ? `Twitter API ${apiVersion}` : 'Embed fallback'}
                </div>
                <div className="preview-details">
                  <strong>Refresh:</strong> {autoRefresh ? `Every ${refreshInterval}s` : 'Manual'}
                </div>
                <div className="preview-details">
                  <strong>Streaming:</strong> {enableStreaming ? 'Live' : 'Off'}
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

export default XTwitterOptions
