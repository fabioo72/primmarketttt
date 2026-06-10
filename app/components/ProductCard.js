export default function ProductCard({ title, price, description, icon = "🎮", billgangPath, billgangDomain }) {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                height: '220px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <img
                    src="/front.jpg"
                    alt={title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />

                {/* Gradient Overlay for better contrast if we wanted text over image, but here just for polish */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '80px',
                    background: 'linear-gradient(to top, var(--surface) 0%, transparent 100%)',
                    opacity: 0.6
                }} />
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px' }}>{title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', minHeight: '50px' }}>
                        {description}
                    </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Starting at</span>
                        <span style={{ fontSize: '1.75rem', fontWeight: '700', color: 'white' }}>{price}</span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        {...(billgangPath ? { 'data-billgang-product-path': billgangPath } : {})}
                        {...(billgangDomain ? { 'data-billgang-domain': billgangDomain } : {})}
                        style={{ padding: '12px 28px' }}
                    >
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}
