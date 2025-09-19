'use client'
import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  ArrowRight,
  Search,
  Filter,
  Clock,
  Ticket,
  Heart,
  Share2,
  X,
  TrendingUp,
  Award,
  Bell,
  ChevronLeft,
  ChevronRight,
  Info,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

const Events = [
  {
    id: 1,
    eventName: "OU Live Concert",
    eventImage: "🎵",
    eventTime: "7:00 PM",
    eventDate: "Dec 15",
    eventAvailability: "Free",
    attendees: 234,
    rating: 4.8,
    category: "Music",
    university: "Obafemi Awolowo University (OAU)",
    description: "Experience an unforgettable night of live music featuring top Nigerian artists and student bands. Join us for an evening of rhythm, energy, and pure entertainment.",
    venue: "University Auditorium",
    organizer: "OAU Entertainment Committee",
    tags: ["Live Music", "Entertainment", "Student Life"],
    featured: true,
  },
  {
    id: 2,
    eventName: "OAU Tech Summit",
    eventImage: "💻",
    eventTime: "9:00 AM",
    eventDate: "Dec 18",
    eventAvailability: "₦5,000",
    attendees: 156,
    rating: 4.9,
    category: "Tech",
    university: "Obafemi Awolowo University (OAU)",
    description: "Connect with tech leaders, learn about emerging technologies, and network with fellow innovators. Features workshops, keynotes, and hands-on coding sessions.",
    venue: "Faculty of Technology Hall",
    organizer: "OAU Tech Club",
    tags: ["Technology", "Innovation", "Networking"],
    featured: true,
  },
  {
    id: 3,
    eventName: "UI Cultural Festival",
    eventImage: "🎭",
    eventTime: "2:00 PM",
    eventDate: "Dec 20",
    eventAvailability: "Free",
    attendees: 445,
    rating: 4.7,
    category: "Culture",
    university: "University of Ibadan (UI)",
    description: "Celebrate Nigeria's rich cultural heritage with traditional dances, music, food, and art exhibitions from various ethnic groups.",
    venue: "UI Main Bowl",
    organizer: "Cultural Affairs Division",
    tags: ["Culture", "Arts", "Heritage"],
    featured: false,
  },
  {
    id: 4,
    eventName: "UNILAG Career Fair",
    eventImage: "💼",
    eventTime: "10:00 AM",
    eventDate: "Dec 22",
    eventAvailability: "Free",
    attendees: 678,
    rating: 4.6,
    category: "Career",
    university: "University of Lagos (UNILAG)",
    description: "Meet top employers, attend career workshops, and explore internship opportunities. Over 50 companies participating.",
    venue: "Multipurpose Hall",
    organizer: "Career Services Center",
    tags: ["Career", "Jobs", "Professional Development"],
    featured: true,
  },
  {
    id: 5,
    eventName: "FUTA Innovation Hub",
    eventImage: "🚀",
    eventTime: "1:00 PM",
    eventDate: "Dec 25",
    eventAvailability: "₦3,000",
    attendees: 123,
    rating: 4.8,
    category: "Innovation",
    university: "Federal University of Technology, Akure (FUTA)",
    description: "Showcase your innovative projects, learn from startup founders, and compete for funding opportunities.",
    venue: "Innovation Center",
    organizer: "FUTA Entrepreneurship Club",
    tags: ["Startups", "Innovation", "Entrepreneurship"],
    featured: false,
  },
  {
    id: 6,
    eventName: "LASU Sports Gala",
    eventImage: "🏆",
    eventTime: "4:00 PM",
    eventDate: "Dec 28",
    eventAvailability: "Free",
    attendees: 356,
    rating: 4.5,
    category: "Sports",
    university: "Lagos State University (LASU)",
    description: "Annual inter-faculty sports competition featuring football, basketball, athletics, and more.",
    venue: "Sports Complex",
    organizer: "Sports Department",
    tags: ["Sports", "Competition", "Fitness"],
    featured: false,
  },
  {
    id: 7,
    eventName: "Startup Pitch Night",
    eventImage: "💡",
    eventTime: "6:00 PM",
    eventDate: "Dec 30",
    eventAvailability: "₦2,000",
    attendees: 89,
    rating: 4.7,
    category: "Innovation",
    university: "University of Ibadan (UI)",
    description: "Watch student entrepreneurs pitch their ideas to investors and win up to ₦500,000 in seed funding.",
    venue: "Business School Auditorium",
    organizer: "UI Ventures",
    tags: ["Pitching", "Investment", "Startups"],
    featured: true,
  },
  {
    id: 8,
    eventName: "Art Exhibition",
    eventImage: "🎨",
    eventTime: "11:00 AM",
    eventDate: "Jan 2",
    eventAvailability: "Free",
    attendees: 201,
    rating: 4.6,
    category: "Culture",
    university: "University of Lagos (UNILAG)",
    description: "Contemporary art exhibition featuring works from students and alumni artists.",
    venue: "Creative Arts Building",
    organizer: "Fine Arts Department",
    tags: ["Art", "Exhibition", "Creativity"],
    featured: false,
  },
];

