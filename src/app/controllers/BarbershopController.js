const Barbershop = require('../models/Barbershop');
const Barber = require('../models/Barber');


class BarbershopController {

    async index(req, res) {
       try {
        const barber_id = req.userId

        let ind = await Barber.findByPk(barber_id, {
            include: { association: 'barbershops' } 
        })

        if (!ind) {
            return res.status(404).send({ message: 'Nenhum barbershop encontrado! '})
        }

        ind = ind.toJSON()
        delete ind.password

        return res.status(200).send({
             message: 'Barbershop encontrado com sucesso!',
            ind
         })
       } catch (error) {
       return res.status(400).send({
        message:'Erro ao encontrar barbershop! ',
        error: error.message
       })
       }
    }

    async store(req, res) {
        try {
            const userId = req.userId;
            const { name, cnpj, address, phone } = req.body
            const barb = await Barber.findByPk(userId)
            if (!barb) {
                return res.status(404).send({message: 'Barber nao encontrado'})
            }
            const barbershop = await Barbershop.create({
                name, cnpj, address, phone,
                barber_id: barb.id
            })
            return res.status(200).send({
                message: 'Barbershop cadastrado com sucesso!',
                data: barbershop
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao cadastrar Barbershop',
                error: error.message
            });
        }
    }

    async show(req, res) {
        
    }

    async update(req, res) {
        const { name , cnpj, phone, address } = req.body
        const { id } = req.params

        try {
            let upd = await Barbershop.findByPk(id)
            if (upd) {
                await Barbershop.update( { name, cnpj, phone, address }, {where: {id:id}} )
                upd = await Barbershop.findByPk(id)
                return res.status(201).send({
                    message: 'Barbershop atualizado com sucesso!',
                    data: upd
                })
            } else {
                return res.status(400).send({ message: 'Nenhum barbershop encontrado!' })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao atualizar barbearia!',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params

        await Barbershop.destroy({
            where: { id: id }
        })

        return res.status(200).send({
            message: 'Usuario deletado com sucesso'
        })
    }
}

module.exports = new BarbershopController();