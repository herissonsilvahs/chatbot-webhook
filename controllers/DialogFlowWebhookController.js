const currencyConvert = require('../helpers/currencyConvert')

module.exports = {
  async start (req, res) {
    try {
      const { queryResult } = req.body
      if (queryResult.action === 'currency.convert') {
        const message = await currencyConvert(queryResult.parameters)
        return res.status(200).json(message)
      }
      return res.status(200).json({message: "Desculpa não consegui entender, tente novamente!"})
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  }
}