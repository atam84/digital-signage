import React, { Component } from 'react'
import { Form, Input, Button, ButtonGroup, Switch, ColorPicker } from '../../../components/Form'

class InstagramOptions extends Component {
  constructor(props) {
    super(props)
    const {
      username = '',
      hashtag = '',
      postType = 'mixed',
      postLimit = 12,
      showImages = true,
      showVideos = true,
      showCarousel = true,
      showIGTV = false,
      showReels = true,
      showStories = false,
      minLikes = 0,
      minComments = 0,
      dateRange = 30,
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'large',
      layout = 'grid',
      gridColumns = 3,
      gridGap = 10,
      autoRefresh = true,
      refreshInterval = 900,
      backgroundColor = '#000000',
      textColor = '#ffffff',
      linkColor = '#c13584',
      accentColor = '#c13584',
      borderColor = '#262626',
      borderWidth = 1,
      borderRadius = 8,
      shadowStyle = 'subtle',
      enableRepetition = false,
      repetitionInterval = 30,
      repetitionUnit = 'minutes',
      fadeTransition = true,
      animationType = 'fade',
      animationDuration = 1000,
      animationDelay = 0,
      showAuthor = true,
      showUsername = true,
      showTimestamp = true,
      showEngagement = true,
      showVerified = true,
      showCaption = true,
      truncateCaption = true,
      maxCaptionLength = 150,
      showHashtags = true,
      showMentions = true,
      showLocation = true,
      embedMode = 'auto',
      showEmbedPreview = true,
      embedHeight = 400,
      showPostActions = false,
      showProfilePicture = true,
      showBio = false,
      showFollowers = false,
      showFollowing = false,
      showPostCount = false,
      showStoryHighlights = false,
      showStoryRing = true,
      showCarouselIndicators = true,
      showVideoControls = true,
      showReelControls = true,
      useInstagramAPI = false,
      accessToken = '',
      apiVersion = 'v18.0',
      includeMetrics = true,
      includeMedia = true,
      manualPosts = [],
      manualStories = [],
      useManualMode = true,
      filterProfanity = false,
      filterSpam = true,
      showSensitiveContent = false,
      blockWords = [],
      allowedLanguages = ['en'],
      storyDuration = 5000,
      storyTransition = 'slide',
      showStoryProgress = true,
      storyAutoAdvance = true,
      storyLoop = true,
      showIGTVPreview = true,
      showReelsPreview = true,
      igtvAutoplay = false,
      reelsAutoplay = true,
      carouselAutoplay = true,
      carouselInterval = 3000,
      carouselIndicators = true,
      carouselControls = true,
      gridResponsive = true,
      gridAspectRatio = 'square',
      gridHoverEffect = true,
      gridLazyLoad = true
    } = props.data || {}

    this.state = {
      username,
      hashtag,
      postType,
      postLimit,
      showImages,
      showVideos,
      showCarousel,
      showIGTV,
      showReels,
      showStories,
      minLikes,
      minComments,
      dateRange,
      displayMode,
      floatingPosition,
      floatingSize,
      layout,
      gridColumns,
      gridGap,
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
      showCaption,
      truncateCaption,
      maxCaptionLength,
      showHashtags,
      showMentions,
      showLocation,
      embedMode,
      showEmbedPreview,
      embedHeight,
      showPostActions,
      showProfilePicture,
      showBio,
      showFollowers,
      showFollowing,
      showPostCount,
      showStoryHighlights,
      showStoryRing,
      showCarouselIndicators,
      showVideoControls,
      showReelControls,
      useInstagramAPI,
      accessToken,
      apiVersion,
      includeMetrics,
      includeMedia,
      manualPosts,
      manualStories,
      useManualMode,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWords,
      allowedLanguages,
      storyDuration,
      storyTransition,
      showStoryProgress,
      storyAutoAdvance,
      storyLoop,
      showIGTVPreview,
      showReelsPreview,
      igtvAutoplay,
      reelsAutoplay,
      carouselAutoplay,
      carouselInterval,
      carouselIndicators,
      carouselControls,
      gridResponsive,
      gridAspectRatio,
      gridHoverEffect,
      gridLazyLoad,
      blockWordsInput: blockWords.join(', '),
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
      postType,
      postLimit,
      showImages,
      showVideos,
      showCarousel,
      showIGTV,
      showReels,
      showStories,
      minLikes,
      minComments,
      dateRange,
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
      showCaption,
      truncateCaption,
      maxCaptionLength,
      showHashtags,
      showMentions,
      showLocation,
      embedMode,
      showEmbedPreview,
      embedHeight,
      showPostActions,
      showProfilePicture,
      showBio,
      showFollowers,
      showFollowing,
      showPostCount,
      showStoryHighlights,
      showStoryRing,
      showCarouselIndicators,
      showVideoControls,
      showReelControls,
      useInstagramAPI,
      accessToken,
      apiVersion,
      includeMetrics,
      includeMedia,
      useManualMode,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWordsInput,
      allowedLanguagesInput,
      storyDuration,
      storyTransition,
      showStoryProgress,
      storyAutoAdvance,
      storyLoop,
      showIGTVPreview,
      showReelsPreview,
      igtvAutoplay,
      reelsAutoplay,
      carouselAutoplay,
      carouselInterval,
      carouselIndicators,
      carouselControls,
      gridResponsive,
      gridAspectRatio,
      gridHoverEffect,
      gridLazyLoad,
      showPreview
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Instagram</h3>

          {/* Instagram Configuration */}
          <h4>Instagram Configuration</h4>
          
          <ButtonGroup
            label={'Post Type'}
            name={'postType'}
            value={postType}
            options={[
              { label: 'Mixed', value: 'mixed' },
              { label: 'Photos Only', value: 'photos' },
              { label: 'Videos Only', value: 'videos' },
              { label: 'Carousel Only', value: 'carousel' },
              { label: 'IGTV Only', value: 'igtv' },
              { label: 'Reels Only', value: 'reels' }
            ]}
            onChange={this.handleChange}
          />

          <Input
            inline={false}
            label={'Instagram Username (without @)'}
            type={'text'}
            name={'username'}
            value={username}
            placeholder={'username'}
            onChange={this.handleChange}
          />

          <Input
            inline={false}
            label={'Hashtag (without #)'}
            type={'text'}
            name={'hashtag'}
            value={hashtag}
            placeholder={'hashtag'}
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
            label={'Show Carousel Posts'}
            name={'showCarousel'}
            checked={showCarousel}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show IGTV'}
            name={'showIGTV'}
            checked={showIGTV}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Reels'}
            name={'showReels'}
            checked={showReels}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Stories'}
            name={'showStories'}
            checked={showStories}
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
              { label: 'Grid', value: 'grid' },
              { label: 'Feed', value: 'feed' },
              { label: 'Carousel', value: 'carousel' },
              { label: 'Story', value: 'story' }
            ]}
            onChange={this.handleChange}
          />

