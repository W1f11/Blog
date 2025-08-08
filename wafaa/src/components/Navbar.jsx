import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 760;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // fermer menu si on passe desktop
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    navbar: {
      backgroundColor: '#3a78b4',
      padding: '20px 20px',
      display: 'flex',
      justifyContent: isMobile ? 'space-between' : 'flex-end',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      top: 0,
      left: 0,
    },
    navButtons: {
      display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '15px' : '100px',
      marginRight: isMobile ? '0' : '80px',
      alignItems: isMobile ? 'center' : 'flex-start',
      position: isMobile ? 'absolute' : 'static',
      top: isMobile ? '60px' : 'auto',
      right: isMobile ? '20px' : 'auto',
      backgroundColor: isMobile ? '#3a78b4' : 'transparent',
      borderRadius: isMobile ? '8px' : '0',
      padding: isMobile ? '10px 20px' : '0',
      zIndex: 1000,
    },
    btn: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      padding: '10px 25px',
      borderRadius: '12px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      textAlign: 'center',
      width: isMobile ? '150px' : 'auto',
      cursor: 'pointer',
    },
    highlight: {
      backgroundColor: '#9ed7f7',
      color: '#2d6ca0',
    },
    burger: {
      fontSize: '28px',
      color: 'white',
      cursor: 'pointer',
      display: isMobile ? 'block' : 'none',
      userSelect: 'none',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={{ fontWeight: 'bold', color: 'white' }}>LOGO</div>
      <div
        style={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu Toggle"
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') setMenuOpen(!menuOpen); }}
      >
        ☰
      </div>
      <div style={styles.navButtons}>
        <a href="#" style={styles.btn} onClick={() => setMenuOpen(false)}>Publier</a>
        <a href="#articles-section" style={styles.btn} onClick={() => setMenuOpen(false)}>Articles</a>
        <a href="#" style={{ ...styles.btn, ...styles.highlight }} onClick={() => setMenuOpen(false)}>Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;
