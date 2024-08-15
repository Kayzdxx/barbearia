const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs')


class Barber extends Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'barbers',
            hooks: {
                beforeCreate: async (barber) => {
                    const salt = await bcrypt.genSalt();
                    barber.password = await bcrypt.hash(barber.password, salt);
                },
            },
        });
    }
    static associate(models) {
        this.hasMany(models.Barbershop, {foreignKey: 'barber_id', as: 'barbershops'})
        }
}

module.exports = Barber;