import React, { useState } from 'react';
import './LanguageSelect.css';

import logoImg from '../../assets/images/logo.png';
import uzFlag from '../../assets/images/flags/uz.png';
import ruFlag from '../../assets/images/flags/ru.png';
import enFlag from '../../assets/images/flags/en.png';

const LANGUAGES = [
  { code: 'uz', name: "O'zbek", flag: uzFlag },
  { code: 'ru', name: 'Русский', flag: ruFlag },
  { code: 'en', name: 'English', flag: enFlag },
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
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="flag-icon"
                />

                <span className="lang-text">
                  {lang.name}
                </span>
              </div>

              <svg
                className="arrow-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
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
          Powered by Shirin Tabaka
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