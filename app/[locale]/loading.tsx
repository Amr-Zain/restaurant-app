import { getTranslations } from 'next-intl/server';
import React from 'react';

 const Loader = async() => {
    const t = await getTranslations()
  return (
    <div className="text-center h-screen flex flex-col justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary mx-auto mb-3" />
      <h2 className="text-text">{t('buttons.loading')}</h2>
    </div>
  );
}

export default Loader;
