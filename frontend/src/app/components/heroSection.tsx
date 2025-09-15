"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaTicketAlt,
  FaUsers,
  FaSearch,
  FaArrowRight,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { UserNavigation } from "@/app/components/userNavigation";
import Image from "next/image";

const featuredMock = [
  {
    id: 1,
    title: "OU Live Concert",
    subtitle: "OAU — University Auditorium",
    date: "Dec 15, 2025",
    img: "/placeholder.png",
    tag: "Music",
    rating: 4.8,
  },
  {
    id: 2,
    title: "OAU Tech Summit",
    subtitle: "Faculty of Technology Hall",
    date: "Dec 18, 2025",
    img: "/placeholder.png",
    tag: "Tech",
    rating: 4.9,
  },
  {
    id: 3,
    title: "UI Cultural Festival",
    subtitle: "UI Main Bowl",
    date: "Dec 20, 2025",
    img: "/placeholder.png",
    tag: "Culture",
    rating: 4.7,
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* HERO */}
    

<header className="relative overflow-hidden pt-16">
  {/* BACKGROUND (visible) */}
  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-pink-500 to-yellow-400 opacity-95 z-0" />

  {/* decorative blobs (non-interactive) */}
  <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/6 blur-3xl pointer-events-none z-0" />
  <div className="absolute right-8 top-24 w-56 h-56 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-yellow-400 opacity-30 filter blur-2xl pointer-events-none z-0" />

  <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 lg:py-28 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center text-white"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
        Campus Events, simplified.
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
        Discover, create and manage campus events — concerts, fairs, tech summits and more. Built for students and organizers.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 items-center">
        <button
          onClick={() => router.push("/events")}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-md hover:shadow-lg transition"
        >
          Explore Events <FaArrowRight />
        </button>

        <button
          onClick={() => router.push("/auth/register")}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-lg hover:opacity-95 transition"
        >
          Get Started
        </button>
      </div>

      {/* search card */}
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur rounded-full shadow-lg px-4 py-3 flex items-center gap-3">
          <FaSearch className="text-gray-400 w-5 h-5" />
          <input
            aria-label="Search events"
            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-800"
            placeholder="Search events, venues or categories..."
          />
          <select className="hidden sm:inline-block bg-transparent outline-none text-sm text-gray-700">
            <option>All universities</option>
            <option>OAU</option>
            <option>UI</option>
            <option>UNILAG</option>
          </select>
          <button
            onClick={() => router.push("/events")}
            className="ml-2 inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full text-white font-semibold"
          >
            Search
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-8 items-center text-white/90">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold">100+</div>
          <div className="text-sm opacity-90">Active Events</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold">12</div>
          <div className="text-sm opacity-90">Universities</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold">10k+</div>
          <div className="text-sm opacity-90">Students</div>
        </div>
      </div>
    </motion.div>
  </div>
</header>


      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Featured Events */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaStar className="text-pink-500" /> Featured events
            </h2>
            <button
              onClick={() => router.push("/events")}
              className="text-sm text-gray-600 hover:text-gray-800 transition inline-flex items-center gap-2"
            >
              View all <FaArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMock.map((ev, i) => (
              <motion.article
                key={ev.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition"
              >
                <div className="relative h-44">
                  <Image
                    src={ev.img}
                    alt={ev.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute left-4 bottom-4 text-white">
                    <div className="text-lg font-bold">{ev.title}</div>
                    <div className="text-sm opacity-90">{ev.subtitle}</div>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm">
                        {ev.tag}
                      </span>
                      <div className="text-sm text-gray-500">{ev.date}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-yellow-600">
                      <FaStar /> <span className="font-semibold">{ev.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    Enjoy an unforgettable experience — music, food and vibes.
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => router.push("/events/" + ev.id)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-sm font-semibold shadow-sm hover:opacity-95 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => router.push("/events")}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white shadow-sm p-6 hover:shadow-md transition">
              <FaCalendarAlt className="text-pink-500 w-6 h-6 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Plan & Schedule</h4>
              <p className="text-sm text-gray-600">Create events with an intuitive flow — dates, venues, and tickets.</p>
            </div>

            <div className="rounded-2xl bg-white shadow-sm p-6 hover:shadow-md transition">
              <FaTicketAlt className="text-yellow-500 w-6 h-6 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Tickets & QR</h4>
              <p className="text-sm text-gray-600">Sell, distribute or reserve tickets and use QR for seamless check-in.</p>
            </div>

            <div className="rounded-2xl bg-white shadow-sm p-6 hover:shadow-md transition">
              <FaUsers className="text-pink-400 w-6 h-6 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Community</h4>
              <p className="text-sm text-gray-600">Connect attendees, share event updates and build your campus community.</p>
            </div>
          </div>
        </section>

        {/* Testimonials / Small CTA */}
        <section className="mb-12 flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="flex-1 rounded-2xl bg-gradient-to-r from-pink-50 to-yellow-50 p-6 shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Trusted by campuses</h4>
            <p className="text-gray-700 mb-4">We help student organizers manage registrations and scale events with ease.</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white rounded-full px-4 py-2 shadow-sm text-sm">OAU</div>
              <div className="bg-white rounded-full px-4 py-2 shadow-sm text-sm">UI</div>
              <div className="bg-white rounded-full px-4 py-2 shadow-sm text-sm">UNILAG</div>
            </div>
          </div>

          <div className="w-full lg:w-80 rounded-2xl bg-white p-6 shadow-md flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Start hosting</h4>
              <p className="text-sm text-gray-600 mb-4">Create your first event and get discovered by thousands of students.</p>
            </div>
            <div>
              <button
                onClick={() => router.push("/create-event")}
                className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-lg hover:opacity-95 transition"
              >
                Create Event
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-700 text-sm">© {new Date().getFullYear()} Campus Event Manager</div>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <button className="hover:text-gray-900 transition">About</button>
            <button className="hover:text-gray-900 transition">Support</button>
            <button className="hover:text-gray-900 transition">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
