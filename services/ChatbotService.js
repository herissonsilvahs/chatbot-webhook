const dialogflow = require('dialogflow')
const uuid = require('uuid')
const sessionId = uuid.v4()
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.sessionPath(process.env.googleProjectID, sessionId)

module.exports = {
  async textQuery (text, parameters = {}) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    }
    const responses = await sessionClient.detectIntent(request)
    return responses
  }
}