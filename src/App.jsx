import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import MainSite from './pages/MainSite';
import CategoryDetail from './components/CategoryDetail';
import LanguageSelect from './features/language-select/LanguageSelect';

export default function App() {
  // Tilni localStorage'dan o'qish (default: 'uz')
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem('app_language') || 'uz'
  );

  // Tanlangan kategoriya
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Qaysi sahifa ochiq: 'main' yoki 'category'
  const [currentPage, setCurrentPage] = useState('main');

  // Sayt ilk bor ochilganda til tanlash sahifasi chiqishi uchun true qilib qo'yildi
  const [showLanguagePage, setShowLanguagePage] = useState(true);

  // AOS (animatsiya kutubxonasi) ni ishga tushirish
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  // Sahifa almashganda AOS ni yangilash
  useEffect(() => {
    AOS.refresh();
  }, [showLanguagePage, selectedCategory]);

  // Burger menu bosilganda
  const handleMenuToggle = () => {
    console.log('Burger menyu bosildi');
  };

  // Saytni boshidan boshlash
  const handleRestart = () => {
    setSelectedCategory(null);
    setCurrentPage('main');
    setShowLanguagePage(true);

    sessionStorage.removeItem('mainScrollPosition');
    sessionStorage.removeItem('categoryScrollPosition');
    sessionStorage.removeItem('returnPage');

    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  // Til tugmasi bosilganda ochiladigan funksiya
  const openLanguagePage = () => {
    if (selectedCategory) {
      setCurrentPage('category');
      sessionStorage.setItem('returnPage', 'category');
    } else {
      setCurrentPage('main');
      sessionStorage.setItem('returnPage', 'main');
    }
    setShowLanguagePage(true);
  };

  // LanguageSelect dan til tanlab qaytganda
  const handleLanguageSelect = (lang) => {
    // 1. LocalStorage ga saqlaymiz
    localStorage.setItem('app_language', lang);
    
    // 2. State'ni yangilaymiz (katalog nomlari darhol o'zgarishi uchun)
    setCurrentLanguage(lang);
    
    // 3. Til tanlash sahifasini yopamiz (shunda asosiy katalog sahifasiga o'tadi)
    setShowLanguagePage(false);

    // Oldingi qolgan joyiga (scroll pozitsiyasiga) qaytarish
    setTimeout(() => {
      const returnPage = sessionStorage.getItem('returnPage');
      const key = returnPage === 'category' ? 'categoryScrollPosition' : 'mainScrollPosition';

      const scroll = Number(sessionStorage.getItem(key) || 0);

      window.scrollTo({
        top: scroll,
        behavior: 'instant'
      });
    }, 0);
  };

  return (
    <div className="app-main-container">

      {showLanguagePage ? (
        // 1. Til tanlash sahifasi
        <LanguageSelect
          onSelectLanguage={handleLanguageSelect}
        />

      ) : currentPage === 'category' && selectedCategory ? (
        // 2. Tanlangan kategoriya ichidagi mahsulotlar sahifasi
        <CategoryDetail
          category={selectedCategory}
          currentLang={currentLanguage}
          onBack={() => {
            setSelectedCategory(null);
            setCurrentPage('main');
          }}
          onChangeLang={openLanguagePage}
        />

      ) : (
        // 3. Asosiy kategoriyalar sahifasi
        <MainSite
          currentLanguage={currentLanguage}
          onMenuToggle={handleMenuToggle}
          onChangeLanguage={openLanguagePage}
          onRestart={handleRestart}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage('category');
          }}
        />
      )}

    </div>
  );
}