const orderController = require('../../controllers/order/orderController');
const router = require("express").Router()

router.post('/home/product/place-order', orderController.place_order)
router.get('/home/customer/get-dashboard-data/:userId', orderController.get_customer_dashboard)

module.exports = router;