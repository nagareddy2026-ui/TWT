import { createBrowserRouter } from "react-router-dom";

import Home from "./components/Home"; // ✅ NEW landing page

import Login from "./components/Login";
import Signup from "./components/Signup";

import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

import Explore from "./components/Explore";
import CreateTrip from "./components/CreateTrip";
import MyTrips from "./components/MyTrips";
import JoinedTrips from "./components/JoinedTrips";

import TripDetails from "./components/TripDetails";
import EditTrip from "./components/EditTrip";
import UserProfile from "./components/UserProfile";

function NotFound() {
  return (
    <h1 style={{ textAlign: "center", marginTop: "50px" }}>
      404 - Page Not Found
    </h1>
  );
}

export const router = createBrowserRouter([
  // 🌍 PUBLIC PAGES
  { path: "/", element: <Home /> },        // ✅ landing page
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // 🔐 APP PAGES (after login)
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/home", element: <Dashboard /> }, // optional alias

  // 👤 PROFILE
  { path: "/profile", element: <Profile /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/user/:id", element: <UserProfile /> },

  // ✈️ TRIPS
  { path: "/explore", element: <Explore /> },
  { path: "/create-trip", element: <CreateTrip /> },
  { path: "/my-trips", element: <MyTrips /> },
  { path: "/joined-trips", element: <JoinedTrips /> },

  // 📄 TRIP DETAILS
  { path: "/trip/:id", element: <TripDetails /> },
  { path: "/edit-trip/:id", element: <EditTrip /> },

  // ❌ 404
  { path: "*", element: <NotFound /> },
]);