import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

interface Trip {
  id: string;
  title: string;
  destination: string;
  date: string;
  description?: string;   // ✅ added
  createdBy?: string;
  members?: string[];
  maxMembers?: number;
}

export default function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch trip
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (!id) return;

        const ref = doc(db, "trips", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setTrip({
            id: snap.id,
            ...(snap.data() as Omit<Trip, "id">),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  // 🔥 Join Trip
  const handleJoin = async () => {
    if (!trip || !id) return;

    if (!auth.currentUser) {
      alert("Login required");
      return;
    }

    const email = auth.currentUser.email!;

    if (trip.members?.includes(email)) {
      alert("Already joined");
      return;
    }

    if ((trip.members?.length || 0) >= (trip.maxMembers || 0)) {
      alert("Trip full");
      return;
    }

    try {
      await updateDoc(doc(db, "trips", id), {
        members: arrayUnion(email),
      });

      // ✅ Update UI instantly
      setTrip({
        ...trip,
        members: [...(trip.members || []), email],
      });

      alert("Joined trip!");
    } catch (error) {
      console.error(error);
      alert("Error joining trip");
    }
  };

  // 🔄 States
  if (loading) return <p className="p-10">Loading...</p>;
  if (!trip) return <p className="p-10">Trip not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">

        {/* Title */}
        <h1 className="text-3xl font-bold">{trip.title}</h1>

        {/* Basic Info */}
        <p className="mt-2">📍 {trip.destination}</p>
        <p>📅 {trip.date}</p>

        {/* ✅ Description */}
        <div className="mt-4 bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-800">
            📝 Description
          </h3>
          <p className="text-gray-600 mt-1">
            {trip.description || "No description provided"}
          </p>
        </div>

        {/* Members Count */}
        <p className="mt-4">
          👥 {trip.members?.length || 0} / {trip.maxMembers || 0} members
        </p>

        {/* Creator */}
        <p className="text-sm text-gray-500 mt-2">
          Created by: {trip.createdBy}
        </p>

        {/* Members List */}
        <div className="mt-4">
          <h3 className="font-semibold">Members:</h3>
          <ul className="text-sm mt-2">
            {trip.members?.map((m, i) => (
              <li key={i}>• {m}</li>
            ))}
          </ul>
        </div>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Join Trip
        </button>

      </div>
    </div>
  );
}