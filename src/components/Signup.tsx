import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Firebase
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import BackButton from "./BackButton";

export default function Signup() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!email || !password || !gender || !city) {
      alert("Fill all fields");
      return;
    }

    if (!agree) {
      alert("You must agree to terms");
      return;
    }

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save in Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        email,
        gender,
        city,
        bio: "New traveler ✈️",
        createdAt: new Date(),
      });

      alert("Account created successfully ✅");

      navigate("/");

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <BackButton />

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5">

        <h1 className="text-3xl font-extrabold text-white">
          ✈️ Travel Together
        </h1>

        <Link
          to="/"
          className="border border-white text-white px-5 py-2 rounded-xl hover:bg-white hover:text-black transition"
        >
          Login
        </Link>

      </div>

      {/* SIGNUP CARD */}
      <div className="flex flex-1 justify-center items-center px-4">

        <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-lg text-white">

          {/* TITLE */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-extrabold">
              Create Account 🌍
            </h1>

            <p className="text-gray-200 mt-3">
              Start your travel journey with amazing people ✈️
            </p>

          </div>

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
          <div className="mb-5">

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

          {/* GENDER */}
          <div className="mb-5">

            <label className="block mb-2 text-sm">
              Gender
            </label>

            <select
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option className="text-black" value="">
                Select Gender
              </option>

              <option className="text-black" value="Male">
                Male
              </option>

              <option className="text-black" value="Female">
                Female
              </option>

            </select>

          </div>

          {/* CITY INPUT */}
          <div className="mb-5">

            <label className="block mb-2 text-sm">
              City
            </label>

            <input
              type="text"
              placeholder="Enter your city"
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

          </div>

          {/* TERMS */}
          <div className="flex items-center gap-3 mb-6">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4"
            />

            <span className="text-sm text-gray-200">
              I agree to terms & conditions
            </span>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-lg"
          >
            Create Account
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-200 mt-6">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-yellow-300 hover:underline font-semibold"
            >
              Login
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}