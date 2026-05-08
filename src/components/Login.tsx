import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ NEW ERROR STATE
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {

    // clear old error
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful ✅");

      navigate("/home");

    } catch (err: any) {

      console.error(err);

      // ✅ FRIENDLY ERRORS
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setErrorMsg("Incorrect email or password");
      }

      else if (err.code === "auth/invalid-email") {
        setErrorMsg("Invalid email format");
      }

      else if (err.code === "auth/too-many-requests") {
        setErrorMsg("Too many attempts. Try again later.");
      }

      else {
        setErrorMsg("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5 bg-white/10 backdrop-blur-lg border-b border-white/20">

        <h1 className="text-3xl font-extrabold text-white">
          ✈️ Travel Together
        </h1>

        <div className="flex items-center gap-6 text-white">

          <span className="cursor-pointer hover:text-yellow-300 transition">
            Home
          </span>

          <span className="cursor-pointer hover:text-yellow-300 transition">
            Features
          </span>

          <Link
            to="/signup"
            className="border border-white px-5 py-2 rounded-xl hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>

        </div>
      </div>

      {/* LOGIN SECTION */}
      <div className="flex flex-1 justify-center items-center px-4">

        <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white">

          {/* TITLE */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-extrabold">
              Welcome Back 👋
            </h1>

            <p className="text-gray-200 mt-3">
              Login and continue your travel journey ✈️
            </p>

          </div>

          {/* ✅ ERROR MESSAGE */}
          {errorMsg && (
            <div className="bg-red-500/20 border border-red-400 text-red-200 p-3 rounded-xl mb-5 text-sm">
              {errorMsg}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-5">

            <label className="block mb-2 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <label className="block mb-2 text-sm">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-lg"
          >
            Log In
          </button>

          {/* SIGNUP */}
          <p className="text-center text-gray-200 mt-6">

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-yellow-300 hover:underline font-semibold"
            >
              Sign Up
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}