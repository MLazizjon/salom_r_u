import React, { useEffect } from 'react';
import './MainSite.css';
import { CATEGORIES } from '../data/categories';

// Rasmlar import yo'llari (faqat bitta ../ bilan)
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

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        once: true,
        easing: 'ease-out-cubic',
      });
    }
  }, []);

  return (
    <div className="main-page-wrapper">
      {/* Header qismi */}
      <header className="site-header">
        {/* Chap tomonda Burger Menyu */}
        <button 
          type="button" 
          className="menu-btn" 
          onClick={onBack} 
          aria-label="Menu"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Markazda Logo */}
        <div 
          className="header-logo"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <img src={logoImg} alt="Shirin Tabaka" />
        </div>

        {/* O'ng tomonda Tilni almashtirish tugmasi */}
        <button 
          type="button" 
          className="lang-switcher-btn" 
          onClick={onBack}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img src={FLAGS[currentLanguage] || FLAGS.ru} alt={langUpper} className="lang-flag" />
          <span>{langUpper}</span>
        </button>
      </header>

      {/* Asosiy kategoriyalar grid qismi */}
      <main className="categories-container">
        <div className="categories-grid">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => onSelectCategory && onSelectCategory(category.id)}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 50 + 100}
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