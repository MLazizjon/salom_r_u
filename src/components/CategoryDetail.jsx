import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './CategoryDetail.css';

// Logo va Bayroqlar importi
import logoImg from '../assets/images/logo.png';
import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

// --- RASMLAR IMPORTI ---
import breadImg1 from "../assets/products/bread/bread1.jpg";
import breadImg2 from "../assets/products/bread/bread2.jpg";
import breadImg3 from "../assets/products/bread/bread3.jpg";
import breadImg4 from "../assets/products/bread/bread4.jpg";
import breadImg6 from "../assets/products/bread/bread6.jpg";

import saladImg1 from "../assets/products/salads/salad1.jpg";
import saladImg2 from "../assets/products/salads/salad2.jpg";
import saladImg4 from "../assets/products/salads/salad4.jpg";
import saladImg5 from "../assets/products/salads/salad5.jpg";
import saladImg20 from "../assets/products/salads/image10.png";
import saladImg21 from "../assets/products/salads/image21.png";
import saladImg24 from "../assets/products/salads/image24.png";
import saladImg25 from "../assets/products/salads/image25.png";
import saladImg26 from "../assets/products/salads/image26.png";
import saladImg27 from "../assets/products/salads/image27.png";
import saladImg28 from "../assets/products/salads/image28.png";
import saladImg29 from "../assets/products/salads/image29.png";
import saladImg30 from "../assets/products/salads/image30.png";

import vegetableSaladImg1 from "../assets/products/vegetable-salads/vegetableSalad1.jpg";
import vegetableSaladImg2 from "../assets/products/vegetable-salads/vegetableSalad2.jpg";
import vegetableSaladImg3 from "../assets/products/vegetable-salads/vegetableSalad3.jpg";
import vegetableSaladImg4 from "../assets/products/vegetable-salads/vegetableSalad4.jpg";
import vegetableSaladImg5 from "../assets/products/vegetable-salads/vegetableSalad5.jpg";
import vegetableSaladImg6 from "../assets/products/vegetable-salads/vegetableSalad6.jpg";
import vegetableSaladImg7 from "../assets/products/vegetable-salads/vegetableSalad7.jpg";
import vegetableSaladImg8 from "../assets/products/vegetable-salads/vegetableSalad8.jpg";
import vegetableSaladImg9 from "../assets/products/vegetable-salads/vegetableSalad9.jpg";
import vegetableSaladImg10 from "../assets/products/vegetable-salads/vegetableSalad10.jpg";
import vegetableSaladImg11 from "../assets/products/vegetable-salads/vegetableSalad11.jpg";
import vegetableSaladImg12 from "../assets/products/vegetable-salads/vegetableSalad12.jpg";
import vegetableSaladImg13 from "../assets/products/vegetable-salads/vegetableSalad13.jpg";
import vegetableSaladImg14 from "../assets/products/vegetable-salads/vegetableSalad14.jpg";
import vegetableSaladImg15 from "../assets/products/vegetable-salads/vegetableSalad15.jpg";
import vegetableSaladImg16 from "../assets/products/vegetable-salads/vegetableSalad16.jpg";

// import seafoodSaladImg1 from "../assets/products/seafood-salads/seafoodSalad1.jpg";
// import seafoodSaladImg2 from "../assets/products/seafood-salads/seafoodSalad2.jpg";
// import seafoodSaladImg3 from "../assets/products/seafood-salads/seafoodSalad3.jpg";
// import seafoodSaladImg4 from "../assets/products/seafood-salads/seafoodSalad4.jpg";
// import seafoodSaladImg5 from "../assets/products/seafood-salads/seafoodSalad5.jpg";

// import coldSnackImg1 from "../assets/products/cold-snacks/coldSnack1.jpg";
// import coldSnackImg2 from "../assets/products/cold-snacks/coldSnack2.jpg";
// import coldSnackImg3 from "../assets/products/cold-snacks/coldSnack3.jpg";

