const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// --- CATEGORÍAS DELIVERY / COMIDA ---
const categories = [
  {
    id: 'hamburgers',
    name: 'Burgers',
    image: 'images/PortadaBurguer.jpg'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'images/PortadaPizza.jpg'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    image: 'images/PortadaSushi.jpeg'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'images/PortadaDessert.jpg'
  },
  {
    id: 'salads',
    name: 'Salads',
    image: 'images/Salads.jpg'
  },
  {
    id: 'coffee',
    name: 'Coffee & Drinks',
    image: 'images/PortadaCoffee.jpeg'
  },
];

// --- PRODUCTOS ---
const products = [
  // BURGERS
  {
    id: '1',
    categoryId: 'hamburgers',
    name: 'Classic Cheeseburger',
    price: 99.0,
    description: 'Beef patty, cheddar cheese, lettuce, tomato and house sauce.',
    image: 'images/CheesBurguer.jpeg'
  },
  {
    id: '2',
    categoryId: 'hamburgers',
    name: 'BBQ Bacon Burger',
    price: 129.0,
    description: 'Grilled beef, crispy bacon, BBQ sauce and caramelized onions.',
    image: 'images/BaconBurguer.jpeg'
  },
  {
    id: '3',
    categoryId: 'hamburgers',
    name: 'Double Beef Burger',
    price: 139.0,
    description: 'Double beef patty, double cheese and brioche bun.',
    image: 'images/DoubleBeefBurguer.webp'
  },

  // PIZZA
  {
    id: '4',
    categoryId: 'pizza',
    name: 'Pepperoni Pizza',
    price: 159.0,
    description: 'Thin crust, tomato sauce, mozzarella and pepperoni.',
    image: 'images/peperoniPizza.webp'
  },
  {
    id: '5',
    categoryId: 'pizza',
    name: 'Margherita Pizza',
    price: 149.0,
    description: 'Tomato, mozzarella, basil and extra virgin olive oil.',
    image: 'images/MargueritaPizza.avif'
  },
  {
    id: '6',
    categoryId: 'pizza',
    name: 'Veggie Pizza',
    price: 169.0,
    description: 'Mushrooms, peppers, onions, olives and mozzarella.',
    image: 'images/VeggiePizza.avif'
  },

  // SUSHI
  {
    id: '7',
    categoryId: 'sushi',
    name: 'California Roll',
    price: 119.0,
    description: 'Rice, surimi, cucumber, avocado and sesame seeds.',
    image: 'images/CaliforniaRoll.jpg'
  },
  {
    id: '8',
    categoryId: 'sushi',
    name: 'Salmon Nigiri Set',
    price: 139.0,
    description: 'Fresh salmon nigiri served with soy sauce and wasabi.',
    image: 'images/SalmonNigiri.jpeg'
  },
  {
    id: '9',
    categoryId: 'sushi',
    name: 'Tempura Roll',
    price: 139.0,
    description: 'Crispy tempura roll with shrimp and cream cheese.',
    image: 'images/TempuraRoll.webp'
  },

  // DESSERTS
  {
    id: '10',
    categoryId: 'desserts',
    name: 'Strawberry Cheesecake',
    price: 79.0,
    description: 'Creamy cheesecake with strawberry topping.',
    image: 'images/StrawberryCheescake.jpg'
  },
  {
    id: '11',
    categoryId: 'desserts',
    name: 'Chocolate Brownie',
    price: 69.0,
    description: 'Warm chocolate brownie with vanilla ice cream.',
    image: 'images/Brownie.jpeg'
  },
  {
    id: '12',
    categoryId: 'desserts',
    name: 'Lemon Pie',
    price: 69.0,
    description: 'Homemade lemon pie with biscuit base.',
    image: 'images/LemonPie.jpg'
  },

  // SALADS
  {
    id: '13',
    categoryId: 'salads',
    name: 'Caesar Salad',
    price: 89.0,
    description: 'Romaine lettuce, croutons, parmesan and Caesar dressing.',
    image: 'images/CesarSalad.jpg'
  },
  {
    id: '14',
    categoryId: 'salads',
    name: 'Mediterranean Salad',
    price: 99.0,
    description: 'Tomato, cucumber, olives, feta cheese and olive oil.',
    image: 'images/MediterreanSalad.jpg'
  },
  {
    id: '15',
    categoryId: 'salads',
    name: 'Chicken Salad',
    price: 109.0,
    description: 'Mixed greens with grilled chicken breast.',
    image: 'images/ChickenSalad.jpg'
  },

  // COFFEE & DRINKS
  {
    id: '16',
    categoryId: 'coffee',
    name: 'Hot Latte',
    price: 55.0,
    description: 'Espresso with steamed milk and light foam.',
    image: 'images/HotLatte.jpeg'
  },
  {
    id: '17',
    categoryId: 'coffee',
    name: 'Iced Caramel Frappe',
    price: 69.0,
    description: 'Cold blended coffee with caramel and whipped cream.',
    image: 'images/CaramelMacchiato.jpeg'
  },
  {
    id: '18',
    categoryId: 'coffee',
    name: 'Chai Latte',
    price: 59.0,
    description: 'Spiced chai tea with milk.',
    image: 'images/ChaiLatte.webp'
  },
];

// Helper para construir URL completa
const getFullUrl = (req, path) => `${req.protocol}://${req.get('host')}/${path}`;

// --- Rutas ---
app.get('/categories', (req, res) => {
  const result = categories.map(c => ({
    ...c,
    image: getFullUrl(req, c.image)
  }));
  res.json(result);
});

app.get('/products', (req, res) => {
  const { categoryId } = req.query;
  let result = products;
  if (categoryId) {
    result = products.filter((p) => p.categoryId === categoryId);
  }
  // Mapear imágenes
  result = result.map(p => ({
    ...p,
    image: getFullUrl(req, p.image)
  }));
  res.json(result);
});

app.get('/categories/:id/products', (req, res) => {
  const { id } = req.params;
  let result = products.filter((p) => p.categoryId === id);
  // Mapear imágenes
  result = result.map(p => ({
    ...p,
    image: getFullUrl(req, p.image)
  }));
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
