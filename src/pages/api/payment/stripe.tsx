// This is an example of to protect an API route
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || '', { apiVersion: '2023-08-16' });

  if (session && session.token.accessToken) {
    const { amount } = req.query;

    console.log(session.token);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      customer: session.token.cusId
    });

    if (paymentIntent) {
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
