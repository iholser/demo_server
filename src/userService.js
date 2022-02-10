const { ObjectId, ObjectID } = require('bson')
const mongo = require('./mongo')

const COL = 'user' // mongo collection

module.exports = {
  get(id) {
    const _id = new ObjectId(id) // make the id into an objectId since objectId gets converted into a string when transferred as json
    return mongo.db.collection(COL).findOne({ _id })
  },
  create(user) {
    return mongo.db.collection(COL).insertOne(user)
  },
  update(userId, user) {
    user._id = new ObjectId(userId)
    return mongo.db
      .collection(COL)
      .findOneAndUpdate({ _id: user._id }, { $set: { user } })
  },
}
