const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeController = async (req,res) =>{
    // console.log(req.body)
    const {purchase,total_amount, shipping_fee}= req.body;
    // res.send('stripe route')
    
    const calculateOrderAmount = () =>{
        return total_amount+shipping_fee;
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount:calculateOrderAmount(),
        currency:'INR',
    });
   // console.log(paymentIntent);
    res.json({clientSecret:paymentIntent.client_secret });

};

module.exports = stripeController;
