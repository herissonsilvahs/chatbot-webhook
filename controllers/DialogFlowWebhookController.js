const currencyConvert = require('../helpers/currencyConvert')

module.exports = {
  async start (req, res) {
    const customResponse = {
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "foi mal, não entendi"
                }
              }
            ]
          }
        }
      }
    }

    try {
      const { queryResult } = req.body
      if (queryResult.action === 'currency.convert') {
        const message = await currencyConvert(queryResult.parameters)
        return res.status(200).json(message)
      }

      return res.status(200).json(customResponse)
    } catch (err) {
      res.status(500).json(customResponse)
    }
  }
}