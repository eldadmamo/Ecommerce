const chatController = require('../controllers/chat/chatController');
const router = require("express").Router()

router.post('/chat/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/chat/customer/send-message-to-seller', chatController.customer_message_add)


module.exports = router;