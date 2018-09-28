const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  location: {
    type: String
  },
  currency: {
    type: Number
  }
})

const ListModel = mongoose.model('list', ListSchema)
module.exports = ListModel