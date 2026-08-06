import React, { useEffect, useState, useRef } from 'react';
import './MainSite.css';

// Logo rasmi
import logoImg from '../assets/images/logo.png';

// Banner rasmlari
import banner1 from '../assets/products/main-courses/mainCourse7.jpg';
import banner2 from '../assets/products/main-courses/mainCourse18.jpg';
import banner3 from '../assets/products/main-courses/mainCourse10.jpg';
import banner4 from '../assets/products/main-courses/mainCourse4.jpg';
import banner5 from '../assets/products/cold-snacks/coldSnack10.jpg';
import banner6 from '../assets/products/vegetable-salads/vegetableSalad14.jpg';
import banner7 from '../assets/images/image1.png';
import banner8 from '../assets/images/image.png';

// Kategoriya rasmlari
import breadImg from '../assets/images/categories/bread.jpg';
import saladsImg from '../assets/images/categories/salads.jpg';
import vegetableSaladsImg from '../assets/images/categories/vegetable-salads.jpg';
import seafoodSaladsImg from '../assets/images/categories/seafood-salads.jpg';
import coldAppetizersImg from '../assets/images/categories/cold-appetizers.jpg';
import meatAppetizersImg from '../assets/images/categories/meat-appetizers.jpg';
import hotSoupsImg from '../assets/images/categories/hot-soups.jpg';
import mainDishesImg from '../assets/images/categories/main-dishes.jpg';
import coldSoupsImg from '../assets/images/categories/cold-soups.jpg';
import sideDishesImg from '../assets/images/categories/side-dishes.jpg';
import chickenImg from '../assets/images/categories/chicken.jpg';
import hotAppetizersImg from '../assets/images/categories/hot-appetizers.jpg';
import shashlikImg from '../assets/images/categories/shashlik.jpg';
import drinksImg from '../assets/images/categories/drinks.jpg';
import beerImg from '../assets/images/categories/beer.jpg';
import vodkaImg from '../assets/images/categories/vodka.jpg';
import wineImg from '../assets/images/categories/wine.jpg';
import cognacImg from '../assets/images/categories/cognac.jpg';
import mojitoImg from '../assets/images/categories/mojito.jpg';
import dessertsImg from '../assets/images/categories/desserts.jpg';

// Static Kategoriyalar Ro'yxati
export const CATEGORIES = [
  { id: 'bread', name: { uz: 'NON MAHSULOTLARI', ru: 'ХЛЕБ', en: 'BREAD' }, image: breadImg },
  { id: 'salads', name: { uz: 'SALATLAR', ru: 'САЛАТЫ', en: 'SALADS' }, image: saladsImg },
  { id: 'vegetable-salads', name: { uz: 'SABZAVOTLI SALATLAR', ru: 'САЛАТЫ ИЗ ОВОЩЕЙ', en: 'VEGETABLE SALADS' }, image: vegetableSaladsImg },
  { id: 'seafood-salads', name: { uz: 'DENGIZ MAHSULOTLARI SALATLARI', ru: 'САЛАТЫ ИЗ МОРЕПРОДУКТОВ', en: 'SEAFOOD SALADS' }, image: seafoodSaladsImg },
  { id: 'cold-appetizers', name: { uz: 'SOʻUQ ZAKUSKALAR', ru: 'ХОЛОДНЫЕ ЗАКУСКИ', en: 'COLD APPETIZERS' }, image: coldAppetizersImg },
  { id: 'meat-appetizers', name: { uz: 'GOʻSTLI ZAKUSKALAR', ru: 'МЯСНЫЕ ЗАКУСКИ', en: 'MEAT APPETIZERS' }, image: meatAppetizersImg },
  { id: 'hot-soups', name: { uz: 'ISSIGʻ SHOʻRBALAR', ru: 'ГОРЯЧИЕ СУПЫ', en: 'HOT SOUPS' }, image: hotSoupsImg },
  { id: 'main-dishes', name: { uz: 'IKKINCHI TAOMLAR', ru: 'ВТОРЫЕ БЛЮДА', en: 'MAIN COURSES' }, image: mainDishesImg },
  { id: 'cold-soups', name: { uz: 'SOʻUQ SHOʻRBALAR', ru: 'ХОЛОДНЫЕ СУПЫ', en: 'COLD SOUPS' }, image: coldSoupsImg },
  { id: 'side-dishes', name: { uz: 'GARNIRLAR', ru: 'ГАРНИРЫ', en: 'SIDE DISHES' }, image: sideDishesImg },
  { id: 'chicken', name: { uz: 'CHIKIN / TOVUQ', ru: 'ЧИКИН', en: 'CHICKEN' }, image: chickenImg },
  { id: 'hot-appetizers', name: { uz: 'ISSIGʻ ZAKUSKALAR', ru: 'ГОРЯЧИЕ ЗАКУСКИ', en: 'HOT APPETIZERS' }, image: hotAppetizersImg },
  { id: 'shashlik', name: { uz: 'SHASHLIK / MANGAL', ru: 'ШАШЛЫК', en: 'SHASHLIK' }, image: shashlikImg },
  { id: 'drinks', name: { uz: 'ICHIMLIKLAR', ru: 'НАПИТКИ', en: 'DRINKS' }, image: drinksImg },
  { id: 'beer', name: { uz: 'PIVO', ru: 'ПИВО', en: 'BEER' }, image: beerImg },
  { id: 'vodka', name: { uz: 'VODKA', ru: 'ВОДКА', en: 'VODKA' }, image: vodkaImg },
  { id: 'wine', name: { uz: 'VINO', ru: 'ВИНО', en: 'WINE' }, image: wineImg },
  { id: 'cognac', name: { uz: 'KONYAK', ru: 'КОНЬЯК', en: 'COGNAC' }, image: cognacImg },
  { id: 'mojito', name: { uz: 'MAXITO', ru: 'МОХИТО', en: 'MOJITO' }, image: mojitoImg },
  { id: 'desserts', name: { uz: 'DESERTLAR', ru: 'ДЕСЕРТЫ', en: 'DESSERTS' }, image: dessertsImg }
];

