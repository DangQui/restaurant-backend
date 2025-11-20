// src/models/index.js
const sequelize = require('../config/database');

const MenuItem = require('./menuItem');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Payment = require('./payment');
const Rating = require('./rating');

// ========== Associations ==========

// Order 1 - N OrderItem
Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'items',
    onDelete: 'CASCADE',
});
OrderItem.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
});

// MenuItem 1 - N OrderItem
MenuItem.hasMany(OrderItem, {
    foreignKey: 'menuItemId',
    as: 'orderItems',
});
OrderItem.belongsTo(MenuItem, {
    foreignKey: 'menuItemId',
    as: 'menuItem',
});

// Order 1 - 1 Payment
Order.hasOne(Payment, {
    foreignKey: 'orderId',
    as: 'payment',
    onDelete: 'SET NULL',
});
Payment.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
});

// MenuItem 1 - N Rating
MenuItem.hasMany(Rating, {
    foreignKey: 'menuItemId',
    as: 'ratings',
});
Rating.belongsTo(MenuItem, {
    foreignKey: 'menuItemId',
    as: 'menuItem',
});

// ========== Associations MỚI cho Cart ==========
Cart.hasMany(CartItem, {
    foreignKey: 'cartId',
    as: 'items',
    onDelete: 'CASCADE'
  });
  CartItem.belongsTo(CCart, {
    foreignKey: 'cartId',
    as: 'cart'
  });
  
  // Nếu sau này bạn muốn lấy MenuItem trong CartItem (không bắt buộc nhưng tiện)
  CartItem.belongsTo(MenuItem, {
    foreignKey: 'menuItemId',
    as: 'menuItem'
  });
  MenuItem.hasMany(CartItem, {
    foreignKey: 'menuItemId',
    as: 'cartItems'
  });
  
  // ========== Export tất cả ==========
  module.exports = {
    sequelize,
    MenuItem,
    Order,
    OrderItem,
    Payment,
    Rating,
    Cart,        // mới
    CartItem     // mới
  };
