import React, { useState } from 'react';

export const LanguageSwitcher: React.FC = () => {
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');

  const toggleLanguage = () => {
    const nextLang = lang === 'RU' ? 'EN' : 'RU';
    setLang(nextLang);
    // Сохраняем выбор пользователя
    localStorage.setItem('app_language', nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
      title="Сменить язык / Switch language"
    >
      <span>🌐</span>
      <span>{lang}</span>
    </button>
  );
};
