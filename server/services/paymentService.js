const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Should use data from the frontend for the product data
async function StripeCheckoutSession(user) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        client_reference_id: user.id,
        customer_email: user.email,
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Awesome Product',
                    description: "A very cool product",
                    images: ["https://example.com/t-shirt.png"],
                },
                unit_amount: 1000,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://your-domain.com/success',
        cancel_url: 'https://your-domain.com/cancel',
        tax_id_collection: {
            enabled: true,
        }
    });
    console.log(session)
}

async function StripeCheckoutComplete(requestBody, signature) {
    let event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    event = stripe.webhooks.constructEvent(requestBody, signature, webhookSecret);
    if(!event) {throw new Error("Error: Webhook event not constructed");}

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log(session);
    }
}

module.exports = {
    StripeCheckoutSession,
    StripeCheckoutComplete
}