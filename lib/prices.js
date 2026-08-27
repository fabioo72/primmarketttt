// EUR → coin conversion using the free CoinGecko simple-price endpoint.
// Cached in-process to survive repeated warm invocations of the same lambda.

const COIN_IDS = {
    BTC: 'bitcoin',
    LTC: 'litecoin',
    ETH: 'ethereum',
    USDT: 'tether',
    USDC: 'usd-coin',
};

let cache = { at: 0, prices: null };
const TTL_MS = 60_000;

async function fetchPrices() {
    const ids = Object.values(COIN_IDS).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
    const json = await res.json();
    const prices = {};
    for (const [sym, id] of Object.entries(COIN_IDS)) {
        const eur = json[id] && json[id].eur;
        if (typeof eur !== 'number' || eur <= 0) {
            throw new Error(`Missing EUR price for ${sym}`);
        }
        prices[sym] = eur;
    }
    return prices;
}

export async function getPrices() {
    const now = Date.now();
    if (cache.prices && now - cache.at < TTL_MS) return cache.prices;
    const prices = await fetchPrices();
    cache = { at: now, prices };
    return prices;
}

// Convert an EUR amount to the given coin's native units, with a small
// per-order jitter so concurrent orders never collide on the same amount.
// Returns the amount as a fixed-precision string.
export function eurToCoin(eurAmount, coinSymbol, priceEurPerCoin, jitterSeed) {
    const decimals = coinSymbol === 'BTC' || coinSymbol === 'LTC' ? 8 : 6;
    const base = eurAmount / priceEurPerCoin;
    // Jitter: add up to ~0.5% of the base, deterministic from the seed
    const jitterFrac = ((jitterSeed % 1000) / 1000) * 0.005;
    const withJitter = base * (1 + jitterFrac);
    return withJitter.toFixed(decimals);
}
