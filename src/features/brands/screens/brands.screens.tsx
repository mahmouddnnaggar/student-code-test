"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllBrands from '../server/brands.actions';
import { setBrands } from '../store/brands.slice';
import { RootState } from '@/features/auth/store/store';

export default function BrandsScreen() {
  const dispatch = useDispatch();
  
  const { allBrands } = useSelector((state: RootState) => state.brands);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getAllBrands();
        dispatch(setBrands(response.data));
      } catch (error) {
        console.error("Error loading brands:", error);
      }
    };

    if (allBrands.length === 0) {
      fetchBrands();
    }
  }, [dispatch, allBrands.length]);

  return (
    <section className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">All Brands</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allBrands.map((brand) => (
          <div 
            key={brand._id} 
            className="border  border-green-300       rounded-lg p-2 hover:border-green-500 transition-all cursor-pointer bg-white"
          >
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="w-full h-32 object-contain"
            />
            <p className="text-center mt-2 text-sm font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}