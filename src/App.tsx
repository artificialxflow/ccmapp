/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SearchPage from "./pages/Search";
import MapPage from "./pages/MapPage";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/layout/Navbar";
import CenterCard from "./components/centers/CenterCard";
import { ChevronLeft, Calendar, LayoutDashboard, Search } from "lucide-react";
import { Center } from "./types";

const MOCK_CENTERS: Center[] = [
  { id: "1", name: "مرکز تخصصی آریا", ownerId: "o1", specialty: "خدمات فنی و مهندسی", location: { lat: 35.6882, lng: 51.3890, city: "تهران", address: "بلوار ولنجک، کوچه دوم" }, rating: 4.8, reviewsCount: 124, services: ["تعمیرات تخصصی", "مشاوره فنی", "قطعات اصلی"], isVerified: true, imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400" },
  { id: "2", name: "مجتمع آموزشی نوین", ownerId: "o2", specialty: "آموزش و پژوهش", location: { lat: 35.7219, lng: 51.3347, city: "تهران", address: "ستارخان، نبش خیابان هشتم" }, rating: 4.5, reviewsCount: 89, services: ["دوره‌های حضوری", "آموزش آنلاین", "مدرک معتبر"], isVerified: true, imageUrl: "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=400" },
  { id: "3", name: "کلینیک زیبایی بهاران", ownerId: "o3", specialty: "سلامت و زیبایی", location: { lat: 35.8049, lng: 51.4344, city: "تهران", address: "فرشته، پاساژ داریوش" }, rating: 4.9, reviewsCount: 256, services: ["پاکسازی پوست", "لیزر موهای زائد", "جوانسازی"], isVerified: false, imageUrl: "https://images.unsplash.com/photo-1519494140261-d90193639551?auto=format&fit=crop&q=80&w=400" }
];

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="relative pt-24 pb-32 px-4 overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent"></div>
          <div className="max-w-5xl mx-auto text-center space-y-8 text-slate-900">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100/50">
              نسخه MVP پلاس آماده شد
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
              مدیریت هوشمند مراکز خدماتی <br/> <span className="text-indigo-600">در دستان شما</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              سیستم جامع رزرو، مدیریت مالی و پشتیبانی مراکز با رویکرد مدرن و متدولوژی Agile. همین حالا مرکز خود را ثبت کنید.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/centers" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 transform hover:-translate-y-1">
                مشاهده مراکز برتر
              </Link>
              <Link to="/search" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                جستجو در مراکز <ChevronLeft size={20}/>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-indigo-900">مراکز برتر هفته</h2>
              <p className="text-slate-500 font-medium">پرفروش‌ترین و محبوب‌ترین مراکز در ۳۰ روز اخیر</p>
            </div>
            <Link to="/search" className="text-indigo-600 font-bold text-sm hover:underline decoration-2 underline-offset-4">مشاهده همه مراکز</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_CENTERS.map((center) => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>
        </section>

        <section className="py-20 px-4 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-indigo-400 group hover:bg-indigo-600 hover:text-white transition-all cursor-default shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Calendar size={28}/>
              </div>
              <h3 className="text-2xl font-bold">رزرو آنلاین و سریع</h3>
              <p className="text-slate-400 leading-relaxed font-medium">سیستم نوبت‌دهی هوشمند ۲۴ ساعته بدون نیاز به تماس تلفنی و هدررفت زمان با قابلیت لغو و جابجایی آسان.</p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 group hover:bg-emerald-600 hover:text-white transition-all cursor-default">
                <LayoutDashboard size={28}/>
              </div>
              <h3 className="text-2xl font-bold">داشبورد یکپارچه</h3>
              <p className="text-slate-400 leading-relaxed font-medium">پنل‌های اختصاصی برای کاربران، صاحبان مراکز و اپراتورها جهت مدیریت دقیق تراکنش‌ها، رزروها و گزارشات مالی.</p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-purple-400 group hover:bg-purple-600 hover:text-white transition-all cursor-default">
                <Search size={28}/>
              </div>
              <h3 className="text-2xl font-bold">جستجوی هوشمند</h3>
              <p className="text-slate-400 leading-relaxed font-medium">فیلترهای پیشرفته بر اساس تخصص، لوکیشن، محدوده قیمتی و امتیاز واقعی کاربران جهت انتخاب بهترین خدمات.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="text-2xl font-black text-indigo-900 tracking-wider">CCM</div>
          <p className="text-slate-500 text-sm font-medium">تمامی حقوق برای سامانه جامع مدیریت مراکز محفوظ است. ۱۴۰۵ ©</p>
          <div className="flex justify-center gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">قوانین و مقررات</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">حریم خصوصی</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">درباره ما</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">تماس با ما</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <LoginForm />
      <Link to="/" className="mt-8 text-sm text-slate-500 hover:text-slate-900">بازگشت به خانه</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/centers" element={<SearchPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
