const express = require('express')
const router = express.Router()

const Widget = require('../models/Widget')
const Display = require('../models/Display')
const CommonHelper = require('../helpers/common_helper')
const WidgetHelper = require('../helpers/widget_helper')

/**
 *  list    - GET /widgets/
 *  create  - POST /widgets/
 *  read    - GET /widgets/{id}/
 *  update  - PUT /widgets/{id}/
 *  delete  - DELETE /widgets/{id}/
 */

// List all widgets
router.get('/', async (req, res) => {
  try {
    const widgets = await Widget.find()
    res.json(widgets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a new widget
router.post('/', async (req, res) => {
  try {
    const widget = new Widget(req.body)
    const savedWidget = await widget.save()
    
    // Add widget to display if display ID is provided
    if (req.body.display) {
      const display = await Display.findById(req.body.display)
      if (display) {
        display.widgets.push(savedWidget._id)
        await display.save()
      }
    }
    
    // Broadcast update
    if (CommonHelper.broadcastUpdate) {
      CommonHelper.broadcastUpdate(res.io)
    }
    
    res.json(savedWidget)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get a specific widget
router.get('/:id', async (req, res) => {
  try {
    const widget = await Widget.findById(req.params.id)
    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' })
    }
    res.json(widget)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update a widget
router.put('/:id', async (req, res) => {
  try {
    const widget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' })
    }
    
    // Run after actions
    if (CommonHelper.broadcastUpdateMiddleware) {
      await CommonHelper.broadcastUpdateMiddleware(req, res, () => {})
    }
    
    res.json(widget)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete a widget
router.delete('/:id', async (req, res) => {
  try {
    const widget = await Widget.findByIdAndDelete(req.params.id)
    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' })
    }
    
    // Remove widget from display if it has a display reference
    if (widget.display) {
      const display = await Display.findById(widget.display)
      if (display) {
        display.widgets = display.widgets.filter(widgetId => !widgetId.equals(widget._id))
        await display.save()
      }
    }
    
    // Broadcast update
    if (CommonHelper.broadcastUpdate) {
      CommonHelper.broadcastUpdate(res.io)
    }
    
    res.json({ message: 'Widget deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
