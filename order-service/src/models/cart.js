'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    tableName: 'Carts'
  });

  Cart.associate = (models) => {
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'items' });
  };

  return Cart;
};
