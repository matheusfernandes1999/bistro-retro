// pages/api/menu.js (or app/api/menu/route.js for App Router)
// This is your Vercel API endpoint

// Option 1: Simple JSON storage in your codebase
const menuItems = [
  {
    id: "1",
    name: "Margherita Clássica",
    description: "Molho de tomate, mussarela de búfala, manjericão fresco e azeite extra virgem",
    imageURL: "/images/pizza-margherita.jpg",
    price: 45.90,
    category: "pizzas",
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: "2",
    name: "Quattro Formaggi",
    description: "Quatro queijos especiais: gorgonzola, parmesão, provolone e mussarela",
    imageURL: "/images/pizza-quattro.jpg",
    price: 52.90,
    category: "pizzas",
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: "3",
    name: "Pepperoni Premium",
    description: "Pepperoni artesanal, mussarela, molho especial e orégano",
    imageURL: "/images/pizza-pepperoni.jpg",
    price: 48.90,
    category: "pizzas",
    isVegetarian: false,
    isSpicy: false
  },
  {
    id: "4",
    name: "Bruschetta Italiana",
    description: "Pão italiano tostado com tomate, manjericão, alho e azeite",
    imageURL: "/images/bruschetta.jpg",
    price: 24.90,
    category: "entradas",
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: "5",
    name: "Spaghetti Carbonara",
    description: "Massa fresca com bacon, ovos, parmesão e pimenta do reino",
    imageURL: "/images/carbonara.jpg",
    price: 42.90,
    category: "massas",
    isVegetarian: false,
    isSpicy: false
  },
  {
    id: "6",
    name: "Penne all Arrabbiata",
    description: "Penne com molho de tomate picante, alho e pimenta",
    imageURL: "/images/arrabbiata.jpg",
    price: 35.90,
    category: "massas",
    isVegetarian: true,
    isSpicy: true
  },
  {
    id: "7",
    name: "Vinho Tinto Reserva",
    description: "Seleção especial da casa, harmoniza perfeitamente com nossas pizzas",
    imageURL: "/images/vinho.jpg",
    price: 89.90,
    category: "bebidas",
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: "8",
    name: "Tiramisù Tradicional",
    description: "Sobremesa italiana com café, mascarpone e cacau",
    imageURL: "/images/tiramisu.jpg",
    price: 24.90,
    category: "sobremesas",
    isVegetarian: true,
    isSpicy: false
  }
];

// For Pages Router (pages/api/menu.js)
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Optional: Filter by category
    const { category } = req.query;
    
    let filteredItems = menuItems;
    if (category) {
      filteredItems = menuItems.filter(item => item.category === category);
    }
    
    res.status(200).json({
      success: true,
      data: filteredItems
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// For App Router (app/api/menu/route.js)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  let filteredItems = menuItems;
  if (category) {
    filteredItems = menuItems.filter(item => item.category === category);
  }
  
  return Response.json({
    success: true,
    data: filteredItems
  });
}