import React, { Component } from 'react'
import { Form, Input, Button, ButtonGroup, Switch, ColorPicker, Select } from '../../../components/Form'
import axios from 'axios'

class MixedPlaylistOptions extends Component {
  constructor(props) {
    super(props)
    const {
      playlistId = '',
      playlistName = '',
      playlistDescription = '',
      autoPlay = true,
      loop = true,
      shuffle = false,
      transitionDuration = 1000,
      transitionType = 'fade',
      displayDuration = 10000,
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'large',
      layout = 'fullscreen',
      showPlatform = true,
      showTitle = true,
      showDescription = false,
      showDuration = true,
      showThumbnail = true,
      showProgress = true,
      showControls = true,
      platformSettings = {},
      backgroundColor = '#000000',
      textColor = '#ffffff',
      accentColor = '#007bff',
      borderColor = '#cccccc',
      borderWidth = 2,
      borderRadius = 8,
      shadowStyle = 'subtle',
      gridColumns = 2,
      gridGap = 10,
      carouselItems = 3,
      carouselAutoplay = true,
      carouselInterval = 5000,
      enableRepetition = false,
      repetitionInterval = 30,
      repetitionUnit = 'minutes',
      fadeTransition = true,
      animationType = 'fade',
      animationDuration = 1000,
      animationDelay = 0,
      filterProfanity = false,
      filterSpam = true,
      showSensitiveContent = false,
      blockWords = [],
      allowedLanguages = ['en'],
      autoRefresh = false,
      refreshInterval = 300,
      showErrors = true,
      errorRetryCount = 3,
      errorRetryDelay = 5000,
      trackPlays = true,
      trackViews = true,
      showStats = false,
      showSubtitles = false,
      showCaptions = false,
      highContrast = false,
      largeText = false
    } = props.data || {}

    this.state = {
      playlistId,
      playlistName,
      playlistDescription,
      autoPlay,
      loop,
      shuffle,
      transitionDuration,
      transitionType,
      displayDuration,
      displayMode,
      floatingPosition,
      floatingSize,
      layout,
      showPlatform,
      showTitle,
      showDescription,
      showDuration,
      showThumbnail,
      showProgress,
      showControls,
      platformSettings,
      backgroundColor,
      textColor,
      accentColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      gridColumns,
      gridGap,
      carouselItems,
      carouselAutoplay,
      carouselInterval,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      animationType,
      animationDuration,
      animationDelay,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWords,
      allowedLanguages,
      autoRefresh,
      refreshInterval,
      showErrors,
      errorRetryCount,
      errorRetryDelay,
      trackPlays,
      trackViews,
      showStats,
      showSubtitles,
      showCaptions,
      highContrast,
      largeText,
      blockWordsInput: blockWords.join(', '),
      allowedLanguagesInput: allowedLanguages.join(', '),
      availablePlaylists: [],
      showPreview: true
    }
  }

  componentDidMount() {
    this.loadAvailablePlaylists()
  }

  loadAvailablePlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:9900/api/v1/mixed-playlists')
      this.setState({ availablePlaylists: response.data.data })
    } catch (error) {
      console.error('Error loading playlists:', error)
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

  handlePlatformSettingChange = (platform, setting, value) => {
    const { platformSettings } = this.state
    const newPlatformSettings = {
      ...platformSettings,
      [platform]: {
        ...platformSettings[platform],
        [setting]: value
      }
    }
    
    this.setState({ platformSettings: newPlatformSettings }, () => {
      this.props.onChange(this.state)
    })
  }

  render() {
    const {
      playlistId,
      playlistName,
      playlistDescription,
      autoPlay,
      loop,
      shuffle,
      transitionDuration,
      transitionType,
      displayDuration,
      displayMode,
      floatingPosition,
      floatingSize,
      layout,
      showPlatform,
      showTitle,
      showDescription,
      showDuration,
      showThumbnail,
      showProgress,
      showControls,
      platformSettings,
      backgroundColor,
      textColor,
      accentColor,
      borderColor,
      borderWidth,
      borderRadius,
      shadowStyle,
      gridColumns,
      gridGap,
      carouselItems,
      carouselAutoplay,
      carouselInterval,
      enableRepetition,
      repetitionInterval,
      repetitionUnit,
      fadeTransition,
      animationType,
      animationDuration,
      animationDelay,
      filterProfanity,
      filterSpam,
      showSensitiveContent,
      blockWordsInput,
      allowedLanguagesInput,
      autoRefresh,
      refreshInterval,
      showErrors,
      errorRetryCount,
      errorRetryDelay,
      trackPlays,
      trackViews,
      showStats,
      showSubtitles,
      showCaptions,
      highContrast,
      largeText,
      availablePlaylists,
      showPreview
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: Mixed Playlist</h3>

          {/* Playlist Selection */}
          <h4>Playlist Configuration</h4>
          
          <Select
            label="Select Playlist"
            value={playlistId}
            onChange={(val) => this.handleChange('playlistId', val)}
            options={[
              { value: '', label: 'Select a playlist...' },
              ...availablePlaylists.map(playlist => ({
                value: playlist._id,
                label: playlist.name
              }))
            ]}
          />

          {playlistId && (
            <>
              <Input
                inline={false}
                label="Playlist Name (Override)"
                type="text"
                name="playlistName"
                value={playlistName}
                onChange={this.handleChange}
                placeholder="Custom name for display"
              />

              <Input
                inline={false}
                label="Playlist Description (Override)"
                type="text"
                name="playlistDescription"
                value={playlistDescription}
                onChange={this.handleChange}
                placeholder="Custom description for display"
              />
            </>
          )}

          {/* Playback Settings */}
          <h4>Playback Settings</h4>
          
          <Switch
            label="Auto Play"
            name="autoPlay"
            checked={autoPlay}
            onChange={this.handleChange}
          />

          <Switch
            label="Loop Playlist"
            name="loop"
            checked={loop}
            onChange={this.handleChange}
          />

          <Switch
            label="Shuffle Items"
            name="shuffle"
            checked={shuffle}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label="Display Duration (ms)"
            type="number"
            name="displayDuration"
            value={displayDuration}
            min={1000}
            max={60000}
            step={1000}
            onChange={this.handleChange}
          />

          <ButtonGroup
            label="Transition Type"
            name="transitionType"
            value={transitionType}
            options={[
              { label: 'Fade', value: 'fade' },
              { label: 'Slide', value: 'slide' },
              { label: 'Zoom', value: 'zoom' },
              { label: 'None', value: 'none' }
            ]}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label="Transition Duration (ms)"
            type="number"
            name="transitionDuration"
            value={transitionDuration}
            min={100}
            max={5000}
            step={100}
            onChange={this.handleChange}
          />

          {/* Display Configuration */}
          <h4>Display Configuration</h4>
          
          <ButtonGroup
            label="Display Mode"
            name="displayMode"
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
                label="Floating Position"
                name="floatingPosition"
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
                label="Floating Size"
                name="floatingSize"
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
            label="Layout"
            name="layout"
            value={layout}
            options={[
              { label: 'Fullscreen', value: 'fullscreen' },
              { label: 'Grid', value: 'grid' },
              { label: 'Carousel', value: 'carousel' }
            ]}
            onChange={this.handleChange}
          />

          {layout === 'grid' && (
            <>
              <Input
                inline={true}
                label="Grid Columns"
                type="number"
                name="gridColumns"
                value={gridColumns}
                min={1}
                max={6}
                onChange={this.handleChange}
              />

              <Input
                inline={true}
                label="Grid Gap (px)"
                type="number"
                name="gridGap"
                value={gridGap}
                min={0}
                max={50}
                onChange={this.handleChange}
              />
            </>
          )}

          {layout === 'carousel' && (
            <>
              <Input
                inline={true}
                label="Carousel Items"
                type="number"
                name="carouselItems"
                value={carouselItems}
                min={1}
                max={10}
                onChange={this.handleChange}
              />

              <Switch
                label="Carousel Autoplay"
                name="carouselAutoplay"
                checked={carouselAutoplay}
                onChange={this.handleChange}
              />

              <Input
                inline={true}
                label="Carousel Interval (ms)"
                type="number"
                name="carouselInterval"
                value={carouselInterval}
                min={1000}
                max={30000}
                step={1000}
                onChange={this.handleChange}
              />
            </>
          )}

          {/* Content Display */}
          <h4>Content Display</h4>
          
          <Switch
            label="Show Platform Indicator"
            name="showPlatform"
            checked={showPlatform}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Title"
            name="showTitle"
            checked={showTitle}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Description"
            name="showDescription"
            checked={showDescription}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Duration"
            name="showDuration"
            checked={showDuration}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Thumbnail"
            name="showThumbnail"
            checked={showThumbnail}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Progress Bar"
            name="showProgress"
            checked={showProgress}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Controls"
            name="showControls"
            checked={showControls}
            onChange={this.handleChange}
          />

          {/* Platform Settings */}
          <h4>Platform Settings</h4>
          
          {['youtube', 'youtube_shorts', 'tiktok', 'instagram', 'facebook', 'reddit', 'x_twitter'].map(platform => (
            <div key={platform} className="platform-settings">
              <h5>{platform.replace('_', ' ').toUpperCase()}</h5>
              
              <Switch
                label="Autoplay"
                checked={platformSettings[platform]?.autoplay || false}
                onChange={(val) => this.handlePlatformSettingChange(platform, 'autoplay', val)}
              />

              <Switch
                label="Show Controls"
                checked={platformSettings[platform]?.controls || false}
                onChange={(val) => this.handlePlatformSettingChange(platform, 'controls', val)}
              />

              <Switch
                label="Mute"
                checked={platformSettings[platform]?.mute || false}
                onChange={(val) => this.handlePlatformSettingChange(platform, 'mute', val)}
              />

              <Switch
                label="Loop"
                checked={platformSettings[platform]?.loop || false}
                onChange={(val) => this.handlePlatformSettingChange(platform, 'loop', val)}
              />
            </div>
          ))}

          {/* Styling */}
          <h4>Styling</h4>
          
          <ColorPicker
            label="Background Color"
            name="backgroundColor"
            value={backgroundColor}
            onChange={this.handleChange}
          />

          <ColorPicker
            label="Text Color"
            name="textColor"
            value={textColor}
            onChange={this.handleChange}
          />

          <ColorPicker
            label="Accent Color"
            name="accentColor"
            value={accentColor}
            onChange={this.handleChange}
          />

          <ColorPicker
            label="Border Color"
            name="borderColor"
            value={borderColor}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label="Border Width (px)"
            type="number"
            name="borderWidth"
            value={borderWidth}
            min={0}
            max={10}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label="Border Radius (px)"
            type="number"
            name="borderRadius"
            value={borderRadius}
            min={0}
            max={20}
            onChange={this.handleChange}
          />

          <ButtonGroup
            label="Shadow Style"
            name="shadowStyle"
            value={shadowStyle}
            options={[
              { label: 'None', value: 'none' },
              { label: 'Subtle', value: 'subtle' },
              { label: 'Medium', value: 'medium' },
              { label: 'Strong', value: 'strong' }
            ]}
            onChange={this.handleChange}
          />

          {/* Auto Refresh */}
          <h4>Auto Refresh</h4>
          
          <Switch
            label="Auto Refresh Playlist"
            name="autoRefresh"
            checked={autoRefresh}
            onChange={this.handleChange}
          />

          {autoRefresh && (
            <Input
              inline={true}
              label="Refresh Interval (seconds)"
              type="number"
              name="refreshInterval"
              value={refreshInterval}
              min={60}
              max={3600}
              step={60}
              onChange={this.handleChange}
            />
          )}

          {/* Error Handling */}
          <h4>Error Handling</h4>
          
          <Switch
            label="Show Errors"
            name="showErrors"
            checked={showErrors}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label="Error Retry Count"
            type="number"
            name="errorRetryCount"
            value={errorRetryCount}
            min={0}
            max={10}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label="Error Retry Delay (ms)"
            type="number"
            name="errorRetryDelay"
            value={errorRetryDelay}
            min={1000}
            max={30000}
            step={1000}
            onChange={this.handleChange}
          />

          {/* Statistics */}
          <h4>Statistics</h4>
          
          <Switch
            label="Track Plays"
            name="trackPlays"
            checked={trackPlays}
            onChange={this.handleChange}
          />

          <Switch
            label="Track Views"
            name="trackViews"
            checked={trackViews}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Statistics"
            name="showStats"
            checked={showStats}
            onChange={this.handleChange}
          />

          {/* Accessibility */}
          <h4>Accessibility</h4>
          
          <Switch
            label="Show Subtitles"
            name="showSubtitles"
            checked={showSubtitles}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Captions"
            name="showCaptions"
            checked={showCaptions}
            onChange={this.handleChange}
          />

          <Switch
            label="High Contrast"
            name="highContrast"
            checked={highContrast}
            onChange={this.handleChange}
          />

          <Switch
            label="Large Text"
            name="largeText"
            checked={largeText}
            onChange={this.handleChange}
          />

          {/* Content Moderation */}
          <h4>Content Moderation</h4>
          
          <Switch
            label="Filter Profanity"
            name="filterProfanity"
            checked={filterProfanity}
            onChange={this.handleChange}
          />

          <Switch
            label="Filter Spam"
            name="filterSpam"
            checked={filterSpam}
            onChange={this.handleChange}
          />

          <Switch
            label="Show Sensitive Content"
            name="showSensitiveContent"
            checked={showSensitiveContent}
            onChange={this.handleChange}
          />

          <Input
            inline={false}
            label="Block Words (comma-separated)"
            type="text"
            name="blockWordsInput"
            value={blockWordsInput}
            placeholder="spam, ads, promotional"
            onChange={(value) => this.handleArrayChange('blockWords', value)}
          />

          <Input
            inline={false}
            label="Allowed Languages (comma-separated)"
            type="text"
            name="allowedLanguagesInput"
            value={allowedLanguagesInput}
            placeholder="en, es, fr"
            onChange={(value) => this.handleArrayChange('allowedLanguages', value)}
          />

          {/* Animation */}
          <h4>Animation & Transitions</h4>
          
          <Switch
            label="Fade Transition"
            name="fadeTransition"
            checked={fadeTransition}
            onChange={this.handleChange}
          />

          <ButtonGroup
            label="Animation Type"
            name="animationType"
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
            label="Animation Duration (ms)"
            type="number"
            name="animationDuration"
            value={animationDuration}
            min={100}
            max={5000}
            step={100}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label="Animation Delay (ms)"
            type="number"
            name="animationDelay"
            value={animationDelay}
            min={0}
            max={2000}
            step={100}
            onChange={this.handleChange}
          />

          {/* Repetition */}
          <h4>Repetition Settings</h4>
          
          <Switch
            label="Enable Repetition"
            name="enableRepetition"
            checked={enableRepetition}
            onChange={this.handleChange}
          />

          {enableRepetition && (
            <>
              <Input
                inline={true}
                label="Repetition Interval"
                type="number"
                name="repetitionInterval"
                value={repetitionInterval}
                min={1}
                max={1440}
                onChange={this.handleChange}
              />

              <ButtonGroup
                label="Repetition Unit"
                name="repetitionUnit"
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
                  <strong>Playlist:</strong> {playlistName || 'Mixed Playlist'}
                </div>
                <div className="preview-details">
                  <strong>Display:</strong> {displayMode} {layout}
                </div>
                <div className="preview-details">
                  <strong>Playback:</strong> {autoPlay ? 'Auto' : 'Manual'} {loop ? 'Loop' : ''} {shuffle ? 'Shuffle' : ''}
                </div>
                <div className="preview-details">
                  <strong>Duration:</strong> {displayDuration}ms per item
                </div>
                <div className="preview-details">
                  <strong>Transition:</strong> {transitionType} ({transitionDuration}ms)
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
          h5 {
            color: #666;
            margin: 15px 0 10px 0;
            font-size: 14px;
            font-weight: bold;
          }
          .platform-settings {
            margin: 15px 0;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
            border-left: 4px solid #007bff;
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

export default MixedPlaylistOptions
