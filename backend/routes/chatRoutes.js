const chatController = require('../controllers/chat/chatController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require("express").Router()

router.post('/chat/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/chat/customer/send-message-to-seller', chatController.customer_message_add)


router.get('/chat/seller/get-customers/:sellerId', chatController.get_customers)
router.get('/chat/seller/get-customer-message/:customerId',authMiddleware, chatController.get_customers_seller_message)

router.post('/chat/seller/send-message-to-customer',authMiddleware, chatController.seller_message_add)

module.exports = router;