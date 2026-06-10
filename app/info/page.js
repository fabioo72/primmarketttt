"use client";

import { useState } from "react";

export default function InfoPage() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <section
                style={{
                    padding: "120px 0 60px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background Glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "500px",
                        height: "500px",
                        background:
                            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(9, 9, 11, 0) 70%)",
                        zIndex: -1,
                    }}
                />

                <div className="container">
                    <h1
                        style={{
                            fontSize: "3.5rem",
                            fontWeight: "800",
                            marginBottom: "20px",
                            letterSpacing: "-1px",
                        }}
                    >
                        How It <span className="text-gradient">Works</span>
                    </h1>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "var(--text-secondary)",
                            maxWidth: "600px",
                            margin: "0 auto",
                            lineHeight: "1.6",
                        }}
                    >
                        Transparent, safe, and effective. Everything you need to know about our
                        Prime subscription service.
                    </p>
                </div>
            </section>

            <section style={{ padding: "0 0 80px" }}>
                <div className="container">
                    {/* Key Features Grid */}
                    <div className="grid grid-cols-3" style={{ marginBottom: "60px" }}>
                        <div className="card" style={{ padding: "32px" }}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "16px",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    width: "60px",
                                    height: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                💰
                            </div>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
                                Revenue Boost
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                Each subscription grants <strong>$1.20 - $2.20</strong> to your
                                channel's revenue, depending on local taxes in your country.
                            </p>
                        </div>

                        <div className="card" style={{ padding: "32px" }}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "16px",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    width: "60px",
                                    height: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                ✅
                            </div>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
                                Easy Requirements
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                All you need to get subscriptions is a Twitch <strong>Affiliate</strong> or <strong>Partner</strong> account. No other requirements needed.
                            </p>
                        </div>

                        <div className="card" style={{ padding: "32px" }}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "16px",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    width: "60px",
                                    height: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                🛡️
                            </div>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
                                100% Safe
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                All subs come from old, real accounts. Twitch will <strong>never</strong> ban or suspend
                                you for using our service. No free trial shells.
                            </p>
                        </div>

                        <div className="card" style={{ padding: "32px" }}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "16px",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    width: "60px",
                                    height: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                💧
                            </div>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
                                Drip-Feed System
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                We use a smart drip-feed service sending only <strong>1–10 subscribers daily</strong> to maximize your safety and payout chances.
                            </p>
                        </div>

                        <div className="card" style={{ padding: "32px" }}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "16px",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    width: "60px",
                                    height: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                🚚
                            </div>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
                                Shipping Time
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                Shipping times for subs are usually between <strong>0 and 72 hours</strong>. We prioritize quality delivery over rush.
                            </p>
                        </div>

                        <div className="card"
                            style={{
                                padding: "32px",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                background: "rgba(239, 68, 68, 0.05)" // Subtle red tint for warning
                            }}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "16px",
                                    background: "rgba(239, 68, 68, 0.1)",
                                    width: "60px",
                                    height: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    color: "#ef4444"
                                }}
                            >
                                ⚠️
                            </div>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#ef4444" }}>
                                Important Note
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                                Do <strong>not</strong> abuse this service. Do not buy 100 subscribers in one day for an inactive channel. Responsibility for use lies with the user; only delivery is guaranteed.
                            </p>
                        </div>
                    </div>

                    {/* Proof Section */}
                    <div style={{ marginTop: "100px" }}>
                        <div style={{ textAlign: "center", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "12px" }}>
                                Proof of <span className="text-gradient">Success</span>
                            </h2>
                            <p style={{ color: "var(--text-secondary)" }}>
                                See recent payouts and satisfied channel partners. Click to enlarge.
                            </p>
                        </div>

                        <div className="grid grid-cols-3" style={{ alignItems: 'start' }}>
                            {[
                                "proof1.jpg",
                                "proof2.jpg",
                                "proof3.jpg",
                                "proof4.jpg",
                                "proof5.jpg"
                            ].map((filename, i) => (
                                <div
                                    key={i}
                                    className="card"
                                    onClick={() => setSelectedImage(filename)}
                                    style={{
                                        overflow: 'hidden',
                                        position: 'relative',
                                        background: '#1c1c21',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <img
                                        src={`/${filename}`}
                                        alt={`Proof ${i + 1}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0.3)',
                                        opacity: 0,
                                        transition: 'opacity 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                        onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                                        onMouseOut={(e) => e.currentTarget.style.opacity = 0}
                                    >
                                        <span style={{ fontSize: '1.5rem' }}>🔍</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <p style={{ fontSize: '0.9rem', color: "var(--text-secondary)", fontStyle: 'italic' }}>More proofs soon.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Screen Image Modal */}
            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.9)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        cursor: 'zoom-out'
                    }}
                >
                    <img
                        src={`/${selectedImage}`}
                        alt="Full Size Proof"
                        onClick={(e) => e.stopPropagation()} // Prevent closing if clicking image itself (optional)
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                            cursor: 'default'
                        }}
                    />
                    <button
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    );
}
