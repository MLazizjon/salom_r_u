import React, { useState } from 'react';
import './LanguageSelect.css';

import logoImg from '../../assets/images/logo.png';

const LANGUAGES = [
  { code: 'uz', name: "O'zbek" },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
];

export const LanguageSelect = ({ onSelectLanguage }) => {
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem('app_language') || 'uz'
  );

  const handleSelect = (code) => {
    setSelectedLang(code);
    localStorage.setItem('app_language', code);

    if (onSelectLanguage) {
      onSelectLanguage(code);
    }
  };

  return (
    <div className="language-page">
      <div className="mobile-container">

        {/* Background */}
        <div className="watermark-bg" />

        {/* Header */}
        <div className="header-section">
          <img
            src={logoImg}
            alt="Shirin Tabaka"
            className="brand-logo"
            data-aos="zoom-in"
          />

          <div data-aos="fade-up">
            <h1 className="welcome-title">
              Xush kelibsiz!
            </h1>

            <p className="welcome-subtitle">
              Tilni tanlang
            </p>
          </div>
        </div>

        {/* Languages */}
        <div className="languages-wrapper">
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              type="button"
              className={`lang-button ${
                selectedLang === lang.code ? 'active' : ''
              }`}
              onClick={() => handleSelect(lang.code)}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="lang-button-left">
                <span className="lang-text">
                  {lang.name}
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div
        className="footer-section"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <span className="version-label">
          v1.0
        </span>

        <span className="brand-label">
          Powered by IT TAT TEAM
        </span>
      </div>

      {/* Bottom Banner */}
      <div className="bottom-curved-banner">
        <svg
          viewBox="0 0 500 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q250,90 500,20 L500,120 L0,120 Z"
            fill="var(--color-primary)"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelect;