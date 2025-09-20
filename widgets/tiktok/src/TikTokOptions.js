import React, { Component } from 'react'
import { Form, Input, Button, ButtonGroup, Switch, ColorPicker } from '../../../components/Form'

class TikTokOptions extends Component {
  constructor(props) {
    super(props)
    const {
      videoUrls = [],
      videoIds = [],
      autoPlay = true,
      autoSwipe = true,
      swipeInterval = 5000,
      loop = true,
      showControls = false,
      mute = true,
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'medium',
      aspectRatio = '9:16',
      backgroundColor = '#000000',
      borderColor = '#ffffff',
      borderWidth = 2,
      borderRadius = 8,
      shadowStyle = 'subtle',
      enableRepetition = false,
      repetitionInterval = 30,
      repetitionUnit = 'minutes',
      fadeTransition = true,
      animationType = 'slide',
      animationDuration = 1000,
      animationDelay = 0,
      showProgress = false,
      showVolume = false,
      volume = 50,
      showCreator = false,
      showLikes = false,
      showComments = false,
      showShares = false,
      playlistName = '',
      playlistDescription = '',
      hashtagFilter = '',
      creatorFilter = '',
      autoRefresh = false,
      refreshInterval = 300,
      maxVideos = 20
    } = props.data || {}

    this.state = {
      videoUrls,
      videoIds,
      autoPlay,
      autoSwipe,
      swipeInterval,
      loop,
      showControls,
      mute,
      displayMode,
      floatingPosition,
      floatingSize,
      aspectRatio,
      backgroundColor,
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
      showProgress,
      showVolume,
      volume,
      showCreator,
      showLikes,
      showComments,
      showShares,
      playlistName,
      playlistDescription,
      hashtagFilter,
      creatorFilter,
      autoRefresh,
      refreshInterval,
      maxVideos,
      videoUrlsInput: videoUrls.join('\n'),
      videoIdsInput: videoIds.join('\n'),
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

  handleVideoUrlsChange = (value) => {
    // Parse line-separated video URLs
    const videoUrls = value.split('\n').map(url => url.trim()).filter(url => url.length > 0)
    this.setState(
      {
        videoUrls,
        videoUrlsInput: value
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  handleVideoIdsChange = (value) => {
    // Parse line-separated video IDs
    const videoIds = value.split('\n').map(id => id.trim()).filter(id => id.length > 0)
    this.setState(
      {
        videoIds,
        videoIdsInput: value
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  render() {
    const {
      videoUrls,
      videoIds,
      autoPlay,
      autoSwipe,
      swipeInterval,
      loop,
      showControls,
      mute,
      displayMode,
      floatingPosition,
      floatingSize,
      aspectRatio,
      backgroundColor,
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
      showProgress,
      showVolume,
      volume,
      showCreator,
      showLikes,
      showComments,
      showShares,
      playlistName,
      playlistDescription,
      hashtagFilter,
      creatorFilter,
      autoRefresh,
      refreshInterval,
      maxVideos,
      videoUrlsInput,
      videoIdsInput,
      showPreview
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: TikTok</h3>

          {/* Content Configuration */}
          <h4>Content Configuration</h4>
          
          <Input
            inline={false}
            label={'TikTok Video URLs (one per line)'}
            type={'textarea'}
            name={'videoUrlsInput'}
            value={videoUrlsInput}
            placeholder={'https://www.tiktok.com/@username/video/1234567890\nhttps://www.tiktok.com/@username/video/0987654321'}
            onChange={this.handleVideoUrlsChange}
          />
          
          <Input
            inline={false}
            label={'TikTok Video IDs (one per line)'}
            type={'textarea'}
            name={'videoIdsInput'}
            value={videoIdsInput}
            placeholder={'1234567890\n0987654321\n1122334455'}
            onChange={this.handleVideoIdsChange}
          />

          <Input
            inline={false}
            label={'Hashtag Filter (optional)'}
            type={'text'}
            name={'hashtagFilter'}
            value={hashtagFilter}
            placeholder={'#trending #funny #dance'}
            onChange={this.handleChange}
          />

          <Input
            inline={false}
            label={'Creator Filter (optional)'}
            type={'text'}
            name={'creatorFilter'}
            value={creatorFilter}
            placeholder={'@username'}
            onChange={this.handleChange}
          />

          <Input
            inline={true}
            label={'Max Videos'}
            type={'number'}
            name={'maxVideos'}
            value={maxVideos}
            min={1}
            max={50}
            onChange={this.handleChange}
          />

          {/* Playback Configuration */}
          <h4>Playback Configuration</h4>
          
          <Switch
            label={'Auto Play'}
            name={'autoPlay'}
            checked={autoPlay}
            onChange={this.handleChange}
          />

          <Switch
            label={'Auto Swipe'}
            name={'autoSwipe'}
            checked={autoSwipe}
            onChange={this.handleChange}
          />

          {autoSwipe && (
            <Input
              inline={true}
              label={'Swipe Interval (ms)'}
              type={'number'}
              name={'swipeInterval'}
              value={swipeInterval}
              min={1000}
              max={30000}
              step={500}
              onChange={this.handleChange}
            />
          )}

          <Switch
            label={'Loop Playlist'}
            name={'loop'}
            checked={loop}
            onChange={this.handleChange}
          />

          <Switch
            label={'Mute Audio'}
            name={'mute'}
            checked={mute}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Controls'}
            name={'showControls'}
            checked={showControls}
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
            label={'Aspect Ratio'}
            name={'aspectRatio'}
            value={aspectRatio}
            options={[
              { label: '9:16 (Vertical)', value: '9:16' },
              { label: '16:9 (Horizontal)', value: '16:9' },
              { label: '1:1 (Square)', value: '1:1' }
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

          {/* Content Features */}
          <h4>Content Features</h4>
          
          <Switch
            label={'Show Creator Info'}
            name={'showCreator'}
            checked={showCreator}
            onChange={this.handleChange}
          />

          <Switch
            label={'Show Likes Count'}
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
                  <strong>Videos:</strong> {videoUrls.length + videoIds.length} configured
                </div>
                <div className="preview-details">
                  <strong>Auto Swipe:</strong> {autoSwipe ? `${swipeInterval / 1000}s intervals` : 'Disabled'}
                </div>
                <div className="preview-details">
                  <strong>Display:</strong> {displayMode} mode, {aspectRatio} aspect ratio
                </div>
                <div className="preview-details">
                  <strong>Features:</strong> {showControls ? 'Controls' : 'No controls'}, {mute ? 'Muted' : 'Sound enabled'}
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

export default TikTokOptions
