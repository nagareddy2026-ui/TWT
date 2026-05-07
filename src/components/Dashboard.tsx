import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import BackButton from "./BackButton";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email || "");

        // Fetch profile image
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setPhotoURL(data.photoURL || "");
        }

      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
      }}
    >
      <BackButton />

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5">

        {/* LOGO */}
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
          ✈️ Travel Together
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* PROFILE */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">

            {photoURL ? (
              <img
                src={photoURL}
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-11 h-11 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
            )}

            <span className="text-white text-sm">
              {userEmail}
            </span>
          </div>

          {/* PROFILE BUTTON */}
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            Profile
          </button>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="px-10 py-16 text-center">

        <h2 className="text-6xl font-extrabold text-white drop-shadow-xl">
          Explore The World 🌍
        </h2>

        <p className="text-gray-200 text-xl mt-6 max-w-3xl mx-auto">
          Discover amazing destinations, connect with fellow travelers,
          and create unforgettable memories together ✈️
        </p>

      </div>

      {/* CARDS SECTION */}
      <div className="px-10 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* EXPLORE */}
          <div
            onClick={() => navigate("/explore")}
            className="bg-white/15 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 hover:bg-white/20 transition duration-300 text-center text-white"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              className="w-20 mx-auto mb-5"
            />

            <h3 className="text-2xl font-bold">
              🌍 Explore Trips
            </h3>

            <p className="text-gray-200 mt-4">
              Find exciting destinations and travel partners
            </p>
          </div>

          {/* CREATE */}
          <div
            onClick={() => navigate("/create-trip")}
            className="bg-white/15 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 hover:bg-white/20 transition duration-300 text-center text-white"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              className="w-20 mx-auto mb-5"
            />

            <h3 className="text-2xl font-bold">
              ➕ Create Trip
            </h3>

            <p className="text-gray-200 mt-4">
              Plan your dream journey with friends
            </p>
          </div>

          {/* MY TRIPS */}
          <div
            onClick={() => navigate("/my-trips")}
            className="bg-white/15 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 hover:bg-white/20 transition duration-300 text-center text-white"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
              className="w-20 mx-auto mb-5"
            />

            <h3 className="text-2xl font-bold">
              📍 My Trips
            </h3>

            <p className="text-gray-200 mt-4">
              Manage and organize your travel plans
            </p>
          </div>

          {/* JOINED */}
          <div
            onClick={() => navigate("/joined-trips")}
            className="bg-white/15 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 hover:bg-white/20 transition duration-300 text-center text-white"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              className="w-20 mx-auto mb-5"
            />

            <h3 className="text-2xl font-bold">
              🤝 Joined Trips
            </h3>

            <p className="text-gray-200 mt-4">
              View adventures you joined with others
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}