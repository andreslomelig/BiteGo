const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- Data ---
const categories = [
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    image: 'https://via.placeholder.com/150x150.png?text=Hamburguesas'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://via.placeholder.com/150x150.png?text=Pizza'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    image: 'https://via.placeholder.com/150x150.png?text=Sushi'
  },
  {
    id: 'postres',
    name: 'Postres',
    image: 'https://via.placeholder.com/150x150.png?text=Postres'
  },
  {
    id: 'ensaladas',
    name: 'Ensaladas',
    image: 'https://via.placeholder.com/150x150.png?text=Ensaladas'
  },
  {
    id: 'cafe',
    name: 'Café y Bebidas',
    image: 'https://via.placeholder.com/150x150.png?text=Cafe'
  },
];

// --- Products ---
const products = [
  // HAMBURGUESAS
  {
    id: '1',
    categoryId: 'hamburguesas',
    name: 'Hamburguesa Clásica',
    price: 99.00,
    description: 'Carne 100% res, queso americano, lechuga, jitomate y aderezo de la casa.',
    image: 'https://via.placeholder.com/300x200.png?text=Hamburguesa+Clasica'
  },
  {
    id: '2',
    categoryId: 'hamburguesas',
    name: 'Hamburguesa Doble Queso',
    price: 129.00,
    description: 'Doble carne, doble queso, pan brioche y pepinillos.',
    image: 'https://via.placeholder.com/300x200.png?text=Hamburguesa+Doble+Queso'
  },
  {
    id: '3',
    categoryId: 'hamburguesas',
    name: 'Hamburguesa BBQ',
    price: 139.00,
    description: 'Carne a la parrilla con salsa BBQ, cebolla caramelizada y tocino.',
    image: 'https://via.placeholder.com/300x200.png?text=Hamburguesa+BBQ'
  },

  // PIZZA
  {
    id: '4',
    categoryId: 'pizza',
    name: 'Pizza Pepperoni',
    price: 159.00,
    description: 'Masa delgada, salsa de jitomate, queso mozzarella y pepperoni.',
    image: 'https://via.placeholder.com/300x200.png?text=Pizza+Pepperoni'
  },
  {
    id: '5',
    categoryId: 'pizza',
    name: 'Pizza Hawaiana',
    price: 169.00,
    description: 'Jamón, piña, queso mozzarella y salsa de jitomate.',
    image: 'https://via.placeholder.com/300x200.png?text=Pizza+Hawaiana'
  },
  {
    id: '6',
    categoryId: 'pizza',
    name: 'Pizza Vegetariana',
    price: 149.00,
    description: 'Champiñones, pimiento, cebolla, aceitunas y queso.',
    image: 'https://via.placeholder.com/300x200.png?text=Pizza+Vegetariana'
  },

  // SUSHI
  {
    id: '7',
    categoryId: 'sushi',
    name: 'Roll California',
    price: 119.00,
    description: 'Arroz, surimi, pepino, aguacate y ajonjolí.',
    image: 'https://via.placeholder.com/300x200.png?text=Roll+California'
  },
  {
    id: '8',
    categoryId: 'sushi',
    name: 'Roll Philadelphia',
    price: 129.00,
    description: 'Salmón, queso crema y aguacate.',
    image: 'https://via.placeholder.com/300x200.png?text=Roll+Philadelphia'
  },
  {
    id: '9',
    categoryId: 'sushi',
    name: 'Roll Tempura',
    price: 139.00,
    description: 'Roll empanizado, relleno de camarón y queso crema.',
    image: 'https://via.placeholder.com/300x200.png?text=Roll+Tempura'
  },

  // POSTRES
  {
    id: '10',
    categoryId: 'postres',
    name: 'Cheesecake de Fresa',
    price: 79.00,
    description: 'Rebanada de cheesecake con coulis de fresa.',
    image: 'https://via.placeholder.com/300x200.png?text=Cheesecake'
  },
  {
    id: '11',
    categoryId: 'postres',
    name: 'Brownie con Helado',
    price: 89.00,
    description: 'Brownie de chocolate caliente con helado de vainilla.',
    image: 'https://via.placeholder.com/300x200.png?text=Brownie+Helado'
  },
  {
    id: '12',
    categoryId: 'postres',
    name: 'Pay de Limón',
    price: 69.00,
    description: 'Pay casero de limón con base de galleta.',
    image: 'https://via.placeholder.com/300x200.png?text=Pay+de+Limon'
  },

  // ENSALADAS
  {
    id: '13',
    categoryId: 'ensaladas',
    name: 'Ensalada César',
    price: 89.00,
    description: 'Lechuga romana, crutones, parmesano y aderezo César.',
    image: 'https://via.placeholder.com/300x200.png?text=Ensalada+Caesar'
  },
  {
    id: '14',
    categoryId: 'ensaladas',
    name: 'Ensalada Mediterránea',
    price: 99.00,
    description: 'Jitomate, pepino, aceitunas, queso feta y aceite de oliva.',
    image: 'https://via.placeholder.com/300x200.png?text=Ensalada+Mediterranea'
  },
  {
    id: '15',
    categoryId: 'ensaladas',
    name: 'Ensalada de Pollo',
    price: 109.00,
    description: 'Mezcla de hojas verdes con pollo a la plancha.',
    image: 'https://via.placeholder.com/300x200.png?text=Ensalada+Pollo'
  },

  // CAFÉ Y BEBIDAS
  {
    id: '16',
    categoryId: 'cafe',
    name: 'Latte Caliente',
    price: 55.00,
    description: 'Café espresso con leche vaporizada.',
    image: 'https://via.placeholder.com/300x200.png?text=Latte'
  },
  {
    id: '17',
    categoryId: 'cafe',
    name: 'Frappé de Caramelo',
    price: 69.00,
    description: 'Bebida fría de café con caramelo y crema batida.',
    image: 'https://via.placeholder.com/300x200.png?text=Frappe+Caramelo'
  },
  {
    id: '18',
    categoryId: 'cafe',
    name: 'Té Chai Latte',
    price: 59.00,
    description: 'Té chai especiado con leche.',
    image: 'https://via.placeholder.com/300x200.png?text=Chai+Latte'
  },
];

// --- Rutas de la API ---

// Todas las categorías
app.get('/categories', (req, res) => {
  res.json(categories);
});

// Productos (puedes filtrar por categoría con ?categoryId=hamburguesas, etc.)
app.get('/products', (req, res) => {
  const { categoryId } = req.query;
  let result = products;

  if (categoryId) {
    result = products.filter((p) => p.categoryId === categoryId);
  }

  res.json(result);
});

// Productos por categoría (otra forma: /categories/hamburguesas/products)
app.get('/categories/:id/products', (req, res) => {
  const { id } = req.params;
  const result = products.filter((p) => p.categoryId === id);
  res.json(result);
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
