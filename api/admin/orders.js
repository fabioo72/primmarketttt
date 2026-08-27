import { listRecentOrders } from '../../lib/orders.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = process.env.ADMIN_TOKEN;
    if (!token) return res.status(503).json({ error: 'ADMIN_TOKEN not configured' });
    const header = req.headers['authorization'] || '';
    const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (provided !== token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const orders = await listRecentOrders(200);
        return res.status(200).json({ orders });
    } catch (err) {
        console.error('admin list error', err);
        return res.status(500).json({ error: 'Failed to list orders' });
    }
}
