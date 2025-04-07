import React from 'react';
import './Layout.css'; // Optional if you want to extract styles

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <header style={{
        backgroundColor: '#247B7B',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
      }}>
        <h1 style={{ margin: 0 }}>PHP Project</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/features" style={{ color: 'white', textDecoration: 'none' }}>Features</a>
          <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          <a href="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</a>
        </nav>
      </header>

      {/* Main content */}
      <main style={{
        backgroundColor: '#3DB6B6',
        flex: 1,
        padding: '4rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start'
      }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
  {children}
</div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#247B7B',
        color: 'white',
        textAlign: 'center',
        padding: '0.75rem',
        fontSize: '0.9rem'
      }}>
        © Amal, Dina, James, Joey
      </footer>
    </div>
  );
};

export default Layout;
