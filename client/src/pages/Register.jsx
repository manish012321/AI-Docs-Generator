import { useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import { User, Mail } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await api.post("/auth/google-login", {
          accessToken: response.access_token,
        });
        login(res.data.User, res.data.token);
        toast.success("Welcome!", { autoClose: 2000 });
        navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Google login failed");
      }
    },
    onError: () => setError("Google login failed"),
  });

  // Step 1 — send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!name || !email) return setError("Please fill all fields");
    try {
      setLoading(true);
      setError("");
      await api.post("/auth/register", { name, email });
      setOtpSent(true);
      toast.success("OTP sent to your email!", { autoClose: 2000 });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setError("Please enter the OTP");
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/verify-otp", { name, email, otp });
      login(res.data.User, res.data.token);
      toast.success("Registered Successfully!", { autoClose: 2000 });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
              Create Account 🚀
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Start generating professional SOPs
            </p>
          </div>

          {!otpSent ? (
            // ── Step 1: Name + Email form ──
            <form onSubmit={handleSendOtp} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Google */}
              <button
                onClick={() => googleLogin()}
                type="button"
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-medium shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md hover:border-gray-400 active:scale-[0.98]"
              >
                <img src="/google-icon-logo-svgrepo-com.svg" alt="Google" className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              {/* Error */}
              {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-2xl text-white font-semibold transition-all duration-300 ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            // ── Step 2: OTP form ──
            <form onSubmit={handleVerifyOtp} className="space-y-5">

              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                OTP sent to <span className="font-semibold text-blue-600">{email}</span>. Check your inbox.
              </p>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-center text-xl tracking-widest"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Verify */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-2xl text-white font-semibold transition-all duration-300 ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
                }`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtp(""); setError(""); }}
                className="w-full py-3 rounded-2xl text-gray-600 dark:text-gray-400 font-medium hover:underline"
              >
                ← Back
              </button>
            </form>
          )}

          {/* Login link */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;