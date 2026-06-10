'use client';
import { useEffect, useState } from 'react';

export default function CheckoutCloser() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkBillgang = () => {
            // Check for iframes with 'billgang' or 'bgng' in src, or just ANY iframe
            // This ensures we catch the modal even if the domain/src is different than expected
            const iframe = document.querySelector('iframe[src*="billgang"]') ||
                document.querySelector('iframe[src*="bgng"]') ||
                document.querySelector('iframe');

            setIsVisible(!!iframe);
        };

        const interval = setInterval(checkBillgang, 500);
        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <button
            onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe) iframe.remove();
                setTimeout(() => window.location.reload(), 100);
            }}
            className="btn"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 2147483647,
                backgroundColor: 'rgba(9, 9, 11, 0.85)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                fontWeight: '500',
                padding: '10px 20px',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.borderColor = '#ef4444';
                e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(9, 9, 11, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <span style={{ fontSize: '1.2em' }}>✕</span>
            <span>Cancel Checkout</span>
        </button>
    );
}
