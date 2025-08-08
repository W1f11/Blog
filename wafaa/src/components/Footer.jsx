// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1e2a33',   // couleur sombre
      color: '#fff',
      padding: '40px 60px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      position: 'relative',
      
    }}>
      <div>
        <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Help</h4>
        <p style={{ margin: '5px 0' }}>Help Center</p>
        <p style={{ margin: '5px 0' }}>Help Forum</p>
        <p style={{ margin: '5px 0' }}>Video Tutorials</p>
      </div>
      <div>
        <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Community</h4>
        <p style={{ margin: '5px 0' }}>Blogger Buzz</p>
      </div>
      <div>
        <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Developers</h4>
        <p style={{ margin: '5px 0' }}>Blogger API</p>
        <p style={{ margin: '5px 0' }}>Developer Forum</p>
      </div>
    </footer>
  );
};

export default Footer;
