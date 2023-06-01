const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const Order = require('../models/Order');
const User = require('../models/User');
const {body , validationResult} = require('express-validator');

/*
    @usage : Place an Order
    @url : /api/orders/
    @fields : items , tax , total
    @method : POST
    @access : PRIVATE
 */
router.post('/', authenticate, [
    body('items').notEmpty().withMessage('Items Required'),
    body('tax').notEmpty().withMessage('Tax Required'),
    body('total').notEmpty().withMessage('Total Required'),
] , async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()});
    }
    try {
        let {items , tax , total} = request.body;

        let user = await User.findById(request.user.id);
        let order = new Order({
            name : user.name,
            email : user.email,
            mobile : user.address.mobile,
            total : total,
            tax : tax,
            items : items
        });
        order = await order.save();
        response.status(200).json({
            msg : 'Order is Placed',
            order : order
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

/*
    @usage : Get All Orders
    @url : /api/orders/all
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
router.get('/all' , authenticate , async (request , response) => {
    try {
        let user = await User.findById(request.user.id);
        let orders = await Order.find({email : user.email});
        response.status(200).json({orders : orders});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
})

module.exports = router;