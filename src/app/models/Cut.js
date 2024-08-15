const { Model, DataTypes } = require('sequelize');

class Cut extends Model {
    static init(sequelize) {
        return super.init({
            
          name: DataTypes.STRING,

        }, {
            sequelize,
            tableName: 'cuts',
            
        });
    }
    static associate(models) {
        this.belongsToMany(models.Client, { foreignKey: 'cut_id', through: 'cut_clients', as: 'clients' });
        this.belongsToMany(models.Barbershop, { foreignKey: 'cut_id', through: 'cut_barbershops', as: 'barbershops' });
        }
}

module.exports = Cut;