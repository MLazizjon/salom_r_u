import React, { useState } from 'react';
import MainSite from './pages/MainSite';
import CategoryDetail from './components/CategoryDetail';
import LanguageSelect from './features/language-select/LanguageSelect';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState('ru');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Qaysi sahifa ochiq
  const [currentPage, setCurrentPage] = useState('main');
  // main | category

  // Til tanlash sahifasi ochiqmi
  const [showLanguagePage, setShowLanguagePage] = useState(false);

  // Burger menu
  const handleMenuToggle = () => {
    console.log('Burger menyu bosildi');
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
          onSelectCategory={(category) =>
            setSelectedCategory(category)
          }
        />

      )}

    </div>
  );
}