const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCartByUser);
router.post('/:userId/items', cartController.addItem);
router.put('/items/:id', cartController.updateItem);
router.delete('/items/:id', cartController.deleteItem);
router.post('/:userId/checkout', cartController.checkoutFromCart);

module.exports = router;
