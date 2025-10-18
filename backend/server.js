const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON bodies

// Sample data (in a real app, this would come from a database)
let foods = [
  {
    id: 1,
    name: "Chicken Burger",
    description: "Juicy chicken burger with fresh vegetables",
    price: 12.99,
    category: "Burger",
    image: "/food_1.png"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato and mozzarella",
    price: 15.99,
    category: "Pizza",
    image: "/food_2.png"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Fresh salad with caesar dressing",
    price: 8.99,
    category: "Salad",
    image: "/food_3.png"
  }
];

let orders = [];
let users = [];

// Routes

// GET all food items
app.get('/api/foods', (req, res) => {
  try {
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// GET food item by ID
app.get('/api/foods/:id', (req, res) => {
  try {
    const food = foods.find(f => f.id === parseInt(req.params.id));
    if (!food) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
});

// POST create new order
app.post('/api/orders', (req, res) => {
  try {
    const { items, totalAmount, userId, deliveryAddress } = req.body;
    
    const newOrder = {
      id: orders.length + 1,
      items,
      totalAmount,
      userId,
      deliveryAddress,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET user orders
app.get('/api/orders/user/:userId', (req, res) => {
  try {
    const userOrders = orders.filter(order => order.userId === parseInt(req.params.userId));
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});

// PUT update order status
app.put('/api/orders/:id', (req, res) => {
  try {
    const { status } = req.body;
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    order.status = status;
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// DELETE order
app.delete('/api/orders/:id', (req, res) => {
  try {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    orders.splice(orderIndex, 1);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// POST user login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // In a real app, you'd validate against a database
    // This is just a mock example
    if (email === 'user@example.com' && password === 'password') {
      res.json({
        success: true,
        user: { id: 1, email, name: 'John Doe' },
        token: 'mock-jwt-token'
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST user registration
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // In a real app, you'd save to database and hash password
    const newUser = {
      id: users.length + 1,
      name,
      email,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    res.status(201).json({
      success: true,
      user: newUser,
      token: 'mock-jwt-token'
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
