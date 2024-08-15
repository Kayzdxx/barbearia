const Cut = require('../models/Cut');
const Client = require('../models/Client');
const Barbershop = require('../models/Barbershop');

class CutController {

    // async index(req, res) {
       
    // }

    async store(req, res) {
        try {
            const { client_id, barbershop_id } = req.params;
            const { name } = req.body;
    
            // Buscar cliente e barbearia pelo ID
            const client = await Client.findByPk(client_id);
            const barbershop = await Barbershop.findByPk(barbershop_id);
    
            if (!client) {
                return res.status(404).send({ message: "Cliente não encontrado" });
            }
    
            if (!barbershop) {
                return res.status(404).send({ message: "Barbearia não encontrada" });
            }
    
            // Criar ou encontrar o corte
            const [cut] = await Cut.findOrCreate({
                where: { name }
            });
    
            // Adicionar o corte ao cliente e à barbearia
            await client.addCut(cut);
            await barbershop.addCut(cut);
    
            return res.status(200).send({
                data: cut,
                message: 'Corte cadastrado com sucesso',
            });
        } catch (err) {
            return res.status(400).json({
                error: err.message,
            });
        }
    }

    // async show(req, res) {
        
    // }

    // async update(req, res) {
        
    // }

    // async delete(req, res) {
        
    // }
}

module.exports = new CutController();