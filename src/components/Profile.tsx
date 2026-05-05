import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-violet-600">TWT 🌍</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-lg rounded-xl p-8 w-[420px] text-center">

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-violet-500 text-white rounded-full flex items-center justify-center text-2xl">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold mt-4">{userEmail}</h2>

          {/* INFO */}
          {userData && (
            <div className="text-left mt-6 space-y-3">

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">
                  {userData.name || "Not set"}
                </p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold">
                  {userData.phone || "Not set"}
                </p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">City</p>
                <p className="font-semibold">
                  {userData.city || "Not set"}
                </p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">Bio</p>
                <p className="font-semibold">
                  {userData.bio || "Not set"}
                </p>
              </div>

            </div>
          )}

          {/* EDIT BUTTON */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-6 bg-violet-500 text-white px-4 py-2 rounded w-full hover:bg-violet-600"
          >
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
}