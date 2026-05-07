import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white overflow-hidden">

      {/* HERO BACKGROUND */}
      <div
        className="bg-cover bg-center min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >

        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-10 py-5 bg-white/10 backdrop-blur-lg border-b border-white/20">

          <h1 className="text-3xl font-extrabold text-white">
            ✈️ Travel Together
          </h1>

          <div className="flex items-center gap-6 font-medium">

            <a
              href="#features"
              className="hover:text-yellow-300 transition"
            >
              Features
            </a>

            <a
              href="#how"
              className="hover:text-yellow-300 transition"
            >
              How it Works
            </a>

            <a
              href="#about"
              className="hover:text-yellow-300 transition"
            >
              About
            </a>

            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 border border-white rounded-xl hover:bg-white hover:text-black transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
              Sign Up
            </button>

          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-28">

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
            Travel Together,
            <br />
            <span className="text-yellow-300">
              Explore The World 🌍
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-200 max-w-3xl leading-relaxed">
            Meet new travelers, create unforgettable journeys,
            discover amazing destinations, and travel smarter together ✈️
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-5 flex-wrap justify-center">

            <button
              onClick={() => navigate("/signup")}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl transition duration-300"
            >
              🚀 Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300"
            >
              🔑 Login
            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl">

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-bold text-yellow-300">
                500+
              </h2>
              <p className="mt-2 text-gray-200">
                Trips Created
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-bold text-yellow-300">
                1200+
              </h2>
              <p className="mt-2 text-gray-200">
                Travelers Connected
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-bold text-yellow-300">
                50+
              </h2>
              <p className="mt-2 text-gray-200">
                Countries Explored
              </p>
            </div>

          </div>

        </section>
      </div>

      {/* FEATURES */}
      <section
        id="features"
        className="bg-gradient-to-br from-white to-blue-50 text-black py-24 px-10"
      >

        <h2 className="text-5xl font-extrabold text-center mb-16">
          Why Choose Travel Together?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              className="w-20 mx-auto mb-6"
            />

            <h3 className="font-bold text-2xl">
              🌍 Explore Trips
            </h3>

            <p className="text-gray-500 mt-4">
              Discover amazing trips created by travelers worldwide.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              className="w-20 mx-auto mb-6"
            />

            <h3 className="font-bold text-2xl">
              ✈️ Create Trips
            </h3>

            <p className="text-gray-500 mt-4">
              Plan your own adventure and invite others to join.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              className="w-20 mx-auto mb-6"
            />

            <h3 className="font-bold text-2xl">
              🤝 Meet Travelers
            </h3>

            <p className="text-gray-500 mt-4">
              Connect with like-minded explorers around the globe.
            </p>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="bg-gradient-to-r from-violet-700 to-indigo-800 py-24 px-10 text-center"
      >

        <h2 className="text-5xl font-extrabold mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/15 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              1️⃣ Sign Up
            </h3>

            <p className="text-gray-200">
              Create your account in seconds and start exploring.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              2️⃣ Discover Trips
            </h3>

            <p className="text-gray-200">
              Find exciting adventures or create your own trip.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              3️⃣ Start Traveling
            </h3>

            <p className="text-gray-200">
              Meet travelers and create unforgettable memories.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-400 text-black text-center py-24 px-6">

        <h2 className="text-5xl font-extrabold">
          Ready For Your Next Adventure? 🌍
        </h2>

        <p className="mt-5 text-xl">
          Join Travel Together and explore the world with amazing people.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="mt-8 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl text-lg font-bold transition duration-300"
        >
          Join Now 🚀
        </button>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-center py-8 text-gray-400">
        <p>© 2026 Travel Together • All Rights Reserved</p>
      </footer>

    </div>
  );
}