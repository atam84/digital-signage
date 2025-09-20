const express = require('express')
const router = express.Router()
const MixedPlaylist = require('../models/MixedPlaylist')

// GET /api/v1/mixed-playlists - Get all mixed playlists
router.get('/', async (req, res) => {
  try {
    const { platform, tag, public: isPublic } = req.query
    let query = { isDeleted: false }

    if (platform) {
      query['items.platform'] = platform
    }

    if (tag) {
      query.tags = tag
    }

    if (isPublic === 'true') {
      query.isPublic = true
    }

    const playlists = await MixedPlaylist.find(query)
      .sort({ 'stats.updatedAt': -1 })
      .limit(100)

    res.json({
      success: true,
      data: playlists,
      count: playlists.length
    })
  } catch (error) {
    console.error('Error fetching mixed playlists:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mixed playlists',
      details: error.message
    })
  }
})

// GET /api/v1/mixed-playlists/:id - Get specific mixed playlist
router.get('/:id', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    res.json({
      success: true,
      data: playlist
    })
  } catch (error) {
    console.error('Error fetching mixed playlist:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mixed playlist',
      details: error.message
    })
  }
})

// POST /api/v1/mixed-playlists - Create new mixed playlist
router.post('/', async (req, res) => {
  try {
    const playlistData = req.body

    // Validate required fields
    if (!playlistData.name) {
      return res.status(400).json({
        success: false,
        error: 'Playlist name is required'
      })
    }

    // Validate items if provided
    if (playlistData.items && Array.isArray(playlistData.items)) {
      for (const item of playlistData.items) {
        if (!item.platform || !item.contentId) {
          return res.status(400).json({
            success: false,
            error: 'Each item must have platform and contentId'
          })
        }
      }
    }

    const playlist = new MixedPlaylist(playlistData)
    await playlist.save()

    res.status(201).json({
      success: true,
      data: playlist
    })
  } catch (error) {
    console.error('Error creating mixed playlist:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create mixed playlist',
      details: error.message
    })
  }
})

// PUT /api/v1/mixed-playlists/:id - Update mixed playlist
router.put('/:id', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    // Update playlist data
    Object.assign(playlist, req.body)
    await playlist.save()

    res.json({
      success: true,
      data: playlist
    })
  } catch (error) {
    console.error('Error updating mixed playlist:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update mixed playlist',
      details: error.message
    })
  }
})

// DELETE /api/v1/mixed-playlists/:id - Soft delete mixed playlist
router.delete('/:id', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    // Soft delete
    playlist.isDeleted = true
    playlist.deletedAt = new Date()
    await playlist.save()

    res.json({
      success: true,
      message: 'Mixed playlist deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting mixed playlist:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete mixed playlist',
      details: error.message
    })
  }
})

// POST /api/v1/mixed-playlists/:id/items - Add item to mixed playlist
router.post('/:id/items', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    const itemData = req.body

    // Validate item data
    if (!itemData.platform || !itemData.contentId) {
      return res.status(400).json({
        success: false,
        error: 'Platform and contentId are required'
      })
    }

    await playlist.addItem(itemData)

    res.json({
      success: true,
      data: playlist
    })
  } catch (error) {
    console.error('Error adding item to mixed playlist:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to add item to mixed playlist',
      details: error.message
    })
  }
})

// DELETE /api/v1/mixed-playlists/:id/items/:itemId - Remove item from mixed playlist
router.delete('/:id/items/:itemId', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    await playlist.removeItem(req.params.itemId)

    res.json({
      success: true,
      data: playlist
    })
  } catch (error) {
    console.error('Error removing item from mixed playlist:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to remove item from mixed playlist',
      details: error.message
    })
  }
})

// PUT /api/v1/mixed-playlists/:id/reorder - Reorder items in mixed playlist
router.put('/:id/reorder', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    const { itemIds } = req.body

    if (!Array.isArray(itemIds)) {
      return res.status(400).json({
        success: false,
        error: 'itemIds must be an array'
      })
    }

    await playlist.reorderItems(itemIds)

    res.json({
      success: true,
      data: playlist
    })
  } catch (error) {
    console.error('Error reordering mixed playlist items:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to reorder mixed playlist items',
      details: error.message
    })
  }
})

// GET /api/v1/mixed-playlists/:id/items - Get items from mixed playlist
router.get('/:id/items', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    const { platform, enabled } = req.query
    let items = playlist.getEnabledItems()

    if (platform) {
      items = items.filter(item => item.platform === platform)
    }

    if (enabled !== undefined) {
      const isEnabled = enabled === 'true'
      items = items.filter(item => item.enabled === isEnabled)
    }

    res.json({
      success: true,
      data: items,
      count: items.length
    })
  } catch (error) {
    console.error('Error fetching mixed playlist items:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mixed playlist items',
      details: error.message
    })
  }
})

// POST /api/v1/mixed-playlists/:id/play - Record playlist play
router.post('/:id/play', async (req, res) => {
  try {
    const playlist = await MixedPlaylist.findById(req.params.id)

    if (!playlist || playlist.isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Mixed playlist not found'
      })
    }

    // Update play statistics
    playlist.stats.totalPlays += 1
    playlist.stats.lastPlayed = new Date()
    await playlist.save()

    res.json({
      success: true,
      data: playlist
    })
  } catch (error) {
    console.error('Error recording playlist play:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to record playlist play',
      details: error.message
    })
  }
})

module.exports = router
