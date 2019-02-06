let express = require('express')
let app = express()
let mongoose = require('mongoose')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let port = 8080
let entity = require('./app/routes/entity')
let config = require('config') // we load the db location from the JSON files

// .inspect(...)
const util = require('util')

console.log(util.inspect(config))

// don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test' &&
  config.util.getEnv('NODE_ENV') !== 'integration') {
  // use morgan to log at command line
  app.use(morgan('combined')) // 'combined' outputs the Apache style LOGs
}

// parse application/json and look for raw text
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/', (req, res) => res.json({ message: 'Entity Management Area' }))

app.route('/entity')
  .get(entity.getEntities)
  .post(entity.postEntity)
app.route('/entity/:id')
  .get(entity.getEntity)
  .delete(entity.deleteEntity)
  .put(entity.updateEntity)

app.on('ready', function () {
  app.listen(port, function () {
    // console.log("Listening on port " + port);
  })
})

mongoose.connection.once('open', function () {
  // All OK - fire (emit) a ready event.
  // console.log("Database is ready.");
  app.emit('ready')
})

// app.listen(port);
// console.log("Listening on port " + port);

module.exports = app // for testing
