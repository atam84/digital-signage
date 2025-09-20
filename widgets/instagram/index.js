import BaseWidget from '../base_widget'
import InstagramContent from './src/InstagramContent'
import InstagramOptions from './src/InstagramOptions'

export default class Instagram extends BaseWidget {
  constructor() {
    super({
      name: 'Instagram',
      version: '0.1',
      icon: 'instagram',
      defaultData: {
        // Instagram-specific configuration
        username: '', // Instagram username (without @)
        hashtag: '', // Hashtag to follow (without #)
        postType: 'mixed', // 'mixed', 'photos', 'videos', 'carousel', 'igtv', 'reels'
        postLimit: 12, // Number of posts to display (Instagram grid style)
        
        // Content filtering
        showImages: true,
        showVideos: true,
        showCarousel: true,
        showIGTV: false,
        showReels: true,
        showStories: false,
        minLikes: 0,
        minComments: 0,
        dateRange: 30, // Days to look back (1-365)
        
        // Display configuration
        displayMode: 'embedded', // 'embedded' or 'floating'
        floatingPosition: 'center',
        floatingSize: 'large',
        layout: 'grid', // 'grid', 'feed', 'carousel', 'story'
        gridColumns: 3, // For grid layout
        gridGap: 10, // Gap between grid items
        
        // Auto-refresh
        autoRefresh: true,
        refreshInterval: 900, // 15 minutes (Instagram rate limits)
        
        // Styling
        backgroundColor: '#000000', // Instagram dark theme
        textColor: '#ffffff',
        linkColor: '#c13584', // Instagram brand color
        accentColor: '#c13584',
        borderColor: '#262626',
        borderWidth: 1,
        borderRadius: 8,
        shadowStyle: 'subtle',
        
        // Animation and transitions
        enableRepetition: false,
        repetitionInterval: 30,
        repetitionUnit: 'minutes',
        fadeTransition: true,
        animationType: 'fade',
        animationDuration: 1000,
        animationDelay: 0,
        
        // Content features
        showAuthor: true,
        showUsername: true,
        showTimestamp: true,
        showEngagement: true,
        showVerified: true,
        showCaption: true,
        truncateCaption: true,
        maxCaptionLength: 150,
        showHashtags: true,
        showMentions: true,
        showLocation: true,
        
        // Embed settings
        embedMode: 'auto', // 'auto', 'post', 'story', 'igtv', 'reel'
        showEmbedPreview: true,
        embedHeight: 400,
        showPostActions: false, // Like, comment, share buttons
        
        // Instagram-specific features
        showProfilePicture: true,
        showBio: false,
        showFollowers: false,
        showFollowing: false,
        showPostCount: false,
        showStoryHighlights: false,
        showStoryRing: true,
        showCarouselIndicators: true,
        showVideoControls: true,
        showReelControls: true,
        
        // API configuration
        useInstagramAPI: false, // Instagram Basic Display API (requires app approval)
        accessToken: '', // Instagram access token (optional)
        apiVersion: 'v18.0', // Instagram API version
        includeMetrics: true, // Include engagement metrics
        includeMedia: true, // Include media attachments
        
        // Manual configuration (fallback)
        manualPosts: [], // Array of manually configured posts
        manualStories: [], // Array of manually configured stories
        useManualMode: true, // Use manual configuration instead of API
        
        // Content moderation
        filterProfanity: false,
        filterSpam: true,
        showSensitiveContent: false,
        blockWords: [], // Words to filter out
        allowedLanguages: ['en'], // Allowed post languages
        
        // Story features
        storyDuration: 5000, // Story display duration in ms
        storyTransition: 'slide', // 'slide', 'fade', 'zoom'
        showStoryProgress: true,
        storyAutoAdvance: true,
        storyLoop: true,
        
        // IGTV and Reels
        showIGTVPreview: true,
        showReelsPreview: true,
        igtvAutoplay: false,
        reelsAutoplay: true,
        
        // Carousel features
        carouselAutoplay: true,
        carouselInterval: 3000, // Carousel slide interval
        carouselIndicators: true,
        carouselControls: true,
        
        // Grid layout
        gridResponsive: true, // Responsive grid layout
        gridAspectRatio: 'square', // 'square', 'portrait', 'landscape'
        gridHoverEffect: true, // Hover effects on grid items
        gridLazyLoad: true, // Lazy loading for grid items
      }
    })
  }

  get Widget() {
    return InstagramContent
  }

  get Options() {
    return InstagramOptions
  }
}
