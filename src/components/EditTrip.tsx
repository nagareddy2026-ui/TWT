import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import BackButton from "./BackButton";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState<number>(1);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;

      try {
        const snap = await getDoc(doc(db, "trips", id));

        if (snap.exists()) {
          const data = snap.data();

          setTitle(data.title || "");
          setDestination(data.destination || "");
          setDate(data.date || "");
          setDescription(data.description || "");
          setMaxMembers(data.maxMembers || 1);
        } else {
          alert("Trip not found");
          navigate("/my-trips");
        }
      } catch (error) {
        console.error(error);
        alert("Error loading trip");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!title || !destination || !date || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      await updateDoc(doc(db, "trips", id!), {
        title,
        destination,
        date,
        description,
        maxMembers: Number(maxMembers),
      });

      alert("Trip updated!");
      navigate("/my-trips");
    } catch (error) {
      console.error(error);
      alert("Failed to update trip");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <BackButton />

      <div className="bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-lg text-white">

        <h1 className="text-3xl font-extrabold text-center mb-6 drop-shadow-lg">
          ✏️ Edit Your Trip
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-3 mb-6 rounded-xl bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Max Members"
          value={maxMembers}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg transition"
        >
          💾 Save Changes
        </button>

      </div>
    </div>
  );
}