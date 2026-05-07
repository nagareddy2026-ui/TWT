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
        // 🔥 SORT BY NEWEST FIRST
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

  if (loading) return <p className="p-10">Loading trips...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
          <BackButton />

      <h1 className="text-3xl font-bold mb-6">
        🌍 Explore Trips (Latest First)
      </h1>

      {trips.length === 0 && (
        <p>No trips available</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{trip.title}</h2>

            <p className="mt-2">📍 {trip.destination}</p>
            <p>📅 {trip.date}</p>

            <p className="text-sm text-gray-500 mt-2">
              👥 {trip.members?.length || 0} / {trip.maxMembers || 0}
            </p>

            <button
              onClick={() => navigate(`/trip/${trip.id}`)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}