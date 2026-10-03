'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext.tsx';
import { MealProvider } from '../context/MealContext.tsx';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MealProvider>
        {children}
      </MealProvider>
    </AuthProvider>
  );
}
