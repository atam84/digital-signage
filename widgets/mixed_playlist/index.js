import BaseWidget from '../base_widget'
import MixedPlaylistContent from './src/MixedPlaylistContent'
import MixedPlaylistOptions from './src/MixedPlaylistOptions'

export default class MixedPlaylist extends BaseWidget {
  constructor() {
    super({
      name: 'Mixed Playlist',
      version: '0.1',
      icon: 'playlist',
      defaultData: {
        // Playlist configuration
        playlistId: '', // ID of the mixed playlist to display
        playlistName: '', // Name for display purposes
        playlistDescription: '', // Description for display
        
        // Content settings
        autoPlay: true,
        loop: true,
        shuffle: false,
        transitionDuration: 1000, // milliseconds
        transitionType: 'fade', // 'fade', 'slide', 'zoom', 'none'
        displayDuration: 10000, // milliseconds per item
        
        // Display configuration
        displayMode: 'embedded', // 'embedded' or 'floating'
        floatingPosition: 'center',
        floatingSize: 'large',
        layout: 'fullscreen', // 'fullscreen', 'grid', 'carousel'
        
        // Content filtering
        showPlatform: true, // Show platform indicator
        showTitle: true, // Show content title
        showDescription: false, // Show content description
        showDuration: true, // Show content duration
        showThumbnail: true, // Show content thumbnail
        showProgress: true, // Show playback progress
        showControls: true, // Show playback controls
        
        // Platform-specific settings
        platformSettings: {
          youtube: {
            autoplay: true,
            controls: false,
            mute: true,
            loop: false
          },
          youtube_shorts: {
            autoplay: true,
            controls: false,
            mute: true,
            loop: true
          },
          tiktok: {
            autoplay: true,
            controls: false,
            mute: true,
            loop: true
          },
          instagram: {
            autoplay: true,
            controls: false,
            mute: true,
            loop: true
          },
          facebook: {
            autoplay: true,
            controls: false,
            mute: true,
            loop: false
          },
          reddit: {
            autoplay: true,
            controls: false,
            mute: true,
            loop: false
          },
          x_twitter: {
            autoplay: true,
            controls: false,
            mute: true,
            loop: false
          }
        },
        
        // Styling
        backgroundColor: '#000000',
        textColor: '#ffffff',
        accentColor: '#007bff',
        borderColor: '#cccccc',
        borderWidth: 2,
        borderRadius: 8,
        shadowStyle: 'subtle',
        
        // Layout settings
        gridColumns: 2, // For grid layout
        gridGap: 10, // Gap between grid items
        carouselItems: 3, // Number of items visible in carousel
        carouselAutoplay: true,
        carouselInterval: 5000,
        
        // Animation and transitions
        enableRepetition: false,
        repetitionInterval: 30,
        repetitionUnit: 'minutes',
        fadeTransition: true,
        animationType: 'fade',
        animationDuration: 1000,
        animationDelay: 0,
        
        // Content moderation
        filterProfanity: false,
        filterSpam: true,
        showSensitiveContent: false,
        blockWords: [],
        allowedLanguages: ['en'],
        
        // Auto-refresh
        autoRefresh: false,
        refreshInterval: 300, // seconds
        
        // Error handling
        showErrors: true,
        errorRetryCount: 3,
        errorRetryDelay: 5000, // milliseconds
        
        // Statistics
        trackPlays: true,
        trackViews: true,
        showStats: false,
        
        // Accessibility
        showSubtitles: false,
        showCaptions: false,
        highContrast: false,
        largeText: false
      }
    })
  }

  get Widget() {
    return MixedPlaylistContent
  }

  get Options() {
    return MixedPlaylistOptions
  }
}
