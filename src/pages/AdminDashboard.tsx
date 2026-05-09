import { useAuth } from "@/src/lib/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Users, Building2, Calendar, CreditCard, 
  TrendingUp, ArrowUpRight, ArrowDownRight, 
  CheckCircle2, Clock, AlertCircle 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area 
} from "recharts";
import Navbar from "@/src/components/layout/Navbar";

const data = [
  { name: "شنبه", value: 400 },
  { name: "یکشنبه", value: 300 },
  { name: "دوشنبه", value: 600 },
  { name: "سه‌شنبه", value: 800 },
  { name: "چهارشنبه", value: 500 },
  { name: "پنجشنبه", value: 900 },
  { name: "جمعه", value: 1200 },
];

const RECENT_TRANSACTIONS = [
  { id: "1", user: "علی رضایی", center: "مرکز آریا", amount: "۱,۲۰۰,۰۰۰", status: "SUCCESS", date: "۲ ساعت پیش" },
  { id: "2", user: "سارا احمدی", center: "کلینیک بهاران", amount: "۸۵۰,۰۰۰", status: "PENDING", date: "۵ ساعت پیش" },
  { id: "3", user: "محمد علوی", center: "مجتمع نوین", amount: "۲,۱۰۰,۰۰۰", status: "FAILED", date: "دیروز" },
  { id: "4", user: "مریم گلی", center: "مرکز آریا", amount: "۴۰۰,۰۰۰", status: "SUCCESS", date: "دیروز" },
];

export default function AdminDashboard() {
  const { profile, loading } = useAuth();

  if (loading) return null;
  if (!profile || profile.role !== "ADMIN") return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">پنل مدیریت کل سیستم</h1>
            <p className="text-slate-500 mt-1">خوش آمدید! وضعیت کلی سیستم در ۳۰ روز اخیر را مشاهده می‌کنید.</p>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Calendar size={18}/> دریافت گزارش ماهانه
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="کل کاربران" value="۱,۲۴۰" subValue="+۱۲٪ این ماه" icon={<Users className="text-blue-600"/>} trend="up" />
          <StatCard title="مراکز فعال" value="۸۶" subValue="+۴ مرکز جدید" icon={<Building2 className="text-indigo-600"/>} trend="up" />
          <StatCard title="رزروهای امروز" value="۴۱۲" subValue="-۵٪ نسبت به دیروز" icon={<Calendar className="text-emerald-600"/>} trend="down" />
          <StatCard title="درآمد کل" value="۸۴۰.۵ M" subValue="+۸٪ رشد سود" icon={<CreditCard className="text-amber-600"/>} trend="up" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp size={20}/> آمار تراکنش‌ها و درآمد
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#94a3b8"}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6">تراکنش‌های اخیر</h3>
            <div className="space-y-6">
              {RECENT_TRANSACTIONS.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">
                      {t.user[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.user}</p>
                      <p className="text-[10px] text-slate-500">{t.center}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-900">{t.amount} ر.ت</p>
                    <p className="text-[10px] text-slate-400 mt-1">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Section from Plan */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock size={24}/> نقشه راه فاز ۱ (تکمیل شده: ۲۹٪)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlanCard title="۱. زیرساخت" progress={100} status="COMPLETED" />
            <PlanCard title="۲. طراحی RTL" progress={85} status="ACTIVE" />
            <PlanCard title="۳. مدیریت هویت" progress={40} status="ACTIVE" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, subValue, icon, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
          {trend === 'up' ? 'رشد' : 'کاهش'}
        </div>
      </div>
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="text-[10px] text-slate-400 mt-2 font-medium">{subValue}</p>
    </div>
  );
}

function PlanCard({ title, progress, status }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">{title}</span>
        {status === 'COMPLETED' ? <CheckCircle2 size={16} className="text-emerald-400"/> : <Clock size={16} className="text-blue-400"/>}
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full opacity-80 ${status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex justify-between text-[10px] opacity-40 uppercase tracking-widest font-bold">
        <span>پیشرفت</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
}
