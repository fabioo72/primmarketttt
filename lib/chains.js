// Payment detectors per coin. Each returns { paid: boolean, txHash?: string }.
// Matches by (destination address, expected amount, order createdAt).
//
// - BTC via blockstream.info (no API key)
// - LTC via litecoinspace.org (Blockstream-compatible; no API key)
// - ETH via Etherscan (requires ETHERSCAN_API_KEY)
// - USDT/USDC (ERC-20) via Etherscan tokentx (requires ETHERSCAN_API_KEY)

const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY || '';

// Contract addresses for ERC-20 stablecoins on Ethereum mainnet.
// Users can override via env vars if needed.
const USDT_CONTRACT = (process.env.USDT_CONTRACT || '0xdAC17F958D2ee523a2206206994597C13D831ec7').toLowerCase();
const USDC_CONTRACT = (process.env.USDC_CONTRACT || '0xA0b86991c6218b3E8f5D89B23e5a2f1B8bD4E7A5c').toLowerCase();

// Amount match tolerance: 0.1 % of expected, with a small floor.
function amountMatches(actual, expected) {
    const a = Number(actual);
    const e = Number(expected);
    if (!isFinite(a) || !isFinite(e) || e <= 0) return false;
    const tol = Math.max(e * 0.001, 1e-9);
    return Math.abs(a - e) <= tol;
}

async function checkBTC(order) {
    const url = `https://blockstream.info/api/address/${order.address}/txs`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) return { paid: false };
    const txs = await res.json();
    const sinceSec = Math.floor(order.createdAt.getTime() / 1000) - 300;
    for (const tx of txs) {
        const t = tx.status && tx.status.block_time ? tx.status.block_time : Math.floor(Date.now() / 1000);
        if (t < sinceSec) continue;
        let received = 0;
        for (const vout of tx.vout || []) {
            if (vout.scriptpubkey_address === order.address) {
                received += (vout.value || 0) / 1e8;
            }
        }
        if (received > 0 && amountMatches(received, order.expectedAmount)) {
            return { paid: true, txHash: tx.txid };
        }
    }
    return { paid: false };
}

async function checkLTC(order) {
    const url = `https://litecoinspace.org/api/address/${order.address}/txs`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) return { paid: false };
    const txs = await res.json();
    const sinceSec = Math.floor(order.createdAt.getTime() / 1000) - 300;
    for (const tx of txs) {
        const t = tx.status && tx.status.block_time ? tx.status.block_time : Math.floor(Date.now() / 1000);
        if (t < sinceSec) continue;
        let received = 0;
        for (const vout of tx.vout || []) {
            if (vout.scriptpubkey_address === order.address) {
                received += (vout.value || 0) / 1e8;
            }
        }
        if (received > 0 && amountMatches(received, order.expectedAmount)) {
            return { paid: true, txHash: tx.txid };
        }
    }
    return { paid: false };
}

async function checkETH(order) {
    if (!ETHERSCAN_KEY) return { paid: false };
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${order.address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return { paid: false };
    const json = await res.json();
    if (json.status !== '1' || !Array.isArray(json.result)) return { paid: false };
    const sinceSec = Math.floor(order.createdAt.getTime() / 1000) - 300;
    for (const tx of json.result) {
        if (Number(tx.timeStamp) < sinceSec) continue;
        if ((tx.to || '').toLowerCase() !== order.address.toLowerCase()) continue;
        const eth = Number(tx.value) / 1e18;
        if (amountMatches(eth, order.expectedAmount)) {
            return { paid: true, txHash: tx.hash };
        }
    }
    return { paid: false };
}

async function checkERC20(order, contract, decimals) {
    if (!ETHERSCAN_KEY) return { paid: false };
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contract}&address=${order.address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return { paid: false };
    const json = await res.json();
    if (json.status !== '1' || !Array.isArray(json.result)) return { paid: false };
    const sinceSec = Math.floor(order.createdAt.getTime() / 1000) - 300;
    for (const tx of json.result) {
        if (Number(tx.timeStamp) < sinceSec) continue;
        if ((tx.to || '').toLowerCase() !== order.address.toLowerCase()) continue;
        if ((tx.contractAddress || '').toLowerCase() !== contract) continue;
        const amt = Number(tx.value) / Math.pow(10, decimals);
        if (amountMatches(amt, order.expectedAmount)) {
            return { paid: true, txHash: tx.hash };
        }
    }
    return { paid: false };
}

export async function checkPayment(order) {
    switch (order.coin) {
        case 'BTC': return checkBTC(order);
        case 'LTC': return checkLTC(order);
        case 'ETH': return checkETH(order);
        case 'USDT': return checkERC20(order, USDT_CONTRACT, 6);
        case 'USDC': return checkERC20(order, USDC_CONTRACT, 6);
        default: return { paid: false };
    }
}

export function walletAddressFor(coin) {
    switch (coin) {
        case 'BTC': return process.env.BTC_ADDRESS || '';
        case 'LTC': return process.env.LTC_ADDRESS || '';
        case 'ETH':
        case 'USDT':
        case 'USDC':
            return process.env.ETH_ADDRESS || '';
        default: return '';
    }
}
