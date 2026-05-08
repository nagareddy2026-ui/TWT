import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UserProfile() {
  const { id } = useParams();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;

      const ref = doc(db, "users", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserData(snap.data());
      }
    };

    loadUser();
  }, [id]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-blue-100 flex justify-center items-center p-6">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center">

        {/* PROFILE IMAGE */}
        {userData.photoURL ? (
          <img
            src={userData.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-violet-500"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-violet-500 text-white flex items-center justify-center text-4xl font-bold mx-auto">
            {userData.email?.charAt(0).toUpperCase()}
          </div>
        )}

        <h1 className="text-2xl font-bold mt-5">
          {userData.name || "Traveler"}
        </h1>

        <p className="text-gray-500 mt-1">
          {userData.email}
        </p>

        <div className="mt-6 space-y-4 text-left">

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-500 text-sm">City</p>
            <p className="font-semibold">
              {userData.city || "Not set"}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-500 text-sm">Bio</p>
            <p className="font-semibold">
              {userData.bio || "No bio"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}