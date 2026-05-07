import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

interface Trip {
  id: string;
  title: string;
  destination: string;
  date: string;
  createdBy?: string;
  members?: string[];
  maxMembers?: number;
  createdAt?: any;
}

export default function Explore() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(
          collection(db, "trips"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Trip, "id">),
        }));

        setTrips(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl bg-black">
        Loading trips...
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      <BackButton />

      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-10 text-center">
        🌍 Explore Trips
      </h1>

      {trips.length === 0 && (
        <p className="text-white text-xl text-center">
          No trips available
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/30 text-white hover:scale-105 transition duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">
              {trip.title}
            </h2>

            <p className="mt-2 text-lg">
              📍 {trip.destination}
            </p>

            <p className="mt-2 text-lg">
              📅 {trip.date}
            </p>

            <p className="text-sm text-gray-200 mt-4">
              👥 {trip.members?.length || 0} /{" "}
              {trip.maxMembers || 0} Members
            </p>

            <button
              onClick={() => navigate(`/trip/${trip.id}`)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}