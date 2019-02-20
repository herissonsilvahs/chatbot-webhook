module.exports = app => {
  require('./dialogflow')(app)
  require('./webhook')(app)
}