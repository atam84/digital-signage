const mongoose = require('mongoose')

const MixedPlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  // Mixed content items from different platforms
  items: [{
    platform: {
      type: String,
      required: true,
      enum: ['youtube', 'youtube_shorts', 'tiktok', 'instagram', 'facebook', 'reddit', 'x_twitter', 'image', 'web', 'video']
    },
    contentId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    thumbnail: {
      type: String
    },
    duration: {
      type: Number // in seconds
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed // Platform-specific metadata
    },
    order: {
      type: Number,
      default: 0
    },
    enabled: {
      type: Boolean,
      default: true
    }
  }],
  // Playlist settings
  settings: {
    autoPlay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    shuffle: {
      type: Boolean,
      default: false
    },
    transitionDuration: {
      type: Number,
      default: 1000 // milliseconds
    },
    transitionType: {
      type: String,
      enum: ['fade', 'slide', 'zoom', 'none'],
      default: 'fade'
    },
    displayDuration: {
      type: Number,
      default: 10000 // milliseconds per item
    }
  },
  // Widget configuration
  widgetConfig: {
    displayMode: {
      type: String,
      enum: ['embedded', 'floating'],
      default: 'embedded'
    },
    floatingPosition: {
      type: String,
      enum: ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      default: 'center'
    },
    floatingSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    },
    backgroundColor: {
      type: String,
      default: '#000000'
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    borderColor: {
      type: String,
      default: '#cccccc'
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    borderRadius: {
      type: Number,
      default: 8
    },
    shadowStyle: {
      type: String,
      enum: ['none', 'subtle', 'medium', 'strong'],
      default: 'subtle'
    }
  },
  // Statistics
  stats: {
    totalViews: {
      type: Number,
      default: 0
    },
    totalPlays: {
      type: Number,
      default: 0
    },
    lastPlayed: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  // Access control
  isPublic: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  // Soft delete
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Indexes for better performance
MixedPlaylistSchema.index({ name: 1 })
MixedPlaylistSchema.index({ 'items.platform': 1 })
MixedPlaylistSchema.index({ isPublic: 1, isDeleted: 1 })
MixedPlaylistSchema.index({ tags: 1 })

// Pre-save middleware
MixedPlaylistSchema.pre('save', function(next) {
  this.stats.updatedAt = new Date()
  next()
})

// Instance methods
MixedPlaylistSchema.methods.addItem = function(item) {
  const maxOrder = Math.max(...this.items.map(i => i.order), -1)
  item.order = maxOrder + 1
  this.items.push(item)
  return this.save()
}

MixedPlaylistSchema.methods.removeItem = function(itemId) {
  this.items = this.items.filter(item => item._id.toString() !== itemId)
  return this.save()
}

MixedPlaylistSchema.methods.reorderItems = function(itemIds) {
  itemIds.forEach((itemId, index) => {
    const item = this.items.id(itemId)
    if (item) {
      item.order = index
    }
  })
  return this.save()
}

MixedPlaylistSchema.methods.getEnabledItems = function() {
  return this.items.filter(item => item.enabled).sort((a, b) => a.order - b.order)
}

MixedPlaylistSchema.methods.getItemsByPlatform = function(platform) {
  return this.items.filter(item => item.platform === platform && item.enabled)
}

// Static methods
MixedPlaylistSchema.statics.findByPlatform = function(platform) {
  return this.find({ 
    'items.platform': platform, 
    isDeleted: false 
  })
}

MixedPlaylistSchema.statics.findByTag = function(tag) {
  return this.find({ 
    tags: tag, 
    isDeleted: false 
  })
}

MixedPlaylistSchema.statics.findPublic = function() {
  return this.find({ 
    isPublic: true, 
    isDeleted: false 
  })
}

module.exports = mongoose.model('MixedPlaylist', MixedPlaylistSchema)
