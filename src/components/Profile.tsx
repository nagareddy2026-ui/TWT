import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import BackButton from "./BackButton";

export default function Profile() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email || "");

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data());
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-pink-100">

      <BackButton />

      {/* NAVBAR */}
<div className="flex justify-between items-center px-10 py-4 bg-transparent">
        <h1 className="text-3xl font-bold text-violet-600">
          Travel Together 🌍
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >
            Logout
          </button>

        </div>
      </div>

      {/* PROFILE SECTION */}
      <div className="flex justify-center items-center mt-14 px-4">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">

            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-violet-500 shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 bg-violet-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
            )}

          </div>

          {/* EMAIL */}
          <h2 className="text-2xl font-bold mt-5 text-gray-800">
            {userEmail}
          </h2>

          {/* BIO */}
          <p className="text-gray-500 mt-2">
            {userData?.bio || "Traveler & Adventure Explorer ✈️"}
          </p>

          {/* INFO CARDS */}
          <div className="mt-8 space-y-4 text-left">

            <div className="bg-gray-100 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">👤 Name</p>
              <p className="font-semibold text-gray-800">
                {userData?.name || "Not set"}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">📞 Phone</p>
              <p className="font-semibold text-gray-800">
                {userData?.phone || "Not set"}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">📍 City</p>
              <p className="font-semibold text-gray-800">
                {userData?.city || "Not set"}
              </p>
            </div>

          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-8 w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-semibold transition"
          >
            ✏️ Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
}