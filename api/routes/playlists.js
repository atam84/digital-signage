const express = require('express')
const router = express.Router()
const Playlist = require('../models/Playlist')

// List all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(playlists)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get a specific playlist by ID
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' })
    }
    res.json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a new playlist
router.post('/', async (req, res) => {
  try {
    const playlistData = {
      ...req.body,
      videoIds: Array.isArray(req.body.videoIds) ? req.body.videoIds : []
    }
    
    const playlist = new Playlist(playlistData)
    await playlist.save()
    res.status(201).json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update a playlist
router.put('/:id', async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      videoIds: Array.isArray(req.body.videoIds) ? req.body.videoIds : [],
      updatedAt: new Date()
    }
    
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' })
    }
    
    res.json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete a playlist (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    )
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' })
    }
    
    res.json({ message: 'Playlist deleted successfully', playlist })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add video to playlist
router.post('/:id/videos', async (req, res) => {
  try {
    const { videoId } = req.body
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' })
    }
    
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { videoIds: videoId }, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' })
    }
    
    res.json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Remove video from playlist
router.delete('/:id/videos/:videoId', async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $pull: { videoIds: req.params.videoId }, updatedAt: new Date() },
      { new: true }
    )
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' })
    }
    
    res.json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Reorder videos in playlist
router.put('/:id/reorder', async (req, res) => {
  try {
    const { videoIds } = req.body
    if (!Array.isArray(videoIds)) {
      return res.status(400).json({ error: 'Video IDs must be an array' })
    }
    
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { videoIds, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' })
    }
    
    res.json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
