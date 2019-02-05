const dialogflow = require('dialogflow')
const uuid = require('uuid')
const sessionId = uuid.v4()
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.sessionPath(process.env.googleProjectID, sessionId)
const structjson = require('../helpers/structjson')
const language = process.env.dialogflowSessionLanguageCode

module.exports = {
  async textQuery (text, parameters = {}) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: language,
        },
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    }
    const responses = await sessionClient.detectIntent(request)
    console.log(responses)
    return responses
  },
  async eventQuery (event, parameters = {}) {
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          // The language used by the client (en-US)
          languageCode: language,
        },
      }
    }
    return await sessionClient.detectIntent(request)
  }
}