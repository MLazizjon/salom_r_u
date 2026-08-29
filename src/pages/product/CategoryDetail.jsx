import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../supabase/supabesa';
import './CategoryDetail.css';
import logoImg from '../../assets/images/imag.png';

const UI_TEXT = {
  backBtn: { uz: 'Ortga', ru: 'Назад', en: 'Back' },
  itemsCount: { uz: 'ta pozitsiya', ru: 'позиций', en: 'items' },
  currency: { uz: 'soʻm', ru: 'сум', en: 'UZS' },
  closeBtn: { uz: 'Yopish', ru: 'Закрыть', en: 'Close' },
  loading: { uz: 'Yuklanmoqda...', ru: 'Загрузка...', en: 'Loading...' },
  noProducts: {
    uz: "Bu kategoriyada hozircha mahsulotlar yo'q.",
    ru: 'В этой категории пока нет товаров.',
    en: 'No products found in this category.',
  },
  addToCart: { uz: 'Savatga qo‘shish', ru: 'В корзину', en: 'Add to cart' },
  cartItemsCount: { uz: 'ta mahsulot', ru: 'товаров', en: 'items' },
  emptyCart: { uz: 'Savat boʻsh', ru: 'Корзина пуста', en: 'Cart is empty' },
};

export default function CategoryDetail({
  category,
  currentLang = 'ru',
  onBack,
  onChangeLang,
  cartItems = [],
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
}) {
  const [productsList, setProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // Savatdagi umumiy soni va umumiy summasi
  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // Mahsulot savatda bor-yo'qligini va uning miqdorini aniqlash
  const getItemQuantity = (productId) => {
    const foundItem = cartItems.find((item) => item.id === productId);
    return foundItem ? foundItem.quantity || 1 : 0;
  };

  useEffect(() => {
    document.body.style.overflow = selectedProduct ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  useEffect(() => {
    async function fetchProducts() {
      if (!category) {
        setProductsList([]);
        return;
      }

      setIsLoading(true);
      const categoryKey = category.id || category.slug;

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', categoryKey)
          .eq('status', 'active');

        if (error) {
          console.error('Mahsulotlarni yuklashda Supabase xatosi:', error);
        } else {
          setProductsList(data || []);
        }
      } catch (err) {
        console.error('Server bilan aloqa xatosi:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
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
    if (typeof item.name === 'object') {
      return item.name[currentLang] || item.name.ru || item.name.en || '';
    }
    return item.name;
  };

  const getProductDescription = (item) => {
    if (!item) return '';
    const desc = item.description || item.desc;
    if (!desc) {
      return currentLang === 'uz'
        ? 'Tavsif mavjud emas.'
        : currentLang === 'ru'
        ? 'Описание отсутствует.'
        : 'No description available.';
    }
    return typeof desc === 'object' ? desc[currentLang] || desc.ru || '' : desc;
  };

  const handleDecrement = (e, item) => {
    e.stopPropagation();
    if (onRemoveFromCart) {
      onRemoveFromCart(item);
    }
  };

  const handleIncrement = (e, item) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  // Modal konteyneri
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
            src={selectedProduct.image_url || selectedProduct.image}
            alt={getProductName(selectedProduct)}
            className="modal-img"
          />
        </div>

        <div className="modal-info-wrapper">
          <h2 className="modal-product-name">{getProductName(selectedProduct)}</h2>
          <p className="modal-product-desc">{getProductDescription(selectedProduct)}</p>

          <div className="modal-footer-row">
            <div className="modal-product-price">
              {Number(selectedProduct.price).toLocaleString()} <span>{UI_TEXT.currency[currentLang]}</span>
            </div>

            {getItemQuantity(selectedProduct.id) > 0 ? (
              <div className="quantity-control-btn modal-quantity-control">
                <button
                  type="button"
                  className="qty-btn qty-minus"
                  onClick={(e) => handleDecrement(e, selectedProduct)}
                >
                  –
                </button>
                <span className="qty-count">{getItemQuantity(selectedProduct.id)}</span>
                <button
                  type="button"
                  className="qty-btn qty-plus"
                  onClick={(e) => handleIncrement(e, selectedProduct)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="modal-add-btn"
                onClick={(e) => handleIncrement(e, selectedProduct)}
              >
                {UI_TEXT.addToCart[currentLang]}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Floating Savat paneli
  const cartBarContent = (
    <div className="cart-bar-wrapper">
      <div className="cart-bar-container" onClick={onOpenCart}>
        <div className="cart-bar-left">
          <div className="cart-icon-circle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-badge-count">{totalCartCount}</span>
          </div>
          <div className="cart-bar-details">
            <span className="cart-items-text">
              {totalCartCount} {UI_TEXT.cartItemsCount[currentLang]}
            </span>
            <span className="cart-total-price">
              {totalCartPrice.toLocaleString()} {UI_TEXT.currency[currentLang]}
            </span>
          </div>
        </div>

        <div className="cart-bar-right">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
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
          <img src={logoImg} alt="Logo" />
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

        {isLoading ? (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
            {UI_TEXT.loading[currentLang]}
          </p>
        ) : productsList.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
            {UI_TEXT.noProducts[currentLang]}
          </p>
        ) : (
          <div className="products-grid">
            {productsList.map((item) => {
              const qty = getItemQuantity(item.id);

              return (
                <div
                  key={item.id}
                  className="product-card"
                  onClick={() => setSelectedProduct(item)}
                >
                  <div className="product-img-wrapper">
                    <img
                      src={item.image_url || item.image}
                      alt={getProductName(item)}
                      className="product-img"
                    />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{getProductName(item)}</h3>
                    <div className="product-card-footer">
                      <div className="product-price">
                        {Number(item.price).toLocaleString()}
                        <span> {UI_TEXT.currency[currentLang]}</span>
                      </div>

                      {qty > 0 ? (
                        <div className="quantity-control-btn" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="qty-btn qty-minus"
                            onClick={(e) => handleDecrement(e, item)}
                          >
                            –
                          </button>
                          <span className="qty-count">{qty}</span>
                          <button
                            type="button"
                            className="qty-btn qty-plus"
                            onClick={(e) => handleIncrement(e, item)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="add-to-cart-small-btn"
                          onClick={(e) => handleIncrement(e, item)}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Savat panelini portal orqali body-ga faqat savatda mahsulot bo'lganda chiqarish */}
      {totalCartCount > 0 && createPortal(cartBarContent, document.body)}

      {/* Modal paneli */}
      {selectedProduct && createPortal(modalContent, document.body)}
    </div>
  );
}