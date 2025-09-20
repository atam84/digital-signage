import BaseWidget from '../base_widget'
import FacebookContent from './src/FacebookContent'
import FacebookOptions from './src/FacebookOptions'

export default class Facebook extends BaseWidget {
  constructor() {
    super({
      name: 'Facebook',
      version: '0.1',
      icon: 'facebook',
      defaultData: {
        // Facebook-specific configuration
        pageId: '', // Facebook page ID or username
        accessToken: '', // Facebook access token (optional)
        postLimit: 10, // Number of posts to fetch
        showImages: true,
        showVideos: true,
        showTextPosts: true,
        showLinks: true,
        showEvents: false,
        
        // Content filtering
        minLikes: 0,
        minComments: 0,
        minShares: 0,
        keywords: [], // Keywords to filter by
        excludeKeywords: [], // Keywords to exclude
        dateRange: 30, // Days to look back (1-365)
        
        // Display configuration
        displayMode: 'embedded', // 'embedded' or 'floating'
        floatingPosition: 'center',
        floatingSize: 'large',
        layout: 'feed', // 'feed', 'grid', 'card'
        
        // Auto-refresh
        autoRefresh: true,
        refreshInterval: 600, // 10 minutes
        
        // Styling
        backgroundColor: '#ffffff',
        textColor: '#1c1e21',
        linkColor: '#1877f2',
        accentColor: '#42b883',
        borderColor: '#dadde1',
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
        showLikes: true,
        showComments: true,
        showShares: true,
        showTime: true,
        showPageName: true,
        truncateText: true,
        maxTextLength: 200,
        
        // Embed settings
        embedMode: 'auto', // 'auto', 'image', 'text', 'mixed'
        showEmbedPreview: true,
        embedHeight: 400,
        
        // Facebook-specific features
        showPageCover: false,
        showPageInfo: true,
        showCallToAction: false,
        showReactions: true,
        showStory: false,
        
        // API configuration
        useGraphAPI: true, // Use Facebook Graph API or embed fallback
        apiVersion: 'v18.0', // Facebook API version
        fields: 'id,message,created_time,full_picture,link,story,type,likes,comments,shares'
      }
    })
  }

  get Widget() {
    return FacebookContent
  }

  get Options() {
    return FacebookOptions
  }
}
