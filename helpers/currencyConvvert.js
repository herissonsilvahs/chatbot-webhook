const CurrencyApiService = require('../services/CurrencyApiService')

module.exports = async (parameters) => {
  try {
    if (!parameters) throw new Error("Parameters not be null")
    const currencyTo = parameters['currency-to']
    const currencyFrom = parameters['currency-from']
    const amount = parameters['amount']

    if (!amount || !currencyFrom || !currencyTo) throw new Error("Missing params")

    const currencies = (await CurrencyApiService.get(`latest?base=${currencyFrom}`)).data
    const { date, rates } = currencies
    let convertedResult = (rates[currencyTo] * amount).toLocaleString(currencyTo, { style: 'currency', currency: currencyTo })

    return convertedResult
  } catch (err) {
    throw new Error(err)
  }
}