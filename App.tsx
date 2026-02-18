
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import FoodCard from './components/FoodCard';
import OrderModal from './components/OrderModal';
import CategoryFilter from './components/CategoryFilter';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import { MENU_ITEMS, CONTACT_WHATSAPP, GUEST_REVIEWS } from './constants';
import { MenuItem, Category, CartItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  
  // Slider State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const categories: Category[] = ['All', 'Rice', 'Grills', 'Breakfast', 'Sides', 'Sweets', 'Buffet'];

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

  const cartItemCount = useMemo(() => cart.reduce((acc, curr) => acc + curr.quantity, 0), [cart]);

  const handleSendOrder = (name: string, pickupTime: string) => {
    const isBuffetBooking = cart.some(item => item.isBuffet);
    const orderLines = cart.map(item => `- [${item.quantity}] x ${item.name}`).join('\n');
    
    const depositRate = pickupTime === '15m' ? 0.15 : pickupTime === '20m' ? 0.12 : 0.10;
    const depositAmount = totalAmount * depositRate;
    const balanceDue = totalAmount - depositAmount;

    const title = isBuffetBooking ? 'AL AHMADI - BUFFET BOOKING' : 'AL AHMADI - NEW ORDER';
    const intentText = isBuffetBooking 
      ? `I would like to book the Buffet. I understand a ${depositAmount.toFixed(3)} KWD deposit is required.`
      : `I understand a ${depositAmount.toFixed(3)} KWD deposit (${(depositRate * 100)}%) is required to confirm for ${pickupTime} pickup.`;

    const message = `${title}
${intentText}

Customer: ${name}
${isBuffetBooking ? 'Requested For' : 'Pickup in'}: ${pickupTime}

Items:
${orderLines}

Total: ${totalAmount.toFixed(3)} KWD
Balance at Restaurant: ${balanceDue.toFixed(3)} KWD`;

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

  const toggleCart = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Toggle between orders tab and home tab on mobile
      setActiveTab(prev => (prev === 'orders' ? 'home' : 'orders'));
    } else {
      // Desktop: Toggle the right sidebar
      setIsDesktopCartOpen(!isDesktopCartOpen);
      // Ensure we're not stuck in the mobile 'orders' tab view if desktop is resized
      if (activeTab === 'orders') setActiveTab('home');
    }
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % GUEST_REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + GUEST_REVIEWS.length) % GUEST_REVIEWS.length);
  };

  const renderCartSidebarContent = () => {
    const depositRate = 0.12; 
    const depositAmount = totalAmount * depositRate;
    const balanceDue = totalAmount - depositAmount;

    return (
      <div className="flex flex-col h-full p-8 animate-section">
        <div className="flex items-center justify-between mb-8">
          <h2 className="header-font text-2xl text-[#D4A373]">Your Selection</h2>
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#D4A373] font-black text-sm">
            {cartItemCount}
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center text-zinc-600">
            <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-[10px] font-black uppercase tracking-widest">Basket is Empty</p>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4 pr-2">
              {cart.map(item => (
                <div key={item.id} className="bg-[#2a2a2a] p-4 rounded-2xl flex items-center gap-4 border border-white/5 transition-all hover:border-[#D4A373]/20">
                  <img src={item.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt={item.name} />
                  <div className="flex-grow">
                    <p className="text-white font-bold text-xs line-clamp-1">{item.name}</p>
                    <p className="text-[#D4A373] text-[10px] font-black tracking-tight mt-0.5">KD {(item.price as number * item.quantity).toFixed(3)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(item)} className="p-1.5 bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 12H4" strokeWidth={3} /></svg>
                    </button>
                    <span className="text-[#D4A373] font-black text-xs min-w-[12px] text-center">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="p-1.5 bg-[#D4A373] rounded-lg text-zinc-900 hover:bg-[#c49263] transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" strokeWidth={3} /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-5">
              <div className="bg-[#D4A373] p-6 rounded-3xl text-zinc-900 shadow-xl">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                    <span>Total Order</span>
                    <span>KD {totalAmount.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Deposit (Est.)</span>
                    <span>KD {depositAmount.toFixed(3)}</span>
                  </div>
                  <div className="h-[1px] bg-zinc-900/10 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest">Final Balance</span>
                    <span className="text-xl font-black">KD {balanceDue.toFixed(3)}</span>
                  </div>
                </div>
              </div>

              <div className="text-center px-4 space-y-1">
                 <p className="text-[8px] text-zinc-500 italic">Deposits are non-refundable for no-shows</p>
                 <p className="text-[9px] text-zinc-600" dir="rtl">العربون غير قابل للاسترداد في حال عدم الحضور</p>
              </div>

              <button 
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg active:scale-[0.97] transition-all hover:bg-black"
              >
                Checkout Now
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderHome = () => (
    <div className="pb-0">
      {/* Search Bar Overlay */}
      {isSearchVisible && (
        <div className="px-5 mb-6 animate-section max-w-2xl mx-auto">
          <div className="relative group">
            <input 
              autoFocus
              type="text"
              placeholder="Search dishes, rice, buffets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d48c31]/50 transition-all shadow-inner"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#d48c31] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      )}

      {/* Hero Slider Section */}
      <div className="px-5 mb-8 pt-2">
        <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover"
            alt="Desert Heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-[#D4A373] text-sm md:text-base font-black uppercase tracking-[0.4em] mb-2 opacity-90">Heritage Kitchen</h2>
            <h2 className="text-zinc-100 text-3xl md:text-5xl font-bold mb-6 header-font">The Soul of Al Ahmadi.</h2>
            <div className="flex gap-2">
              <div className="w-12 h-1.5 bg-[#d48c31] rounded-full"></div>
              <div className="w-2 h-1.5 bg-white/20 rounded-full"></div>
              <div className="w-2 h-1.5 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />

      <div className="px-5">
        {filteredItems.length > 0 ? (
          <div className={`grid gap-6 ${isDesktopCartOpen ? 'grid-cols-2 lg:grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'}`}>
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

      {cart.length > 0 && (
        <div className="px-5 mt-10 md:hidden">
          <button 
            onClick={() => setIsOrderModalOpen(true)}
            className="w-full bg-[#d48c31] text-zinc-900 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.25em] shadow-[0_20px_40px_rgba(212,140,49,0.25)] hover:bg-[#c47c21] transition-all active:scale-[0.98] flex items-center justify-center gap-4"
          >
            ORDER NOW
            <div className="bg-black/10 px-3 py-1 rounded-full text-[9px] font-bold">
              {cartItemCount}
            </div>
          </button>
        </div>
      )}

      {/* Guest Reviews Slider Section */}
      <section className="mt-24 pb-10">
        <div className="flex flex-col items-center mb-10 text-center px-5">
           <div className="h-[2px] w-12 bg-[#d48c31]/40 mb-6"></div>
           <h2 className="header-font text-3xl md:text-4xl text-[#d48c31] mb-2 tracking-wide">Guest Reviews</h2>
           <p className="text-zinc-600 text-[10px] tracking-widest uppercase font-black">Authentic Heritage Experiences</p>
        </div>

        <div className="relative max-w-4xl mx-auto px-5 group">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-[3rem]">
            <div 
              className="flex transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              {GUEST_REVIEWS.map((rev, i) => (
                <div key={i} className="flex-shrink-0 w-full p-2">
                  <div className="bg-[#2a2a2a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row min-h-[300px]">
                    <div className="p-10 flex flex-col justify-center flex-grow">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-[#d48c31] flex items-center justify-center text-zinc-900 font-bold uppercase text-lg shadow-xl">
                          {rev.author[0]}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-base mb-0.5">{rev.author}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, idx) => (
                                <svg key={idx} className={`w-3 h-3 ${idx < (rev.rating || 5) ? 'fill-current' : 'fill-zinc-700'}`} viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-zinc-500 text-[9px] uppercase tracking-widest">{rev.date}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-zinc-300 text-[15px] leading-relaxed mb-6 font-medium italic">
                        "{rev.text}"
                      </p>
                    </div>
                    {rev.images && rev.images[0] ? (
                      <div className="hidden md:block w-1/3 h-full min-h-[300px]">
                        <img src={rev.images[0]} alt="Review content" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                       <div className="hidden md:block w-1/3 h-full min-h-[300px] bg-zinc-800/50 flex items-center justify-center opacity-10">
                          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={1} /></svg>
                       </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prevReview}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/5 flex items-center justify-center text-[#d48c31] hover:bg-[#d48c31] hover:text-zinc-900 transition-all shadow-xl active:scale-90 md:-left-6"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button 
            onClick={nextReview}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/5 flex items-center justify-center text-[#d48c31] hover:bg-[#d48c31] hover:text-zinc-900 transition-all shadow-xl active:scale-90 md:-right-6"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {GUEST_REVIEWS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentReviewIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentReviewIndex === i ? 'w-8 bg-[#d48c31]' : 'w-2 bg-zinc-800'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer inside scrollable area */}
      <Footer />
    </div>
  );

  const renderBasketTab = () => (
    <div className="p-6 md:p-10 animate-section flex flex-col min-h-full">
      <h2 className="header-font text-[32px] text-[#d48c31] mb-8 leading-tight">Your Basket</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center flex-grow">
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
        <div className="max-w-xl mx-auto space-y-5 w-full flex-grow">
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
      <Footer />
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#1c1c1c] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={handleSidebarNavigation}
      />

      <div className="max-w-[1400px] mx-auto min-h-screen flex relative">
        
        {/* Main Content Area */}
        <div className={`flex-grow flex flex-col transition-all duration-500 ease-in-out ${isDesktopCartOpen ? 'md:w-[65%] lg:w-[70%]' : 'w-full'}`}>
          <Header 
            onMenuClick={() => setIsMenuOpen(true)}
            onSearchClick={() => setIsSearchVisible(!isSearchVisible)}
            onUserClick={() => setActiveTab('profile')} 
            onCartClick={toggleCart}
            cartCount={cartItemCount}
          />

          <main className="flex-grow overflow-y-auto no-scrollbar scroll-smooth relative">
            <div key={activeTab} className="animate-section h-full">
              {activeTab === 'home' && renderHome()}
              {activeTab === 'orders' && renderBasketTab()}
              {(activeTab === 'menu' || activeTab === 'profile') && (
                <div className="p-20 text-center text-zinc-500 italic h-full flex flex-col justify-between">
                  <div className="flex-grow flex items-center justify-center">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} functionality is streamlined for the premium experience.
                  </div>
                  <Footer />
                </div>
              )}
            </div>
          </main>

          {/* Mobile Navigation */}
          <nav className="bg-[#1c1c1c] border-t border-white/5 py-6 px-10 flex justify-between items-center z-50 md:hidden">
            {[
              { id: 'home', name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
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
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d48c31] border-2 border-[#1c1c1c] rounded-full flex items-center justify-center text-[7px] font-black text-zinc-900">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.25em]">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Sidebar Cart (Desktop Only) */}
        <aside className={`hidden md:block sticky top-0 h-screen bg-[#1c1c1c] border-l border-white/5 transition-all duration-500 ease-in-out overflow-hidden ${isDesktopCartOpen ? 'w-[35%] lg:w-[30%] opacity-100 border-l' : 'w-0 opacity-0 border-l-0'}`}>
           <div className="w-[350px] lg:w-[420px] h-full">
            {renderCartSidebarContent()}
           </div>
        </aside>

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
