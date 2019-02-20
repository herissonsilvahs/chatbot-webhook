const DialogFlowWebhookController = require('../controllers/DialogFlowWebhookController')

module.exports = app => {
  app.post('/api/v1/webhook', DialogFlowWebhookController.start)
}