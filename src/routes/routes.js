const express = require('express');
const {getUserProfile} = require('../controllers/userController');
const {addProduct,getAllProducts} = require('../controllers/productControlller');
const router = express.Router();

//user routes for get profile and book history
router.post('/addProduct',addProduct);
router.get('/profile',getUserProfile);
router.get('/products',getAllProducts);
module.exports = router;