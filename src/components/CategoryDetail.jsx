import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './CategoryDetail.css';
import logoImg from '../assets/images/logo.png';
import { supabase } from '../supabase/supabesa';

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
  },
  closeBtn: {
    uz: 'Yopish',
    ru: 'Закрыть',
    en: 'Close'
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mahsulot bosilganda sahifani sakratib yubormasdan to'g'ri qotirish
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  useEffect(() => {
    async function fetchProducts() {
      if (!category) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);

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

        const { data: allProducts, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.error('Mahsulotlarni olishda xatolik:', error.message);
        } else if (allProducts) {
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
      .from('mahsulot')
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

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

  const getProductName = (item) => {
    if (!item || !item.name) return '';
    if (typeof item.name === 'object') {
      return item.name[currentLang] || item.name.ru || item.name.uz || item.name.en || '';
    }
    return item.name;
  };

  const getProductDescription = (item) => {
    if (!item) return '';
    const desc = item.description || item.desc;
    if (!desc) return currentLang === 'uz' ? 'Tavsif mavjud emas.' : currentLang === 'ru' ? 'Описание отсутствует.' : 'No description available.';
    if (typeof desc === 'object') {
      return desc[currentLang] || desc.ru || desc.uz || desc.en || '';
    }
    return desc;
  };

  // Modalni alohida komponent sifatida ajratdik, chunki uni portal orqali
  // to'g'ridan-to'g'ri document.body ichiga chiqaramiz. Shunda u
  // wrapper'dagi transform/scroll holatidan mustaqil bo'lib, har doim
  // ekran markazida va to'liq enida chiqadi.
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
            src={getImageUrl(selectedProduct.image_url || selectedProduct.image)} 
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
                src={getImageUrl(category?.image_url || category?.image)}
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
            <img src={getImageUrl(category?.image_url || category?.image)} alt="" />
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
            Yuklanmoqda...
          </p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
            Bu kategoriyada hozircha mahsulotlar yo'q.
          </p>
        ) : (
          <div className="products-grid">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="product-card"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="product-img-wrapper">
                  <img
                    src={getImageUrl(item.image_url || item.image)}
                    alt={getProductName(item)}
                    className="product-img"
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

      {/* MAHSULOT KATTA MODAL OYNASI — endi portal orqali body'ga chiqadi */}
      {selectedProduct && createPortal(modalContent, document.body)}
    </div>
  );
}