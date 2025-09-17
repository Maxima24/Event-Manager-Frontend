# 🎟️ EventHub – Event Booking & Ticketing Platform  

EventHub is a full-stack **event booking and ticketing system** built with **Next.js (frontend)** and **Express.js (backend)**.  
It enables users to explore events, purchase tickets, and receive email confirmations with downloadable PDF tickets.  

---

<details>
<summary>✨ Features</summary>

### 🔹 Event Management  
- Browse upcoming events.  
- Fetch event details by ID.  
- Tickets grouped by type (VIP, Regular, Early Bird, etc.).  

### 🔹 Booking System  
- Book tickets for any event.  
- Prevents duplicate/invalid bookings.  
- Supports single and bulk ticket purchases.  

### 🔹 Ticket Handling  
- Automatic ticket generation on successful booking.  
- Bulk ticket handling with `bulk-tickets.hbs` email template.  
- PDF tickets attached to email confirmations.  

### 🔹 Email Notifications  
- Transactional emails powered by **Nodemailer** and **Handlebars templates**.  
- Two types of email templates:
  - `ticket-confirmation.hbs` → single ticket.  
  - `bulk-tickets.hbs` → multiple tickets.  
- Includes event details, ticket type, seat info, and price.  

### 🔹 User Authentication & Authorization  
- Auth system with protected routes.  
- Role-based access for admins and users.  

### 🔹 Error Handling & Validation  
- Standardized error responses.  
- Zod validation for inputs.  
- Centralized Express error middleware.  

### 🔹 API Integration  
- REST API endpoints for events, bookings, and tickets.  
- React Query integration on the frontend for fetching and caching.  

</details>

---

<details>
<summary>🚧 Features in Progress</summary>

- **Payment Integration** 💳  
  - Planned providers: Escrow.com & Paystack.  
  - Payment confirmation flow tied directly to booking.  

- **QR Code Ticketing** 📱  
  - Each ticket will include a unique QR code for entry validation.  
  - Scannable at the venue for secure access.  

</details>

---

<details>
<summary>🛠️ Tech Stack</summary>

**Frontend**  
- [Next.js](https://nextjs.org/)  
- React Query (TanStack Query)  
- Zustand (state management)  
- TailwindCSS + shadcn/ui  

**Backend**  
- [Express.js](https://expressjs.com/)  
- TypeScript  
- Nodemailer + Handlebars (email templates)  
- Zod (validation)  
- Axios (API requests)  

**Other Integrations**  
- PDFKit (ticket PDF generation)  
- Planned: Paystack & Escrow.com for payments  
- Planned: QR code generation & validation  

</details>

---

<details>
<summary>📂 Project Structure</summary>

```bash
.
├── backend/
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # Express routes
│   │   ├── templates/      # Email templates (hbs files)
│   │   ├── utils/          # Helpers & middleware
│   │   └── app.ts          # Express app entry
│   └── package.json
│
├── frontend/
│   ├── app/                # Next.js app router
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom hooks
│   ├── services/           # Axios services
│   ├── pages/              # Page routes
│   └── package.json
│
└── README.md
<details> 
  <summary>⚡ Getting Started</summary>

1️⃣ **Clone the repo**
```bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
