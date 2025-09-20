import React, { Component } from 'react'
import { Form, Input, Button, ButtonGroup, Switch, ColorPicker } from '../../../components/Form'
import axios from 'axios'

class YoutubeShortsOptions extends Component {
  constructor(props) {
    super(props)
    const {
      playlistId = '',
      videoIds = [],
      autoPlay = true,
      loop = true,
      showControls = false,
      mute = true,
      displayMode = 'embedded',
      floatingPosition = 'center',
      floatingSize = 'medium',
      aspectRatio = '9:16',
      backgroundColor = '#000000',
      borderColor = '#cccccc',
      borderWidth = 2,
      borderRadius = 8,
      shadowStyle = 'subtle',
      enableRepetition = false,
      repetitionInterval = 30,
      repetitionUnit = 'minutes',
      fadeTransition = true,
      animationType = 'fade',
      animationDuration = 1000,
      animationDelay = 0,
      showProgress = false,
      showVolume = false,
      volume = 50,
      startTime = 0,
      endTime = 0
    } = props.data || {}

    this.state = {
      playlistId,
      videoIds,
      autoPlay,
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
      startTime,
      endTime,
      showPreview: true,
      videoIdsInput: videoIds.join(', '),
      // Playlist management
      playlists: [],
      selectedPlaylistId: '',
      newPlaylistName: '',
      newPlaylistDescription: '',
      showPlaylistManager: false
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

  handleBooleanChange = (name) => {
    this.setState(
      {
        [name]: !this.state[name]
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  handleVideoIdsChange = (value) => {
    // Parse comma-separated video IDs
    const videoIds = value.split(',').map(id => id.trim()).filter(id => id.length > 0)
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

  componentDidMount() {
    this.loadPlaylists()
  }

  loadPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:9900/api/v1/playlists')
      this.setState({ playlists: response.data })
    } catch (error) {
      console.error('Error loading playlists:', error)
    }
  }

  createPlaylist = async () => {
    const { newPlaylistName, newPlaylistDescription, videoIds } = this.state
    if (!newPlaylistName.trim()) {
      alert('Please enter a playlist name')
      return
    }

    try {
      const playlistData = {
        name: newPlaylistName,
        description: newPlaylistDescription,
        videoIds: videoIds,
        autoPlay: this.state.autoPlay,
        loop: this.state.loop,
        showControls: this.state.showControls,
        mute: this.state.mute,
        displayMode: this.state.displayMode,
        floatingPosition: this.state.floatingPosition,
        floatingSize: this.state.floatingSize,
        aspectRatio: this.state.aspectRatio,
        backgroundColor: this.state.backgroundColor,
        borderColor: this.state.borderColor,
        borderWidth: this.state.borderWidth,
        borderRadius: this.state.borderRadius,
        shadowStyle: this.state.shadowStyle,
        enableRepetition: this.state.enableRepetition,
        repetitionInterval: this.state.repetitionInterval,
        repetitionUnit: this.state.repetitionUnit,
        fadeTransition: this.state.fadeTransition,
        animationType: this.state.animationType,
        animationDuration: this.state.animationDuration,
        animationDelay: this.state.animationDelay,
        showProgress: this.state.showProgress,
        showVolume: this.state.showVolume,
        volume: this.state.volume,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      }

      const response = await axios.post('http://localhost:9900/api/v1/playlists', playlistData)
      this.setState({
        newPlaylistName: '',
        newPlaylistDescription: '',
        selectedPlaylistId: response.data._id,
        playlistId: response.data._id
      })
      this.loadPlaylists()
      alert('Playlist created successfully!')
    } catch (error) {
      console.error('Error creating playlist:', error)
      alert('Error creating playlist')
    }
  }

  loadPlaylist = async (playlistId) => {
    try {
      const response = await axios.get(`http://localhost:9900/api/v1/playlists/${playlistId}`)
      const playlist = response.data
      
      this.setState({
        playlistId: playlist._id,
        videoIds: playlist.videoIds,
        videoIdsInput: playlist.videoIds.join(', '),
        autoPlay: playlist.autoPlay,
        loop: playlist.loop,
        showControls: playlist.showControls,
        mute: playlist.mute,
        displayMode: playlist.displayMode,
        floatingPosition: playlist.floatingPosition,
        floatingSize: playlist.floatingSize,
        aspectRatio: playlist.aspectRatio,
        backgroundColor: playlist.backgroundColor,
        borderColor: playlist.borderColor,
        borderWidth: playlist.borderWidth,
        borderRadius: playlist.borderRadius,
        shadowStyle: playlist.shadowStyle,
        enableRepetition: playlist.enableRepetition,
        repetitionInterval: playlist.repetitionInterval,
        repetitionUnit: playlist.repetitionUnit,
        fadeTransition: playlist.fadeTransition,
        animationType: playlist.animationType,
        animationDuration: playlist.animationDuration,
        animationDelay: playlist.animationDelay,
        showProgress: playlist.showProgress,
        showVolume: playlist.showVolume,
        volume: playlist.volume,
        startTime: playlist.startTime,
        endTime: playlist.endTime
      }, () => {
        this.props.onChange(this.state)
      })
    } catch (error) {
      console.error('Error loading playlist:', error)
      alert('Error loading playlist')
    }
  }

  updatePlaylist = async () => {
    const { selectedPlaylistId } = this.state
    if (!selectedPlaylistId) {
      alert('No playlist selected')
      return
    }

    try {
      const updateData = {
        name: this.state.newPlaylistName || 'Updated Playlist',
        videoIds: this.state.videoIds,
        autoPlay: this.state.autoPlay,
        loop: this.state.loop,
        showControls: this.state.showControls,
        mute: this.state.mute,
        displayMode: this.state.displayMode,
        floatingPosition: this.state.floatingPosition,
        floatingSize: this.state.floatingSize,
        aspectRatio: this.state.aspectRatio,
        backgroundColor: this.state.backgroundColor,
        borderColor: this.state.borderColor,
        borderWidth: this.state.borderWidth,
        borderRadius: this.state.borderRadius,
        shadowStyle: this.state.shadowStyle,
        enableRepetition: this.state.enableRepetition,
        repetitionInterval: this.state.repetitionInterval,
        repetitionUnit: this.state.repetitionUnit,
        fadeTransition: this.state.fadeTransition,
        animationType: this.state.animationType,
        animationDuration: this.state.animationDuration,
        animationDelay: this.state.animationDelay,
        showProgress: this.state.showProgress,
        showVolume: this.state.showVolume,
        volume: this.state.volume,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      }

      await axios.put(`http://localhost:9900/api/v1/playlists/${selectedPlaylistId}`, updateData)
      this.loadPlaylists()
      alert('Playlist updated successfully!')
    } catch (error) {
      console.error('Error updating playlist:', error)
      alert('Error updating playlist')
    }
  }

  deletePlaylist = async (playlistId) => {
    if (!confirm('Are you sure you want to delete this playlist?')) {
      return
    }

    try {
      await axios.delete(`http://localhost:9900/api/v1/playlists/${playlistId}`)
      this.loadPlaylists()
      if (this.state.selectedPlaylistId === playlistId) {
        this.setState({
          selectedPlaylistId: '',
          playlistId: '',
          videoIds: [],
          videoIdsInput: ''
        })
      }
      alert('Playlist deleted successfully!')
    } catch (error) {
      console.error('Error deleting playlist:', error)
      alert('Error deleting playlist')
    }
  }

  render() {
    const {
      playlistId,
      videoIds,
      autoPlay,
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
      startTime,
      endTime,
      showPreview,
      videoIdsInput,
      // Playlist management
      playlists,
      selectedPlaylistId,
      newPlaylistName,
      newPlaylistDescription,
      showPlaylistManager
    } = this.state

    return (
      <div className='container'>
        <Form>
          <h3>Widget: YouTube Shorts</h3>

          {/* Playlist Management */}
          <h4>Playlist Management</h4>
          <Button
            label={showPlaylistManager ? 'Hide Playlist Manager' : 'Show Playlist Manager'}
            onClick={() => this.setState({ showPlaylistManager: !showPlaylistManager })}
          />

          {showPlaylistManager && (
            <div className="playlist-manager">
              <h5>Saved Playlists</h5>
              {playlists.length > 0 ? (
                <div className="playlist-list">
                  {playlists.map(playlist => (
                    <div key={playlist._id} className="playlist-item">
                      <div className="playlist-info">
                        <strong>{playlist.name}</strong>
                        <span>({playlist.videoIds.length} videos)</span>
                        {playlist.description && <p>{playlist.description}</p>}
                      </div>
                      <div className="playlist-actions">
                        <Button
                          label="Load"
                          onClick={() => this.loadPlaylist(playlist._id)}
                        />
                        <Button
                          label="Delete"
                          onClick={() => this.deletePlaylist(playlist._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No playlists found. Create one below!</p>
              )}

              <h5>Create New Playlist</h5>
              <Input
                inline={false}
                label={'Playlist Name'}
                type={'text'}
                name={'newPlaylistName'}
                value={newPlaylistName}
                placeholder={'Enter playlist name'}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Description (Optional)'}
                type={'text'}
                name={'newPlaylistDescription'}
                value={newPlaylistDescription}
                placeholder={'Enter playlist description'}
                onChange={this.handleChange}
              />
              <Button
                label="Create Playlist"
                onClick={this.createPlaylist}
              />

              {selectedPlaylistId && (
                <>
                  <h5>Update Current Playlist</h5>
                  <Button
                    label="Update Playlist"
                    onClick={this.updatePlaylist}
                  />
                </>
              )}
            </div>
          )}

          {/* Playlist Configuration */}
          <h4>Playlist Configuration</h4>
          <Input
            inline={false}
            label={'YouTube Playlist ID (Optional)'}
            type={'text'}
            name={'playlistId'}
            value={playlistId}
            placeholder={'Enter YouTube playlist ID'}
            onChange={this.handleChange}
          />
          
          <Input
            inline={false}
            label={'Video IDs (Comma-separated)'}
            type={'text'}
            name={'videoIdsInput'}
            value={videoIdsInput}
            placeholder={'LdhhqKYNzQ0, 42doAxYAPBk, SOXRcrT_5d8, koJqgYHm7Kk'}
            onChange={(value) => this.handleVideoIdsChange(value)}
          />

          <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <p><strong>Test Video IDs:</strong></p>
            <p>LdhhqKYNzQ0, 42doAxYAPBk, SOXRcrT_5d8, koJqgYHm7Kk</p>
          </div>

          {/* Playback Settings */}
          <h4>Playback Settings</h4>
          <Switch
            label={'Auto Play'}
            name={'autoPlay'}
            value={autoPlay}
            onChange={this.handleBooleanChange}
          />
          <Switch
            label={'Loop Playlist'}
            name={'loop'}
            value={loop}
            onChange={this.handleBooleanChange}
          />
          <Switch
            label={'Mute Audio'}
            name={'mute'}
            value={mute}
            onChange={this.handleBooleanChange}
          />
          <Switch
            label={'Show Controls'}
            name={'showControls'}
            value={showControls}
            onChange={this.handleBooleanChange}
          />

          {/* Display Settings */}
          <h4>Display Settings</h4>
          <Input
            inline={false}
            label={'Display Mode'}
            type={'select'}
            name={'displayMode'}
            value={displayMode}
            choices={[
              { id: 'embedded', label: 'Embedded in Grid' },
              { id: 'floating', label: 'Floating Overlay' }
            ]}
            onChange={this.handleChange}
          />

          {displayMode === 'floating' && (
            <>
              <Input
                inline={false}
                label={'Floating Position'}
                type={'select'}
                name={'floatingPosition'}
                value={floatingPosition}
                choices={[
                  { id: 'center', label: 'Center' },
                  { id: 'top-left', label: 'Top Left' },
                  { id: 'top-right', label: 'Top Right' },
                  { id: 'bottom-left', label: 'Bottom Left' },
                  { id: 'bottom-right', label: 'Bottom Right' }
                ]}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Floating Size'}
                type={'select'}
                name={'floatingSize'}
                value={floatingSize}
                choices={[
                  { id: 'small', label: 'Small (300x533)' },
                  { id: 'medium', label: 'Medium (400x711)' },
                  { id: 'large', label: 'Large (500x889)' }
                ]}
                onChange={this.handleChange}
              />
            </>
          )}

          <Input
            inline={false}
            label={'Aspect Ratio'}
            type={'select'}
            name={'aspectRatio'}
            value={aspectRatio}
            choices={[
              { id: '9:16', label: '9:16 (Vertical - Shorts)' },
              { id: '16:9', label: '16:9 (Horizontal)' },
              { id: '1:1', label: '1:1 (Square)' },
              { id: '4:3', label: '4:3 (Classic)' }
            ]}
            onChange={this.handleChange}
          />

          {/* Timing Settings */}
          <h4>Timing Settings</h4>
          <Input
            inline={false}
            label={'Start Time (seconds)'}
            type={'number'}
            name={'startTime'}
            value={startTime}
            min={0}
            onChange={this.handleChange}
          />
          <Input
            inline={false}
            label={'End Time (seconds, 0 = full video)'}
            type={'number'}
            name={'endTime'}
            value={endTime}
            min={0}
            onChange={this.handleChange}
          />

          {/* Repetition Settings */}
          <h4>Repetition Settings</h4>
          <Switch
            label={'Enable Repetition'}
            name={'enableRepetition'}
            value={enableRepetition}
            onChange={this.handleBooleanChange}
          />

          {enableRepetition && (
            <>
              <Input
                inline={false}
                label={'Repetition Interval'}
                type={'number'}
                name={'repetitionInterval'}
                value={repetitionInterval}
                min={1}
                onChange={this.handleChange}
              />
              <Input
                inline={false}
                label={'Repetition Unit'}
                type={'select'}
                name={'repetitionUnit'}
                value={repetitionUnit}
                choices={[
                  { id: 'seconds', label: 'Seconds' },
                  { id: 'minutes', label: 'Minutes' },
                  { id: 'hours', label: 'Hours' }
                ]}
                onChange={this.handleChange}
              />
            </>
          )}

          {/* Animation Settings */}
          <h4>Animation Settings</h4>
          <Switch
            label={'Fade Transition'}
            name={'fadeTransition'}
            value={fadeTransition}
            onChange={this.handleBooleanChange}
          />
          <Input
            inline={false}
            label={'Animation Type'}
            type={'select'}
            name={'animationType'}
            value={animationType}
            choices={[
              { id: 'fade', label: 'Fade In' },
              { id: 'slide', label: 'Slide In' },
              { id: 'zoom', label: 'Zoom In' },
              { id: 'none', label: 'No Animation' }
            ]}
            onChange={this.handleChange}
          />
          <Input
            inline={false}
            label={'Animation Duration (ms)'}
            type={'number'}
            name={'animationDuration'}
            value={animationDuration}
            min={0}
            max={5000}
            onChange={this.handleChange}
          />
          <Input
            inline={false}
            label={'Animation Delay (ms)'}
            type={'number'}
            name={'animationDelay'}
            value={animationDelay}
            min={0}
            max={5000}
            onChange={this.handleChange}
          />

          {/* Styling Settings */}
          <h4>Styling Settings</h4>
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
            inline={false}
            label={'Border Width (px)'}
            type={'number'}
            name={'borderWidth'}
            value={borderWidth}
            min={0}
            max={20}
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
          <Input
            inline={false}
            label={'Shadow Style'}
            type={'select'}
            name={'shadowStyle'}
            value={shadowStyle}
            choices={[
              { id: 'none', label: 'No Shadow' },
              { id: 'subtle', label: 'Subtle' },
              { id: 'medium', label: 'Medium' },
              { id: 'strong', label: 'Strong' }
            ]}
            onChange={this.handleChange}
          />

          {/* Audio Settings */}
          <h4>Audio Settings</h4>
          <Switch
            label={'Show Volume Control'}
            name={'showVolume'}
            value={showVolume}
            onChange={this.handleBooleanChange}
          />
          {showVolume && (
            <Input
              inline={false}
              label={'Volume (%)'}
              type={'range'}
              name={'volume'}
              value={volume}
              min={0}
              max={100}
              onChange={this.handleChange}
            />
          )}
        </Form>

        {/* Preview Section */}
        {showPreview && (
          <div className='preview-container'>
            <h4>Preview</h4>
            <div className='preview-content'>
              <div className='preview-placeholder'>
                <div className='preview-icon'>📺</div>
                <p>YouTube Shorts Widget</p>
                <p className='preview-details'>
                  {displayMode === 'floating' ? `Floating (${floatingPosition})` : 'Embedded'} • 
                  {aspectRatio} • 
                  {autoPlay ? 'Auto Play' : 'Manual Play'} • 
                  {loop ? 'Loop' : 'No Loop'}
                </p>
                {videoIds.length > 0 && (
                  <p className='preview-videos'>{videoIds.length} video(s) configured</p>
                )}
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .container {
            padding: 20px;
            max-width: 600px;
          }
          h3 {
            color: #333;
            margin-bottom: 20px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
          }
          h4 {
            color: #555;
            margin: 20px 0 15px 0;
            font-size: 16px;
            font-weight: 600;
          }
          .preview-container {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #dee2e6;
          }
          .preview-content {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 200px;
          }
          .preview-placeholder {
            text-align: center;
            color: #666;
          }
          .preview-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .preview-details {
            font-size: 12px;
            color: #888;
            margin: 5px 0;
          }
          .preview-videos {
            font-size: 12px;
            color: #007bff;
            font-weight: 500;
          }
          .playlist-manager {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #dee2e6;
          }
          .playlist-manager h5 {
            color: #495057;
            margin: 15px 0 10px 0;
            font-size: 14px;
            font-weight: 600;
          }
          .playlist-list {
            max-height: 300px;
            overflow-y: auto;
            margin-bottom: 20px;
          }
          .playlist-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin: 5px 0;
            background: white;
            border-radius: 4px;
            border: 1px solid #e9ecef;
          }
          .playlist-info {
            flex: 1;
          }
          .playlist-info strong {
            color: #212529;
            display: block;
            margin-bottom: 2px;
          }
          .playlist-info span {
            color: #6c757d;
            font-size: 12px;
          }
          .playlist-info p {
            color: #6c757d;
            font-size: 12px;
            margin: 5px 0 0 0;
          }
          .playlist-actions {
            display: flex;
            gap: 5px;
          }
          .playlist-actions button {
            padding: 5px 10px;
            font-size: 12px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          .playlist-actions button:first-child {
            background: #28a745;
            color: white;
          }
          .playlist-actions button:last-child {
            background: #dc3545;
            color: white;
          }
        `}</style>
      </div>
    )
  }
}

export default YoutubeShortsOptions
