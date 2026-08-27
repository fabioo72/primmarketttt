import { supabase } from './supabase.js';

const TABLE = 'orders';

function rowToOrder(row) {
    if (!row) return null;
    return {
        id: row.id,
        product: row.product,
        email: row.email,
        priceEUR: Number(row.price_eur),
        coin: row.coin,
        address: row.address,
        expectedAmount: row.expected_amount,
        status: row.status,
        txHash: row.tx_hash,
        deliveryCode: row.delivery_code,
        createdAt: row.created_at ? new Date(row.created_at) : null,
        expiresAt: row.expires_at ? new Date(row.expires_at) : null,
        paidAt: row.paid_at ? new Date(row.paid_at) : null,
        deliveredAt: row.delivered_at ? new Date(row.delivered_at) : null,
    };
}

export async function createOrder(input) {
    const row = {
        id: input.id,
        product: input.product,
        email: input.email,
        price_eur: input.priceEUR,
        coin: input.coin,
        address: input.address,
        expected_amount: input.expectedAmount,
        status: 'pending',
        created_at: input.createdAt.toISOString(),
        expires_at: input.expiresAt.toISOString(),
    };
    const { data, error } = await supabase.from(TABLE).insert(row).select().single();
    if (error) throw error;
    return rowToOrder(data);
}

export async function getOrderById(id) {
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return rowToOrder(data);
}

export async function updateOrder(id, patch) {
    const row = {};
    if (patch.status !== undefined) row.status = patch.status;
    if (patch.txHash !== undefined) row.tx_hash = patch.txHash;
    if (patch.paidAt !== undefined) row.paid_at = patch.paidAt ? patch.paidAt.toISOString() : null;
    if (patch.deliveryCode !== undefined) row.delivery_code = patch.deliveryCode;
    if (patch.deliveredAt !== undefined) row.delivered_at = patch.deliveredAt ? patch.deliveredAt.toISOString() : null;
    const { data, error } = await supabase.from(TABLE).update(row).eq('id', id).select().single();
    if (error) throw error;
    return rowToOrder(data);
}

export async function listRecentOrders(limit = 200) {
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) throw error;
    return (data || []).map(rowToOrder);
}
