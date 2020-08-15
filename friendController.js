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
        console.log(err)
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
          res.status(201).json(friend) // brush up on meaning of different server statuses
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
        if (friend !== null) {
          res.status(200).json(friend)
        } else {
          res.status(404).json({ errorMessage: 'No friend with that id exists.'})
        }
      })
      .catch(err => {
        res
          .status(404)
          .json({ errorMessage: 'Unable to retrieve friend data.' })
      })
  })
  .put((req, res) => {
    const friendID = req.params.id
    const update = req.body
    Friend.findByIdAndUpdate(friendID, update)
      .then(friend => {
        if (friend !== null) {
          res.status(200).json(friend)
        } else {
          res.status(400).json({ message: 'No friend exists with that id.' })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'Unable to update friend data.' })
      })
  })
  .delete((req, res) => {
    const friendID = req.params.id
    Friend.findByIdAndDelete(friendID)
      .then(friend => {
        if (friend !== null) {
          res.status(200).json({ friend })
        } else {
          res
            .status(404)
            .json({ errorMessage: 'No friend exists with that id.' })
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ errorMessage: 'Unable to retrieve friend data.' })
      })
  })
module.exports = router
