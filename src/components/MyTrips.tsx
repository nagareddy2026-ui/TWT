import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

interface Trip {
  id: string;
  title: string;
  destination: string;
  date: string;
  description?: string;
  createdBy?: string;
  members?: string[];
  maxMembers?: number;
}

export default function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "trips"),
        where("createdBy", "==", user.email)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Trip, "id">),
      }));

      setTrips(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ❌ Delete Trip
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this trip?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "trips", id));

    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
          <BackButton />

      <h1 className="text-3xl font-bold mb-6">📍 My Trips</h1>

      {loading && <p>Loading...</p>}

      {!loading && trips.length === 0 && (
        <p>No trips created yet</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">{trip.title}</h2>

            <p className="mt-2">📍 {trip.destination}</p>
            <p>📅 {trip.date}</p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">

              {/* ✏️ EDIT */}
              <button
                onClick={() => navigate(`/edit-trip/${trip.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              {/* ❌ DELETE */}
              <button
                onClick={() => handleDelete(trip.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}