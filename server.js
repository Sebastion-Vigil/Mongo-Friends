// https://www.tutorialspoint.com/mongodb/ -> online resource to learn mongoDB
// https://mongoosejs.com/docs/ -> online resource to learn Mongoose ODM -> dafuq ODM stand for?
// hmm...ORM stands for Object Relational Mapper, so does ODM stand for Object Dorkibus Mapper?
// https://www.shellhacks.com/mongodb-create-database-and-user-mongo-shell/ -> fix db admin issue


const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')

// ********* TODO: *********

// 1) connect to MongoDB here:
mongoose // friendsdb is name of db, created on the fly if undefined
  .connect('mongodb://localhost:27017/friendsdb')
  .then(mongo => {
    console.log('connected to database')
  })
  .catch(err => {
    console.log('error connection to db', err)
  })
// 2) add friendController here:
const friendController = require('./friendController')

// instantiate server
const server = express()

// pass middlewares to server
server.use(helmet())
server.use(cors())
server.use(express.json())

// generic GET to port 5000
server.get('/', (req, res) => {
  res.status(200).json({ api: 'Know nothing, learn anything.' })
})

// pass root db path and controller to server
server.use('/api/friends', friendController)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`))

// ************************ TODO: ************************
// -> Review MongoDB shell commands
// -> MongoDB admin? Wrap up any loose ends
// -> Review Mongoose
// -> Review helmet -> other than middleware, what is it?
// -> Review cors -> other than middleware, what is it?
