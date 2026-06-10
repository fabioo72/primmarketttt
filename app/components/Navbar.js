'use client';

import Link from 'next/link';


export default function Navbar() {
    return (
        <nav className="glass" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: '20px 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                    <span className="text-gradient">Prime</span>Market
                </Link>

                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <Link href="/support" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}
                        onMouseOver={(e) => e.target.style.color = 'white'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Support
                    </Link>
                    <Link href="/" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}
                        onMouseOver={(e) => e.target.style.color = 'white'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Home
                    </Link>
                    <Link href="/info" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}
                        onMouseOver={(e) => e.target.style.color = 'white'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Info
                    </Link>
                    <Link href="/#products" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}
                        onMouseOver={(e) => e.target.style.color = 'white'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Shop
                    </Link>
                </div>

                <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                    Cart (0)
                </button>
            </div>
        </nav>
    );
}
