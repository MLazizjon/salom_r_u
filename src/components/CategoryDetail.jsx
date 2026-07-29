import React from 'react';
import './CategoryDetail.css';
import logoImg from '../assets/images/logo.png'; // Logotip yo'lingiz

// Namunaviy ko'p tilli matnlar (UI interfeys uchun)
const UI_TEXT = {
  backBtn: { uz: 'Barcha kategoriyalar', ru: 'Все категории', en: 'All categories' },
  itemsCount: { uz: 'ta pozitsiya', ru: 'позиций', en: 'items' },
  currency: { uz: 'soʻm', ru: 'сум', en: 'UZS' },
  weightUnit: { uz: 'g', ru: 'г', en: 'g' }
};

// Har bir kategoriya uchun mahsulotlar ro'yxatidan namuna (Backenddan keladigan ma'lumot strukturasi)
const SAMPLE_PRODUCTS = {
  bread: [
    {
      id: 'b1',
      name: { uz: 'Patir non', ru: 'Патыр нон', en: 'Patir bread' },
      description: { uz: 'Sariyogʻli va kunjutli issiq patir non', ru: 'Горячий патыр со сливочным маслом и кунжутом', en: 'Hot patir with butter and sesame' },
      weight: '350',
      price: '15 000',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'b2',
      name: { uz: 'Yopgan non', ru: 'Узбекская лепешка', en: 'Traditional bread' },
      description: { uz: 'Tandirda yopilgan qarsillama milly non', ru: 'Традиционная узбекская лепешка из тандыра', en: 'Traditional Uzbek tandoor bread' },
      weight: '250',
      price: '8 000',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80'
    }
  ],
  salads: [
    {
      id: 's1',
      name: { uz: 'Filadelfiya', ru: 'Филадельфия', en: 'Philadelphia' },
      description: { uz: 'Losos, pishloq, bodring, guruch, nori', ru: 'Лосось, сливочный сыр, огурец, рис, нори', en: 'Salmon, cream cheese, cucumber, rice, nori' },
      weight: '200',
      price: '98 000',
      image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's2',
      name: { uz: 'Kaliforniya', ru: 'Калифорния', en: 'California' },
      description: { uz: 'Krab, avokado, bodring, tobiko, guruch, nori', ru: 'Краб, авокадо, огурец, тобико, рис, нори', en: 'Crab, avocado, cucumber, tobiko, rice, nori' },
      weight: '200',
      price: '85 000',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's3',
      name: { uz: 'Tsezar roll', ru: 'Цезарь ролл', en: 'Caesar roll' },
      description: { uz: 'Tovuq, salat bargi, pishloq, tsezar sousi, guruch, nori', ru: 'Курица, салат, сыр, соус цезарь, рис, нори', en: 'Chicken, lettuce, cheese, caesar sauce, rice, nori' },
      weight: '200',
      price: '78 000',
      image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's4',
      name: { uz: 'Drakon roll', ru: 'Дракон ролл', en: 'Dragon roll' },
      description: { uz: 'Ilanbaliq, avokado, bodring, kunjut, guruch, nori', ru: 'Угорь, авокадо, огурец, кунжут, рис, нори', en: 'Eel, avocado, cucumber, sesame, rice, nori' },
      weight: '200',
      price: '110 000',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

export default function CategoryDetail({ category, currentLang, onBack, onChangeLang }) {
  // Agar mahsulotlar topilmasa standart ro'yxat
  const products = SAMPLE_PRODUCTS[category.id] || SAMPLE_PRODUCTS['salads'];

  return (
    <div className="category-detail-wrapper fade-in">
      {/* Header */}
      <header className="category-header">
        <button className="back-btn" onClick={onBack}>
          <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>{UI_TEXT.backBtn[currentLang]}</span>
        </button>

        <div className="category-header-logo">
          <img src={logoImg} alt="Shirin Tabaka" />
        </div>

        <button className="category-lang-btn" onClick={onChangeLang}>
          <span className="lang-code">{currentLang.toUpperCase()}</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="category-main-content">
        {/* Banner Card */}
        <div className="category-banner-card">
          <div className="banner-info">
            <div className="banner-title-row">
              <img src={category.image} alt={category.name[currentLang]} className="banner-mini-thumb" />
              <div>
                <h1 className="banner-title">{category.name[currentLang]}</h1>
                <span className="banner-count">
                  {products.length} {UI_TEXT.itemsCount[currentLang]}
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
            <img src={category.image} alt="" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-img-wrapper">
                <img src={item.image} alt={item.name[currentLang]} className="product-img" />
              </div>
              <div className="product-details">
                <h3 className="product-name">{item.name[currentLang]}</h3>
                <p className="product-description">{item.description[currentLang]}</p>
                <span className="product-weight">{item.weight} {UI_TEXT.weightUnit[currentLang]}</span>
                <div className="product-price">
                  {item.price} <span>{UI_TEXT.currency[currentLang]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}