const { Router } = require('express');
const dogController = require('../controllers/dogController');
const temperamentController = require('../controllers/temperamentController');

const router = Router();

router.get('/dogs', dogController.getAllDogs);
router.get('/dogs/name', dogController.searchDogsByName);
router.get('/dogs/:idBreed', dogController.getDogById);
router.post('/dogs', dogController.createDog);

router.get('/temperaments', temperamentController.getAllTemperaments);
module.exports = router;
