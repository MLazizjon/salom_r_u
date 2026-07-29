import React, { useState } from 'react';
import MainSite from './pages/MainSite';
import CategoryDetail from './components/CategoryDetail';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState('ru'); // 'uz' | 'ru' | 'en'
  const [selectedCategory, setSelectedCategory] = useState(null); // Tanlangan kategoriya obyekti

  // Tilni almashtirish funksiyasi (RU -> UZ -> EN -> RU)
  const handleChangeLanguage = () => {
    const langs = ['ru', 'uz', 'en'];
    const nextIndex = (langs.indexOf(currentLanguage) + 1) % langs.length;
    setCurrentLanguage(langs[nextIndex]);
  };

  // Burger menyu uchun (zarur bo'lsa)
  const handleMenuToggle = () => {
    console.log("Burger menyu bosildi");
  };

  return (
    <div className="app-main-container">
      {selectedCategory ? (
        /* Kategoriya tanlangan bo'lsa -> Mahsulotlar (CategoryDetail) sahifasi ochiladi */
        <CategoryDetail
          category={selectedCategory}
          currentLang={currentLanguage}
          onBack={() => setSelectedCategory(null)}
          onChangeLang={handleChangeLanguage}
        />
      ) : (
        /* Kategoriya tanlanmagan bo'lsa -> Asosiy menyu (MainSite) ko'rinadi */
        <MainSite
          currentLanguage={currentLanguage}
          onMenuToggle={handleMenuToggle}
          onChangeLanguage={handleChangeLanguage}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      )}
    </div>
  );
}