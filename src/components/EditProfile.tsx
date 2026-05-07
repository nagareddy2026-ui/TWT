import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

export default function EditProfile() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // LOAD PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        setName(data.name || "");
        setBio(data.bio || "");
        setPhone(data.phone || "");
        setCity(data.city || "");
        setPhotoURL(data.photoURL || "");
      } else {
        setName(user.email || "");
      }
    };

    loadProfile();
  }, [user]);

  // SAVE PROFILE
  const handleSave = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    await setDoc(
      doc(db, "users", user.uid),
      {
        name,
        bio,
        phone,
        city,
        photoURL,
        email: user.email,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    alert("Profile updated ✅");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-pink-100 p-6">

      <BackButton />

      <div className="flex justify-center items-center mt-10">

        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">
            ✏️ Edit Profile
          </h1>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center mb-6">

            <label className="cursor-pointer relative">

              {photoURL ? (
                <img
                  src={photoURL}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-violet-500 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 bg-violet-200 rounded-full flex items-center justify-center text-violet-700 font-semibold">
                  Add Photo
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setPhotoURL(imageUrl);
                  }
                }}
              />
            </label>

          </div>

          {/* INPUTS */}
          <div className="space-y-4">

            <input
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <input
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="w-full mt-8 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Save Profile
          </button>

        </div>
      </div>
    </div>
  );
}