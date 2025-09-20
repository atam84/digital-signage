import BaseWidget from '../base_widget'
import TikTokContent from './src/TikTokContent'
import TikTokOptions from './src/TikTokOptions'

export default class TikTok extends BaseWidget {
  constructor() {
    super({
      name: 'TikTok',
      version: '0.1',
      icon: 'play',
      defaultData: {
        // TikTok-specific configuration
        videoUrls: [], // Array of TikTok video URLs or IDs
        videoIds: [], // Array of TikTok video IDs for playlist
        autoPlay: true,
        autoSwipe: true,
        swipeInterval: 5000, // 5 seconds between videos
        loop: true,
        showControls: false,
        mute: true,
        
        // Display configuration
        displayMode: 'embedded', // 'embedded' or 'floating'
        floatingPosition: 'center',
        floatingSize: 'medium',
        aspectRatio: '9:16', // TikTok's vertical format
        
        // Styling
        backgroundColor: '#000000',
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 8,
        shadowStyle: 'subtle',
        
        // Animation and transitions
        enableRepetition: false,
        repetitionInterval: 30,
        repetitionUnit: 'minutes',
        fadeTransition: true,
        animationType: 'slide', // 'slide', 'fade', 'zoom'
        animationDuration: 1000,
        animationDelay: 0,
        
        // Content features
        showProgress: false,
        showVolume: false,
        volume: 50,
        showCreator: false,
        showLikes: false,
        showComments: false,
        showShares: false,
        
        // Playlist management
        playlistName: '',
        playlistDescription: '',
        hashtagFilter: '',
        creatorFilter: '',
        
        // Auto-refresh
        autoRefresh: false,
        refreshInterval: 300, // 5 minutes
        maxVideos: 20
      }
    })
  }

  get Widget() {
    return TikTokContent
  }

  get Options() {
    return TikTokOptions
  }
}
