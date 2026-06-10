import './globals.css';
import Navbar from './components/Navbar';


import CheckoutCloser from './components/CheckoutCloser';

export const metadata = {
  title: 'PrimeMarket | Premium Game Accounts',
  description: 'The best place to buy Twitch Prime and game accounts with instant delivery.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CheckoutCloser />
        <main style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
          {children}
        </main>
        <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div className="container">
            <p>&copy; 2025 PrimeMarket. All rights reserved.</p>
          </div>
        </footer>
        <script src="https://platform.billgang.com/embed.js"></script>
      </body>
    </html>
  );
}
