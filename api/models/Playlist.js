const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlaylistSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  videoIds: [{ type: String, required: true }], // Array of YouTube video IDs
  autoPlay: { type: Boolean, default: true },
  loop: { type: Boolean, default: true },
  showControls: { type: Boolean, default: false },
  mute: { type: Boolean, default: true },
  displayMode: { type: String, enum: ['embedded', 'floating'], default: 'embedded' },
  floatingPosition: { type: String, enum: ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'], default: 'center' },
  floatingSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
  aspectRatio: { type: String, enum: ['9:16', '16:9', '1:1', '4:3'], default: '9:16' },
  backgroundColor: { type: String, default: '#000000' },
  borderColor: { type: String, default: '#cccccc' },
  borderWidth: { type: Number, default: 2 },
  borderRadius: { type: Number, default: 8 },
  shadowStyle: { type: String, enum: ['none', 'subtle', 'medium', 'strong'], default: 'subtle' },
  enableRepetition: { type: Boolean, default: false },
  repetitionInterval: { type: Number, default: 30 },
  repetitionUnit: { type: String, enum: ['seconds', 'minutes', 'hours'], default: 'minutes' },
  fadeTransition: { type: Boolean, default: true },
  animationType: { type: String, enum: ['fade', 'slide', 'zoom', 'none'], default: 'fade' },
  animationDuration: { type: Number, default: 1000 },
  animationDelay: { type: Number, default: 0 },
  showProgress: { type: Boolean, default: false },
  showVolume: { type: Boolean, default: false },
  volume: { type: Number, default: 50, min: 0, max: 100 },
  startTime: { type: Number, default: 0 },
  endTime: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'playlists'
})

// Update the updatedAt field before saving
PlaylistSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist
