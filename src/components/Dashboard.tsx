import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email || "");

        // 🔥 Fetch profile image from Firestore
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
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-4 bg-white shadow">

        <h1 className="text-2xl font-bold text-violet-600">
          TWT 🌍
        </h1>

        <div className="flex items-center gap-4">

          {/* 👤 PROFILE PIC */}
          <div className="flex items-center gap-2">
            {photoURL ? (
              <img
                src={photoURL}
                className="w-10 h-10 rounded-full object-cover border"
              />
            ) : (
              <div className="w-10 h-10 bg-violet-500 text-white rounded-full flex items-center justify-center">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
            )}

            <span className="text-gray-600">{userEmail}</span>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="px-10 mt-10">

        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to Travel With Together ✈️
        </h2>

        <p className="text-gray-500 mt-2">
          Explore trips, meet travelers, and start your journey 🌍
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

          {/* Explore */}
          <div
            onClick={() => navigate("/explore")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              className="w-16 mx-auto mb-3"
            />
            <h3 className="text-xl font-bold">🌍 Explore Trips</h3>
            <p className="text-gray-500 mt-2">
              Find travel partners and destinations
            </p>
          </div>

          {/* Create */}
          <div
            onClick={() => navigate("/create-trip")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              className="w-16 mx-auto mb-3"
            />
            <h3 className="text-xl font-bold">➕ Create Trip</h3>
            <p className="text-gray-500 mt-2">
              Plan your journey with others
            </p>
          </div>

          {/* My Trips */}
          <div
            onClick={() => navigate("/my-trips")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
              className="w-16 mx-auto mb-3"
            />
            <h3 className="text-xl font-bold">📍 My Trips</h3>
            <p className="text-gray-500 mt-2">
              View your travel plans
            </p>
          </div>

          {/* Joined Trips */}
          <div
            onClick={() => navigate("/joined-trips")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              className="w-16 mx-auto mb-3"
            />
            <h3 className="text-xl font-bold">🤝 Joined Trips</h3>
            <p className="text-gray-500 mt-2">
              Trips you have joined
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}