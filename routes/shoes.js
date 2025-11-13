const express = require('express');
const router = express.Router();


const shoesController = require('../controllers/shoes.js');

router.get('/',shoesController.displayAllShoes);
router.post('/',shoesController.createNewShoe);
router.delete('/:id',shoesController.deleteShoe);
router.put('/:id',shoesController.updateShoe);


module.exports = router;