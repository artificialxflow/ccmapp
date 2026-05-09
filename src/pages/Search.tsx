import { useState } from "react";
import Navbar from "@/src/components/layout/Navbar";
import CenterCard from "@/src/components/centers/CenterCard";
import { Search as SearchIcon, Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { Center } from "@/src/types";

const MOCK_CENTERS: Center[] = [
  { id: "1", name: "مرکز تخصصی آریا", ownerId: "o1", specialty: "خدمات فنی و مهندسی", location: { lat: 35.6882, lng: 51.3890, city: "تهران", address: "بلوار ولنجک، کوچه دوم" }, rating: 4.8, reviewsCount: 124, services: ["تعمیرات تخصصی", "مشاوره فنی", "قطعات اصلی"], isVerified: true, imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400" },
  { id: "2", name: "مجتمع آموزشی نوین", ownerId: "o2", specialty: "آموزش و پژوهش", location: { lat: 35.7219, lng: 51.3347, city: "تهران", address: "ستارخان، نبش خیابان هشتم" }, rating: 4.5, reviewsCount: 89, services: ["دوره‌های حضوری", "آموزش آنلاین", "مدرک معتبر"], isVerified: true, imageUrl: "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=400" },
  { id: "3", name: "کلینیک زیبایی بهاران", ownerId: "o3", specialty: "سلامت و زیبایی", location: { lat: 35.8049, lng: 51.4344, city: "تهران", address: "فرشته، پاساژ داریوش" }, rating: 4.9, reviewsCount: 256, services: ["پاکسازی پوست", "لیزر موهای زائد", "جوانسازی"], isVerified: false, imageUrl: "https://images.unsplash.com/photo-1519494140261-d90193639551?auto=format&fit=crop&q=80&w=400" },
  { id: "4", name: "مرکز ورزشی البرز", ownerId: "o4", specialty: "ورزش و تندرستی", location: { lat: 35.7500, lng: 51.4000, city: "تهران", address: "سعادت‌آباد، خیابان صدف" }, rating: 4.2, reviewsCount: 67, services: ["بدنسازی", "استخر", "مربی خصوصی"], isVerified: true, imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400" },
  { id: "5", name: "رستوران ایتالیایی میلان", ownerId: "o5", specialty: "رستوران و کافی‌شاپ", location: { lat: 35.7000, lng: 51.4500, city: "تهران", address: "پاسداران، نبش گلستان" }, rating: 4.7, reviewsCount: 512, services: ["پاستا", "پیتزا تنوری", "موسیقی زنده"], isVerified: true, imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("همه موارد");

  const specialties = ["همه موارد", "خدمات فنی و مهندسی", "آموزش و پژوهش", "سلامت و زیبایی", "ورزش و تندرستی", "رستوران و کافی‌شاپ"];

  const filteredCenters = MOCK_CENTERS.filter(center => 
    (selectedSpecialty === "همه موارد" || center.specialty === selectedSpecialty) &&
    (center.name.toLowerCase().includes(query.toLowerCase()) || center.specialty.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-end">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-black text-slate-900">جستجو و کشف مراکز</h1>
            <p className="text-slate-500 font-medium">بهترین خدمات را در نزدیک‌ترین موقعیت به خود پیدا کنید.</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <SearchIcon size={20} />
              </div>
              <input 
                type="text"
                placeholder="نام مرکز یا نوع تخصص را بنویسید..."
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-64 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Filter size={14}/> فیلتر تخصص</label>
            <select 
              className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900">نتایج یافت شده ({filteredCenters.length})</h2>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
            <SlidersHorizontal size={14}/> مرتب‌سازی: جدیدترین‌ها
          </div>
        </div>

        {filteredCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCenters.map(center => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-white border border-dashed border-slate-300 rounded-3xl">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <SearchIcon size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">موردی یافت نشد</h3>
            <p className="text-slate-500">لطفا عبارت جستجو یا فیلترها را تغییر دهید.</p>
          </div>
        )}
      </main>
    </div>
  );
}
