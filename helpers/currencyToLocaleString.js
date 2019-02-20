module.exports = (currency, amount) => {
  return amount.toLocaleString(
    currency,
    { style: 'currency', currency: currency }
  )
}