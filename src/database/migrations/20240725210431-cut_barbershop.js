'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cut_barbershops', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alloNull: false,
      },
      cut_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cuts', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      barbershop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'barbershops', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at:{
        type: Sequelize.DATE,
        alloNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        alloNull: false,
      }
  })
},
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cut_barbershops');
  }
};
