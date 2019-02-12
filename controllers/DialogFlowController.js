const chatbotService = require('../services/ChatbotService')

module.exports = {
  async text (req, res) {
    try {
      const responses = await chatbotService.textQuery(req.body.text, req.body.parameters)
      res.status(200).json(responses)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  },
  async event (req, res) {
    const responses = await chatbotService.eventQuery(req.body.event, req.body.parameters)
    res.status(200).json(responses)

    try {
      const responses = await chatbotService.eventQuery(req.body.event, req.body.parameters)
      res.status(200).json(responses)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  }
}