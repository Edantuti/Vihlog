import React from 'react';

import Header from '@/components/Header';

export default async ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
      <Header />
      <main className='mx-36 mt-20'>{children}</main>
    </>
  );
};