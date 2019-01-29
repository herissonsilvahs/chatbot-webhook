const ChatbotController = require('../controllers/Chatbot')

module.exports = app => {
  app.get('/', ChatbotController.talk)
}