const Barber = require('../models/Barber');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authconfig = require('../../config/auth.json')

function generateToken( params = {}) {
    return jwt.sign(params, authconfig.secret, {
        expiresIn: 78300
    })
}

class BarberController {

    async login (req, res) {
        const { email, password } = req.body
        try {
            const verifbarb = await Barber.findOne({
                where: { email }
            })
            if (!verifbarb||!bcrypt.compareSync(password, verifbarb.password)) {
                return res.status(400).send({
                    message: 'Email ou senha incorretos!',
                })
            }
            verifbarb.passsword = undefined
            const token = generateToken({ id: verifbarb.id})
            return res.status(200).send({
                message: 'Barber logado com sucesso',
                verifbarb,
                token
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar login',
                error: error.message
            });
        }


    }
    async index(req, res) {
       try {
        const barbers = await Barber.findAll()
        if (!barbers.length) {
            return res.status(200).send({ message: 'Nenhum usuario encontrado! '})
        }
        const barberocultpass = barbers.map(index => {
            const barberobj = index.toJSON()
            delete barberobj.passsword
            return barberobj
        })
        return res.status(200).send({data:barberocultpass})
       } catch (error) {
        return res.status(500).send({
            message: 'Erro ao realizar login', 
            error: error.message
        });
       }
    }

    async store(req, res) {
        const { name, email, password } = req.body
        try {
            const verifbarb = await Barber.findOne({
                where: { email }
            }) 
            if (verifbarb) {
                return res.status(400).send({ message: 'Barber já cadastrado!' })
            } 
            const barber = await Barber.create({ name, email, password })
            barber.password = undefined
            return res.status(201).send({
                message: 'Barber cadastrado com sucesso!',
                data: barber
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }

    async show(req, res) {
        const userId = req.userId;
        try {
            const barber = await Barber.findOne({
                where: {id : userId }
            })
            if (!barber) {
                return res.status(400).send({ 
                    message: 'Nenhum Barber encontrado! '
                })
            }
            barber.password = undefined
            return res.status(200).send({ data: barber})
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const { name } = req.body
        const { id } = req.params

        try {
            let verifbarb = await Barber.findOne({
                where: { id: id }
            }) 
            if (!verifbarb) {
                return res.status(400).send({ message: 'Nenhum barber encontrado!' })
            } 
            await Barber.update({ name }, { where: {id: id}})
            verifbarb = await Barber.findOne({
                where: { id: id }
            }) 
            verifbarb.password = undefined
            return res.status(201).send({
                message: 'Barber atualizado com sucesso!',
                data: verifbarb
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
    }
}

    // async delete(req, res) {
    //     const { id } = req.params

    //     await Barber.destroy({
    //         where: { id: id }
    //     })

    //     return res.status(200).send({
    //         message: 'Usuario deletado com sucesso'
    //     })
    // }
}

module.exports = new BarberController();