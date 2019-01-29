const chatbotService = require('../services/ChatbotService')

module.exports = {
  async text (req, res) {

    const responses = chatbotService.textQuery(req.body.text, req.body.parameters)

    res.status(200).json(responses)
  },
  async event (req, res) {

  }
}