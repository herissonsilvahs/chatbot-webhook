const chatbotService = require('../services/ChatbotService')
const CurrencyApiService = require('../services/CurrencyApiService')

module.exports = {
  async text (req, res) {
    try {
      const responses = await chatbotService.textQuery(req.body.text, req.body.parameters)

      const context = responses[0].queryResult.outputContexts[0]

      const currencyFrom = context.parameters.fields['currency-from'].stringValue
      const currencyTo = context.parameters.fields['currency-to'].stringValue
      const amount = context.parameters.fields['amount'].numberValue
      const currencies = (await CurrencyApiService.get(`latest?base=${currencyFrom}`)).data
      const { date, rates } = currencies
      let convertedResult = (rates[currencyTo] * amount).toLocaleString(currencyTo, { style: 'currency', currency: currencyTo })

      res.status(200).json({message: `Cost ${convertedResult} in ${date}`})
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