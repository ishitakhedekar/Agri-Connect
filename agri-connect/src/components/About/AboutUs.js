import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-hero">
        <h1>About Agri-Connect</h1>
        <p>Bridging the gap between farmers and landowners for sustainable agriculture</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Agri-Connect is dedicated to creating meaningful connections between landowners who have 
            unused agricultural land and farmers seeking opportunities to cultivate crops. We believe 
            in promoting sustainable farming practices while maximizing land utilization for the 
            benefit of both parties.
          </p>
        </section>

        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where no agricultural land goes to waste, where farmers have access 
            to fertile lands, and where landowners can contribute to food security while earning 
            from their unused properties. Through technology and trust, we're building a community 
            that supports sustainable agriculture.
          </p>
        </section>

        <section className="features-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Land Listings</h3>
              <p>Easy-to-browse land listings with detailed information about soil quality, water access, and location</p>
            </div>
            <div className="feature-card">
              <h3>Secure Connections</h3>
              <p>Verified profiles and secure messaging system for safe communication between landowners and farmers</p>
            </div>
            <div className="feature-card">
              <h3>Flexible Agreements</h3>
              <p>Support for various leasing arrangements from short-term seasonal contracts to long-term partnerships</p>
            </div>
            <div className="feature-card">
              <h3>Community Support</h3>
              <p>Access to agricultural experts, resources, and a supportive community of like-minded individuals</p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Sustainability:</strong> Promoting environmentally friendly farming practices</li>
            <li><strong>Transparency:</strong> Clear communication and honest dealings between all parties</li>
            <li><strong>Community:</strong> Building strong relationships within the agricultural ecosystem</li>
            <li><strong>Innovation:</strong> Using technology to solve traditional agricultural challenges</li>
            <li><strong>Empowerment:</strong> Enabling farmers and landowners to achieve their goals</li>
          </ul>
        </section>

        <section className="contact-section">
          <h2>Get In Touch</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! 
            Reach out to us at <a href="mailto:info@agri-connect.com">info@agri-connect.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
