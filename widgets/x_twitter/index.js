import BaseWidget from '../base_widget'
import XTwitterContent from './src/XTwitterContent'
import XTwitterOptions from './src/XTwitterOptions'

export default class XTwitter extends BaseWidget {
  constructor() {
    super({
      name: 'X (Twitter)',
      version: '0.1',
      icon: 'twitter',
      defaultData: {
        // X/Twitter-specific configuration
        username: '', // Twitter username (without @)
        hashtag: '', // Hashtag to follow (without #)
        searchQuery: '', // Custom search query
        tweetType: 'timeline', // 'timeline', 'hashtag', 'search', 'trending'
        
        // Content filtering
        tweetLimit: 20, // Number of tweets to display
        showImages: true,
        showVideos: true,
        showRetweets: true,
        showReplies: true,
        showQuotes: true,
        minLikes: 0,
        minRetweets: 0,
        minReplies: 0,
        language: 'en', // Tweet language filter
        excludeRetweets: false,
        excludeReplies: false,
        
        // Display configuration
        displayMode: 'embedded', // 'embedded' or 'floating'
        floatingPosition: 'center',
        floatingSize: 'large',
        layout: 'timeline', // 'timeline', 'grid', 'card', 'compact'
        
        // Auto-refresh
        autoRefresh: true,
        refreshInterval: 300, // 5 minutes (Twitter rate limits)
        
        // Styling
        backgroundColor: '#000000', // X dark theme
        textColor: '#ffffff',
        linkColor: '#1d9bf0', // X blue
        accentColor: '#1d9bf0',
        borderColor: '#2f3336',
        borderWidth: 1,
        borderRadius: 8,
        shadowStyle: 'subtle',
        
        // Animation and transitions
        enableRepetition: false,
        repetitionInterval: 30,
        repetitionUnit: 'minutes',
        fadeTransition: true,
        animationType: 'slide',
        animationDuration: 1000,
        animationDelay: 0,
        
        // Content features
        showAuthor: true,
        showUsername: true,
        showTimestamp: true,
        showEngagement: true,
        showVerified: true,
        truncateText: true,
        maxTextLength: 280,
        showMedia: true,
        showThreads: true,
        
        // Embed settings
        embedMode: 'auto', // 'auto', 'tweet', 'timeline', 'follow'
        showEmbedPreview: true,
        embedHeight: 400,
        showTweetActions: false, // Like, retweet, reply buttons
        
        // X/Twitter-specific features
        showTrending: false,
        trendingLocation: 'worldwide', // 'worldwide' or specific location
        showMentions: true,
        showHashtags: true,
        showLinks: true,
        showPolls: true,
        showSpaces: false,
        
        // API configuration
        useTwitterAPI: true, // Use Twitter API v2 or embed fallback
        apiVersion: 'v2', // 'v1.1' or 'v2'
        bearerToken: '', // Twitter Bearer Token (optional)
        includeMetrics: true, // Include engagement metrics
        includeMedia: true, // Include media attachments
        
        // Real-time features
        enableStreaming: false, // Real-time tweet streaming (requires WebSocket)
        streamFilters: [], // Additional stream filters
        showLiveIndicator: false,
        
        // Content moderation
        filterProfanity: false,
        filterSpam: true,
        showSensitiveContent: false,
        blockWords: [], // Words to filter out
        allowedLanguages: ['en'], // Allowed tweet languages
      }
    })
  }

  get Widget() {
    return XTwitterContent
  }

  get Options() {
    return XTwitterOptions
  }
}
