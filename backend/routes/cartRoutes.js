// applyJobRoutes.js
const express = require('express');
const router = express.Router();

const { addToCart, removeFromCart, getUserCart, clearCart, getCartData } = require('../controller/CartController');
const { verifyToken } = require('../controller/UserController')


router.post('/addCart', verifyToken, addToCart); 
router.get('/getCartData', verifyToken, getCartData); 
router.get('/getUserCart', verifyToken, getUserCart);
router.delete('/deleteCart/:id', verifyToken, removeFromCart);
router.delete('/clearCart', verifyToken, clearCart); 

module.exports = router;
