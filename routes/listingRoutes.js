const listingController = require('../controllers/listingController')

const express = require('express')
const listingRoutes = express.Router()

listingRoutes.get('/', listingController.getAll);
listingRoutes.get('/my', listingController.getMy);
listingRoutes.post('/create', listingController.create);
listingRoutes.delete('/:id', listingController.destroy);
listingRoutes.get('/:id', listingController.getOne);
listingRoutes.put('/:id', listingController.update);
listingRoutes.post('/:id/reviews', listingController.createReview)
listingRoutes.get('/:id/reviews', listingController.getReviews)

module.exports = listingRoutes