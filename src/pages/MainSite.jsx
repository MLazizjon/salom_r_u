import React, { useEffect, useState } from 'react';
import './MainSite.css';
import { supabase } from '../supabase/supabesa'; // Yo'lni o'zingiznikiga to'g'rilang

// Rasmlar va bayroqlar
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

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // Supabase'dan kategoriyalarni tortib kelish
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('status', 'active'); // Faqat faol kategoriyalarni chiqarish uchun (xohlasangiz olib tashlashingiz mumkin)

        if (error) {
          console.error('Kategoriyalarni olishda xatolik:', error.message);
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

  // Rasm manzilini Supabase Storage'dan to'g'ri olib beruvchi funksiya
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    const { data } = supabase.storage
      .from('mahsulot')
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

  // Ortga qaytish tugmasi
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

      {/* Kategoriyalar ro'yxati */}
      <main className="categories-container">
        {loading ? (
          <p style={{ textAlign: 'center', color: '#fff', fontSize: '18px', marginTop: '50px' }}>Yuklanmoqda...</p>
        ) : categories.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#fff', fontSize: '18px', marginTop: '50px' }}>Hozircha kategoriyalar yo'q</p>
        ) : (
          <div className="categories-grid">
            {categories.map((category, index) => {
              // Tilga mos nomni aniqlash (ustun ko'rinishida ham, JSON ko'rinishida ham ishlaydi)
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
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory(category);
                    }
                  }}
                  data-aos="fade-up"
                  data-aos-delay={(index % 6) * 50 + 100}
                >
                  <img
                    src={getImageUrl(category.image)}
                    alt={categoryName}
                    className="category-img"
                    loading="lazy"
                  />
                  <div className="category-overlay">
                    <span className="category-title">
                      {categoryName}
                    </span>
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