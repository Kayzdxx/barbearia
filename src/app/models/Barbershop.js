const { Model, DataTypes } = require('sequelize');

class Barbershop extends Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.STRING,
            cnpj: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'barbershops',
      
        });
    }
    static associate(models) {
        this.belongsTo(models.Barber, {foreignKey: 'barber_id', as: 'barbers' })
        this.hasMany(models.Client, { foreignKey: 'barbershop_id', as: 'clients' });
        this.belongsToMany(models.Cut, { foreignKey: 'barbershop_id', through: 'cut_barbershops', as: 'cuts' });



        }
}
module.exports = Barbershop;