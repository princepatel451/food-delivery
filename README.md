# Food Delivery App - Frontend to Backend Connection

This project demonstrates how to connect a React frontend to an Express.js backend API.

## Project Structure

```
food-delivery/
├── src/
│   ├── services/
│   │   └── api.js          # API service layer
│   ├── Components/
│   │   └── Food-display/
│   │       └── FoodDisplay.jsx  # Example component using API
│   └── ...
├── backend/
│   ├── server.js           # Express.js backend server
│   └── package.json        # Backend dependencies
└── package.json            # Frontend dependencies
```

## Setup Instructions

### 1. Frontend Setup

```bash
# Navigate to the frontend directory
cd food-delivery

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd food-delivery/backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5000`

## API Endpoints

The backend provides the following REST API endpoints:

### Food Items
- `GET /api/foods` - Get all food items
- `GET /api/foods/:id` - Get food item by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## How the Connection Works

### 1. API Service Layer (`src/services/api.js`)

This file contains:
- Base API configuration with the backend URL
- HTTP methods (GET, POST, PUT, DELETE) using Fetch API
- Specific API functions for different operations
- Error handling and response parsing

### 2. Component Integration

Components use the API service to:
- Fetch data from the backend
- Send data to the backend
- Handle loading states and errors
- Update the UI based on API responses

### 3. CORS Configuration

The backend includes CORS middleware to allow requests from the frontend:

```javascript
app.use(cors()); // Enables cross-origin requests
```

## Alternative Connection Methods

### 1. Using Axios (Recommended for production)

Install axios:
```bash
npm install axios
```

Update the API service:
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const foodAPI = {
  getFoodItems: () => api.get('/foods'),
  createOrder: (orderData) => api.post('/orders', orderData),
  // ... other methods
};
```

### 2. Using React Query (For advanced state management)

Install React Query:
```bash
npm install @tanstack/react-query
```

Example usage:
```javascript
import { useQuery, useMutation } from '@tanstack/react-query';
import { foodAPI } from '../services/api';

// In your component
const { data: foods, isLoading, error } = useQuery({
  queryKey: ['foods'],
  queryFn: foodAPI.getFoodItems,
});

const createOrderMutation = useMutation({
  mutationFn: foodAPI.createOrder,
  onSuccess: (data) => {
    console.log('Order created:', data);
  },
});
```

### 3. Using WebSockets (For real-time updates)

For real-time features like order status updates:

```javascript
// Frontend
const socket = new WebSocket('ws://localhost:5000');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'ORDER_UPDATE') {
    // Update order status in UI
  }
};

// Backend (with Socket.io)
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('join-order-room', (orderId) => {
    socket.join(`order-${orderId}`);
  });
});
```

## Environment Variables

Create `.env` files for configuration:

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## Testing the Connection

1. Start both frontend and backend servers
2. Open the browser console
3. Navigate to the food display page
4. Check for API calls in the Network tab
5. Verify data is being fetched and displayed

## Common Issues and Solutions

### CORS Errors
- Ensure the backend has CORS middleware enabled
- Check that the frontend URL is allowed in CORS configuration

### Network Errors
- Verify both servers are running
- Check the API base URL in the frontend
- Ensure the backend port matches the frontend configuration

### Authentication Issues
- Implement proper JWT token handling
- Add token to localStorage on login
- Include token in API request headers

## Production Deployment

### Frontend
- Build the app: `npm run build`
- Deploy to services like Vercel, Netlify, or AWS S3

### Backend
- Deploy to services like Heroku, Railway, or AWS EC2
- Set up environment variables
- Configure CORS for production domain

## Security Best Practices

1. **Environment Variables**: Never commit sensitive data
2. **Input Validation**: Validate all user inputs on both frontend and backend
3. **Authentication**: Implement proper JWT token management
4. **HTTPS**: Use HTTPS in production
5. **Rate Limiting**: Implement rate limiting on the backend
6. **CORS**: Configure CORS properly for production domains

## Next Steps

1. Add a database (MongoDB, PostgreSQL, etc.)
2. Implement user authentication with JWT
3. Add file upload for food images
4. Implement real-time order tracking
5. Add payment integration
6. Set up automated testing
