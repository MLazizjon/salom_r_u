import React, { useEffect, useState } from 'react';
import './MainSite.css';
import { CATEGORIES } from '../data/categories';

// Rasmlar import yo'llari
import logoImg from '../assets/images/logo.png';
import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

const FLAGS = {
  uz: uzFlag,
  ru: ruFlag,
  en: enFlag
};

export default function MainSite({
  currentLanguage = 'ru',
  onRestart,
  onChangeLanguage,
  onSelectCategory
}) {
  const langUpper = currentLanguage.toUpperCase();

  // 🔥 Tugma animatsiyasi uchun
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        once: true,
        easing: 'ease-out-cubic',
      });
    }
  }, []);

  // Ortga qaytish
  const handleRestartClick = () => {
    if (isLeaving) return;

    setIsLeaving(true);

    // Animatsiya tugashini kutamiz
    setTimeout(() => {
      onRestart && onRestart();

      // Tugma asl holatiga qaytadi
      setTimeout(() => {
        setIsLeaving(false);
      }, 50);

    }, 450);
  };

  return (
    <div className="main-page-wrapper">

      {/* Header qismi */}
      <header className="site-header">

        {/* Chap tomonda Ortga */}
        <button
          type="button"
          className={`menu-btn ${isLeaving ? 'leaving' : ''}`}
          onClick={handleRestartClick}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span className="menu-btn-circle">

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18L9 12L15 6" />
            </svg>

          </span>

          <span className="menu-btn-text">
            Ortga
          </span>

        </button>

        {/* Logo */}
        <div
          className="header-logo"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <img
            src={logoImg}
            alt="Shirin Tabaka"
          />
        </div>

        {/* Til */}
        <button
          type="button"
          className="lang-switcher-btn"
          onClick={() => {

            sessionStorage.setItem(
              "mainScrollPosition",
              window.scrollY
            );

            sessionStorage.setItem(
              "returnPage",
              "main"
            );

            onChangeLanguage && onChangeLanguage();

          }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img
            src={FLAGS[currentLanguage] || FLAGS.ru}
            alt={langUpper}
            className="lang-flag"
          />

          <span>{langUpper}</span>

        </button>

      </header>

      {/* Kategoriyalar */}
      <main className="categories-container">

        <div className="categories-grid">

          {CATEGORIES.map((category, index) => (

            <div
              key={category.id}
              className="category-card"
              onClick={() =>
                onSelectCategory &&
                onSelectCategory(category)
              }
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 50 + 100}
            >

              <img
                src={category.image}
                alt={
                  category.name[currentLanguage] ||
                  category.name.ru
                }
                className="category-img"
                loading="lazy"
              />

              <div className="category-overlay">

                <span className="category-title">
                  {category.name[currentLanguage] ||
                    category.name.ru}
                </span>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}