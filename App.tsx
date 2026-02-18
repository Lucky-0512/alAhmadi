
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import FoodCard from './components/FoodCard';
import OrderModal from './components/OrderModal';
import CategoryFilter from './components/CategoryFilter';
import SideMenu from './components/SideMenu';
import { MENU_ITEMS, CONTACT_WHATSAPP, GUEST_REVIEWS } from './constants';
import { MenuItem, Category, CartItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Rice', 'Grills', 'Breakfast', 'Sides', 'Sweets'];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== item.id);
    });
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      return sum + (price * item.quantity);
    }, 0);
  }, [cart]);

  const handleSendOrder = (name: string, pickupTime: string) => {
    const orderLines = cart.map(item => `- [${item.quantity}] x ${item.name}`).join('\n');
    
    // Tiered deposit logic
    const depositRate = pickupTime === '15m' ? 0.15 : pickupTime === '20m' ? 0.12 : 0.10;
    const depositAmount = totalAmount * depositRate;
    const balanceDue = totalAmount - depositAmount;

    const message = `AL AHMADI - NEW ORDER
I understand a ${depositAmount.toFixed(3)} KWD deposit (${(depositRate * 100)}%) is required to confirm for ${pickupTime} pickup.

Customer: ${name}
Pickup in: ${pickupTime}

Items:
${orderLines}

Total: ${totalAmount.toFixed(3)} KWD
Balance Due at Shop: ${balanceDue.toFixed(3)} KWD`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodedMessage}`, '_blank');
    
    setCart([]);
    setIsOrderModalOpen(false);
  };

  const handleSidebarNavigation = (tabId: string) => {
    if (tabId === 'home' || tabId === 'menu' || tabId === 'orders' || tabId === 'profile') {
      setActiveTab(tabId);
    } else if (tabId === 'location') {
      window.open('https://maps.google.com/?q=Al+Ahmadi+Restaurant+Kuwait', '_blank');
    } else if (tabId === 'contact') {
      window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank');
    }
  };

  const renderHome = () => (
    <div className="pb-40">
      {/* Search Bar Overlay */}
      {isSearchVisible && (
        <div className="px-5 mb-6 animate-section">
          <div className="relative group">
            <input 
              autoFocus
              type="text"
              placeholder="Search dishes, rice, grills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d48c31]/50 transition-all shadow-inner"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#d48c31] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Slider Section */}
      <div className="px-5 mb-8 pt-2">
        <div className="relative h-60 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover"
            alt="Desert Heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-zinc-100 text-xl font-light mb-1 opacity-90">Modern Desert Heritage.</h2>
            <h2 className="text-zinc-100 text-2xl font-bold mb-4">Authentic Flavors.</h2>
            <div className="flex gap-2">
              <div className="w-10 h-1.5 bg-[#d48c31] rounded-full"></div>
              <div className="w-2 h-1.5 bg-white/20 rounded-full"></div>
              <div className="w-2 h-1.5 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />

      {/* Grid Layout for Menu Items */}
      <div className="px-5">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <FoodCard 
                key={item.id} 
                item={item} 
                onAdd={addToCart} 
                onRemove={removeFromCart}
                quantityInCart={cart.find(i => i.id === item.id)?.quantity || 0}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-zinc-500 italic">No items found matching your selection.</div>
        )}
      </div>

      {/* Takeaway Order Large Button */}
      {cart.length > 0 && (
        <div className="px-5 mt-10">
          <button 
            onClick={() => setIsOrderModalOpen(true)}
            className="w-full bg-[#d48c31] text-zinc-900 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.25em] shadow-[0_20px_40px_rgba(212,140,49,0.25)] hover:bg-[#c47c21] transition-all active:scale-[0.98] flex items-center justify-center gap-4"
          >
            TAKEAWAY ORDER
            <div className="bg-black/10 px-3 py-1 rounded-full text-[9px] font-bold">
              {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
            </div>
          </button>
        </div>
      )}

      {/* Guest Reviews Section */}
      <section className="mt-24">
        <div className="flex flex-col items-center mb-10 text-center px-5">
           <div className="h-[2px] w-12 bg-[#d48c31]/40 mb-6"></div>
           <h2 className="header-font text-3xl text-[#d48c31] mb-2 tracking-wide">Guest Reviews</h2>
           <p className="text-zinc-600 text-[10px] tracking-widest uppercase font-black">Authentic Heritage Experiences</p>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar px-5 pb-10 scroll-smooth">
          {GUEST_REVIEWS.map((rev, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[85%] bg-[#2a2a2a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col"
            >
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d48c31] flex items-center justify-center text-zinc-900 font-bold uppercase text-sm shadow-md">
                      {rev.author[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-0.5">{rev.author}</h4>
                      <p className="text-zinc-500 text-[9px] uppercase tracking-tight">Verified • {rev.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3 h-3 text-[#d48c31]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <p className="text-zinc-400 text-[12px] leading-relaxed mb-6 font-medium italic line-clamp-4">
                  "{rev.text}"
                </p>

                {rev.images && (
                  <div className="flex gap-3 mt-auto overflow-x-auto no-scrollbar">
                    {rev.images.map((img, idx) => (
                      <img key={idx} src={img} className="w-28 h-28 flex-shrink-0 object-cover rounded-2xl border border-white/5" alt="Review dish" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderMenu = () => (
    <div className="p-6 pb-40">
      <h2 className="header-font text-[32px] text-[#d48c31] mb-8 leading-tight">Explore Our Selection</h2>
      
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />

      <div className="grid grid-cols-2 gap-5 mt-4">
        {filteredItems.map(item => (
          <FoodCard 
            key={item.id} 
            item={item} 
            onAdd={addToCart} 
            onRemove={removeFromCart}
            quantityInCart={cart.find(i => i.id === item.id)?.quantity || 0}
          />
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="p-6">
      <h2 className="header-font text-[32px] text-[#d48c31] mb-8 leading-tight">Your Basket</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 bg-zinc-800/50 rounded-full flex items-center justify-center text-zinc-600 mb-8 border border-white/5 shadow-inner">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs mb-8">Your basket is waiting</p>
          <button 
            onClick={() => setActiveTab('home')} 
            className="text-[#d48c31] text-sm font-black tracking-widest uppercase border-b-2 border-[#d48c31]/30 pb-2 hover:border-[#d48c31] transition-all"
          >
            Start Exploring
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {cart.map(item => (
            <div key={item.id} className="bg-[#2a2a2a] p-5 rounded-3xl flex justify-between items-center border border-white/5 shadow-md">
              <div className="flex gap-5 items-center w-full">
                <img src={item.imageUrl} className="w-14 h-14 rounded-2xl object-cover border border-white/5 flex-shrink-0" alt={item.name} />
                <div className="flex-grow ml-4">
                  <p className="text-white font-bold text-[14px] line-clamp-1">{item.name}</p>
                  <p className="text-[#D4A373] text-[11px] font-black tracking-tight mt-0.5">KD {(item.price as number * item.quantity).toFixed(3)}</p>
                </div>
                <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-2 py-1 border border-white/5 flex-shrink-0">
                  <button onClick={() => removeFromCart(item)} className="text-zinc-400 hover:text-white p-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="text-[#d48c31] font-black text-xs min-w-[12px] text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="text-[#d48c31] hover:text-white p-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-12 p-8 bg-[#d48c31] rounded-[2.5rem] text-zinc-900 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <span className="font-black uppercase tracking-[0.2em] text-[10px]">Total Order Balance</span>
              <span className="text-2xl font-black tracking-tighter">KD {totalAmount.toFixed(3)}</span>
            </div>
            <button 
              onClick={() => setIsOrderModalOpen(true)} 
              className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-lg active:scale-[0.97] transition-all"
            >
              Finalize Order
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#fdfaf5] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className="max-w-[450px] mx-auto min-h-screen bg-[#1c1c1c] shadow-[0_0_120px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
        
        <Header 
          onMenuClick={() => setIsMenuOpen(true)}
          onSearchClick={() => setIsSearchVisible(!isSearchVisible)}
          onUserClick={() => {}} 
        />

        <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onNavigate={handleSidebarNavigation}
        />

        <main className="flex-grow overflow-y-auto no-scrollbar scroll-smooth relative">
          <div key={activeTab} className="animate-section h-full">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'menu' && renderMenu()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'profile' && (
              <div className="p-6 text-zinc-500 text-center py-24 italic">Profile settings are coming soon.</div>
            )}
          </div>
        </main>

        <nav className="bg-[#1c1c1c] border-t border-white/5 py-6 px-10 flex justify-between items-center z-50">
          {[
            { id: 'home', name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'menu', name: 'Menu', icon: 'M4 6h16M4 12h16M4 18h16' },
            { id: 'orders', name: 'Basket', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { id: 'profile', name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-2 transition-all duration-300 ${activeTab === tab.id ? 'text-[#d48c31] scale-110' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === tab.id ? 2.2 : 1.5} d={tab.icon} />
                </svg>
                {tab.id === 'orders' && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d48c31] border-[3px] border-[#1c1c1c] rounded-full shadow-sm animate-pulse flex items-center justify-center text-[7px] font-black text-zinc-900">
                    {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </span>
                )}
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.25em]">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        onSubmit={handleSendOrder}
        total={totalAmount}
      />
    </div>
  );
};

export default App;
