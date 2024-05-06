const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { CreateOrder } = require('../services/orderService');

async function StripeCheckoutSession(user, productsData, successURL, cancelURL) {
    const line_items = productsData.map((product) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    description: product.description,
                    images: [product.imageURL],
                    metadata: {
                        product_id: product.id.toString()
                    }
                },
                unit_amount: product.price,
            },
            quantity: product.quantity,
        }
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        client_reference_id: user.id,
        customer_email: user.email,
        line_items: line_items,
        mode: 'payment',
        success_url: successURL,
        cancel_url: cancelURL,
        tax_id_collection: {
            enabled: true,
        }
    });
    return session;
}

async function StripeCheckoutComplete(requestBody, signature) {
    let event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    event = stripe.webhooks.constructEvent(requestBody, signature, webhookSecret);
    if (!event) { throw new Error("Error: Webhook event not constructed"); }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const retrievedSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items', 'line_items.data.price.product']
        });

        const productsData = retrievedSession.line_items.data.map((product) => {
            return {
                product_ID: product.price.product.metadata.product_id,
                quantity: product.quantity,
                unit_Price: product.price.unit_amount,
            }
        });

        const order = await CreateOrder(
            retrievedSession.client_reference_id,
            productsData,
            retrievedSession.amount_total,
            new Date(),
            "completed",
            "Stripe",
            retrievedSession.id,
            ""
        );
    }
}

module.exports = {
    StripeCheckoutSession,
    StripeCheckoutComplete
}