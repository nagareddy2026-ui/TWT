import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState<number>(1);

  // 🔥 Fetch trip data
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

  // 🔥 Update trip
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
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        ✏️ Edit Trip
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">

        <input
          className="w-full border p-2 mb-4"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 mb-4"
          placeholder="Max Members"
          value={maxMembers}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Update Trip
        </button>

      </div>
    </div>
  );
}