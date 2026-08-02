import React, { useEffect, useState } from 'react';
import './CategoryDetail.css';
import logoImg from '../assets/images/logo.png';
import { supabase } from '../supabase/supabesa'; // Yo'lni to'g'rilang (supabesa emas, supabase)

import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

const FLAGS = { uz: uzFlag, ru: ruFlag, en: enFlag };

const UI_TEXT = {
  backBtn: {
    uz: 'Barcha kategoriyalar',
    ru: 'Все категории',
    en: 'All categories'
  },
  itemsCount: {
    uz: 'ta pozitsiya',
    ru: 'позиций',
    en: 'items'
  },
  currency: {
    uz: 'soʻm',
    ru: 'сум',
    en: 'UZS'
  }
};

export default function CategoryDetail({
  category,
  currentLang = 'ru',
  onBack,
  onChangeLang
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!category) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);

        // Kategoriyaning barcha mumkin bo'lgan kalitlarini to'playmiz (id, slug va nomlari)
        const categoryId = category.id;
        const categorySlug = category.slug;
        const categoryNameRu = typeof category.name === 'object' ? category.name?.ru : category.name_ru;
        const categoryNameUz = typeof category.name === 'object' ? category.name?.uz : category.name_uz;
        const categoryNameEn = typeof category.name === 'object' ? category.name?.en : category.name_en;

        const possibleKeys = [
          categoryId,
          categorySlug,
          categoryNameRu,
          categoryNameUz,
          categoryNameEn
        ].filter(Boolean);

        // Supabase'dan barcha mahsulotlarni olib kelamiz
        const { data: allProducts, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.error('Mahsulotlarni olishda xatolik:', error.message);
        } else if (allProducts) {
          // Filtr siyosati: category_id yoki category maydoni mos kelishini tekshiramiz
          const filtered = allProducts.filter(item => {
            return possibleKeys.some(key => 
              String(item.category_id || '').trim().toLowerCase() === String(key).trim().toLowerCase() ||
              String(item.category || '').trim().toLowerCase() === String(key).trim().toLowerCase()
            );
          });
          setProducts(filtered);
        }

      } catch (err) {
        console.error('Tarmoq xatosi:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    const { data } = supabase.storage
      .from('mahsulot') // Supabase bucket nomi
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

  // Kategoriya nomini tanlangan tilga moslab chiqarish (JSON yoki alohida ustunlarni tekshiradi)
  const getCategoryName = (cat) => {
    if (!cat) return '';
    if (currentLang === 'uz') {
      return cat.name_uz || cat.name?.uz || cat.name_ru || cat.name?.ru || 'Kategoriya';
    } else if (currentLang === 'ru') {
      return cat.name_ru || cat.name?.ru || cat.name_uz || cat.name?.uz || 'Категория';
    } else if (currentLang === 'en') {
      return cat.name_en || cat.name?.en || cat.name_uz || cat.name?.uz || 'Category';
    }
    return cat.name_ru || cat.name?.ru || 'Category';
  };

  // Mahsulot nomini tanlangan tilga moslab chiqarish
  const getProductName = (item) => {
    if (!item || !item.name) return '';
    if (typeof item.name === 'object') {
      return item.name[currentLang] || item.name.ru || item.name.uz || item.name.en || '';
    }
    // Agar name string shaklida bo'lsa
    return item.name;
  };

  return (
    <div className="category-detail-wrapper fade-in">
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

        <div className="lang-select-container">
          <button
            type="button"
            className="category-lang-btn"
            onClick={() => {
              sessionStorage.setItem('categoryScrollPosition', window.scrollY);
              sessionStorage.setItem('returnPage', 'category');
              if (onChangeLang) {
                onChangeLang();
              }
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
                src={getImageUrl(category?.image)}
                alt={getCategoryName(category)}
                className="banner-mini-thumb"
              />
              <div>
                <h1 className="banner-title">
                  {getCategoryName(category)}
                </h1>
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
            <img src={getImageUrl(category?.image)} alt="" />
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#fff', fontSize: '18px', marginTop: '40px' }}>
            Yuklanmoqda...
          </p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#fff', fontSize: '18px', marginTop: '40px' }}>
            Bu kategoriyada hozircha mahsulotlar yo'q.
          </p>
        ) : (
          <div className="products-grid">
            {products.map((item) => (
              <div key={item.id} className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src={getImageUrl(item.image)}
                    alt={getProductName(item)}
                    className="product-img"
                    onError={(e) => {
                      console.error('Rasm topilmadi:', e.target.src);
                    }}
                  />
                </div>
                <div className="product-details">
                  <h3 className="product-name">
                    {getProductName(item)}
                  </h3>
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
    </div>
  );
}