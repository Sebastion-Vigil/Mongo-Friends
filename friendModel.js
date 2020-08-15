// import mongoose to access MongoDB
const mongoose = require('mongoose')

// just a JS object to pre make the Schema
const friendDefinition = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
      type: Number,
      min: 1,
      max: 120,
      required: true
  },
  createdOn: {
      type: Date,
      default: Date.now
  }
}

// another JS object for options
const options = {
    timestamps: true
}
// instantiate mongoose schema & pass it the 2 objs made above
const friendSchema = new mongoose.Schema(friendDefinition, options)

// finally, pass the schema to mongoose here to make friendModel
const friendModel = mongoose.model('Friend', friendSchema, 'friends') // (Model, Schema, also name of db?)

module.exports = friendModel