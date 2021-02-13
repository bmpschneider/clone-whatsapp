const User = require('../models/Users')

class UserController {
    async insert(req, res) {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (user) {
            return res.status(400).json({ message: 'Já existe um usuário com esse e-mail!' })
        }

        user = await User.create(req.body)

        const formattedData = {
            id: user.id,
            name: user.name,
            email: user.email

        }

        return res.status(200).json(formattedData)
    }

    async getUser(req, res) {
        const { email } = req.params

        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'Usuario não encontrado!' })
        }
        const formattedData = {
            id: user.id,
            name: user.name,
            email: user.email

        }
        return res.status(200).json(formattedData)
    }

    async getAllUsers(req, res) {
        const users = await User.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'email'],
            limit: 100,
            order: [["name", "ASC"]]
        })

        return res.status(200).json(users)
    }
}

module.exports = new UserController();