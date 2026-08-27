import crypto from 'crypto';
import { createOrder } from '../../lib/orders.js';
import { getPrices, eurToCoin } from '../../lib/prices.js';
import { walletAddressFor } from '../../lib/chains.js';

const PRODUCTS = {
    'twitch-prime': { name: 'Twitch Prime Subscription', priceEUR: 0.5 },
};

const ORDER_TTL_MS = 30 * 60 * 1000;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    const productKey = String(body.product || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const coin = String(body.coin || '').trim().toUpperCase();

    if (!PRODUCTS[productKey]) return res.status(400).json({ error: 'Unknown product' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
    if (!['BTC', 'LTC', 'ETH', 'USDT'].includes(coin)) return res.status(400).json({ error: 'Unsupported coin' });

    const address = walletAddressFor(coin);
    if (!address) return res.status(503).json({ error: `Wallet address for ${coin} is not configured` });

    try {
        const prices = await getPrices();
        const priceEUR = PRODUCTS[productKey].priceEUR;
        const jitterSeed = crypto.randomInt(0, 1000);
        const expectedAmount = eurToCoin(priceEUR, coin, prices[coin], jitterSeed);
        const id = 'PM-' + crypto.randomBytes(4).toString('hex').toUpperCase();
        const now = new Date();
        const order = await createOrder({
            id,
            product: PRODUCTS[productKey].name,
            email,
            priceEUR,
            coin,
            address,
            expectedAmount,
            createdAt: now,
            expiresAt: new Date(now.getTime() + ORDER_TTL_MS),
        });

        return res.status(201).json({
            id: order.id,
            product: order.product,
            coin: order.coin,
            address: order.address,
            expectedAmount: order.expectedAmount,
            priceEUR: order.priceEUR,
            expiresAt: order.expiresAt,
        });
    } catch (err) {
        console.error('create order error', err);
        return res.status(500).json({ error: 'Failed to create order' });
    }
}
