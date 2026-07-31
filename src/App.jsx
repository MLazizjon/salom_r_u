import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import MainSite from './pages/MainSite';
import CategoryDetail from './components/CategoryDetail';
import LanguageSelect from './features/language-select/LanguageSelect';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('app_language') || 'ru'
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Qaysi sahifa ochiq
  const [currentPage, setCurrentPage] = useState('main');
  // main | category

  // Til tanlash sahifasi ochiqmi
  const [showLanguagePage, setShowLanguagePage] = useState(true);

  // AOS ishga tushirish
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

  // Burger menu
  const handleMenuToggle = () => {
    console.log('Burger menyu bosildi');
  };

  // 🔥 Saytni boshidan boshlash (YANGI)
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

  // Til tugmasi bosilganda
  const openLanguagePage = () => {
    if (selectedCategory) {
      setCurrentPage('category');
    } else {
      setCurrentPage('main');
    }

    setShowLanguagePage(true);
  };

  // LanguageSelect dan qaytadi
  const handleLanguageSelect = (lang) => {
    setCurrentLanguage(lang);

    setShowLanguagePage(false);

    // Scroll joyini tiklash
    setTimeout(() => {
      const key =
        currentPage === 'category'
          ? 'categoryScrollPosition'
          : 'mainScrollPosition';

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

        <LanguageSelect
          onSelectLanguage={handleLanguageSelect}
        />

      ) : selectedCategory ? (

        <CategoryDetail
          category={selectedCategory}
          currentLang={currentLanguage}
          onBack={() => setSelectedCategory(null)}
          onChangeLang={openLanguagePage}
        />

      ) : (

        <MainSite
          currentLanguage={currentLanguage}
          onMenuToggle={handleMenuToggle}
          onChangeLanguage={openLanguagePage}
          onRestart={handleRestart}
          onSelectCategory={(category) =>
            setSelectedCategory(category)
          }
        />

      )}

    </div>
  );
}