
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
    <div className="bg-[#1c1c1c] rounded-[2rem] overflow-hidden shadow-xl border border-white/5 flex flex-col h-full group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:hover:scale-[1.03]">
      <div className="relative h-44 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        {quantityInCart > 0 && (
          <div className="absolute top-4 right-4 bg-[#D4A373] text-zinc-900 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black shadow-lg animate-pulse">
            {quantityInCart}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-zinc-200 text-[14px] font-bold leading-tight flex-grow">{item.name}</h3>
          {item.isBuffet && (
            <span className="bg-amber-500/10 text-amber-500 text-[8px] uppercase font-black px-2 py-1 rounded-md border border-amber-500/20 ml-2">Buffet</span>
          )}
        </div>
        <p className="text-[#D4A373] text-xs font-black mb-4 tracking-tight">{formattedPrice}</p>
        
        <div className="mt-auto">
          {quantityInCart === 0 ? (
            <button 
              onClick={() => onAdd(item)}
              className="w-full bg-[#D4A373] text-zinc-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c49263] active:scale-95 transition-all shadow-md"
            >
              Select Item
            </button>
          ) : (
            <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-1 border border-white/5">
              <button 
                onClick={() => onRemove(item)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-700 text-[#D4A373] hover:bg-zinc-600 transition-colors active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="text-zinc-100 text-sm font-black px-2">{quantityInCart}</span>
              
              <button 
                onClick={() => onAdd(item)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#D4A373] text-zinc-900 hover:bg-[#c49263] transition-colors active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
