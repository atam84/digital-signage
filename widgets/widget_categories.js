/**
 * Widget Categories Configuration
 * Organizes widgets by type for better user experience in the Add Widget menu
 */

const widgetCategories = {
  'Media & Content': {
    icon: 'play',
    description: 'Video, image, and multimedia content widgets',
    widgets: ['slideshow', 'youtube', 'youtube_shorts', 'image', 'web']
  },
  'Social Media': {
    icon: 'share-alt',
    description: 'Social media feeds and content widgets',
    widgets: ['tiktok', 'instagram', 'facebook', 'reddit', 'x_twitter', 'mixed_playlist']
  },
  'Information & Data': {
    icon: 'info-circle',
    description: 'Weather, announcements, and informational widgets',
    widgets: ['weather', 'announcement', 'list']
  },
  'Time & Display': {
    icon: 'clock',
    description: 'Time, clocks, and display widgets',
    widgets: ['clock', 'analogue_clock']
  },
  'Interactive & Business': {
    icon: 'chart-bar',
    description: 'Interactive maps, counters, and business widgets',
    widgets: ['interactive_map', 'business_presentation', 'simple_counter']
  },
  'Special Effects': {
    icon: 'magic',
    description: 'Congratulations and special effects widgets',
    widgets: ['congrats']
  }
}

/**
 * Get widget category by widget type
 * @param {string} widgetType - The widget type to find category for
 * @returns {string} - The category name
 */
export const getWidgetCategory = (widgetType) => {
  for (const [categoryName, categoryData] of Object.entries(widgetCategories)) {
    if (categoryData.widgets.includes(widgetType)) {
      return categoryName
    }
  }
  return 'Other' // Fallback for uncategorized widgets
}

/**
 * Get all widget categories with their widgets
 * @returns {Object} - Widget categories object
 */
export const getWidgetCategories = () => {
  return widgetCategories
}

/**
 * Get widgets organized by category
 * @returns {Array} - Array of category objects with widgets
 */
export const getWidgetsByCategory = () => {
  return Object.entries(widgetCategories).map(([categoryName, categoryData]) => ({
    name: categoryName,
    icon: categoryData.icon,
    description: categoryData.description,
    widgets: categoryData.widgets
  }))
}

export default widgetCategories
