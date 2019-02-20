const CurrencyApiService = require('../services/CurrencyApiService')
const currencyToLocalString = require('../helpers/currencyToLocaleString')

module.exports = async (parameters) => {
  try {
    if (!parameters) throw new Error("Parameters not be null")
    const currencyTo = parameters['currency-to']
    const currencyFrom = parameters['currency-from']
    const amount = parameters['amount']
    const activity = parameters['activity']

    if (!currencyFrom) throw new Error("Missing params")

    const currencies = (await CurrencyApiService.get(`latest?base=${currencyFrom}`)).data
    const { date, rates } = currencies

    if (activity === 'cotação') {
      const compareCurrency = currencyTo || 'BRL'
      let compare = currencyToLocalString(compareCurrency ,rates[compareCurrency])
      const message = `1 ${currencyFrom} ta valendo ${compare}`
      return {
        message,
        fulfillmentText: message
      }
    } else if(!amount || !currencyTo) throw new Error("Missing params")

    let convertedResult = currencyToLocalString(currencyTo, rates[currencyTo] * amount)

    return {message: `O Valor convertido é ${convertedResult}`}
  } catch (err) {
    throw new Error(err)
  }
}