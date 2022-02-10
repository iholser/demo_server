const { ObjectId } = require('bson')

const mongo = require('./src/mongo')

const PORT = 3001
const MONGODB_URL = 'mongodb://localhost:27017'
const MONGODB_NAME = 'demo'
const DB_USER = 'root'
const DB_PASSWORD = 'example'

users = [
  {
    _id: ObjectId('6204bfc694a1aa5b117eb127'),
    firstName: 'Ian',
    lastName: 'Holser',
  },
  {
    _id: ObjectId('6204bfc694a1aa5b117eb128'),
    firstName: 'Nadine',
    lastName: 'Ibrahim',
  },
]

const seed = async () => {
  await mongo.connect(MONGODB_URL, MONGODB_NAME, DB_USER, DB_PASSWORD) // mongo must connect before we can use it
  await mongo.db
    .collection('user')
    .drop()
    .catch(() => {}) // catch error where user collection doesn't exist yet
  await mongo.db.collection('user').insertMany(users) // insert our starter data
}

seed().then(() => {
  console.log(`inserted ${users.length} records into user collection`)
  mongo.close()
})