          {layout === 'grid' && (
            <>
              <Input
                inline={true}
                label={'Grid Columns'}
                type={'number'}
                name={'gridColumns'}
                value={gridColumns}
                min={1}
                max={6}
                onChange={this.handleChange}
              />

              <Input
                inline={true}
                label={'Grid Gap (px)'}
                type={'number'}
                name={'gridGap'}
                value={gridGap}
                min={0}
                max={50}
                onChange={this.handleChange}
              />

              <ButtonGroup
                label={'Grid Aspect Ratio'}
                name={'gridAspectRatio'}
                value={gridAspectRatio}
                options={[
                  { label: 'Square', value: 'square' },
                  { label: 'Portrait', value: 'portrait' },
                  { label: 'Landscape', value: 'landscape' }
                ]}
                onChange={this.handleChange}
              />

              <Switch
                label={'Responsive Grid'}
                name={'gridResponsive'}
                checked={gridResponsive}
                onChange={this.handleChange}
              />

              <Switch
                label={'Grid Hover Effects'}
                name={'gridHoverEffect'}
                checked={gridHoverEffect}
                onChange={this.handleChange}
              />

              <Switch
                label={'Grid Lazy Loading'}
                name={'gridLazyLoad'}
                checked={gridLazyLoad}
                onChange={this.handleChange}
              />
            </>
          )}

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
            label={'Show Caption'}
            name={'showCaption'}
            checked={showCaption}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Hashtags'}
            name={'showHashtags'}
            checked={showHashtags}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Mentions'}
            name={'showMentions'}
            checked={showMentions}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Location'}
            name={'showLocation'}
            checked={showLocation}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Profile Picture'}
            name={'showProfilePicture'}
            checked={showProfilePicture}
            onChange={this.handleChange}
          />

          <Switch
            label={'Truncate Caption'}
            name={'truncateCaption'}
            checked={truncateCaption}
            onChange={this.handleChange}
          />

