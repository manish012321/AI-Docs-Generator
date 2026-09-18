import { useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import { Mail } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
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

  
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email");
    try {
      setLoading(true);
      setError("");
      await api.post("/auth/login", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email!", { autoClose: 2000 });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setError("Please enter the OTP");
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/verify-login-otp", { email, otp });
      login(res.data.User, res.data.token);
      toast.success("Welcome back!", { autoClose: 2000 });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
              Welcome Back 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Login to continue generating SOPs
            </p>
          </div>

          {!otpSent ? (
            // ── Step 1: Email form ──
            <form onSubmit={handleSendOtp} className="space-y-5">

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
                className={`w-full py-3 rounded-2xl font-semibold text-white transition-all duration-300 ${
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

          {/* Register link */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;