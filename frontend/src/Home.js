import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/start');
    }
  return (
    <div style={styles.landingPage}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Stock Market Analysis</h1>
        <p style={styles.heroSubtitle}>
          Your one-stop solution for real-time market insights and data-driven predictions.
        </p>
        <button style={styles.getStartedBtn} onClick = {handleGetStarted}>Get Started</button>
      </div>

      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Features</h2>
        <div style={styles.features}>
          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>Real-Time Data</h3>
            <p style={styles.featureDescription}>Get up-to-the-minute stock prices, market trends, and financial news.</p>
          </div>
          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>Advanced Charts</h3>
            <p style={styles.featureDescription}>Visualize stock performance with interactive and customizable charts.</p>
          </div>
          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>Predictions</h3>
            <p style={styles.featureDescription}>Utilize machine learning algorithms to predict future market movements.</p>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 Stock Market Analysis. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  landingPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  heroSection: {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    color: 'white',
    textAlign: 'center',
    padding: '80px 40px',
    borderRadius: '15px',
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '3em',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '1.2em',
    marginBottom: '30px',
  },
  getStartedBtn: {
    backgroundColor: '#fff',
    color: '#0072ff',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.2em',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  getStartedBtnHover: {
    backgroundColor: '#0072ff',
    color: '#fff',
  },
  featuresSection: {
    width: '100%',
    padding: '40px 20px',
    textAlign: 'center',
  },
  featuresTitle: {
    fontSize: '2.5em',
    marginBottom: '20px',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  feature: {
    width: '30%',
    minWidth: '280px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: '1.5em',
    marginBottom: '15px',
  },
  featureDescription: {
    fontSize: '1em',
    color: '#666',
  },
  footer: {
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '0',
  },
  footerText: {
    fontSize: '1em',
  },
};

export default LandingPage;
