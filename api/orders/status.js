import { getOrderById, updateOrder } from '../../lib/orders.js';
import { checkPayment } from '../../lib/chains.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const id = String(req.query.id || '').trim();
    if (!id) return res.status(400).json({ error: 'Missing id' });

    try {
        let order = await getOrderById(id);
        if (!order) return res.status(404).json({ error: 'Not found' });

        const now = new Date();
        if (order.status === 'pending' && order.expiresAt < now) {
            order = await updateOrder(order.id, { status: 'expired' });
        }

        if (order.status === 'pending') {
            try {
                const result = await checkPayment(order);
                if (result.paid) {
                    order = await updateOrder(order.id, {
                        status: 'paid',
                        txHash: result.txHash || null,
                        paidAt: new Date(),
                    });
                }
            } catch (e) {
                console.warn('chain check failed', e);
            }
        }

        return res.status(200).json({
            id: order.id,
            product: order.product,
            coin: order.coin,
            address: order.address,
            expectedAmount: order.expectedAmount,
            status: order.status,
            txHash: order.txHash,
            deliveryCode: order.status === 'delivered' ? order.deliveryCode : null,
            expiresAt: order.expiresAt,
            paidAt: order.paidAt,
            deliveredAt: order.deliveredAt,
        });
    } catch (err) {
        console.error('status error', err);
        return res.status(500).json({ error: 'Failed to fetch order' });
    }
}
