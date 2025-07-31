import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Store } from '../types';

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group min-w-[250px]">
      <div className="relative">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <Clock size={12} className="mr-1" />
          {store.eta}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{store.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">{store.rating}</span>
          </div>
          <span className="text-sm text-gray-500">Delivery in {store.eta}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;