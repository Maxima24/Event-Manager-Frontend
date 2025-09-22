"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaUsers,
  FaStar,
  FaHeart,
  FaShareAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useEventContext } from "@/app/hooks/useEvent";
import { format } from "date-fns";
import { useOrderContext } from "@/app/hooks/useOrder";
import { OrderType } from "@/app/types/order";
import { useTicketContext } from "@/app/hooks/useTicktets";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/services/api";
import PaymentModal from "@/app/components/PaymentModal";
import { useAuth } from "@/app/hooks/useAuth";

type Props = { params: Promise<{ id: string }>; };

/**
 * EventDetailPage — hooks order is fixed and stable.
 */
export default function EventDetailPage({ params }: Props) {
  // -------- hooks & context (declare ALL hooks up front) --------
  const { events, isLoading } = useEventContext()
  const { user } = useAuth()
  const { createOrder } = useOrderContext()
  const { createTicket } = useTicketContext();
  const router = useRouter();
  const { id } = React.use(params);
  
  // local state hooks (always the same order)
  const [mounted, setMounted] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [buyOpen, setBuyOpen] = React.useState(false);
  const [qty, setQty] = React.useState(1);
  const [selectedTicketIdx, setSelectedTicketIdx] = React.useState<number | null>(0);
   // memoized derived values (always declared)
   const event = React.useMemo(() => {
    if (!events || !id) return null;
    return events.find((e: any) => String(e.id) === String(id)) ?? null;
  }, [events, id]);

  const [orderData, setOrderData] = React.useState<OrderType>({
    event: "",
    ticketType: event?.ticketTypes[0].name,
    numberOfTicket: 0
  });
  const [paymentData,setPayment] = React.useState<Record<string,string> | null>(null)
  const [ticketData, setTicketData] = React.useState({
    user: "",
    event: "",
    order: "",
    ticketType: {},
    price: 0,
    purchaseDate: Date.now(),
    count: 0
  });

 
  const similar = React.useMemo(() => {
    if (!events || !event) return [];
    return events
      .filter((e: any) => e.id !== event.id && (e.category === event.category))
      .slice(0, 4);
  }, [events, event]);

  const totalPrice = React.useMemo(() => {
    if (selectedTicketIdx === null || !event?.ticketTypes) return 0;
    const idx = Number(selectedTicketIdx);
    const price = Number(event.ticketTypes[idx]?.price ?? 0);
    return price * qty;
  }, [selectedTicketIdx, qty, event]);

  // Format date safely for SSR/hydration
  const dateString = React.useMemo(() => {
    if (!event?.date) return "Date TBD";
    try {
      // Use a more deterministic format that works consistently
      const date = new Date(event.date);
      return format(date, "PPP '•' p")
    } catch {
      return String(event.date);
    }
  }, [event?.date]);

  // side effects
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // reset qty/selection when id changes
  React.useEffect(() => {
    setQty(1);
    setSelectedTicketIdx(0);
    setOrderData((prev) => ({ ...prev, event: id }));
  }, [id]);

  React.useEffect(() => {
    setOrderData((prev) => ({ ...prev, numberOfTicket: qty }));
  }, [qty]);

  React.useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  // Early return for loading states
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
          <p className="text-gray-500">Loading event...</p>
        </div>
      </div>
    );
  }

  // mounted guard (after hooks declared)
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
          <p className="text-gray-500">Preparing event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-2">Event not found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the event you requested.</p>
          <button
            onClick={() => router.push("/home/event")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold"
          >
            Back to events
          </button>
        </div>
      </div>
    );
  }

  // handlers
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.warn("Share failed or cancelled", err);
      }
    } else {
      // fallback: copy URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      } catch {
        alert("Share not supported.");
      }
    }
  };

  const handlePayment = async (data: object) => {
    try{
      console.log(data)
      setPayment(data as any)

    }catch{
        
    }

    // Implementation here
  };

  const handleRegisterClick = (ticketIdx: number | null) => {
    setSelectedTicketIdx(()=>ticketIdx);
    setBuyOpen(true);
  };

  const handleOrder = async () => {
    const { ticketDetails,paymentDetails } = await createOrder(orderData);
    console.log(orderData)
    await handlePayment(paymentDetails);
    createTicket(ticketDetails);
  };

  const handleTicketSelect = (value: string) => {
    const idx = value === "" ? 0 : Number(value);
    setSelectedTicketIdx(idx);
    
    if (event.ticketTypes && event.ticketTypes[idx]) {
      setOrderData((prev) => ({
        ...prev,
        ticketType: event.ticketTypes[idx].name
      }));
    }
  };

  const handleConfirmOrder = () => {
    setBuyOpen(false);
    if (selectedTicketIdx !== null && event.ticketTypes) {
      setOrderData((prev) => ({
        ...prev,
        ticketType: event.ticketTypes[Number(selectedTicketIdx)].name
      }));
    }
    handleOrder();
  };

  // Safe user name rendering
  const organizerName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "Organizer";

  
   
  return (
    <div className="min-h-screen bg-gray-50">
       <PaymentModal isOpen={!!paymentData} onClose={()=>{
        alert("You are about to close the Payment Modal")
        setPayment(null)}} paymentData={paymentData as any} />
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="rounded-2xl overflow-hidden relative shadow-lg">
            <div className="relative h-64 md:h-96 w-full">
              {event.images?.[0] ? (
                <Image 
                  src={event.images[0]} 
                  alt={event.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-pink-300 to-yellow-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute left-6 bottom-6 right-6 md:left-12 md:bottom-12 md:right-auto text-white">
                <motion.h1 
                  initial={{ y: 8, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  className="text-2xl md:text-4xl font-extrabold leading-tight"
                >
                  {event.title}
                </motion.h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm md:text-base text-white/90">
                  <span className="inline-flex items-center gap-2">
                    <FaCalendar /> {dateString}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FaMapMarkerAlt /> {event.venue ?? "Venue TBD"}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FaUsers /> 0 attending
                  </span>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-3">
                <button
                  onClick={() => setIsFavorite((s) => !s)}
                  aria-pressed={isFavorite}
                  className="p-2 rounded-full bg-white/90 hover:scale-105 transition shadow"
                >
                  <FaHeart className={`w-4 h-4 ${isFavorite ? "text-red-500" : "text-gray-600"}`} />
                </button>

                <button 
                  onClick={handleShare} 
                  className="p-2 rounded-full bg-white/90 hover:scale-105 transition shadow"
                >
                  <FaShareAlt className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
                <p className="text-sm text-gray-600 mt-1 capitalize">
                  Organized by {organizerName}
                </p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <FaStar className="text-yellow-400" /> 
                  <span className="font-semibold">—</span>
                </div>
              </div>
            </div>

            <hr className="my-4 border-gray-100" />

            <p className="text-gray-700 leading-relaxed">
              {event.description ?? "No description provided."}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="inline-flex items-center gap-3">
                <FaCalendar className="text-pink-500" /> 
                <div className="font-medium text-gray-800">{dateString}</div>
              </div>

              <div className="inline-flex items-center gap-3">
                <FaMapMarkerAlt className="text-pink-500" /> 
                <div className="font-medium text-gray-800">{event.venue}</div>
              </div>

              <div className="inline-flex items-center gap-3">
                <FaUsers className="text-pink-500" /> 
                <div className="font-medium text-gray-800">0 attending</div>
              </div>

              <div className="inline-flex items-center gap-3">
                <div className="font-medium text-gray-800">Category</div>
                <div className="text-sm text-gray-600">{event.category ?? "General"}</div>
              </div>
            </div>
          </motion.div>

          {similar.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 8 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-3">You might also like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {similar.map((s: any) => (
                  <article 
                    key={s.id} 
                    className="flex gap-3 items-start rounded-lg overflow-hidden bg-gray-50 p-3 hover:shadow-md transition cursor-pointer" 
                    onClick={() => router.push(`/home/event/${s.id}`)}
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                      {s.images?.[0] && (
                        <Image 
                          src={s.images[0]} 
                          alt={s.title} 
                          fill 
                          className="object-cover" 
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{s.title}</div>
                      <div className="text-xs text-gray-500">
                        {s.venue} • {s.date ? format(new Date(s.date), "MMM d") : "TBD"}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}
        </section>

        <aside className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Tickets</h3>

            {event.ticketTypes?.length ? (
              <div className="space-y-3">
                {event.ticketTypes.map((t: any, idx: number) => (
                  <div 
                    key={t.category ?? idx} 
                    className="flex items-center justify-between gap-4 p-3 rounded-xl bg-gray-50"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.quantity} available</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₦{t.price ?? 0}</div>
                      <button 
                        onClick={() => handleRegisterClick(idx)} 
                        className="mt-2 block text-xs text-pink-600 hover:underline"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-700">
                <p>Free / Register to join</p>
                <div className="mt-4">
                  <button 
                    onClick={() => handleRegisterClick(null)} 
                    className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-md"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500">
              <div>Refund policy: No refunds</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <h4 className="font-semibold text-gray-900">Organizer</h4>
            <p className="text-sm text-gray-600 mt-2 capitalize">{organizerName}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-700 hover:bg-gray-100">
                Message
              </button>
              <button className="px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-700 hover:bg-gray-100">
                Venue Info
              </button>
            </div>
          </motion.div>
        </aside>
      </main>

      {buyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.18 }} 
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-3">Confirm registration</h3>
            <p className="text-sm text-gray-600 mb-4">
              You are registering for <span className="font-medium">{event.title}</span>
            </p>

            <div className="space-y-3">
              <label className="block text-sm text-gray-700">Ticket</label>
              <div className="flex items-center gap-3">
                <select 
                
                  value={selectedTicketIdx ?? 0} 
                  onChange={(e) => setOrderData({...orderData,ticketType:e.target.value})}
                  className="flex-1 border border-gray-200 rounded-md p-2"
                >
                  {/* <option value="">General / Free</option> */}
                  {event.ticketTypes?.map((t: any, idx: number) => (
                    <option key={idx} value={t.name}>
                      {t.name} — ₦{t.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">Quantity</div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQty((q) => Math.max(1, q - 1))} 
                    className="px-3 py-1 bg-gray-100 rounded"
                  >
                    -
                  </button>
                  <div className="px-4">{qty}</div>
                  <button 
                    onClick={() => setQty((q) => q + 1)} 
                    className="px-3 py-1 bg-gray-100 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="text-sm text-gray-700">Total</div>
                <div className="font-semibold">₦{totalPrice}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setBuyOpen(false)} 
                className="flex-1 px-4 py-2 rounded-xl bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmOrder}
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}