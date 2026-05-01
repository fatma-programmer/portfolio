import React, { useState } from 'react';
import './Navbar.css';

const navLinks = ['skills', 'projects', 'about', 'contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <div className="nav-logo">&lt;FA/&gt;</div>

      <button
        className={`menuBtn ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`navOverlay ${open ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link}
            href={`#${link}`}
            data-label={link.charAt(0).toUpperCase() + link.slice(1)}
            onClick={(e) => { e.preventDefault(); scrollTo(link); }}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </div>
    </>
  );
}
