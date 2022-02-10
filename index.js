// pull in libraries...
const express = require('express')
const cors = require('cors')

// require local files needed
const mongo = require('./src/mongo')
const userService = require('./src/userService')

const PORT = 3001
const MONGODB_URL = 'mongodb://localhost:27017'
const MONGODB_NAME = 'demo'
const DB_USER = 'root'
const DB_PASSWORD = 'example'

// connect mongo
mongo.connect(MONGODB_URL, MONGODB_NAME, DB_USER, DB_PASSWORD)

// express server
const app = express()

// allow cross origin requests (client does not need to be on the same url as your server)
app.use(cors())

// routes
app.post('/user/', async (req, res, next) => {
  const user = await userService.create(req.body) // pass the POST body into the create function to insert into database
})
app.get('/user/:userId', async (req, res, next) => {
  // example, go to: http://localhost:3001/user/6204bfc694a1aa5b117eb127
  // use async / await to wait for a response from mongo
  // .catch catches errors that might be generated. next takes the error and passes it along, it will be picked up by the error handler bellow
  const user = await userService.get(req.params.userId).catch(next)
  res.send(user) // send the user data
})
app.put('/user/:userId', async (req, res, next) => {
  const user = await userService.update(req.params.userId, req.body).catch(next)
})

// if no route is matched, or if an error occured, handle with the appropriate http status code
app.use((req, res) => {
  res.sendStatus(404)
}) // Not found, send 404

// handle any errors that occur in routes
app.use((err, req, res) => {
  res.status(err.status || 500).json({ message: err.message })
}) // Error, send 500

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))

module.exports = app
