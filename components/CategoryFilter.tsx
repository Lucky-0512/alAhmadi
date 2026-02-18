
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-3 pb-6 px-6 w-max min-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-6 py-2.5 rounded-full whitespace-nowrap text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
              activeCategory === cat 
              ? 'bg-[#D4A373] text-zinc-900 shadow-[0_8px_20px_rgba(212,163,115,0.25)] scale-105' 
              : 'bg-zinc-900/80 text-zinc-500 hover:text-zinc-200 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
        {/* Spacer to ensure the last item doesn't hug the edge when scrolled */}
        <div className="w-6 flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default CategoryFilter;
