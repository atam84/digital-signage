import BaseWidget from '../base_widget'
import YoutubeShortsContent from './src/YoutubeShortsContent'
import YoutubeShortsOptions from './src/YoutubeShortsOptions'

export default class YoutubeShorts extends BaseWidget {
  constructor() {
    super({
      name: 'YouTube Shorts',
      version: '0.1',
      icon: 'play',
      defaultData: {
        playlistId: '',
        videoIds: [], // Array of individual video IDs for custom playlists
        autoPlay: true,
        loop: true,
        showControls: false,
        mute: true,
        displayMode: 'embedded', // 'embedded' or 'floating'
        floatingPosition: 'center',
        floatingSize: 'medium',
        aspectRatio: '9:16', // For YouTube Shorts vertical format
        backgroundColor: '#000000',
        borderColor: '#cccccc',
        borderWidth: 2,
        borderRadius: 8,
        shadowStyle: 'subtle',
        enableRepetition: false,
        repetitionInterval: 30,
        repetitionUnit: 'minutes',
        fadeTransition: true,
        animationType: 'fade',
        animationDuration: 1000,
        animationDelay: 0,
        showProgress: false,
        showVolume: false,
        volume: 50,
        startTime: 0,
        endTime: 0
      }
    })
  }

  get Widget() {
    return YoutubeShortsContent
  }

  get Options() {
    return YoutubeShortsOptions
  }
}
