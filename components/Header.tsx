
import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onUserClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearchClick, onUserClick }) => {
  return (
    <header className="relative w-full bg-[#1c1c1c] overflow-hidden flex flex-col">
      {/* 
          Status Bar & Patterned Section 
          Color: Deep warm orange/gold (#d48c31)
      */}
      <div className="h-16 bg-[#d48c31] relative w-full">
        {/* Intricate Islamic Geometric Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l5 15h15l-12 9 4 16-12-10-12 10 4-16-12-9h15z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '24px 24px'
          }}
        ></div>

        {/* The Repeating Dome/Arch Cutout Transition */}
        <div className="absolute -bottom-[1px] left-0 w-full h-8 flex items-end">
          <div className="flex w-full h-full">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex-1 relative h-full">
                {/* The Dark Dome Shape */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[120%] bg-[#1c1c1c]" 
                  style={{ 
                    borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Logo and Icons Section */}
      <div className="px-5 pb-6 pt-1 flex justify-between items-center bg-[#1c1c1c] relative">
        {/* Left: Hamburger Menu */}
        <div className="w-10">
          <button 
            onClick={onMenuClick}
            className="text-zinc-400 p-2 hover:text-[#d48c31] transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex flex-col items-center">
          <span className="header-font text-[34px] text-[#d48c31] leading-none tracking-wide">الأحمدي</span>
          <span className="text-[8px] text-[#d48c31]/90 font-black tracking-[0.5em] uppercase mt-1">AL AHMADI</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 w-10 justify-end">
          <button 
            onClick={onSearchClick} 
            className="text-zinc-400 p-2 hover:text-[#d48c31] transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <button 
            onClick={onUserClick} 
            className="text-zinc-400 p-1 hover:text-[#d48c31] transition-all"
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#d48c31]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
