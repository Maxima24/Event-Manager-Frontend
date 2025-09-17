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
<details> <summary>⚡ Getting Started</summary>
1️⃣ Clone the repo
git clone https://github.com/yourusername/eventhub.git
cd eventhub

2️⃣ Install dependencies

Backend:

cd backend
npm install


Frontend:

cd frontend
npm install

3️⃣ Configure environment variables

Backend .env:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000


Frontend .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

4️⃣ Run the app

Backend:

npm run dev


Frontend:

npm run dev

</details>
<details> <summary>📧 Email Templates</summary>

Single Ticket Confirmation → ticket-confirmation.hbs

Bulk Ticket Confirmation → bulk-tickets.hbs

Templates are pre-styled with inline CSS for better rendering across email clients.

</details>
<details> <summary>✅ Current Status</summary>

✔ Event listing & details

✔ Booking system

✔ Email notifications with tickets

✔ Bulk ticket handling

🚧 Payment integration (in progress)

🚧 QR code ticketing (in progress)

</details>
<details> <summary>📖 API Reference</summary>

Base URL:

http://localhost:5000/api/v1

🔹 Authentication
Register User
POST /auth/register


Body

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Login User
POST /auth/login


Body

{
  "email": "john@example.com",
  "password": "password123"
}

🔹 Events
Get All Events
GET /events

Get Event by ID
GET /events/:id

🔹 Orders
Create Order
POST /orders


Body

{
  "event": "68c67c8e8d1de8ff59326245",
  "ticketType": "VIP",
  "numberOfTicket": 2
}

🔹 Tickets
Create Ticket(s)
POST /tickets


Body

{
  "user": "68bcafdd7caf3b29954c9063",
  "event": "68c67c8e8d1de8ff59326245",
  "order": "68caaffa7c8f8903ea562cc7",
  "ticketType": {
    "name": "Early Bird",
    "description": "Discounted ticket for early registrations.",
    "price": 200
  },
  "price": 2400,
  "purchaseDate": "2025-09-17T12:56:26.087Z",
  "count": 12
}

🔹 Users
Get User Profile
GET /users/me

</details>
<details> <summary>🤝 Contributing</summary>

Fork this repo.

Create a new feature branch (git checkout -b feature/payment-flow).

Commit your changes (git commit -m 'Add Paystack payment integration').

Push to your branch (git push origin feature/payment-flow).

Open a Pull Request.

</details>
