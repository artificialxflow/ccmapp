import { MapPin, Star, Bookmark } from "lucide-react";
import { Center } from "../../types";
import { cn } from "@/src/lib/utils";

interface CenterCardProps {
  center: Center;
  key?: string | number;
}

export default function CenterCard({ center }: CenterCardProps) {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        {center.imageUrl ? (
          <img 
            src={center.imageUrl} 
            alt={center.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
            تصویر یافت نشد
          </div>
        )}
        <button className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-xl text-slate-600 hover:text-indigo-600 transition-colors">
          <Bookmark size={20} />
        </button>
        {center.isVerified && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            تایید شده
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{center.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{center.specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-sm font-bold">
            <Star size={14} fill="currentColor" />
            {center.rating}
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-500 text-sm">
          <MapPin size={14} />
          <span className="truncate">{center.location.city}، {center.location.address}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50">
          {center.services.slice(0, 2).map((service) => (
            <span key={service} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
              {service}
            </span>
          ))}
          {center.services.length > 2 && (
            <span className="text-[10px] text-slate-400 self-center">+{center.services.length - 2} مورد دیگر</span>
          )}
        </div>
      </div>
    </div>
  );
}
