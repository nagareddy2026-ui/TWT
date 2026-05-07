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
    // ✅ validation
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
        createdAt: new Date()
      });

      alert("Trip created!");

      navigate("/my-trips");

      // reset
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
    <div className="min-h-screen bg-gray-100 p-10">
          <BackButton />

      <h1 className="text-3xl font-bold mb-6">
        ➕ Create Trip
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">

        {/* Title */}
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Trip Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Destination */}
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Date */}
        <input
          type="date"
          className="w-full border p-2 mb-4 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full border p-2 mb-4 rounded"
          placeholder="Trip Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Max Members */}
        <input
          type="number"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Max Members"
          value={maxMembers}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
        />

        <button
          onClick={handleCreate}
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Create Trip
        </button>

      </div>
    </div>
  );
}