const UI_TEXT = {
  backBtn: { uz: 'Ortga', ru: 'Назад', en: 'Back' },
  loading: { uz: 'Yuklanmoqda...', ru: 'Загрузка...', en: 'Loading...' },
  noCategories: { uz: "Hozircha kategoriyalar yo'q", ru: 'Категории пока отсутствуют', en: 'No categories available yet' }
};

const STATIC_BANNERS = [
  { id: 1, image: banner1, title: 'Banner 1' },
  { id: 2, image: banner2, title: 'Banner 2' },
  { id: 3, image: banner3, title: 'Banner 3' },
  { id: 4, image: banner4, title: 'Banner 4' },
  { id: 5, image: banner5, title: 'Banner 5' },
  { id: 6, image: banner6, title: 'Banner 6' },
  { id: 7, image: banner7, title: 'Banner 7' },
  { id: 8, image: banner8, title: 'Banner 8' },
];

export default function MainSite({
  currentLanguage = 'ru',
  onRestart,
  onChangeLanguage,
  onSelectCategory
}) {
  const langUpper = currentLanguage.toUpperCase();

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  // Swipe gesture uchun ref-lar
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // AOS Animatsiya kutubxonasini ishga tushirish
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        once: true,
        easing: 'ease-out-cubic',
      });
    }
  }, []);

  // Banner avtomatik almashtirish (3 sekund)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextBanner();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % STATIC_BANNERS.length);
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + STATIC_BANNERS.length) % STATIC_BANNERS.length);
  };

  // Barmoq bilan surish (Touch Events)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      handleNextBanner();
    } else if (distance < -50) {
      handlePrevBanner();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleRestartClick = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    setTimeout(() => {
      onRestart && onRestart();
      setTimeout(() => {
        setIsLeaving(false);
      }, 50);
    }, 450);
  };

  const getSlideClass = (index) => {
    const total = STATIC_BANNERS.length;

    if (index === currentBannerIndex) {
      return 'slide active';
    }
    if (index === (currentBannerIndex - 1 + total) % total) {
      return 'slide prev';
    }
    if (index === (currentBannerIndex + 1) % total) {
      return 'slide next';
    }
    return 'slide hidden';
  };

  return (
    <div className="main-page-wrapper">
      {/* Sticky Header */}
      <header className="site-header">
        <button
          type="button"
          className={`menu-btn ${isLeaving ? 'leaving' : ''}`}
          onClick={handleRestartClick}
        >
          <span className="menu-btn-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </span>
          <span className="menu-btn-text">
            {UI_TEXT.backBtn[currentLanguage] || UI_TEXT.backBtn.ru}
          </span>
        </button>

        <div className="header-logo">
          <img src={logoImg} alt="Shirin Tabaka" />
        </div>

        <button
          type="button"
          className="lang-switcher-btn"
          onClick={() => {
            sessionStorage.setItem("mainScrollPosition", window.scrollY);
            sessionStorage.setItem("returnPage", "main");
            onChangeLanguage && onChangeLanguage();
          }}
        >
          <span>{langUpper}</span>
        </button>
      </header>

      {/* Banner Carousel */}
      <section className="banner-slider-container" data-aos="fade-up">
        <div
          className="carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-track">
            {STATIC_BANNERS.map((banner, index) => {
              const slideClass = getSlideClass(index);
              return (
                <div
                  key={banner.id}
                  className={`carousel-slide ${slideClass}`}
                  onClick={() => {
                    if (slideClass.includes('prev')) handlePrevBanner();
                    if (slideClass.includes('next')) handleNextBanner();
                  }}
                >
                  <img src={banner.image} alt={banner.title} />
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" className="banner-arrow banner-prev" onClick={handlePrevBanner}>
          &#10094;
        </button>
        <button type="button" className="banner-arrow banner-next" onClick={handleNextBanner}>
          &#10095;
        </button>

        <div className="banner-dots">
          {STATIC_BANNERS.map((_, idx) => (
            <span
              key={idx}
              className={`banner-dot ${idx === currentBannerIndex ? 'active' : ''}`}
              onClick={() => setCurrentBannerIndex(idx)}
            ></span>
          ))}
        </div>
      </section>

      {/* Static Kategoriyalar */}
      <main className="categories-container">
        {CATEGORIES.length === 0 ? (
          <p className="loading-text">
            {UI_TEXT.noCategories[currentLanguage] || UI_TEXT.noCategories.ru}
          </p>
        ) : (
          <div className="categories-grid">
            {CATEGORIES.map((category, index) => {
              const categoryName = category.name[currentLanguage] || category.name.ru;

              return (
                <div
                  key={category.id}
                  className="category-card"
                  onClick={() => onSelectCategory && onSelectCategory(category)}
                  data-aos="fade-up"
                  data-aos-delay={(index % 6) * 50 + 100}
                >
                  <img src={category.image} alt={categoryName} className="category-img" loading="lazy" />
                  <div className="banner-overlay category-overlay">
                    <span className="category-title">{categoryName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}