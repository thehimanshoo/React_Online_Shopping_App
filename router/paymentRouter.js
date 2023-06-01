const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authenticate = require('../middlewares/authenticate');
/*
    @usage : Make STRIPE payments
    @url : /api/payments/pay
    @fields : product , token
    @method : POST
    @access : PRIVATE
 */
router.post('/pay', authenticate, (request , response) => {
    const {product , token} = request.body;
    stripe.customers.create({
        email : token.email,
        source : token.id
    }).then(customer => stripe.charges.create({
        amount : product.price,
        description : product.name,
        currency : 'inr',
        customer : customer.id
    })).then(charge => response.status(200).json(charge))
        .catch(err => console.log(err));
});


module.exports = router;