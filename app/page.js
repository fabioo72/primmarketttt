"use client";
// Force git update

import { useState } from "react";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [discordPopupOpen, setDiscordPopupOpen] = useState(false);

  const products = [
    {
      title: "Twitch Prime Subscriptions",
      price: "0.50 €",
      description: "Get your Twitch Prime Subscription Now!",
      icon: "👾",
      billgangPath: "twitch-prime",
      billgangDomain: "primemarket101.bgng.io",
    },
  ];

  return (
    <>
      <section
        style={{
          padding: "120px 0 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Abstract Background Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(9, 9, 11, 0) 70%)",
            zIndex: -1,
          }}
        />

        <div className="container">
          <h1
            style={{
              fontSize: "4.5rem",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "24px",
              letterSpacing: "-1px",
            }}
          >
            Unlock <span className="text-gradient">Prime</span> Subs.
            <br />
            NOW.
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: "1.6",
            }}
          >
            The #1 marketplace for Twitch Prime accounts and exclusive gaming loot.
            24/7 support, and unbeatable prices.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <a
              href="#products"
              className="btn btn-primary"
              style={{ padding: "16px 36px", fontSize: "1.1rem" }}
            >
              Browse Shop
            </a>

            <button
              className="btn"
              onClick={() => setDiscordPopupOpen(true)}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "white",
                padding: "16px 36px",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Discord
            </button>
          </div>

          <div
            style={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚡</span> Instant Delivery
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🛡️</span> Secure Payments
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>💬</span> 24/7 Support
            </div>
          </div>
        </div>
      </section>

      {/* DISCORD POPUP */}
      {discordPopupOpen && (
        <div
          onClick={() => setDiscordPopupOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "22px",
              color: "white",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Support</h3>
              <button
                onClick={() => setDiscordPopupOpen(false)}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "white",
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <p
              style={{
                marginTop: "12px",
                color: "var(--text-secondary)",
                lineHeight: "1.55",
              }}
            >
              If you have any problems, feel free to DM me at any time:
            </p>

            {/* DISCORD CONTACT + COPY BUTTON */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "6px",
              }}
            >
              <span style={{ color: "white", fontWeight: 700 }}>
                935328161753858098 dc : (gammi)
              </span>

              <button
                onClick={() => navigator.clipboard.writeText("gammi")}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Copy
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "18px",
              }}
            >
              <button
                onClick={() => setDiscordPopupOpen(false)}
                className="btn"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="products" style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "8px" }}>
              Start Your Subscription
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Instant delivery to your account
            </p>

            <div style={{
              marginTop: '24px',
              padding: '12px 20px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '100px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>💎</span>
              <span style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: '500' }}>
                Pay with <strong>BTC, LTC, ETH</strong>? <a href="/support" style={{ textDecoration: 'underline', color: 'inherit' }}>Open a ticket</a>
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "450px",
              margin: "0 auto",
            }}
          >
            {products.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
