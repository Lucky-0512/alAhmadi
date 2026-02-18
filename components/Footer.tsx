
import React from 'react';
import { CONTACT_WHATSAPP } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1c1c1c] border-t border-white/5 pt-16 pb-12 px-6 sm:px-10 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: About */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="header-font text-2xl text-[#d48c31] leading-none tracking-wide">الأحمدي</span>
              <span className="text-[7px] text-[#d48c31]/90 font-black tracking-[0.4em] uppercase mt-0.5">AL AHMADI</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Serving authentic flavors in the heart of Kuwait since 1978. A legacy of heritage, hospitality, and the finest Kuwaiti cuisine.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Location', 'Terms & Conditions'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-500 text-sm hover:text-[#d48c31] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-6">
            <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em]">Contact & Hours</h4>
            <div className="space-y-4 text-sm text-zinc-500">
              <p className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#d48c31]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth={2} /></svg>
                Al Ahmadi / Farwaniya, Kuwait
              </p>
              <p className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#d48c31]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth={2} /></svg>
                +965 9696 1300
              </p>
              <p className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#d48c31]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                Open Daily: 12:00 PM - 11:30 PM
              </p>
            </div>
          </div>

          {/* Column 4: Socials & Payments */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em]">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.344.061-2.261.274-3.064.587-.83.322-1.533.753-2.233 1.453s-1.13 1.403-1.453 2.233c-.313.803-.526 1.72-.587 3.064-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.061 1.344.274 2.261.587 3.064.322.83.753 1.533 1.453 2.233s1.403 1.13 2.233 1.453c.803.313 1.72.526 3.064.587 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.344-.061 2.261-.274 3.064-.587.83-.322 1.533-.753 2.233-1.453s1.13-1.403 1.453-2.233c.313-.803.526-1.72.587-3.064.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.061-1.344-.274-2.261-.587-3.064-.322-.83-.753-1.533-1.453-2.233s-1.403-1.13-2.233-1.453c-.803-.313-1.72-.526-3.064-.587-1.28-.058-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href={`https://wa.me/${CONTACT_WHATSAPP}`} className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Secure Payments</h4>
              <div className="flex gap-3 grayscale opacity-40">
                <div className="px-3 py-1 bg-white rounded flex items-center justify-center font-black text-black text-[9px]">K-NET</div>
                <div className="px-3 py-1 bg-white rounded flex items-center justify-center font-black text-black text-[9px]">VISA</div>
                <div className="px-3 py-1 bg-white rounded flex items-center justify-center font-black text-black text-[9px]">MC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest text-center">
            &copy; 2026 Al Ahmadi Restaurant. Built with ❤️ for the Kuwaiti community.
          </p>
          <div className="flex gap-6">
             <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Crafted for Excellence</span>
             <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Premium Dining</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
