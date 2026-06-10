'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('tickets');
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // For Ticket Detail View
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check session
        if (sessionStorage.getItem('admin_session') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTickets();
            const interval = setInterval(fetchTickets, 3000); // Poll every 3s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        // SIMPLE PASSWORD - Change this if needed!
        if (password === 'xwave') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_session', 'true');
        } else {
            alert('Incorrect Password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--background)',
                color: 'white'
            }}>
                <form onSubmit={handleLogin} className="card" style={{ padding: '40px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white' }}
                    />
                    <button className="btn btn-primary" type="submit">Login</button>
                    <a href="/" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Back to Home</a>
                </form>
            </div>
        );
    }

    // ... Main Admin Content ...
    const fetchTickets = async () => {
        try {
            const res = await fetch('/api/tickets', {
                headers: { 'x-admin-secret': 'admin123' } // Authenticate
            });
            if (res.ok) {
                const data = await res.json();
                setTickets(Array.isArray(data) ? [...data].reverse() : []); // Copy before reverse to match new usage

                // Update selected ticket if it's open
                if (selectedTicket) {
                    const updated = data.find(t => t.id === selectedTicket.id);
                    if (updated) setSelectedTicket(updated);
                }
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        try {
            const res = await fetch(`/api/tickets/${selectedTicket.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: replyMessage,
                    role: 'admin'
                })
            });

            if (res.ok) {
                setReplyMessage('');
                fetchTickets(); // Refresh
            }
        } catch (err) {
            alert('Failed to reply');
        }
    };

    const closeTicket = async () => {
        if (!confirm('Close this ticket?')) return;
        await fetch(`/api/tickets/${selectedTicket.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Ticket closed by admin.', status: 'closed', role: 'system' })
        });
        fetchTickets();
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: '100vh', position: 'fixed', inset: 0, background: 'var(--background)', zIndex: 9999 }}>
            {/* Sidebar */}
            <aside style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '24px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '40px' }}>
                    <span className="text-gradient">Prime</span>Admin
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        style={{
                            all: 'unset', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                            background: activeTab === 'dashboard' ? 'var(--surface-hover)' : 'transparent',
                            color: activeTab === 'dashboard' ? 'white' : 'var(--text-secondary)'
                        }}>
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('tickets')}
                        style={{
                            all: 'unset', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                            background: activeTab === 'tickets' ? 'var(--surface-hover)' : 'transparent',
                            color: activeTab === 'tickets' ? 'white' : 'var(--text-secondary)'
                        }}>
                        Tickets
                        {tickets.filter(t => t.status === 'open').length > 0 && (
                            <span style={{ marginLeft: 'auto', background: 'var(--primary)', color: 'white', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', float: 'right' }}>
                                {tickets.filter(t => t.status === 'open').length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            all: 'unset', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                            color: 'var(--text-secondary)', marginTop: 'auto'
                        }}>
                        ← Back to Site
                    </button>
                </nav>
            </aside>

            {/* Content */}
            <main style={{ padding: '40px', overflowY: 'auto' }}>
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Dashboard</h2>
                        <div className="grid grid-cols-3">
                            <div className="card" style={{ padding: '24px' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Tickets</div>
                                <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '8px' }}>{tickets.length}</div>
                            </div>
                            <div className="card" style={{ padding: '24px' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Open Tickets</div>
                                <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '8px', color: '#fbbf24' }}>
                                    {tickets.filter(t => t.status === 'open').length}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'tickets' && (
                    <div style={{ display: 'grid', gridTemplateColumns: selectedTicket ? '350px 1fr' : '1fr', gap: '24px', height: 'calc(100vh - 80px)' }}>
                        {/* Ticket List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '12px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Inbox</h2>
                            {loading ? <p>Loading...</p> : tickets.map(ticket => (
                                <div
                                    key={ticket.id}
                                    onClick={() => setSelectedTicket(ticket)}
                                    className="card"
                                    style={{
                                        padding: '16px',
                                        cursor: 'pointer',
                                        border: selectedTicket?.id === ticket.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                                        opacity: ticket.status === 'closed' ? 0.6 : 1
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '600' }}>{ticket.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {ticket.subject}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            background: ticket.status === 'open' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(113, 113, 122, 0.2)',
                                            color: ticket.status === 'open' ? '#fbbf24' : '#a1a1aa'
                                        }}>
                                            {ticket.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat View */}
                        {selectedTicket ? (
                            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                                {/* Header */}
                                <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{selectedTicket.subject}</h3>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            From: {selectedTicket.name} ({selectedTicket.email}) • Discord: {selectedTicket.discord || 'N/A'}
                                        </div>
                                    </div>
                                    {selectedTicket.status === 'open' && (
                                        <button onClick={closeTicket} className="btn" style={{ fontSize: '0.85rem', padding: '8px 16px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                                            Close Ticket
                                        </button>
                                    )}
                                </div>

                                {/* Messages */}
                                <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {selectedTicket.messages.map((msg, i) => (
                                        <div key={i} style={{
                                            alignSelf: msg.role === 'admin' ? 'flex-end' : 'flex-start',
                                            maxWidth: '80%',
                                        }}>
                                            <div style={{
                                                background: msg.role === 'admin' ? 'var(--primary)' : 'var(--surface-hover)',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                borderBottomRightRadius: msg.role === 'admin' ? '4px' : '12px',
                                                borderBottomLeftRadius: msg.role === 'user' ? '4px' : '12px',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.5'
                                            }}>
                                                {msg.content}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', textAlign: msg.role === 'admin' ? 'right' : 'left' }}>
                                                {msg.role === 'system' ? 'System' : (msg.role === 'admin' ? 'You' : selectedTicket.name)} • {new Date(msg.timestamp).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Reply Input */}
                                <form onSubmit={handleReply} style={{ padding: '20px', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <input
                                            disabled={selectedTicket.status === 'closed'}
                                            type="text"
                                            placeholder={selectedTicket.status === 'closed' ? "This ticket is closed." : "Type your reply..."}
                                            value={replyMessage}
                                            onChange={e => setReplyMessage(e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid var(--border)',
                                                background: 'var(--background)',
                                                color: 'white',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                        <button
                                            disabled={selectedTicket.status === 'closed'}
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                Select a ticket to view conversation
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
