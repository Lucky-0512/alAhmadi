
import React, { useState } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, pickupTime: string) => void;
  total: number;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSubmit, total }) => {
  const [name, setName] = useState('');
  const [pickupTime, setPickupTime] = useState('20m');

  if (!isOpen) return null;

  const getDepositRate = (time: string) => {
    if (time === '15m') return 0.15;
    if (time === '20m') return 0.12;
    return 0.10; // 60m
  };

  const depositRate = getDepositRate(pickupTime);
  const deposit = total * depositRate;
  const balance = total - deposit;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1c1c1c] w-full max-w-md rounded-[2.5rem] p-8 border border-white/10 shadow-2xl transform transition-all animate-section">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="header-font text-2xl text-[#D4A373] leading-none">Finalize Order</h2>
            <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-2">Takeaway Confirmation</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.25em] font-black">Customer Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4A373]/50 text-white transition-all text-sm placeholder:text-zinc-600"
              placeholder="Full Name"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.25em] font-black">Ready For Pickup In</label>
            <div className="grid grid-cols-3 gap-3">
              {['15m', '20m', '60m'].map((time) => (
                <button
                  key={time}
                  onClick={() => setPickupTime(time)}
                  className={`py-3 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all ${
                    pickupTime === time 
                    ? 'bg-[#D4A373] text-zinc-900 border-[#D4A373] shadow-lg shadow-[#D4A373]/20' 
                    : 'bg-zinc-800/50 border-white/5 text-zinc-500'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown Section */}
          <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Order Total</span>
              <span className="text-zinc-300 text-sm font-bold">{total.toFixed(3)} KWD</span>
            </div>
            
            <div className="flex justify-between items-center text-[#D4A373]">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest">Deposit Required</span>
                <span className="text-[8px] opacity-70">{(depositRate * 100)}% trust-cut for {pickupTime} prep</span>
              </div>
              <span className="text-lg font-black">{deposit.toFixed(3)} KWD</span>
            </div>

            <div className="h-[1px] bg-white/5"></div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Balance at Pickup</span>
              <span className="text-white text-base font-black">{balance.toFixed(3)} KWD</span>
            </div>
          </div>

          {/* Bilingual Disclaimer */}
          <div className="px-2 text-center space-y-1">
            <p className="text-[9px] text-zinc-500 italic leading-relaxed">
              Deposits are non-refundable for no-shows
            </p>
            <p className="text-[10px] text-zinc-600 font-medium" dir="rtl">
              العربون غير قابل للاسترداد في حال عدم الحضور
            </p>
          </div>
          
          <button
            onClick={() => name.trim() && onSubmit(name, pickupTime)}
            disabled={!name.trim()}
            className={`w-full py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 ${
              name.trim() 
              ? 'bg-[#25D366] text-white hover:bg-[#128C7E]' 
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Confirm via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
