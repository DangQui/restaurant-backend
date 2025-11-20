'use strict';

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cartId: DataTypes.INTEGER,
    menuItemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    tableName: 'CartItems'
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
  };

  return CartItem;
};
