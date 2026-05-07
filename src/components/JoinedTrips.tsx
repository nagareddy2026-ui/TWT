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
    <div className="min-h-screen bg-gray-100 p-10">
          <BackButton />

      <h1 className="text-3xl font-bold mb-6">
        🤝 Joined Trips
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && trips.length === 0 && (
        <p className="text-gray-500">
          You haven’t joined any trips yet.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-6">

        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">{trip.title}</h2>

            <p className="mt-2">📍 {trip.destination}</p>
            <p>📅 {trip.date}</p>

            {trip.description && (
              <p className="text-gray-500 text-sm mt-2">
                {trip.description}
              </p>
            )}

            <p className="text-sm text-gray-500 mt-2">
              👥 {trip.members?.length || 0} / {trip.maxMembers || 0}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}