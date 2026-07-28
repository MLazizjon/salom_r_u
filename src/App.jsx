import React, { useState, useEffect } from 'react';
import LanguageSelect from './features/language-select/LanguageSelect';
import MainSite from './pages/MainSite';

function App() {
  const [currentLang, setCurrentLang] = useState(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('selected_language');
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageSelect = (langCode) => {
    localStorage.setItem('selected_language', langCode);
    setCurrentLang(langCode);
  };

  // Tilni bekor qilish va til tanlash sahifasiga qaytish funksiyasi
  const handleBackToLanguageSelect = () => {
    localStorage.removeItem('selected_language');
    setCurrentLang(null);
  };

  // Agar til tanlanmagan bo'lsa -> LanguageSelect sahifasi
  if (!currentLang) {
    return <LanguageSelect onSelectLanguage={handleLanguageSelect} />;
  }

  // Til tanlangan bo'lsa -> MainSite sahifasi
  return (
    <MainSite 
      currentLanguage={currentLang} 
      onBack={handleBackToLanguageSelect} 
    />
  );
}

export default App;