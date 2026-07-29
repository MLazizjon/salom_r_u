import React from 'react';
import './MainSite.css';
import { CATEGORIES } from '../data/categories';

// Rasmlaringiz yo'liga moslang
import logoImg from '../assets/images/logo.png';
import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

const FLAGS = {
  uz: uzFlag,
  ru: ruFlag,
  en: enFlag
};

export default function MainSite({ currentLanguage = 'ru', onBack, onSelectCategory }) {
  const langUpper = currentLanguage.toUpperCase();

  return (
    <div className="main-page-wrapper fade-in">
      {/* Header qismi */}
      <header className="site-header">
        {/* Chap tomonda Burger Menyu (Orqaga qaytish uchun ham ishlatish mumkin) */}
        <button type="button" className="menu-btn" onClick={onBack} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Markazda Logo */}
        <div className="header-logo">
          <img src={logoImg} alt="Shirin Tabaka" />
        </div>

        {/* O'ng tomonda Tilni almashtirish tugmasi */}
        <button type="button" className="lang-switcher-btn" onClick={onBack}>
          <img src={FLAGS[currentLanguage] || FLAGS.ru} alt={langUpper} className="lang-flag" />
          <span>{langUpper}</span>
        </button>
      </header>

      {/* Asosiy kategoriyalar grid qismi */}
      <main className="categories-container">
        <div className="categories-grid">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => onSelectCategory && onSelectCategory(category.id)}
            >
              <img
                src={category.image}
                alt={category.name[currentLanguage] || category.name.ru}
                className="category-img"
                loading="lazy"
              />
              <div className="category-overlay">
                <span className="category-title">
                  {category.name[currentLanguage] || category.name.ru}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}