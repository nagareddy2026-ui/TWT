import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful ✅");

      // ✅ redirect
      navigate("/home");

    } catch (err: unknown) {
      // ✅ Type-safe error handling
      if (err instanceof Error) {
        console.error(err);
        alert(err.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-violet-500 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-4 bg-white text-black shadow">
        <h1 className="text-orange-500 text-2xl font-bold italic">
          TWT
        </h1>

        <div className="flex items-center gap-6">
          <span>Home</span>
          <span>Features</span>

          <Link to="/signup" className="border px-4 py-1 rounded">
            Sign Up
          </Link>
        </div>
      </div>

      {/* HEADER */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Log In</h1>
        <p className="mt-2">Welcome back 👋</p>
      </div>

      {/* LOGIN CARD */}
      <div className="flex justify-center mt-10">
        <div className="bg-white text-black p-8 rounded-lg shadow w-[400px]">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email *"
            className="border p-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password *"
            className="border p-2 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white w-full py-3 rounded hover:bg-green-600"
          >
            Log In
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-10">
        Don’t have an account?{" "}
        <Link to="/signup" className="underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}