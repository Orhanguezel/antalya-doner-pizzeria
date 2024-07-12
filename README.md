# Antalya Döner & Pizzeria

Antalya Döner & Pizzeria ist eine Webanwendung für das Bestellmanagement eines Restaurants. Dieses Projekt wird verwendet, um Kundenbestellungen zu verwalten, Kategorien und Produkte anzuzeigen und Bestellungen durch Hinzufügen verschiedener Extras anzupassen.

## Funktionen

- Produktauflistung nach Kategorien
- Extras und Premium-Zutaten für Produkte
- Bestellmanagement und Benutzer-Authentifizierung
- Admin- und Benutzerrollen

## Technologien

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React
- Sonstiges: Axios, dotenv, cors

## Installation

### Anforderungen

- Node.js (v14 oder höher)
- MongoDB

### Schritte

1. **Repository klonen:**

   ```bash
   git clone https://github.com/Orhanguezel/antalya-doner-pizzeria.git
   cd antalya-doner-pizzeria




Tabii, ReadMe dosyanızı güncelleyebilirim. Aşağıda, mevcut projeye uygun ve güncel bir ReadMe dosyası yer almaktadır:

---

# Restaurant Management System

This project is a restaurant management system built with React and Express.js. The system includes an admin panel for managing orders and a user interface for browsing the menu and placing orders.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/restaurant-management-system.git
cd restaurant-management-system
```

2. Install the dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

### Available Scripts

In the project directory, you can run the following scripts:

#### Frontend

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Ejects the configuration files from Create React App.

#### Backend

- `npm start`: Runs the backend server using nodemon for hot reloading.
- `npm run dev`: Runs the backend server in development mode.

## Features

- **Admin Panel**: Manage orders, update order statuses, and view order details.
- **Menu Browsing**: Browse menu categories and items, view item details, and add items to the cart.
- **Order Placement**: Place orders with options for delivery, pickup, and dine-in.
- **Order Management**: Track order status from received to delivered, including printing and archiving orders.

## Folder Structure

```
restaurant-management-system/
├── backend/                 # Backend server code
│   ├── controllers/         # API controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── server.js            # Express server setup
│   └── ...                  # Other backend files
├── frontend/                # Frontend React app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # React pages
│   │   ├── context/         # Context API files
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # Entry point
│   │   └── ...              # Other frontend files
│   ├── public/              # Public assets
│   └── ...                  # Other frontend configuration files
└── README.md                # Project documentation
```

## API Endpoints

### Orders

- `GET /api/orders`: Get all orders.
- `POST /api/orders`: Create a new order.
- `GET /api/orders/:id`: Get order by ID.
- `PUT /api/orders/:id/status`: Update order status.
- `DELETE /api/orders/:id`: Delete an order.
- `PUT /api/orders/:id/archive`: Archive an order.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

