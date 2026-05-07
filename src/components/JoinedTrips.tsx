import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import BackButton from "./BackButton";

interface Trip {
  id: string;
  title: string;
  destination: string;
  date: string;
  description?: string;
  members?: string[];
  maxMembers?: number;
}

export default function JoinedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "trips"),
          where("members", "array-contains", user.email)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Trip, "id">),
        }));

        setTrips(data);

      } catch (err) {
        console.error(err);

      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1493558103817-58b2924bce98')",
      }}
    >
      <BackButton />

      {/* HEADING */}
      <div className="text-center mb-12">

        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          🤝 Joined Trips
        </h1>

        <p className="text-gray-200 text-lg mt-4">
          Adventures you joined with fellow travelers 🌍
        </p>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center mt-20">
          <p className="text-white text-2xl">
            Loading your joined trips...
          </p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && trips.length === 0 && (
        <div className="flex justify-center items-center mt-20">

          <div className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-center shadow-2xl">

            <h2 className="text-3xl font-bold text-white">
              No Joined Trips Yet 😔
            </h2>

            <p className="text-gray-200 mt-4">
              Explore amazing journeys and join new adventures!
            </p>

          </div>

        </div>
      )}

      {/* TRIPS GRID */}
      <div className="grid md:grid-cols-3 gap-8 mt-10">

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
            <p className="text-sm text-gray-300 mt-4">
              👥 {trip.members?.length || 0} /{" "}
              {trip.maxMembers || 0} Members
            </p>

            {/* STATUS */}
            <div className="mt-6">
              <span className="bg-green-500/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Joined Successfully ✅
              </span>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}