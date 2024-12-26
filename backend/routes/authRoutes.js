const authControllers = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require("express").Router()


router.post('/admin-login', authControllers.admin_login )
router.post('/get-user', authMiddleware, authControllers.getUser )


module.exports = router;