'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      menuItemId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Foreign Key
    await queryInterface.addConstraint('CartItems', {
      fields: ['cartId'],
      type: 'foreign key',
      name: 'fk_cartitems_cartid',
      references: {
        table: 'Carts',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('CartItems', 'fk_cartitems_cartid');
    await queryInterface.dropTable('CartItems');
  }
};

