const express = require('express');
const { processPayment, getPaymentStatus } = require('../controllers/payment');
const { isSignedIn, isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.post('/payment/process/:userId', isSignedIn, isAuthenticated, processPayment);
router.get('/payment/status/:paymentId/:userId', isSignedIn, isAuthenticated, getPaymentStatus);

module.exports = router;
