const currencyConvert = require('../helpers/currencyConvvert')

module.exports = {
  async start (req, res) {
    try {
      const { queryResult } = req.body
      if (queryResult.action === 'currency.convert') {
        const valueConverted = await currencyConvert(queryResult.parameters)
        return res.status(200).json({message: `O Valor convertido é ${valueConverted}`})
      }
      return res.status(200).json({message: "Desculpa não consegui converter, tente novamente!"})
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  }
}