const express = require('express');

const {check} = require('express-validator');
const placesControllers = require('../controllers/places-controller');

const router = express.Router();

//FOR PLACES

router.get('/:pid', placesControllers.getPlaceById);

//FOR USERS

router.get('/user/:uid', placesControllers.getPlacesByUserId);

//POST ROUTE
router.post('/',
[
  check('title').not().isEmpty(),
  check('description').isLength({min: 5}),
  check('address').not().isEmpty()

],
placesControllers.createPlace);

//PATCH Router

router.patch('/:pid', [
  check('title').not().isEmpty(),
  check('description').isLength({min:5})
],
placesControllers.updatePlace);

//delete
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
