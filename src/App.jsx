import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import MainSite from "./pages/MainSite";
import CategoryDetail from "./components/CategoryDetail";
import LanguageSelect from "./features/language-select/LanguageSelect";

export default function App() {
  const touchStartY = useRef(0);

  // 1-tuzatilgan joy: || operatori qo'shildi
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem("app_language") || "uz"
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState("main");
  const [showLanguagePage, setShowLanguagePage] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [showLanguagePage, selectedCategory]);

  // Pull To Refresh ni bloklash
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (
        window.scrollY === 0 &&
        e.touches[0].clientY > touchStartY.current
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleMenuToggle = () => {
    console.log("Burger menyu bosildi");
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setCurrentPage("main");
    setShowLanguagePage(true);

    sessionStorage.setItem("mainScrollPosition", window.scrollY);
    sessionStorage.setItem("returnPage", "main");
  };

  // Til sahifasiga o'tishda scrollni saqlash
  const openLanguagePage = () => {
    if (selectedCategory && currentPage === "category") {
      sessionStorage.setItem("categoryScrollPosition", window.scrollY);
      sessionStorage.setItem("returnPage", "category");
    } else {
      sessionStorage.setItem("mainScrollPosition", window.scrollY);
      sessionStorage.setItem("returnPage", "main");
    }

    setShowLanguagePage(true);
  };

  // Til tanlangandan keyin scrollni tiklash
  const handleLanguageSelect = (lang) => {
    localStorage.setItem("app_language", lang);
    setCurrentLanguage(lang);
    setShowLanguagePage(false);

    requestAnimationFrame(() => {
      setTimeout(() => {
        const returnPage = sessionStorage.getItem("returnPage");

        const key =
          returnPage === "category"
            ? "categoryScrollPosition"
            : "mainScrollPosition";

        // 2-tuzatilgan joy: || operatori qo'shildi
        const savedScroll = Number(
          sessionStorage.getItem(key) || 0
        );

        window.scrollTo({
          top: savedScroll,
          behavior: "instant",
        });
      }, 150);
    });
  };

  return (
    <div className="app-main-container">
      {showLanguagePage ? (
        <LanguageSelect
          onSelectLanguage={handleLanguageSelect}
        />
      ) : currentPage === "category" && selectedCategory ? (
        <CategoryDetail
          category={selectedCategory}
          currentLang={currentLanguage}
          onBack={() => {
            setSelectedCategory(null);
            setCurrentPage("main");
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
            setCurrentPage("category");
          }}
        />
      )}
    </div>
  );
}