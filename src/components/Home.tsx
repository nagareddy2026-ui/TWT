import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-indigo-700 text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white text-black shadow-md">
        <h1 className="text-2xl font-bold text-violet-600">
          TWT 🌍
        </h1>

        <div className="flex items-center gap-6 font-medium">
          <a href="#features" className="hover:text-violet-600">Features</a>
          <a href="#how" className="hover:text-violet-600">How it works</a>
          <a href="#about" className="hover:text-violet-600">About</a>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 border rounded hover:bg-violet-600 hover:text-white"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-1 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center px-6 py-24">
        <h1 className="text-5xl font-bold leading-tight">
          Travel Together,
          <br />
          <span className="text-yellow-300">Explore Smarter ✈️</span>
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
          Create trips, join travel groups, meet new people, and explore the world together.
          Plan your journeys easily with real-time collaboration.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-yellow-300 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
          >
            Login
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white text-black py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose TWT?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 shadow rounded-xl text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="font-bold text-xl">Explore Trips</h3>
            <p className="text-gray-500 mt-2">
              Discover travel plans created by others and join instantly.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="font-bold text-xl">Create Trips</h3>
            <p className="text-gray-500 mt-2">
              Plan your own trip and invite travelers to join you.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="font-bold text-xl">Meet People</h3>
            <p className="text-gray-500 mt-2">
              Connect with like-minded travelers worldwide.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-10">How it Works</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white text-black p-6 rounded-xl">
            <h3 className="font-bold">1. Sign Up</h3>
            <p>Create your account in seconds</p>
          </div>

          <div className="bg-white text-black p-6 rounded-xl">
            <h3 className="font-bold">2. Explore</h3>
            <p>Find trips or create your own</p>
          </div>

          <div className="bg-white text-black p-6 rounded-xl">
            <h3 className="font-bold">3. Travel</h3>
            <p>Join others and start exploring</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-300 text-black text-center py-20 px-6">
        <h2 className="text-3xl font-bold">
          Ready to start your journey?
        </h2>

        <p className="mt-3">
          Join TWT and start traveling with people worldwide 🌍
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Join Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6">
        <p>© 2026 TWT - Travel With Together</p>
      </footer>

    </div>
  );
}