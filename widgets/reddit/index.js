import BaseWidget from '../base_widget'
import RedditContent from './src/RedditContent'
import RedditOptions from './src/RedditOptions'

export default class Reddit extends BaseWidget {
  constructor() {
    super({
      name: 'Reddit',
      version: '0.1',
      icon: 'reddit',
      defaultData: {
        // Reddit-specific configuration
        subreddit: 'popular', // Default subreddit
        sortBy: 'hot', // 'hot', 'new', 'top', 'rising'
        timeFilter: 'day', // 'hour', 'day', 'week', 'month', 'year', 'all'
        postLimit: 10, // Number of posts to fetch
        showImages: true,
        showVideos: true,
        showTextPosts: true,
        showNSFW: false,
        
        // Display configuration
        displayMode: 'embedded', // 'embedded' or 'floating'
        floatingPosition: 'center',
        floatingSize: 'large',
        layout: 'list', // 'list', 'grid', 'card'
        
        // Content filtering
        minScore: 0,
        minComments: 0,
        keywords: [], // Keywords to filter by
        excludeKeywords: [], // Keywords to exclude
        
        // Auto-refresh
        autoRefresh: true,
        refreshInterval: 300, // 5 minutes
        
        // Styling
        backgroundColor: '#1a1a1b',
        textColor: '#d7dadc',
        linkColor: '#0079d3',
        accentColor: '#ff4500',
        borderColor: '#343536',
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
        showScore: true,
        showComments: true,
        showTime: true,
        showSubreddit: true,
        showFlair: true,
        truncateText: true,
        maxTextLength: 200,
        
        // Embed settings
        embedMode: 'auto', // 'auto', 'image', 'text', 'mixed'
        showEmbedPreview: true,
        embedHeight: 400,
        
        // Moderation
        contentModeration: false,
        hideDeleted: true,
        hideRemoved: true,
        showStickied: true
      }
    })
  }

  get Widget() {
    return RedditContent
  }

  get Options() {
    return RedditOptions
  }
}
