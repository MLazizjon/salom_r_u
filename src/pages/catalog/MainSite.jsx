import React, { useEffect, useState } from 'react';
import './MainSite.css';

import { supabase } from '../../supabase/supabesa'; 
import logoImg from '../../assets/images/imag.png';

const UI_TEXT = {
  backBtn: { uz: 'Ortga', ru: 'Назад', en: 'Back' },
  loading: { uz: 'Yuklanmoqda...', ru: 'Загрузка...', en: 'Loading...' },
  noCategories: { uz: "Hozircha kategoriyalar yo'q", ru: 'Категории пока отсутствуют', en: 'No categories available yet' },
  cartItemsCount: { uz: 'ta mahsulot', ru: 'товаров', en: 'items' },
  currency: { uz: 'soʻm', ru: 'сум', en: 'UZS' }
};

export default function MainSite({
  currentLanguage = 'ru',
  onRestart,
  onChangeLanguage,
  onSelectCategory,
  cartItems = [],
  onOpenCart
}) {
  const langUpper = currentLanguage.toUpperCase();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) {
        console.error('Kategoriyalarni yuklashda xatolik:', error.message);
      } else if (data) {
        const formattedCategories = data.map(cat => ({
          id: cat.id,
          name: {
            uz: cat.name_uz,
            ru: cat.name_ru,
            en: cat.name_en
          },
          image: cat.image,
          status: cat.status
        }));
        
        const activeCategories = formattedCategories.filter(cat => !cat.status || cat.status === 'active');
        setCategories(activeCategories);
      }
    } catch (err) {
      console.error('Xatolik yuz berdi:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        once: true,
        easing: 'ease-out-cubic',
      });
    }
  }, []);

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

      <main className="categories-container" style={{ paddingTop: '20px' }}>
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

      <div className="cart-bar-wrapper">
        <div className="cart-bar-container" onClick={onOpenCart}>
          <div className="cart-bar-left">
            <div className="cart-icon-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-badge-count">{totalCartCount}</span>
            </div>
            <div className="cart-bar-details">
              <span className="cart-items-text">
                {totalCartCount} {UI_TEXT.cartItemsCount[currentLanguage] || UI_TEXT.cartItemsCount.ru}
              </span>
              <span className="cart-total-price">
                {totalCartPrice.toLocaleString()} {UI_TEXT.currency[currentLanguage] || UI_TEXT.currency.ru}
              </span>
            </div>
          </div>

          <div className="cart-bar-right">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}