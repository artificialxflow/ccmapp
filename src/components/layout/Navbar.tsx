import { Link } from "react-router-dom";
import { Search, MapPin, Bell, User, LogOut } from "lucide-react";
import { useAuth } from "@/src/lib/AuthContext";

export default function Navbar() {
  const { profile, logout } = useAuth();

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">C</div>
              <span className="hidden sm:inline tracking-tight">CCM</span>
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-500">
              <Link to="/search" className="hover:text-indigo-600 transition-colors">جستجو</Link>
              <Link to="/centers" className="hover:text-indigo-600 transition-colors">مراکز خدماتی</Link>
              <Link to="/map" className="hover:text-indigo-600 transition-colors">نقشه تعاملی</Link>
              <Link to="/support" className="hover:text-indigo-600 transition-colors">پشتیبانی</Link>
              {profile?.role === "ADMIN" && (
                <Link to="/admin" className="text-indigo-600 font-bold">پنل مدیریت کل</Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Bell size={22}/></button>
            {profile ? (
              <div className="flex items-center gap-3">
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-900">{profile.fullName || profile.phoneNumber}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{profile.role}</p>
                </div>
                <button 
                  onClick={logout}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="خروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
                <User size={18}/> ورود به پنل
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
