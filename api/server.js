const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- CATEGORÍAS DELIVERY / COMIDA ---
const categories = [
  {
    id: 'hamburgers',
    name: 'Burgers',
    image: 'https://source.unsplash.com/800x600/?burger,fastfood'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://source.unsplash.com/800x600/?pizza'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    image: 'https://source.unsplash.com/800x600/?sushi'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://source.unsplash.com/800x600/?dessert,cake'
  },
  {
    id: 'salads',
    name: 'Salads',
    image: 'https://source.unsplash.com/800x600/?salad,healthy'
  },
  {
    id: 'coffee',
    name: 'Coffee & Drinks',
    image: 'https://source.unsplash.com/800x600/?coffee,latte'
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
    image: 'https://source.unsplash.com/800x600/?cheeseburger'
  },
  {
    id: '2',
    categoryId: 'hamburgers',
    name: 'BBQ Bacon Burger',
    price: 129.0,
    description: 'Grilled beef, crispy bacon, BBQ sauce and caramelized onions.',
    image: 'https://source.unsplash.com/800x600/?burger,bacon'
  },
  {
    id: '3',
    categoryId: 'hamburgers',
    name: 'Double Beef Burger',
    price: 139.0,
    description: 'Double beef patty, double cheese and brioche bun.',
    image: 'https://source.unsplash.com/800x600/?double+burger'
  },

  // PIZZA
  {
    id: '4',
    categoryId: 'pizza',
    name: 'Pepperoni Pizza',
    price: 159.0,
    description: 'Thin crust, tomato sauce, mozzarella and pepperoni.',
    image: 'https://source.unsplash.com/800x600/?pepperoni+pizza'
  },
  {
    id: '5',
    categoryId: 'pizza',
    name: 'Margherita Pizza',
    price: 149.0,
    description: 'Tomato, mozzarella, basil and extra virgin olive oil.',
    image: 'https://source.unsplash.com/800x600/?margherita+pizza'
  },
  {
    id: '6',
    categoryId: 'pizza',
    name: 'Veggie Pizza',
    price: 169.0,
    description: 'Mushrooms, peppers, onions, olives and mozzarella.',
    image: 'https://source.unsplash.com/800x600/?vegetarian+pizza'
  },

  // SUSHI
  {
    id: '7',
    categoryId: 'sushi',
    name: 'California Roll',
    price: 119.0,
    description: 'Rice, surimi, cucumber, avocado and sesame seeds.',
    image: 'https://source.unsplash.com/800x600/?california+roll'
  },
  {
    id: '8',
    categoryId: 'sushi',
    name: 'Salmon Nigiri Set',
    price: 139.0,
    description: 'Fresh salmon nigiri served with soy sauce and wasabi.',
    image: 'https://source.unsplash.com/800x600/?salmon+sushi'
  },
  {
    id: '9',
    categoryId: 'sushi',
    name: 'Tempura Roll',
    price: 139.0,
    description: 'Crispy tempura roll with shrimp and cream cheese.',
    image: 'https://source.unsplash.com/800x600/?tempura+sushi'
  },

  // DESSERTS
  {
    id: '10',
    categoryId: 'desserts',
    name: 'Strawberry Cheesecake',
    price: 79.0,
    description: 'Creamy cheesecake with strawberry topping.',
    image: 'https://source.unsplash.com/800x600/?cheesecake,dessert'
  },
  {
    id: '11',
    categoryId: 'desserts',
    name: 'Chocolate Brownie',
    price: 69.0,
    description: 'Warm chocolate brownie with vanilla ice cream.',
    image: 'https://source.unsplash.com/800x600/?chocolate+brownie'
  },
  {
    id: '12',
    categoryId: 'desserts',
    name: 'Lemon Pie',
    price: 69.0,
    description: 'Homemade lemon pie with biscuit base.',
    image: 'https://source.unsplash.com/800x600/?lemon+pie'
  },

  // SALADS
  {
    id: '13',
    categoryId: 'salads',
    name: 'Caesar Salad',
    price: 89.0,
    description: 'Romaine lettuce, croutons, parmesan and Caesar dressing.',
    image: 'https://source.unsplash.com/800x600/?caesar+salad'
  },
  {
    id: '14',
    categoryId: 'salads',
    name: 'Mediterranean Salad',
    price: 99.0,
    description: 'Tomato, cucumber, olives, feta cheese and olive oil.',
    image: 'https://source.unsplash.com/800x600/?mediterranean+salad'
  },
  {
    id: '15',
    categoryId: 'salads',
    name: 'Chicken Salad',
    price: 109.0,
    description: 'Mixed greens with grilled chicken breast.',
    image: 'https://source.unsplash.com/800x600/?chicken+salad'
  },

  // COFFEE & DRINKS
  {
    id: '16',
    categoryId: 'coffee',
    name: 'Hot Latte',
    price: 55.0,
    description: 'Espresso with steamed milk and light foam.',
    image: 'https://source.unsplash.com/800x600/?latte,coffee'
  },
  {
    id: '17',
    categoryId: 'coffee',
    name: 'Iced Caramel Frappe',
    price: 69.0,
    description: 'Cold blended coffee with caramel and whipped cream.',
    image: 'https://source.unsplash.com/800x600/?caramel+frappe'
  },
  {
    id: '18',
    categoryId: 'coffee',
    name: 'Chai Latte',
    price: 59.0,
    description: 'Spiced chai tea with milk.',
    image: 'https://source.unsplash.com/800x600/?chai+latte'
  },
];

// --- Rutas ---
app.get('/categories', (req, res) => {
  res.json(categories);
});

app.get('/products', (req, res) => {
  const { categoryId } = req.query;
  let result = products;
  if (categoryId) {
    result = products.filter((p) => p.categoryId === categoryId);
  }
  res.json(result);
});

app.get('/categories/:id/products', (req, res) => {
  const { id } = req.params;
  const result = products.filter((p) => p.categoryId === id);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
