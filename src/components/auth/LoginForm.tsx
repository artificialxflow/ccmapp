import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Send, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/lib/AuthContext";
import { useNavigate } from "react-router-dom";

const phoneSchema = z.object({
  phoneNumber: z.string().min(1, "شماره موبایل را وارد کنید"),
});

const otpSchema = z.object({
  code: z.string().min(1, "کد تایید را وارد کنید"),
});

export default function LoginForm() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { loginMock } = useAuth();
  const navigate = useNavigate();

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });

  const onSendOtp = async (data: z.infer<typeof phoneSchema>) => {
    setLoading(true);
    setPhone(data.phoneNumber);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStep("otp");
    setLoading(false);
  };

  const onVerifyOtp = async (data: z.infer<typeof otpSchema>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Login with any code
    loginMock(phone);
    setLoading(false);
    navigate("/admin"); // For demo, go to admin dashboard
  };

  return (
    <div className="w-full max-w-sm p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">خوش آمدید</h2>
        <p className="text-slate-500 text-sm">برای ورود به حساب کاربری، شماره موبایل خود را وارد کنید.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === "phone" ? (
          <motion.form
            key="phone-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={phoneForm.handleSubmit(onSendOtp)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700">
                شماره موبایل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <input
                  {...phoneForm.register("phoneNumber")}
                  type="text"
                  placeholder="09120000000"
                  className={cn(
                    "block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none",
                    phoneForm.formState.errors.phoneNumber && "border-red-500 focus:ring-red-500"
                  )}
                />
              </div>
              {phoneForm.formState.errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">{phoneForm.formState.errors.phoneNumber.message}</p>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-lg shadow-indigo-100"
            >
              <span>{loading ? "در حال ارسال..." : "ارسال کد تایید"}</span>
              {!loading && <Send className="h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />}
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="otp-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={otpForm.handleSubmit(onVerifyOtp)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-slate-700">
                کد ۵ رقمی تایید
              </label>
              <input
                {...otpForm.register("code")}
                type="text"
                maxLength={5}
                placeholder="--- ---"
                className={cn(
                  "block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-center text-2xl tracking-[1em] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none",
                  otpForm.formState.errors.code && "border-red-500 focus:ring-red-500"
                )}
              />
              {otpForm.formState.errors.code && (
                <p className="text-xs text-red-500 mt-1 text-center">{otpForm.formState.errors.code.message}</p>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-lg shadow-indigo-100"
            >
              <span>{loading ? "در حال تایید..." : "تایید و ورود"}</span>
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              ویرایش شماره موبایل
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
