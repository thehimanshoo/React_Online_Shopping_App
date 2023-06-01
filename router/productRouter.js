const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const Product = require('../models/Product');
const {body , validationResult} = require('express-validator');

/*
    @usage : Upload a Product
    @url : /api/products/upload
    @fields : name , brand , price , qty , image , category , description , usage
    @method : POST
    @access : PRIVATE
 */
router.post('/upload', authenticate , [
    body('name').notEmpty().withMessage('Name is Required'),
    body('brand').notEmpty().withMessage('Brand is Required'),
    body('price').notEmpty().withMessage('Price is Required'),
    body('qty').notEmpty().withMessage('Qty is Required'),
    body('image').notEmpty().withMessage('Image is Required'),
    body('category').notEmpty().withMessage('Category is Required'),
    body('description').notEmpty().withMessage('Description is Required'),
    body('usage').notEmpty().withMessage('Usage is Required'),
] ,async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()});
    }
    try {
        let {name , brand , price , qty , image, category , description , usage} = request.body;
        let product = new Product({name , brand , price , qty , image, category , description , usage});
        product = await product.save(); // save to db
        response.status(200).json({
            msg : 'Product is Uploaded',
            product : product
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

/*
    @usage : GET Men's Collection
    @url :  /api/products/men
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/men', async (request , response) => {
    try {
        let products = await Product.find({category : 'MEN'});
        response.status(200).json({
            products : products
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

/*
    @usage : GET Women's Collection
    @url :  /api/products/women
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/women', async (request , response) => {
    try {
        let products = await Product.find({category : 'WOMEN'});
        response.status(200).json({
            products : products
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

/*
    @usage : GET Kid's Collection
    @url :  /api/products/kids
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/kids', async (request , response) => {
    try {
        let products = await Product.find({category : 'KIDS'});
        response.status(200).json({
            products : products
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

/*
    @usage : Get a Product
    @url :  /api/products/:product_id
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/:product_id', async (request , response) => {
    let productId = request.params.product_id;
    try {
        let product = await Product.findById(productId);
        response.status(200).json({
            product : product
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

module.exports = router;