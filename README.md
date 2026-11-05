
# AgriConnect – Smart Farmer Assistance Platform

## Project Overview

AgriConnect is a MERN stack web application designed to support farmers by providing useful agricultural information and connecting farmers with agricultural experts.

## Technologies Used

- MongoDB Atlas – Database
- Express.js – Backend framework
- React.js – Frontend library
- Node.js – Runtime environment
- Axios – API requests
- JWT – Authentication
- Bcrypt.js – Password hashing
- CSS – User interface styling

## Main Features

1. Farmer registration and login
2. Secure password hashing
3. JWT-based authentication
4. Protected frontend routes
5. Crop management (CRUD operations)
6. Weather information
7. Agricultural market price tracking
8. Farmer questions and expert answers
9. Expert role-based answer authorization
10. User logout

## Project Structure

Agriconnect/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
└── README.md

## How to Run the Project

### Backend

Open a terminal:

cd backend
npm install
npm run dev

### Frontend

Open another terminal:

cd frontend
npm install
npm run dev

## Application URLs

Frontend: http://localhost:5173

Backend: http://localhost:5000

## Database

The project uses MongoDB Atlas to store user accounts, crop information, market prices, and farmer questions.

## Future Enhancements

- Real-time market price integration
- Multilingual support
- Farmer notifications
- Agricultural expert appointment booking
- Mobile-friendly improvements