// import meatSnackImg1 from "../assets/products/meat-snacks/meatSnack1.jpg";
// import hotSoupImg1 from "../assets/products/hot-soups/hotSoup1.jpg";
// import mainCourseImg1 from "../assets/products/main-courses/mainCourse1.jpg";
// import coldSoupImg1 from "../assets/products/cold-soups/coldSoup1.jpg";
// import garnishImg1 from "../assets/products/garnishes/garnish1.jpg";
// import chickenImg1 from "../assets/products/chicken/chicken1.jpg";
// import hotSnack1 from "../assets/products/hot-snacks/hotSnack1.jpg";
// import shashlikImg1 from "../assets/products/shashlik/shashlik1.jpg";
// import drinkImg1 from "../assets/products/drinks/drink1.jpg";

// import beerImg1 from "../assets/products/beer/beer1.jpg";
// import vodkaImg1 from "../assets/products/vodka/vodka1.jpg";
// import wineImg1 from "../assets/products/wine/wine1.jpg";
// import cognacImg1 from "../assets/products/cognac/cognac1.jpg";
// import mojitoImg1 from "../assets/products/mojito/mojito1.jpg";
// import dessertImg1 from "../assets/products/desserts/dessert1.jpg";

import Img from "../assets/products/image.png";

// --- MAHSULOTLAR MA'LUMOTLAR ARRAYI ---
const products = {
  // 1. NON MAHSULOTLARI
  bread: [
    {
      id: "bread2",
      name: { uz: "Non Assarti", ru: "Хлебное Ассорти", en: "Bread Assortment" },
      price: "58000",
      image: breadImg2,
    },
    {
      id: "bread1",
      name: { uz: "Kulcha non", ru: "Лепешка", en: "Flat Bread" },
      price: "6500",
      image: breadImg1,
    },
    {
      id: "bread4",
      name: { uz: "Buxanka", ru: "Буханка", en: "Loaf" },
      price: "5000",
      image: breadImg4,
    },
    {
      id: "bread3",
      name: { uz: "Patir non", ru: "Патыр нон", en: "Patir Bread" },
      price: "8500",
      image: breadImg3,
    },
    {
      id: "bread6",
      name: { uz: "Qora non ", ru: "Черный хлеб", en: "Black Bread" },
      price: "10000",
      image: breadImg6,
    },
    {
      id: "bread7",
      name: { uz: "Chap-Chak", ru: "Чапчак", en: "ChapChak bread" },
      price: "7000",
      image: Img,
    },
  ],

  // 2. SALATLAR
  salads: [
    {
      id: "salad1",
      name: { uz: "Gnezdo", ru: "Гнездо", en: "Nest salad" },
      price: "47500",
      image: saladImg1,
    },
    {
      id: "salad2",
      name: { uz: "Dilband", ru: "Дилбанд", en: "Dilband salad" },
      price: "51500",
      image: saladImg2,
    },
    {
      id: "salad3",
      name: { uz: "Tsezar salati", ru: "Цезарь", en: "Caesar salad" },
      price: "52500",
      image: saladImg20,
    },
    {
      id: "salad4",
      name: { uz: "Go'shtli salat", ru: "Мясной", en: "Meat salad" },
      price: "47500",
      image: saladImg4,
    },
    {
      id: "salad5",
      name: { uz: "Izyuminka", ru: "Изюминка", en: "Izyuminka" },
      price: "50500",
      image: saladImg5,
    },
    {
      id: "salad6",
      name: { uz: "Shirin", ru: "Ширин", en: "Shirin" },
      price: "49500",
      image: saladImg21,
    },
    {
      id: "salad7",
      name: { uz: "Meksika", ru: "Мексика", en: "Mexico" },
      price: "61500",
      image: saladImg24,
    },
    {
      id: "salad8",
      name: { uz: "Saykal", ru: "Сайкал", en: "Saykal salad" },
      price: "49500",
      image: saladImg25,
    },
    {
      id: "salad9",
      name: { uz: "Yaponskiy salat", ru: "Японский", en: "Japanese salad" },
      price: "49500",
      image: saladImg26,
    },
    {
      id: "salad10",
      name: { uz: "Seul", ru: "Сеул", en: "Seoul salad" },
      price: "47500",
      image: saladImg27,
    },
    {
      id: "salad11",
      name: { uz: "Roust bif", ru: "Роуст биф", en: "Roast beef" },
      price: "76500",
      image: saladImg28,
    },
    {
      id: "salad12",
      name: { uz: "Erkaklar kaprizi", ru: "Мужской каприз", en: "Male caprice" },
      price: "50500",
      image: saladImg30,
    },
    {
      id: "salad13",
      name: { uz: "Olivye", ru: "Оливье", en: "Olivier salad" },
      price: "47000",
      image: saladImg29,
    },
  ],

  // 3. SABZAVOTLI SALATLAR
  "vegetable-salads": [
    {
      id: "veg_salad1",
      name: { uz: "Vinegret", ru: "Винигрет", en: "Vinaigrette" },
      price: "37000",
      image: vegetableSaladImg1,
    },
    {
      id: "veg_salad2",
      name: { uz: "Veshenki qo'ziqorinlari", ru: "Грибы вешенки", en: "Oyster mushrooms" },
      price: "32000",
      image: vegetableSaladImg2,
    },
    {
      id: "veg_salad3",
      name: { uz: "Vitaminli salat", ru: "Витаминный", en: "Vitamin salad" },
      price: "35000",
      image: vegetableSaladImg3,
    },
    {
      id: "veg_salad4",
      name: { uz: "Kesilgan bodring", ru: "Огурцы Нарезка", en: "Sliced cucumbers" },
      price: "13000",
      image: vegetableSaladImg4,
    },
    {
      id: "veg_salad5",
      name: { uz: "Kapulete", ru: "Капулете", en: "Capulete" },
      price: "40000",
      image: vegetableSaladImg5,
    },
    {
      id: "veg_salad6",
      name: { uz: "Qovurilgan sabzavotlar", ru: "Овощи жареные", en: "Fried vegetables" },
      price: "75000",
      image: vegetableSaladImg6,
    },
    {
      id: "veg_salad7",
      name: { uz: "Xoravac", ru: "Хоравац", en: "Khorovats" },
      price: "50500",
      image: vegetableSaladImg7,
    },
    {
      id: "veg_salad8",
      name: { uz: "O'zbekcha salat", ru: "Узбекский", en: "Uzbek salad" },
      price: "20500",
      image: vegetableSaladImg8,
    },
    {
      id: "veg_salad9",
      name: { uz: "Achichuk", ru: "Ачик-чучук", en: "Achichuk" },
      price: "20000",
      image: vegetableSaladImg9,
    },
    {
      id: "veg_salad10",
      name: { uz: "Sabzavotli guldasta", ru: "Овощной букет", en: "Vegetable bouquet" },
      price: "64000",
      image: vegetableSaladImg10,
    },
    {
      id: "veg_salad11",
      name: { uz: "Miks", ru: "Микс", en: "Mix salad" },
      price: "43000",
      image: vegetableSaladImg11,
    },
    {
      id: "veg_salad12",
      name: { uz: "Smak", ru: "Смак", en: "Smak" },
      price: "38000",
      image: vegetableSaladImg12,
    },
    {
      id: "veg_salad13",
      name: { uz: "Issiq baqlajon salati", ru: "Теплый Баклажан", en: "Warm eggplant salad" },
      price: "69500",
      image: vegetableSaladImg13,
    },
    {
      id: "veg_salad14",
      name: { uz: "Ekzotika", ru: "Екзотика", en: "Exotika" },
      price: "59500",
      image: vegetableSaladImg14,
    },
    {
      id: "veg_salad15",
      name: { uz: "Qarsillama baqlajon", ru: "Хрустящие Баклажаны", en: "Crispy eggplant" },
      price: "58500",
      image: vegetableSaladImg15,
    },
    {
      id: "veg_salad16",
      name: { uz: "Grekcha salat", ru: "Греческий", en: "Greek salad" },
      price: "52500",
      image: vegetableSaladImg16,
    },
  ],
};

