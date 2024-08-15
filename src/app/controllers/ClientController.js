const Client = require('../models/Client');
const Barbershop = require('../models/Barbershop');

class ClientController {

    async index(req, res) {
       try {
        const { barbershop_id } = req.params
        
        let barbershop = await Barbershop.findByPk(barbershop_id, {
            include: { association: 'clients',
                include:{
                    association: 'cuts',
                    through: { attributes: [] }
                }
             } 
        })
        if (!barbershop) {
            return res.status(404).send({ message: 'Nenhum cliente encontrado! '})
        }
        // barbershop = barbershop.toJSON()
        // delete barbershop.password

        return res.status(200).send({
             message: 'Barbershop encontrado com sucesso!',
            barbershop
         })
       } catch (error) {
        return res.status(400).send({
            message:'Erro ao encontrar Cliente! ',
            error: error.message
           })
       }
    }

    async store(req, res) {
        try {
            
            const { name, address, phone } = req.body
            const{ barbershop_id } = req.params
             const barbershop = await Barbershop.findByPk(barbershop_id)
             if (!barbershop) {
                return res.status(404).send({message: 'Cliente nao encontrado'})
            }
            const client = await Client.create({
                name, address, phone,
                barbershop_id: barbershop.id
            })
            return res.status(200).send({
                message: 'Client cadastrado com sucesso!',
                data: client
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao cadastrar Cliente',
                error: error.message
            });
        }
    }
    async show(req, res) {
        const{ client_id } = req.params
        const client = await Client.findOne({ where: {id: client_id} })
        return res.status(200).send({
            client
        })
    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new ClientController();