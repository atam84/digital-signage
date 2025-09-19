const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Get widget list dynamically
const widgetList = require('../../widgets/widget_list')
console.log('Widget model loaded with widget list:', widgetList)

const Widget = new Schema({
  type: { type: String, enum: widgetList },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  w: { type: Number, default: 1 },
  h: { type: Number, default: 1 },
  data: { type: Schema.Types.Mixed },
  display: { type: Schema.Types.ObjectId, ref: 'Display' }
})

// Clear any existing model to force recreation
if (mongoose.models.Widget) {
  delete mongoose.models.Widget
}

module.exports = mongoose.model('Widget', Widget)
