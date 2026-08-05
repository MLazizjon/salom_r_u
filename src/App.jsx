import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import MainSite from './pages/MainSite';
import CategoryDetail from './components/CategoryDetail';
import LanguageSelect from './features/language-select/LanguageSelect';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem('app_language') || 'uz'
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState('main');
  const [showLanguagePage, setShowLanguagePage] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [showLanguagePage, selectedCategory]);

  const handleMenuToggle = () => {
    console.log('Burger menyu bosildi');
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setCurrentPage('main');
    setShowLanguagePage(true);

    // Qayta boshlashda ham hozirgi skrol pozitsiyasini saqlab qolamiz
    sessionStorage.setItem('mainScrollPosition', window.scrollY);
    sessionStorage.setItem('returnPage', 'main');
  };

  // Til sahifasiga o'tishda skrolni xotiraga yozish
  const openLanguagePage = () => {
    if (selectedCategory && currentPage === 'category') {
      sessionStorage.setItem('categoryScrollPosition', window.scrollY);
      sessionStorage.setItem('returnPage', 'category');
    } else {
      sessionStorage.setItem('mainScrollPosition', window.scrollY);
      sessionStorage.setItem('returnPage', 'main');
    }
    setShowLanguagePage(true);
  };

  // Til tanlangandan keyin qaytish va skrolni joyiga tiklash logikasi
  const handleLanguageSelect = (lang) => {
    localStorage.setItem('app_language', lang);
    setCurrentLanguage(lang);
    setShowLanguagePage(false);

    // Bosh sahifa chizilishi va DOM tayyor bo'lishi bilan skrolni tiklaymiz
    requestAnimationFrame(() => {
      setTimeout(() => {
        const returnPage = sessionStorage.getItem('returnPage');
        const key = returnPage === 'category' ? 'categoryScrollPosition' : 'mainScrollPosition';
        const savedScroll = Number(sessionStorage.getItem(key) || 0);

        window.scrollTo({
          top: savedScroll,
          behavior: 'instant'
        });
      }, 150); // Categoriyalar yuklanib/chizilib olishi uchun yetarli vaqt
    });
  };

  return (
    <div className="app-main-container">
      {showLanguagePage ? (
        <LanguageSelect
          onSelectLanguage={handleLanguageSelect}
        />
      ) : currentPage === 'category' && selectedCategory ? (
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