          {truncateCaption && (
            <Input
              inline={true}
              label={'Max Caption Length'}
              type={'number'}
              name={'maxCaptionLength'}
              value={maxCaptionLength}
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
              { label: 'Post', value: 'post' },
              { label: 'Story', value: 'story' },
              { label: 'IGTV', value: 'igtv' },
              { label: 'Reel', value: 'reel' }
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
            label={'Show Post Actions'}
            name={'showPostActions'}
            checked={showPostActions}
            onChange={this.handleChange}
          />

          {/* Instagram-Specific Features */}
          <h4>Instagram-Specific Features</h4>
          
          <Switch
            label={'Show Bio'}
            name={'showBio'}
            checked={showBio}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Followers Count'}
            name={'showFollowers'}
            checked={showFollowers}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Following Count'}
            name={'showFollowing'}
            checked={showFollowing}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Post Count'}
            name={'showPostCount'}
            checked={showPostCount}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Story Highlights'}
            name={'showStoryHighlights'}
            checked={showStoryHighlights}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Story Ring'}
            name={'showStoryRing'}
            checked={showStoryRing}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Carousel Indicators'}
            name={'showCarouselIndicators'}
            checked={showCarouselIndicators}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Video Controls'}
            name={'showVideoControls'}
            checked={showVideoControls}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Reel Controls'}
            name={'showReelControls'}
            checked={showReelControls}
            onChange={this.handleChange}
          />

          {/* Story Features */}
          {showStories && (
            <>
              <h4>Story Features</h4>
              
              <Input
                inline={true}
                label={'Story Duration (ms)'}
                type={'number'}
                name={'storyDuration'}
                value={storyDuration}
                min={1000}
                max={10000}
                step={500}
                onChange={this.handleChange}
              />

              <ButtonGroup
                label={'Story Transition'}
                name={'storyTransition'}
                value={storyTransition}
                options={[
                  { label: 'Slide', value: 'slide' },
                  { label: 'Fade', value: 'fade' },
                  { label: 'Zoom', value: 'zoom' }
                ]}
                onChange={this.handleChange}
              />

              <Switch
                label={'Show Story Progress'}
                name={'showStoryProgress'}
                checked={showStoryProgress}
                onChange={this.handleChange}
              />

              <Switch
                label={'Story Auto Advance'}
                name={'storyAutoAdvance'}
                checked={storyAutoAdvance}
                onChange={this.handleChange}
              />

              <Switch
                label={'Story Loop'}
                name={'storyLoop'}
                checked={storyLoop}
                onChange={this.handleChange}
              />
            </>
          )}

          {/* IGTV and Reels */}
          <h4>IGTV and Reels</h4>
          
          <Switch
            label={'Show IGTV Preview'}
            name={'showIGTVPreview'}
            checked={showIGTVPreview}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Reels Preview'}
            name={'showReelsPreview'}
            checked={showReelsPreview}
            onChange={this.handleChange}
          />

          <Switch
            label={'IGTV Autoplay'}
            name={'igtvAutoplay'}
            checked={igtvAutoplay}
            onChange={this.handleChange}
          />

          <Switch
            label={'Reels Autoplay'}
            name={'reelsAutoplay'}
            checked={reelsAutoplay}
            onChange={this.handleChange}
          />

          {/* Carousel Features */}
          <h4>Carousel Features</h4>
          
          <Switch
            label={'Carousel Autoplay'}
            name={'carouselAutoplay'}
            checked={carouselAutoplay}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Carousel Interval (ms)'}
            type={'number'}
            name={'carouselInterval'}
            value={carouselInterval}
            min={1000}
            max={10000}
            step={500}
            onChange={this.handleChange}
          />

          <Switch
            label={'Carousel Indicators'}
            name={'carouselIndicators'}
            checked={carouselIndicators}
            onChange={this.handleChange}
          />

          <Switch
            label={'Carousel Controls'}
            name={'carouselControls'}
            checked={carouselControls}
            onChange={this.handleChange}
          />

          {/* API Configuration */}
          <h4>API Configuration</h4>
          
          <Switch
            label={'Use Instagram API'}
            name={'useInstagramAPI'}
            checked={useInstagramAPI}
            onChange={this.handleChange}
          />

          {useInstagramAPI && (
            <>
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

              <Input
                inline={false}
                label={'Access Token (Optional)'}
                type={'password'}
                name={'accessToken'}
                value={accessToken}
                placeholder={'Instagram access token for API access'}
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

          {/* Manual Configuration */}
          <h4>Manual Configuration</h4>
          
          <Switch
            label={'Use Manual Mode'}
            name={'useManualMode'}
            checked={useManualMode}
            onChange={this.handleChange}
          />

          {useManualMode && (
            <div className="manual-config">
              <p>Manual configuration allows you to add Instagram posts manually when API access is not available.</p>
              <p>This is useful for displaying specific posts or when Instagram API approval is pending.</p>
            </div>
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
              { label: 'Fade', value: 'fade' },
              { label: 'Slide', value: 'slide' },
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
                  <strong>Source:</strong> {username ? `@${username}` : hashtag ? `#${hashtag}` : 'Manual mode'}
                </div>
                <div className="preview-details">
                  <strong>Posts:</strong> {postLimit} posts, {dateRange} days
                </div>
                <div className="preview-details">
                  <strong>Content:</strong> {showImages ? 'Images' : ''} {showVideos ? 'Videos' : ''} {showCarousel ? 'Carousel' : ''} {showReels ? 'Reels' : ''}
                </div>
                <div className="preview-details">
                  <strong>Layout:</strong> {layout} {layout === 'grid' ? `(${gridColumns} columns)` : ''}
                </div>
                <div className="preview-details">
                  <strong>API:</strong> {useInstagramAPI ? `Instagram API ${apiVersion}` : 'Manual/Embed fallback'}
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
          .manual-config {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            border-left: 4px solid #c13584;
          }
          .manual-config p {
            margin: 5px 0;
            font-size: 14px;
            color: #666;
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

export default InstagramOptions
