import Navbar from "@/src/components/layout/Navbar";
import { MapPin } from "lucide-react";

export default function MapPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-slate-200">
          {/* Mock Map Background */}
          <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/51.3890,35.6882,12,0/1024x768?access_token=none')] bg-cover bg-center opacity-50 grayscale flex items-center justify-center">
            <div className="text-slate-400 font-bold bg-white/50 px-8 py-4 rounded-3xl backdrop-blur-sm border border-white/50">
               در حال بارگذاری نقشه تعاملی کلان‌شهر تهران...
            </div>
          </div>
          
          {/* Map Pins Mock */}
          <Pin lat="40%" lng="45%" name="مرکز آریا" />
          <Pin lat="55%" lng="30%" name="مجتمع نوین" />
          <Pin lat="30%" lng="60%" name="کلینیک بهاران" />
        </div>

        <div className="absolute bottom-8 right-8 w-80 bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">مراکز در محدوده شما</h3>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            <ListItem name="مرکز تخصصی آریا" subtitle="فاصله: ۱.۲ کیلومتر" />
            <ListItem name="مجتمع آموزشی نوین" subtitle="فاصله: ۲.۵ کیلومتر" />
            <ListItem name="کلینیک زیبایی بهاران" subtitle="فاصله: ۳ کیلومتر" />
          </div>
          <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
            نمایش لیست کامل
          </button>
        </div>
      </main>
    </div>
  );
}

function Pin({ lat, lng, name }: any) {
  return (
    <div className="absolute cursor-pointer group" style={{ top: lat, left: lng }}>
      <div className="relative">
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {name}
        </div>
        <MapPin size={32} className="text-indigo-600 -translate-x-1/2 -translate-y-full hover:scale-125 transition-transform" fill="currentColor" fillOpacity={0.2} />
      </div>
    </div>
  );
}

function ListItem({ name, subtitle }: any) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
      <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
        <MapPin size={16} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-900">{name}</p>
        <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
