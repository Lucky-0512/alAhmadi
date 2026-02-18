
import React from 'react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-[4px] z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div 
        className={`fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-[#1c1c1c] z-[110] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) border-r border-white/5 shadow-[25px_0_60px_rgba(0,0,0,0.6)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header Decor */}
        <div className="h-44 bg-[#d48c31] relative flex items-end px-8 pb-8 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l5 15h15l-12 9 4 16-12-10-12 10 4-16-12-9h15z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          ></div>
          <div className="relative z-10">
            <h3 className="header-font text-[30px] text-zinc-900 leading-tight">Al Ahmadi</h3>
            <p className="text-[9px] text-zinc-900/80 font-black tracking-[0.4em] uppercase mt-1">Heritage Kitchen</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-zinc-900 hover:bg-black/20 transition-all active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-10 px-5 flex flex-col gap-1">
          {[
            { id: 'home', label: 'Home Page', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'orders', label: 'My Basket', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { id: 'location', label: 'Find Us', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
            { id: 'contact', label: 'Order Assistance', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className="flex items-center gap-5 px-6 py-4 rounded-2xl hover:bg-white/5 text-zinc-400 hover:text-[#d48c31] transition-all group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800/50 flex items-center justify-center group-hover:bg-[#d48c31]/10 transition-colors">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                </svg>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-auto px-10 pb-10">
          <div className="h-[1px] w-10 bg-zinc-800/40 mb-8"></div>
          <div className="space-y-1">
            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Authenticity Guaranteed</p>
            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Al Ahmadi, Kuwait</p>
            <p className="text-[10px] text-[#d48c31]/40 font-black uppercase tracking-[0.2em] pt-4">EST. 1978</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
