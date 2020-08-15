// https://www.tutorialspoint.com/mongodb/ -> online resource to learn mongoDB
// https://mongoosejs.com/docs/ -> online resource to learn Mongoose ODM -> dafuq ODM stand for?
// hmm...ORM stands for Object Relational Mapper, so does ODM stand for Object Dorkibus Mapper?

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// ********* TODO: *********

// 1) connect to MongoDB here:

// 2) add friendController here:

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));


// ************************ TODO: ************************
// -> Review MongoDB shell commands
// -> MongoDB admin? Wrap up any loose ends
// -> Review Mongoose
// -> Review helmet -> other than middleware, what is it?
// -> Review cors -> other than middleware, what is it?