const universities = [
  "All Universities",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Lagos (UNILAG)",
  "Federal University of Technology, Akure (FUTA)",
  "Lagos State University (LASU)",
  "University of Benin (UNIBEN)",
];

const categories = ["All", "Music", "Tech", "Culture", "Career", "Innovation", "Sports"];
export interface EventType {
  id: number;
  eventName: string; // ✅ dynamic string
  eventImage: string;
  eventTime: string;
  eventDate: string;
  eventAvailability: string;
  attendees: number;
  rating: number;
  category: string;
  university: string;
  description: string;
  venue: string;
  organizer: string;
  tags: string[];
  featured: boolean;
}
export default function UserSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState("All Universities");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = React.useState<number[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<EventType|null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const eventsPerPage = 6;

  // Filtering logic
  const filteredEvents = Events.filter((event) => {
    if (selectedUniversity !== "All Universities" && event.university !== selectedUniversity) return false;
    if (selectedFilter !== "All" && event.category !== selectedFilter) return false;
    if (searchTerm && !event.eventName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const toggleFavorite = (eventId:number) => {
    setFavorites(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const openEventDetails = (event:EventType) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleNotifyMe = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Featured events carousel
  const featuredEvents = Events.filter(event => event.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <span>You'll be notified about this event!</span>
          </div>
        </div>
      )}

      {/* Hero Section with Animation */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="animate-pulse absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="animate-pulse absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="animate-pulse absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <div className="mb-6">
            <div className="flex justify-center gap-4 mb-4">
              <Calendar className="w-16 h-16 animate-bounce" />
              <Users className="w-16 h-16 animate-bounce delay-75" />
              <Star className="w-16 h-16 animate-bounce delay-150" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent animate-fade-in">
            Campus Events Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl opacity-90">
            Your gateway to unforgettable university experiences. Discover, connect, and make memories that last a lifetime.
          </p>
          
          {/* Stats */}
          <div className="flex gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{Events.length}+</div>
              <div className="text-sm opacity-80">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm opacity-80">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2.5K+</div>
              <div className="text-sm opacity-80">Students</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Now
            </button>
            <button 
              onClick={() => setSelectedFilter("All")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Browse All Events
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Search Bar */}
      <section className="px-6">
        <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform -translate-y-12">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, venues, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
              />
            </div>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
            >
              {universities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* Featured Events Carousel */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Award className="w-8 h-8 text-purple-600" />
              Featured Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => openEventDetails(event)}
                className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-4 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-2">{event.eventImage}</div>
                <h3 className="font-bold text-lg mb-1">{event.eventName}</h3>
                <p className="text-sm opacity-90">{event.eventDate} • {event.eventTime}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{event.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 py-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-800">
              {selectedFilter === "All" ? "All Events" : `${selectedFilter} Events`}
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({filteredEvents.length} results)
              </span>
            </h3>
          </div>

          {currentEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😔</div>
              <p className="text-gray-500 text-xl">No events found matching your criteria</p>
              <button 
                onClick={() => {
                  setSelectedFilter("All");
                  setSelectedUniversity("All Universities");
                  setSearchTerm("");
                }}
                className="mt-4 text-purple-600 font-semibold hover:text-purple-800"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
                      <div className="text-6xl">{event.eventImage}</div>
                      
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(event.id);
                        }}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300"
                      >
                        <Heart 
                          className={`w-5 h-5 ${favorites.includes(event.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                        />
                      </button>

                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {event.category}
                      </div>
                      
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{event.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        {event.eventName}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{event.eventDate} • {event.eventTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{event.attendees} attending</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {event.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-lg ${
                          event.eventAvailability === "Free" ? "text-green-600" : "text-purple-600"
                        }`}>
                          {event.eventAvailability}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEventDetails(event)}
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            <Info className="w-5 h-5" />
                          </button>
                          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-semibold">
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
              <div className="text-8xl">{selectedEvent.eventImage}</div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedEvent.eventName}</h2>
                  <p className="text-gray-600">{selectedEvent.university}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(selectedEvent.id)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedEvent.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{selectedEvent.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{selectedEvent.attendees} attending</span>
                <span className="text-gray-500">•</span>
                <span className={`font-bold ${selectedEvent.eventAvailability === "Free" ? "text-green-600" : "text-purple-600"}`}>
                  {selectedEvent.eventAvailability}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{selectedEvent.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold">Date & Time</p>
                    <p className="text-gray-600">{selectedEvent.eventDate} at {selectedEvent.eventTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold">Venue</p>
                    <p className="text-gray-600">{selectedEvent.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold">Organizer</p>
                    <p className="text-gray-600">{selectedEvent.organizer}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map((tag) => (
                    <span key={tag} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Register Now
                </button>
                <button 
                  onClick={handleNotifyMe}
                  className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

   
    </div>
  );
} 