
import React from 'react';
import { MenuItem } from '../types';

interface FoodCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
  quantityInCart: number;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAdd, onRemove, quantityInCart }) => {
  const formattedPrice = typeof item.price === 'number' 
    ? `KD ${item.price.toFixed(3)}` 
    : item.price;

  return (
    <div className="bg-[#1c1c1c] rounded-[1.5rem] overflow-hidden shadow-xl border border-white/5 flex flex-col h-full group">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {quantityInCart > 0 && (
          <div className="absolute top-3 right-3 bg-[#D4A373] text-zinc-900 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shadow-lg">
            {quantityInCart}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-zinc-200 text-sm font-bold mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-[#D4A373] text-xs font-black mb-4">{formattedPrice}</p>
        
        <div className="mt-auto">
          {quantityInCart === 0 ? (
            <button 
              onClick={() => onAdd(item)}
              className="w-full bg-[#D4A373] text-zinc-900 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c49263] active:scale-95 transition-all shadow-md"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-1 border border-white/5">
              <button 
                onClick={() => onRemove(item)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-700 text-[#D4A373] hover:bg-zinc-600 transition-colors active:scale-90"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="text-zinc-100 text-xs font-black px-2">{quantityInCart}</span>
              
              <button 
                onClick={() => onAdd(item)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#D4A373] text-zinc-900 hover:bg-[#c49263] transition-colors active:scale-90"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
