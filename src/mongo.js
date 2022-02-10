const { MongoClient } = require('mongodb')

// this object is a singleton (there is only one instance for the whole application). This allows every file that imports this one to share a single mongo connection.
const service = {
  client: null, // cache mongo client
  db: null,

  async connect(url, databaseName, username, password) {
    // connect to mongo server
    const opt = {
      useUnifiedTopology: true,
    }
    if (username) {
      opt.auth = { username, password }
    }

    this.client = await MongoClient.connect(url, opt)
    console.log(`mongo connected to ${url}`)
    this.db = this.client.db(databaseName) // use the chosen database
    return this.db
  },

  async close() {
    return this.client.close()
  },
}

module.exports = service
