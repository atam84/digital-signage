const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Get widget list dynamically and clear require cache
delete require.cache[require.resolve('../../widgets/widget_list')]
const widgetList = require('../../widgets/widget_list')
console.log('Widget model loaded with widget list:', widgetList)

// Use the dynamic widget list from widget_list.js
const updatedWidgetList = widgetList
console.log('Using updated widget list:', updatedWidgetList)

// Clear all existing models and connections
Object.keys(mongoose.models).forEach(key => {
  delete mongoose.models[key]
})

// Create completely fresh schema
const WidgetSchema = new Schema({
  type: { 
    type: String, 
    enum: updatedWidgetList,
    required: true
  },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  w: { type: Number, default: 1 },
  h: { type: Number, default: 1 },
  data: { type: Schema.Types.Mixed },
  display: { type: Schema.Types.ObjectId, ref: 'Display' }
}, {
  collection: 'widgets',
  strict: false
})

// Create model with explicit collection name
const Widget = mongoose.model('Widget', WidgetSchema, 'widgets')

console.log('Widget model created with schema:', Widget.schema.paths.type.enumValues)

module.exports = Widget
