import { getOrderById, updateOrder } from '../../lib/orders.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = process.env.ADMIN_TOKEN;
    if (!token) return res.status(503).json({ error: 'ADMIN_TOKEN not configured' });
    const header = req.headers['authorization'] || '';
    const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (provided !== token) return res.status(401).json({ error: 'Unauthorized' });

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    const id = String(body.id || '').trim();
    const deliveryCode = String(body.deliveryCode || '').trim();
    if (!id || !deliveryCode) return res.status(400).json({ error: 'Missing id or deliveryCode' });

    try {
        const order = await getOrderById(id);
        if (!order) return res.status(404).json({ error: 'Not found' });
        if (order.status !== 'paid') return res.status(409).json({ error: `Order is ${order.status}, not paid` });

        await updateOrder(id, {
            status: 'delivered',
            deliveryCode,
            deliveredAt: new Date(),
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('deliver error', err);
        return res.status(500).json({ error: 'Failed to deliver' });
    }
}
