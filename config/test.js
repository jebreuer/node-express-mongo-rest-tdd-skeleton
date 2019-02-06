let mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()

let options = {
  useNewUrlParser: true
}

mongod.getConnectionString()
  .then(function (uri) {
    // console.log('configuring mongoose with URI: ' + uri)
    mongoose.connect(uri, options)
    let db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
  })
  .catch(function (e) {
    console.log(e)
  })

module.exports = { 'envLoaded': 'TEST' }
