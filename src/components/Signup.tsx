import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Firebase
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // 🌍 Predefined cities
  const cities = [
    "Bengaluru",
    "Mysuru",
    "Mangaluru",
    "Hubballi",
    "Belagavi",
    "Chennai",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Pune",
    "Goa",
  ];

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
      // Create Firebase Auth user
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user in Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        email,
        gender,
        city,
        bio: "New traveler ✈️",
        createdAt: new Date(),
      });

      alert("Account created successfully ✅");

      // Redirect to login (or home if you want)
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
    <div className="min-h-screen bg-violet-500 text-white">

      <h1 className="text-center text-3xl mt-10">
        Create Account
      </h1>

      <div className="flex justify-center mt-10">

        <div className="bg-white text-black p-8 rounded w-[500px] shadow-lg">

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

          {/* GENDER */}
          <select
            className="border p-2 w-full mb-4"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* CITY DROPDOWN */}
          <select
            className="border p-2 w-full mb-4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City *</option>

            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* TERMS */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>I agree to terms & conditions</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            className="bg-green-500 text-white w-full py-3 rounded hover:bg-green-600"
          >
            Create Account
          </button>

          {/* LOGIN LINK */}
          <p className="text-center mt-4">
            Already a member?{" "}
            <Link to="/" className="text-blue-500">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}