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

  // DELETE TRIP
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this trip?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "trips", id));

    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <BackButton />

      {/* HEADING */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          📍 My Trips
        </h1>

        <p className="text-gray-200 text-lg mt-4">
          Manage your travel adventures and memories ✈️
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center">
          <p className="text-white text-2xl">
            Loading your trips...
          </p>
        </div>
      )}

      {/* NO TRIPS */}
      {!loading && trips.length === 0 && (
        <div className="flex justify-center items-center mt-20">
          <div className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl text-center border border-white/20">
            <h2 className="text-3xl font-bold text-white">
              No Trips Created Yet 😔
            </h2>

            <p className="text-gray-200 mt-3">
              Start planning your dream journey now!
            </p>

            <button
              onClick={() => navigate("/create-trip")}
              className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              ➕ Create Trip
            </button>
          </div>
        </div>
      )}

      {/* TRIPS GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 text-white hover:scale-105 transition duration-300"
          >
            {/* TITLE */}
            <h2 className="text-2xl font-bold mb-4">
              ✈️ {trip.title}
            </h2>

            {/* DESTINATION */}
            <p className="text-lg mb-2">
              📍 {trip.destination}
            </p>

            {/* DATE */}
            <p className="text-lg mb-3">
              📅 {trip.date}
            </p>

            {/* DESCRIPTION */}
            {trip.description && (
              <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                {trip.description}
              </p>
            )}

            {/* MEMBERS */}
            <p className="text-sm text-gray-300 mb-6">
              👥 {trip.members?.length || 0} /{" "}
              {trip.maxMembers || 0} Members
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4">

              {/* EDIT */}
              <button
                onClick={() => navigate(`/edit-trip/${trip.id}`)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold transition"
              >
                ✏️ Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(trip.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition"
              >
                ❌ Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}