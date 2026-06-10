'use client';

import { useState, useEffect } from 'react';

export default function SupportPage() {
    const [view, setView] = useState('create'); // 'create' | 'track'

    // Create Ticket State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        discord: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [createdTicketId, setCreatedTicketId] = useState(null);

    // Track Ticket State
    const [trackId, setTrackId] = useState('');
    const [trackedTicket, setTrackedTicket] = useState(null);
    const [trackLoading, setTrackLoading] = useState(false);
    const [trackError, setTrackError] = useState('');
    const [userReply, setUserReply] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                setCreatedTicketId(data.id);
                setStatus('success');
                setFormData({ name: '', email: '', discord: '', subject: '', message: '' });
                // Auto-switch to tracking this new ticket
                setTrackId(data.id);
                localStorage.setItem('pm_last_ticket_id', data.id);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    // Load Last Ticket from LocalStorage
    useEffect(() => {
        const savedId = localStorage.getItem('pm_last_ticket_id');
        if (savedId) {
            setTrackId(savedId);
        }
    }, []);

    const handleTrack = async (e) => {
        if (e) e.preventDefault(); // Handle both event and manual call
        if (!trackId.trim()) return;

        // Only set loading on first fetch
        if (!trackedTicket) setTrackLoading(true);
        setTrackError('');
        setTrackedTicket(null);

        try {
            const res = await fetch(`/api/tickets/${trackId}`);
            if (res.ok) {
                const data = await res.json();
                setTrackedTicket(data);
            } else {
                setTrackError('Ticket not found.');
            }
        } catch (err) {
            setTrackError('Error fetching ticket.');
        } finally {
            setTrackLoading(false);
        }
    };

    // Live Polling for Tracked Ticket
    useEffect(() => {
        let interval;
        if (trackedTicket && trackedTicket.status === 'open') {
            interval = setInterval(() => {
                handleTrack();
            }, 3000); // Poll every 3 seconds
        }
        return () => clearInterval(interval);
    }, [trackedTicket]);

    const handleUserReply = async (e) => {
        e.preventDefault();
        if (!userReply.trim()) return;

        try {
            const res = await fetch(`/api/tickets/${trackedTicket.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userReply,
                    role: 'user'
                })
            });

            if (res.ok) {
                setUserReply('');
                // Refresh ticket
                const refreshRes = await fetch(`/api/tickets/${trackedTicket.id}`);
                const refreshData = await refreshRes.json();
                setTrackedTicket(refreshData);
            }
        } catch (err) {
            alert('Failed to send reply');
        }
    };

    return (
        <section style={{ padding: '120px 0 80px', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>
                        Support <span className="text-gradient">Center</span>
                    </h1>

                    {/* Tabs */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                        background: 'var(--surface)',
                        padding: '6px',
                        borderRadius: '12px',
                        width: 'fit-content',
                        margin: '0 auto'
                    }}>
                        <button
                            onClick={() => setView('create')}
                            style={{
                                background: view === 'create' ? 'var(--primary)' : 'transparent',
                                color: view === 'create' ? 'white' : 'var(--text-secondary)',
                                border: 'none',
                                padding: '8px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            New Ticket
                        </button>
                        <button
                            onClick={() => setView('track')}
                            style={{
                                background: view === 'track' ? 'var(--primary)' : 'transparent',
                                color: view === 'track' ? 'white' : 'var(--text-secondary)',
                                border: 'none',
                                padding: '8px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            Check Status
                        </button>
                    </div>
                </div>

                {view === 'create' ? (
                    // ... CREATE VIEW ...
                    status === 'success' ? (
                        <div className="card" style={{ padding: '40px', textAlign: 'center', borderColor: '#22c55e' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Ticket Created!</h3>
                            <div style={{ marginBottom: '32px' }}>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>Your Ticket ID:</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                    <div style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '700',
                                        background: 'var(--surface)',
                                        padding: '12px 24px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        letterSpacing: '1px',
                                        userSelect: 'all'
                                    }}>
                                        {createdTicketId}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            navigator.clipboard.writeText(createdTicketId);
                                            const originalHTML = e.currentTarget.innerHTML;
                                            e.currentTarget.innerHTML = '✅ Copied';
                                            setTimeout(() => e.target.innerHTML = originalHTML, 2000);
                                        }}
                                        className="btn"
                                        style={{
                                            background: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            color: 'white',
                                            padding: '12px 20px',
                                            borderRadius: '12px',
                                            cursor: 'pointer'
                                        }}
                                        title="Copy to clipboard"
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px', maxWidth: '400px', margin: '12px auto 0' }}>
                                    Please save this ID. You will need it to check for replies or pay with crypto.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setStatus('idle');
                                        setView('track');
                                        setTrackId(createdTicketId);
                                        // Auto trigger fetch (optional, but convenient)
                                        setTimeout(() => document.getElementById('track-btn').click(), 100);
                                    }}
                                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'white' }}
                                >
                                    View Ticket
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setStatus('idle')}
                                >
                                    New Ticket
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white', fontFamily: 'inherit' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Discord (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="username#1234"
                                        value={formData.discord}
                                        onChange={e => setFormData({ ...formData, discord: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white', fontFamily: 'inherit' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Subject</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    placeholder="Describe your issue..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white', fontFamily: 'inherit', resize: 'vertical' }}
                                />
                            </div>

                            <button
                                disabled={status === 'submitting'}
                                type="submit"
                                className="btn btn-primary"
                                style={{ padding: '14px', marginTop: '10px' }}
                            >
                                {status === 'submitting' ? 'Submitting...' : 'Submit Ticket'}
                            </button>

                            {status === 'error' && (
                                <p style={{ color: '#ef4444', textAlign: 'center' }}>Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )
                ) : (
                    // ... TRACK VIEW ...
                    <div className="card" style={{ padding: '32px', minHeight: '400px' }}>
                        {!trackedTicket ? (
                            <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '1.2rem' }}>Enter Ticket ID</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. 9ka29s1z"
                                        value={trackId}
                                        onChange={e => setTrackId(e.target.value)}
                                        style={{
                                            width: '100%',
                                            maxWidth: '300px',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--background)',
                                            color: 'white',
                                            fontFamily: 'inherit',
                                            fontSize: '1.1rem',
                                            textAlign: 'center',
                                            letterSpacing: '2px'
                                        }}
                                    />
                                    {trackError && <p style={{ color: '#ef4444', marginTop: '12px' }}>{trackError}</p>}
                                </div>
                                <button
                                    id="track-btn"
                                    disabled={trackLoading}
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: '200px' }}
                                >
                                    {trackLoading ? 'Searching...' : 'View Ticket'}
                                </button>
                            </form>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
                                <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{trackedTicket.subject}</h3>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            Status: <span style={{ color: trackedTicket.status === 'open' ? '#fbbf24' : '#a1a1aa', fontWeight: 'bold' }}>{trackedTicket.status.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setTrackedTicket(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Close</button>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '8px', marginBottom: '20px' }}>
                                    {trackedTicket.messages.map((msg, i) => (
                                        <div key={i} style={{
                                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                            maxWidth: '85%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                                        }}>
                                            <div style={{
                                                background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface-hover)',
                                                padding: '12px 16px',
                                                borderRadius: '16px',
                                                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                                                borderBottomLeftRadius: msg.role !== 'user' ? '4px' : '16px',
                                                color: 'white',
                                                lineHeight: '1.5'
                                            }}>
                                                {msg.content}
                                            </div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                                {msg.role === 'user' ? 'You' : (msg.role === 'system' ? 'System' : 'Support')} • {new Date(msg.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {trackedTicket.status === 'open' ? (
                                    <form onSubmit={handleUserReply} style={{ display: 'flex', gap: '12px' }}>
                                        <input
                                            type="text"
                                            placeholder="Type a reply..."
                                            value={userReply}
                                            onChange={e => setUserReply(e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: '14px',
                                                borderRadius: '12px',
                                                border: '1px solid var(--border)',
                                                background: 'var(--background)',
                                                color: 'white'
                                            }}
                                        />
                                        <button className="btn btn-primary" type="submit">Send</button>
                                    </form>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                                        This ticket has been closed.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Version Indicator */}
            <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.5 }}>
                System v2.0 (MongoDB Active)
            </div>
        </section>
    );
}
