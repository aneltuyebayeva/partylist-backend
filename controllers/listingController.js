const models = require('../models')

const listingController = {}

listingController.getAll = async (req, res) => {
    try {
      const listing = await models.listing.findAll()
      res.json({listing})
    } catch (error){
      res.status(400).json({ error: error.message })
    }
  } 

listingController.getMy = async (req, res) => {
  console.log(req.headers)
    try {
      const user = await models.user.findOne({
        where: {
          id: req.headers.authorization
        }
      })
      console.log(user)
      const listing = await user.getListings()
      res.json({ listing })
      
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  listingController.create = async (req, res) => {
    try {
    let user = await models.user.findOne({
        where: {
          id: req.headers.authorization
        }
    })
    let [listing, create] = await models.listing.findOrCreate({
        where: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        website: req.body.website,
        instagram: req.body.instagram,
        facebook: req.body.facebook
        }
    })
        await user.addListing(listing)
        await listing.reload()
        res.json({user, listing})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

listingController.destroy = async (req, res) => {
  try {
    const deleteListing = await models.listing.destroy({
      where: { 
          id: req.params.id 
      }
    })
    console.log(deleteListing)
    let user = await models.user.findOne({
      where: {
        id: req.headers.authorization
      }
    })
    await user.removeListing(deleteListing)
    res.json({ deleteListing })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

listingController.getOne = async (req,res) => {
  try {
    const listing = await models.listing.findOne({
      where: { 
          id: req.params.id 
      }
    })
    res.json({listing})
  } catch {
    res.status(400).json({ error: error.message })
  }
}

listingController.update = async (req, res) => {
  try {
  const user = await models.user.findOne({
      where: {
        id: req.headers.authorization
      }
  })
  const listing = await models.listing.findOne({
    where: {
      id: req.params.id
    }
  })
  await listing.update({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      website: req.body.website,
      instagram: req.body.instagram,
      facebook: req.body.facebook
  })
      res.json({user, listing})
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}


module.exports = listingController
