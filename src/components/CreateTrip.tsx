import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import BackButton from "./BackButton";

export default function CreateTrip() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState<number>(1);

  const handleCreate = async () => {
    if (!title || !destination || !date || !description || !maxMembers) {
      alert("Please fill all fields");
      return;
    }

    if (!auth.currentUser) {
      alert("Login required");
      return;
    }

    try {
      await addDoc(collection(db, "trips"), {
        title,
        destination,
        date,
        description,
        maxMembers: Number(maxMembers),
        members: [auth.currentUser.email],
        createdBy: auth.currentUser.email,
        createdAt: new Date(),
      });

      alert("Trip created successfully ✈️");

      navigate("/my-trips");

      setTitle("");
      setDestination("");
      setDate("");
      setDescription("");
      setMaxMembers(1);

    } catch (error) {
      console.error(error);
      alert("Error creating trip");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <BackButton />

      <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-lg text-white">

        <h1 className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg">
          ✈️ Create Your Dream Trip
        </h1>

        {/* Title */}
        <input
          className="w-full bg-white/20 border border-white/30 p-3 mb-4 rounded-xl placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="Trip Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Destination */}
        <input
          className="w-full bg-white/20 border border-white/30 p-3 mb-4 rounded-xl placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Date */}
        <input
          type="date"
          className="w-full bg-white/20 border border-white/30 p-3 mb-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full bg-white/20 border border-white/30 p-3 mb-4 rounded-xl placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="Trip Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Max Members */}
        <input
          type="number"
          className="w-full bg-white/20 border border-white/30 p-3 mb-6 rounded-xl placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="Max Members"
          value={maxMembers}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
        />

        {/* Button */}
        <button
          onClick={handleCreate}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-bold text-lg transition duration-300 shadow-lg"
        >
          🚀 Create Trip
        </button>

      </div>
    </div>
  );
}