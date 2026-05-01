import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact">
      <div className="s-tag">let's connect</div>
      <h2 className="s-title">Get In <span>Touch</span></h2>
      <div className="aline" />
      <div className="contact-wrap">
        <div className="contact-info">
          <h3>Let's build something great</h3>
          <p>Open to freelance projects, full-time roles, and exciting collaborations.</p>
          <div className="c-links">
            <a href="mailto:fatmaata718@gmail.com" className="c-link">
              <div className="c-icon">📧</div>
              fatmaata718@gmail.com
            </a>
            <a href="https://wa.me/201207132301" className="c-link" target="_blank" rel="noreferrer">
              <div className="c-icon">🟢</div>
              WhatsApp: +20 120 713 2301
            </a>
            <a href="https://github.com/fatma-programmer" className="c-link" target="_blank" rel="noreferrer">
              <div className="c-icon">🐙</div>
              github.com/fatma-programmer
            </a>
          </div>
        </div>

        <div className="cf">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" />
          <button className="cf-btn">Send Message ✈</button>
        </div>
      </div>
    </section>
  );
}
