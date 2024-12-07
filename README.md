# Cleaning Service Management System

This is a full-stack web application built with ReactJS, NodeJs and MongoDB to manage Cleaning services and bookings

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)

## Getting Started

1. Clone the repository:

```
https://github.com/TharinduSampath2000/cleaning-service.git
```

2. Navigate to the project directory:

```
cd cleaning-service
```

3. Set up the front-end:

Open a terminal window and navigate to frontend directory. Then install dependencies

```
cd frontend
npm install
```

4. Set up the back-end:

Open another terminal and navigate to backend directory. Then install dependencies

```
cd backend
npm install
```
5. Add .env file
   
Create a file named .env in your backend directory. It should consist of these variables. Change the MONGO_URI and JWT_SECRET to your own data.

```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=yourmongouri
JWT_SECRET=yourjwtsecret
```

6. Run the application:

- Start the front-end development server:

  Run the frontend server from the terminal where you navigate to frontend directory
  
  ```
  npm run dev
  ```

- Start the back-end server:
  
  Run the backend server from the terminal where you navigate to backend directory

  ```
  npm run dev
  ```
