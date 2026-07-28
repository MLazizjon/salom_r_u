import React from 'react';

export default function MainSite({ onBack }) {
  return (
    <div style={{ padding: '20px', maxWidth: '430px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* Orqaga qaytish tugmasi */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-card)',
            color: 'var(--color-text-primary)',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Orqaga
        </button>
      </div>

      {/* Kontent */}
      <h2>Shirin Tabaka - Asosiy Sahifa</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
        Tez orada bu yerda menyu paydo bo'ladi!
      </p>
    </div>
  );
}