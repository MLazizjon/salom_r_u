import React, { useEffect, useState, useRef } from 'react';
import './MainSite.css';
import { supabase } from '../supabase/supabesa';

// Rasmlar va bayroqlar
import logoImg from '../assets/images/logo.png';
import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

// Banner rasmlari
import banner1 from '../assets/products/main-courses/mainCourse7.jpg';
import banner2 from '../assets/products/main-courses/mainCourse18.jpg';
import banner3 from '../assets/products/main-courses/mainCourse10.jpg';
import banner4 from '../assets/products/main-courses/mainCourse4.jpg';
import banner5 from '../assets/products/cold-snacks/coldSnack10.jpg';
import banner6 from '../assets/products/vegetable-salads/vegetableSalad14.jpg';
import banner7 from '../assets/images/image1.png';
import banner8 from '../assets/images/image.png';

const FLAGS = {
  uz: uzFlag,
  ru: ruFlag,
  en: enFlag
};

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

  const [categories, setCategories] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // Swipe gesture (barmoq bilan surish) uchun state-lar
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Supabase'dan kategoriyalarni yuklash
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('status', 'active');

        if (error) {
          console.error('Xatolik:', error.message);
        } else {
          setCategories(data || []);
        }
      } catch (err) {
        console.error('Tarmoq xatosi:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();

    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        once: true,
        easing: 'ease-out-cubic',
      });
    }
  }, []);

  // Avtomatik almashtirish (3 sekund)
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
    
    // Minimal 50px surilsa keyingi/oldingiga o'tadi
    if (distance > 50) {
      handleNextBanner();
    } else if (distance < -50) {
      handlePrevBanner();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const { data } = supabase.storage.from('mahsulot').getPublicUrl(imagePath);
    return data.publicUrl;
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

  // Har bir bannerning dinamik klassi va joylashuvini aniqlash
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
          <img src={FLAGS[currentLanguage] || FLAGS.ru} alt={langUpper} className="lang-flag" />
          <span>{langUpper}</span>
        </button>
      </header>

      {/* 3D SILILQ SURILADIGAN BANNER CAROUSEL */}
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

        {/* Strelkalar */}
        <button type="button" className="banner-arrow banner-prev" onClick={handlePrevBanner}>
          &#10094;
        </button>
        <button type="button" className="banner-arrow banner-next" onClick={handleNextBanner}>
          &#10095;
        </button>

        {/* Nuqtalar */}
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

      {/* Kategoriyalar */}
      <main className="categories-container">
        {loading ? (
          <p className="loading-text">
            {UI_TEXT.loading[currentLanguage] || UI_TEXT.loading.ru}
          </p>
        ) : categories.length === 0 ? (
          <p className="loading-text">
            {UI_TEXT.noCategories[currentLanguage] || UI_TEXT.noCategories.ru}
          </p>
        ) : (
          <div className="categories-grid">
            {categories.map((category, index) => {
              let categoryName = 'Kategoriya';
              if (currentLanguage === 'uz') {
                categoryName = category.name_uz || category.name?.uz || category.name_ru || 'Kategoriya';
              } else if (currentLanguage === 'ru') {
                categoryName = category.name_ru || category.name?.ru || category.name_uz || 'Категория';
              } else if (currentLanguage === 'en') {
                categoryName = category.name_en || category.name?.en || category.name_uz || 'Category';
              }

              return (
                <div
                  key={category.id}
                  className="category-card"
                  onClick={() => onSelectCategory && onSelectCategory(category)}
                  data-aos="fade-up"
                  data-aos-delay={(index % 6) * 50 + 100}
                >
                  <img src={getImageUrl(category.image)} alt={categoryName} className="category-img" loading="lazy" />
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