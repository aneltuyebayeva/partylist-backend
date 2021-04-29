const models = require('../models')

const usersController = {}

usersController.create = async(req,res) => {
    try {
        const user = await models.user.create ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({message: 'user created', user})
    } catch (error) {
        res.status(400)
        res.json({error: 'email is already taken'})
    }
}


usersController.login = async(req,res) => {
    const user = await models.user.findOne({
        where: {
            email: req.body.email,
        }
    }) 
    if (user.password === req.body.password) {
        res.status(200)
        res.json({id: user.id, name: user.name})
    } else {
        res.status(400)
        res.json({error: 'invalid password'})
    }
}

usersController.verify = async (req, res) => {
    try {
      const user = await models.user.findOne({
          where: {
              id: req.headers.authorization
          }
      })
      if (user) {
          res.json({user})
      } else {
        res.status(404)
        res.json({ message: 'user not found' })
      }
    } catch (error) {
        res.json({error})
    }
  }

module.exports = usersController