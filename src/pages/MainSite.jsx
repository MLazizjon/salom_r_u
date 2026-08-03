import React, { useEffect, useState } from 'react';
import './MainSite.css';
import { supabase } from '../supabase/supabesa';

// Rasmlar va bayroqlar
import logoImg from '../assets/images/logo.png';
import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

// Har bir banner uchun alohida va takrorlanmaydigan nomlar beramiz
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

// Array ichiga hammasini qo'shamiz
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

  // Kategoriyalarni Supabase'dan olish
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

  // Har 3 sekundda avtomatik o'zgarishi
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextBanner();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  // Strelkalar orqali o'tkazish funksiyalari
  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % STATIC_BANNERS.length);
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + STATIC_BANNERS.length) % STATIC_BANNERS.length);
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

  // 3 talik karusel uchun indexlarni hisoblaymiz (Chapdagi, O'rtadagi, O'ngdagi)
  const prevIndex = (currentBannerIndex - 1 + STATIC_BANNERS.length) % STATIC_BANNERS.length;
  const nextIndex = (currentBannerIndex + 1) % STATIC_BANNERS.length;

  return (
    <div className="main-page-wrapper">
      {/* Header qismi */}
      <header className="site-header">
        <button
          type="button"
          className={`menu-btn ${isLeaving ? 'leaving' : ''}`}
          onClick={handleRestartClick}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span className="menu-btn-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </span>
          <span className="menu-btn-text">Ortga</span>
        </button>

        <div className="header-logo" data-aos="fade-up" data-aos-delay="150">
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
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img src={FLAGS[currentLanguage] || FLAGS.ru} alt={langUpper} className="lang-flag" />
          <span>{langUpper}</span>
        </button>
      </header>

      {/* 3 TALIK BANNER SLIDER QISMI */}
      <section className="banner-slider-container" data-aos="fade-up">
        <div className="banner-track">
          {/* Chapdagi kichik rasm */}
          <div className="banner-item side-banner" onClick={handlePrevBanner}>
            <img src={STATIC_BANNERS[prevIndex].image} alt="Prev Banner" />
          </div>

          {/* O'rtadagi asosiy yirik rasm */}
          <div className="banner-item active-banner" key={currentBannerIndex}>
            <img src={STATIC_BANNERS[currentBannerIndex].image} alt="Active Banner" />
          </div>

          {/* O'ngdagi kichik rasm */}
          <div className="banner-item side-banner" onClick={handleNextBanner}>
            <img src={STATIC_BANNERS[nextIndex].image} alt="Next Banner" />
          </div>
        </div>

        {/* Chap strelka */}
        <button className="banner-arrow banner-prev" onClick={handlePrevBanner}>
          &#10094;
        </button>
        {/* O'ng strelka */}
        <button className="banner-arrow banner-next" onClick={handleNextBanner}>
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
          <p style={{ textAlign: 'center', color: '#fff', fontSize: '18px', marginTop: '50px' }}>Yuklanmoqda...</p>
        ) : categories.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#fff', fontSize: '18px', marginTop: '50px' }}>Hozircha kategoriyalar yo'q</p>
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