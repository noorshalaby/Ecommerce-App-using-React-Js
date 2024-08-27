import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CirclesWithBar } from 'react-loader-spinner';
import NotFound from './../NotFound/NotFound';

function BrandModal({ isOpen, onClose, brand }) {
  if (!isOpen || !brand) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button onClick={onClose} className="absolute top-[25%] right-[35%] left-[60%] text-5xl text-red-700">
          &times;
        </button>
        <img src={brand.image} alt={brand.name} className="w-full h-auto mb-4 rounded-lg" />
        <h2 className="text-2xl font-bold mb-2 text-center">{brand.name}</h2>
      </div>
    </div>
  );
}

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ["AllBrands"],
    queryFn: getBrands,
  });

  const openModal = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBrand(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex bars justify-center bg-transparent">
        <CirclesWithBar width={120} height={120} />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-4xl main-color my-7">All Brands</h1>
      <div className="row">
        {data?.data.data.map((brand) => (
          <div
            className="md:w-1/4 product gap-10"
            key={brand._id}
            onClick={() => openModal(brand)}
          >
            <div className="p-5">
              <img src={brand.image} className="w-full" alt={brand.name} />
            </div>
            <h1 className="text-center font-bold mb-10">{brand.name}</h1>
          </div>
        ))}
      </div>
      <BrandModal isOpen={isModalOpen} onClose={closeModal} brand={selectedBrand} />
    </>
  );
}
