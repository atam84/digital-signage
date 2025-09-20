/**
 * @fileoverview Slide component that given a slide type and its data renders it
 * along with its title and description.
 */

import GenericSlide from './Generic'
import getVideoId from 'get-video-id'
import VideoContainer from '../../../components/VideoContainer'

class YoutubeSlide extends GenericSlide {
  constructor(props) {
    super(props)
    this.youtube = null
  }

  handleYoutubeLoaded = () => {
    this.state.loading.resolve
      ? this.state.loading.resolve()
      : this.setState({ loading: { promise: Promise.resolve() } })
  }

  onYoutubeReady = event => {
    // access to player in all event handlers via event.target
    this.youtube = event.target
    this.handleYoutubeLoaded()
  }

  /**
   * Renders the inner content of the slide (ex. the photo, youtube iframe, etc)
   * @param {string} data The slide's data (usually a URL or object ID)
   * @returns {Component}
   */
  renderSlideContent(data) {
    const { id, service } = getVideoId(data)
    /* eslint-disable-next-line no-console */
    if (!id || service !== 'youtube') console.error('Failed to parse Youtube URL')
    return (
      <div className={'youtube-container'}>
        <VideoContainer
          src={`https://www.youtube.com/embed/${id}`}
          platform="youtube"
          autoplay={false}
          muted={true}
          loop={false}
          className="youtube-slide-container"
        />
        <style jsx>
          {`
            .youtube-container {
              width: 100%;
              height: 100%;
              min-height: 100%;
            }
            .youtube-slide-container {
              width: 100%;
              height: 100%;
              min-height: 100%;
            }
          `}
        </style>
      </div>
    )
  }

  /**
   * Stops the slide's content from playing when the slide is out of focus
   */
  stop = () => {
    if (this.youtube) this.youtube.pauseVideo() && this.youtube.seekTo(0)
  }

  /**
   * Starts or resumes the slide's content when the slide is in focus
   */
  play = () => {
    if (this.youtube) this.youtube.playVideo()
  }
}

export default YoutubeSlide
