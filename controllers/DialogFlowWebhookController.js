const currencyConvert = require('../helpers/currencyConvert')

module.exports = {
  async start (req, res) {
    try {
      const { queryResult } = req.body
      if (queryResult.action === 'currency.convert') {
        const message = await currencyConvert(queryResult.parameters)
        return res.status(200).json(message)
      }
      return res.status(200).json({
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
            },

            "systemIntent": {
              "intent": "actions.intent.OPTION",
              "data": {
                "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                "listSelect": {
                  "title": "Açoes",
                  "items": [
                    {
                      "optionInfo": {
                        "key": "SELECTION_KEY_CONVERCAO",
                        "synonyms": [
                          "Converter"
                        ]
                      },
                      "title": "Converter moedas"
                    },
                    {
                      "optionInfo": {
                        "key": "SELECTION_KEY_COTACAO",
                        "synonyms": [
                          "Cotação do dolar",
                          "Valor do dolar"
                        ]
                      },
                      "title": "Cotação"
                    }
                  ]
                }
              }
            }
          }
        }
      })
    } catch (err) {
      // const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json({
        "fulfillmentText": "Desculpa não entendi"
      })
    }
  }
}