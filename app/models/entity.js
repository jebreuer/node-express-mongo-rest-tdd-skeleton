let mongoose = require('mongoose')
let Schema = mongoose.Schema

let EntitySchema = new Schema(
  {
    property: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
)

EntitySchema.pre('save', next => {
  let now = new Date()
  if (!this.createdAt) {
    this.createdAt = now
  }

  this.updatedAt = now

  next()
})

module.exports = mongoose.model('entity', EntitySchema)
