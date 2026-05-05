import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // 📥 Load existing profile
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

  // 💾 Save profile
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
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        ✏️ Edit Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-4">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full" />
          )}
        </div>

        {/* Inputs */}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Profile Image URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}