const FLAGS = { uz: uzFlag, ru: ruFlag, en: enFlag };

const UI_TEXT = {
  backBtn: { uz: 'Ortga', ru: 'Назад', en: 'Back' },
  itemsCount: { uz: 'ta pozitsiya', ru: 'позиций', en: 'items' },
  currency: { uz: 'soʻm', ru: 'сум', en: 'UZS' },
  closeBtn: { uz: 'Yopish', ru: 'Закрыть', en: 'Close' },
};

export default function CategoryDetail({
  category,
  currentLang = 'ru',
  onBack,
  onChangeLang,
}) {
  const [productsList, setProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);

  // Modal ochiqligida orqa fon scrollini bloklash
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  // Kategoriya o'zgarganda mahsulotlarni tanlab olish
  useEffect(() => {
    if (!category) {
      setProductsList([]);
      return;
    }

    const categoryKey = category.slug || category.id;
    const foundProducts = products[categoryKey] || [];
    setProductsList(foundProducts);
  }, [category]);

  const handleBackClick = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    setTimeout(() => {
      onBack && onBack();
      setTimeout(() => {
        setIsLeaving(false);
      }, 50);
    }, 450);
  };

  const getCategoryName = (cat) => {
    if (!cat) return '';
    return cat[`name_${currentLang}`] || cat.name?.[currentLang] || cat.name_ru || cat.name?.ru || '';
  };

  const getProductName = (item) => {
    if (!item || !item.name) return '';
    return typeof item.name === 'object' ? item.name[currentLang] || item.name.ru || '' : item.name;
  };

  const getProductDescription = (item) => {
    if (!item) return '';
    const desc = item.description || item.desc;
    if (!desc) {
      return currentLang === 'uz' ? 'Tavsif mavjud emas.' : currentLang === 'ru' ? 'Описание отсутствует.' : 'No description available.';
    }
    return typeof desc === 'object' ? desc[currentLang] || desc.ru || '' : desc;
  };

  // Modal oynasi
  const modalContent = selectedProduct && (
    <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-img-wrapper">
          <img
            src={selectedProduct.image}
            alt={getProductName(selectedProduct)}
            className="modal-img"
          />
        </div>

        <div className="modal-info-wrapper">
          <h2 className="modal-product-name">{getProductName(selectedProduct)}</h2>
          <p className="modal-product-desc">{getProductDescription(selectedProduct)}</p>

          <div className="modal-footer-row">
            <div className="modal-product-price">
              {selectedProduct.price} <span>{UI_TEXT.currency[currentLang]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="category-detail-wrapper fade-in">
      <header className="category-header">
        <button
          type="button"
          className={`menu-btn ${isLeaving ? 'leaving' : ''}`}
          onClick={handleBackClick}
        >
          <span className="menu-btn-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </span>
          <span className="menu-btn-text">{UI_TEXT.backBtn[currentLang]}</span>
        </button>

        <div className="category-header-logo">
          <img src={logoImg} alt="Shirin Tabaka" />
        </div>

        <div className="lang-select-container">
          <button
            type="button"
            className="category-lang-btn"
            onClick={() => {
              sessionStorage.setItem('categoryScrollPosition', window.scrollY);
              sessionStorage.setItem('returnPage', 'category');
              if (onChangeLang) onChangeLang();
            }}
          >
            <img src={FLAGS[currentLang]} alt={currentLang} className="lang-flag-mini" />
            <span className="lang-code">{currentLang.toUpperCase()}</span>
            <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </header>

      <main className="category-main-content">
        <div className="category-banner-card">
          <div className="banner-info">
            <div className="banner-title-row">
              <img
                src={category?.image_url || category?.image}
                alt={getCategoryName(category)}
                className="banner-mini-thumb"
              />
              <div>
                <h1 className="banner-title">{getCategoryName(category)}</h1>
                <span className="banner-count">
                  {productsList.length} {UI_TEXT.itemsCount[currentLang]}
                </span>
              </div>
            </div>
            <p className="banner-desc">
              {currentLang === 'uz' && 'Tanlangan masalliqlardan tayyorlangan sarxill taomlar.'}
              {currentLang === 'ru' && 'Свежие блюда, приготовленные из отборных ингредиентов.'}
              {currentLang === 'en' && 'Fresh dishes made from selected high-quality ingredients.'}
            </p>
          </div>

          <div className="banner-bg-image">
            <img src={category?.image_url || category?.image} alt="" />
          </div>
        </div>

        {productsList.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
            Bu kategoriyada hozircha mahsulotlar yo'q.
          </p>
        ) : (
          <div className="products-grid">
            {productsList.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="product-img-wrapper">
                  <img
                    src={item.image}
                    alt={getProductName(item)}
                    className="product-img"
                  />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{getProductName(item)}</h3>
                  <div className="product-price">
                    {item.price}
                    <span> {UI_TEXT.currency[currentLang]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedProduct && createPortal(modalContent, document.body)}
    </div>
  );
}