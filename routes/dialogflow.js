const DialogFlowController = require('../controllers/DialogFlowController')

module.exports = app => {
  app.post('/api/v1/df_event_query', DialogFlowController.event)
  app.post('/api/v1/df_text_query', DialogFlowController.text)
}