const { Cart, CartItem, Order, OrderItem } = require('../models');

module.exports = {

  // Lấy cart hoặc tự tạo
  async getCartByUser(req, res) {
    const userId = req.params.userId;

    let cart = await Cart.findOne({
      where: { userId, status: 'active' },
      include: [{ model: CartItem, as: 'items' }]
    });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    res.json(cart);
  },

  // Thêm item
  async addItem(req, res) {
    const userId = req.params.userId;
    const { menuItemId, quantity, price } = req.body;

    let cart = await Cart.findOne({ where: { userId, status: 'active' } });
    if (!cart) cart = await Cart.create({ userId });

    let item = await CartItem.findOne({ where: { cartId: cart.id, menuItemId } });

    if (item) {
      item.quantity += quantity;
      await item.save();
      return res.json(item);
    }

    item = await CartItem.create({
      cartId: cart.id,
      menuItemId,
      quantity,
      price
    });

    res.status(201).json(item);
  },

  // Update item
  async updateItem(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.quantity = quantity;
    await item.save();

    res.json(item);
  },

  // Xoá item
  async deleteItem(req, res) {
    const { id } = req.params;
    await CartItem.destroy({ where: { id } });

    res.status(204).send();
  },

  // Checkout → tạo order
  async checkoutFromCart(req, res) {
    const userId = req.params.userId;
    const { customerName, customerPhone, deliveryAddress } = req.body;

    const cart = await Cart.findOne({
      where: { userId, status: 'active' },
      include: [{ model: CartItem, as: 'items' }]
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart empty' });
    }

    // 1. Tạo Order
    const order = await Order.create({
      orderType: 'delivery',
      customerName,
      customerPhone,
      deliveryAddress,
      status: 'pending'
    });

    // 2. Add OrderItems
    for (const it of cart.items) {
      await OrderItem.create({
        orderId: order.id,
        menuItemId: it.menuItemId,
        quantity: it.quantity,
        price: it.price
      });
    }

    // 3. Clear cart
    await CartItem.destroy({ where: { cartId: cart.id } });
    cart.status = 'converted';
    await cart.save();

    res.json({ message: 'Order created', orderId: order.id });
  }
};
