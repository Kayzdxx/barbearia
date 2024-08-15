const { Model, DataTypes } = require('sequelize');

class Client extends Model {
    static init(sequelize) {
        return super.init({
            
          name: DataTypes.STRING,
          address: DataTypes.STRING,
          phone: DataTypes.STRING

        }, {
            sequelize,
            tableName: 'clients',
            
        });
    }
    static associate(models) {
            this.belongsTo(models.Barbershop, { foreignKey: 'barbershop_id', as: 'barbershops' });
            this.belongsToMany(models.Cut, { foreignKey: 'client_id', through: 'cut_clients', as: 'cuts' });

            // this.hasMany(models.NOME_DO_MODEL_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', as: 'NOME_DA_TABELA' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.NOME_DO_MODEL_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'NOME_DA_TABELA_DE_RELACINAMENTO', as: 'NOME_DA_TABELA' });
        }
}

module.exports = Client;