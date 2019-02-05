const chatbotService = require('../services/ChatbotService')

module.exports = {
  async text (req, res) {
    const responses = await chatbotService.textQuery(req.body.text, req.body.parameters)
    res.status(200).json(responses)
  },
  async event (req, res) {
    const responses = await chatbotService.eventQuery(req.body.event, req.body.parameters)
    res.status(200).json(responses)
  }
}