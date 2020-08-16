const router = require('express').Router()

const Friend = require('./friendModel')

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends)
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'Unable to retrieve friends data.' })
      })
  })
  .post((req, res) => {
    const friendData = req.body
    const friend = new Friend(friendData)

    friend
      .save()
      .then(friend => {
        if (
          friend.firstName !== undefined &&
          friend.lastName !== undefined &&
          friend.age !== undefined
        ) {
          res.status(201).json(friend)
        }
      })
      .catch(err => {
        if (
          friend.firstName === undefined ||
          friend.lastName === undefined ||
          friend.age === undefined
        ) {
          res
            .status(400)
            .json({ errorMessage: 'Required fields: firstName, lastName, age' })
        } else if (
          friend.age !== undefined &&
          (friend.age < 1 || friend.age > 120 || isNaN(friend.age))
        ) {
          res
            .status(400)
            .json({ errorMessage: 'Age must be a number between 1 and 120.' })
        } else {
          res
            .status(500)
            .json({ errorMessage: 'Error saving friend to database.' })
        }
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    const friendID = req.params.id
    Friend.findById(friendID)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({ errorMessage: 'No friend exists with that id.'})
        } else {
          console.log(Object.entries(friend.contactInfo))
          res.status(200).json(friend)
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({ errorMessage: 'Invalid id' })
        } else {
          res
            .status(500)
            .json({ errorMessage: 'Unable to retrieve friend data.' })
        }
      })
  })
  .put((req, res) => {
    const friendID = req.params.id
    const update = req.body
    const options = {new: true}
    Friend.findByIdAndUpdate(friendID, update, options)
      .then(friend => {
        if (req.body.age && req.body.age < 1 || req.body.age > 120) {
          res.status(400).json({ errorMessage: 'Age must be a number between 1 and 120'})
        }
        if (friend === null) {
          res.status(404).json({ message: 'No friend exists with that id.' })
        } else {
          res.status(200).json(friend)
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({ errorMessage: 'Invalid id'})
        } else {
          res.status(500).json({ errorMessage: 'Unable to update friend data.' })
        }
      })
  })
  .delete((req, res) => {
    const friendID = req.params.id
    Friend.findByIdAndDelete(friendID)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({ errorMessage: 'No friend exists with that id'})
        } else {
          res.status(200).json(friend)
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({ errorMessage: 'Invalid id' })
        } else {
          res.status(500).json({ errorMessage: 'The friend could not be removed.'})
        }
      })
  })
module.exports = router
