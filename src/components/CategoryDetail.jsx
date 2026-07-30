import React from 'react';
import './CategoryDetail.css';
import logoImg from '../assets/images/logo.png';
import PRODUCTS_DATA from '../data/maxsulotlar';

// Bayroqlar
import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

const FLAGS = { uz: uzFlag, ru: ruFlag, en: enFlag };

const UI_TEXT = {
  backBtn: {
    uz: 'Barcha kategoriyalar',
    ru: 'Все категории',
    en: 'All categories'
  },
  itemsCount: {
    uz: 'ta pozitsiya',
    ru: 'позиций',
    en: 'items'
  },
  currency: {
    uz: 'soʻm',
    ru: 'сум',
    en: 'UZS'
  }
};

export default function CategoryDetail({
  category,
  currentLang = 'ru',
  onBack,
  onChangeLang
}) {
  // Kategoriyaga tegishli mahsulotlarni olish
  const products = PRODUCTS_DATA[category?.id] || [];

  return (
    <div className="category-detail-wrapper fade-in">
      {/* Header */}
      <header className="category-header">

        <button className="back-btn" onClick={onBack}>
          <svg
            className="back-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>

          <span>{UI_TEXT.backBtn[currentLang]}</span>
        </button>

        <div className="category-header-logo">
          <img src={logoImg} alt="Shirin Tabaka" />
        </div>

        {/* Til tugmasi */}
        <div className="lang-select-container">
          <button
            type="button"
            className="category-lang-btn"
            onClick={() => {
              // Scroll joyini saqlash
              sessionStorage.setItem(
                'categoryScrollPosition',
                window.scrollY
              );

              // Qaysi sahifadan kelganini saqlash
              sessionStorage.setItem(
                'returnPage',
                'category'
              );

              // Til tanlash sahifasiga o'tish
              if (onChangeLang) {
                onChangeLang();
              }
            }}
          >
            <img
              src={FLAGS[currentLang]}
              alt={currentLang}
              className="lang-flag-mini"
            />

            <span className="lang-code">
              {currentLang.toUpperCase()}
            </span>

            <svg
              className="chevron-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

      </header>

      {/* Main Content */}
      <main className="category-main-content">

        {/* Banner */}
        <div className="category-banner-card">

          <div className="banner-info">

            <div className="banner-title-row">

              <img
                src={category.image}
                alt={category.name[currentLang]}
                className="banner-mini-thumb"
              />

              <div>

                <h1 className="banner-title">
                  {category.name[currentLang]}
                </h1>

                <span className="banner-count">
                  {products.length} {UI_TEXT.itemsCount[currentLang]}
                </span>

              </div>

            </div>

            <p className="banner-desc">

              {currentLang === 'uz' &&
                'Tanlangan masalliqlardan tayyorlangan sarxill taomlar.'}

              {currentLang === 'ru' &&
                'Свежие блюда, приготовленные из отборных ингредиентов.'}

              {currentLang === 'en' &&
                'Fresh dishes made from selected high-quality ingredients.'}

            </p>

          </div>

          <div className="banner-bg-image">
            <img src={category.image} alt="" />
          </div>

        </div>

        {/* Products */}

        <div className="products-grid">

          {products.map((item) => (

            <div key={item.id} className="product-card">

              <div className="product-img-wrapper">

                <img
                  src={item.image}
                  alt={item.name[currentLang]}
                  className="product-img"
                />

              </div>

              <div className="product-details">

                <h3 className="product-name">
                  {item.name[currentLang]}
                </h3>

                <div className="product-price">
                  {item.price}
                  <span> {UI_TEXT.currency[currentLang]}</span>
                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}