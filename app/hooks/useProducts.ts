'use client';

import { useProducts as useProductsContext } from '../context/ProductContext';

export const useProducts = () => {
  return useProductsContext();
};
