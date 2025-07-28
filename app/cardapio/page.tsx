"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Flame, ShoppingCart, Plus, Minus, X, MessageCircle, ChevronDown } from "lucide-react";

// Import your existing images
import Logo from "../../public/images/logo.svg";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function CardapioPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("pizzas");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cart]);

  // Function to fetch data from Google Sheets
  const fetchMenuItems = async () => {
    try {
      // Replace with your Google Sheets API endpoint
      const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
      
      if (!SHEET_URL) {
        // Use mock data with Unsplash images
        setMenuItems(mockMenuItems);
        setLoading(false);
        return;
      }

      const response = await fetch(SHEET_URL);
      const data = await response.json();
      
      // Parse the Google Sheets data
      const items: MenuItem[] = data.values?.slice(1).map((row: string[], index: number) => ({
        id: `item-${index}`,
        name: row[0] || '',
        description: row[1] || '',
        imageURL: row[2] || '/api/placeholder/300/200',
        price: parseFloat(row[3]) || 0,
        category: row[4]?.toLowerCase() || 'pizzas',
        isVegetarian: row[5]?.toLowerCase() === 'true',
        isSpicy: row[6]?.toLowerCase() === 'true',
      })) || mockMenuItems;

      setMenuItems(items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      // Use mock data with Unsplash images as fallback
      setMenuItems(mockMenuItems);
      setLoading(false);
    }
  };

  // Mock data with Unsplash images
  const mockMenuItems: MenuItem[] = [
    {
      id: "1",
      name: "Margherita Clássica",
      description: "Molho de tomate, mussarela de búfala, manjericão fresco e azeite extra virgem",
      price: 45.90,
      imageURL: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "pizzas",
      isVegetarian: true,
    },
    {
      id: "2",
      name: "Quattro Formaggi",
      description: "Quatro queijos especiais: gorgonzola, parmesão, provolone e mussarela",
      price: 52.90,
      imageURL: "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "pizzas",
      isVegetarian: true,
    },
    {
      id: "3",
      name: "Pepperoni Premium",
      description: "Pepperoni artesanal, mussarela, molho especial e orégano",
      price: 48.90,
      imageURL: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
      category: "pizzas",
    },
    {
      id: "4",
      name: "Bruschetta Italiana",
      description: "Pão italiano tostado com tomate, manjericão, alho e azeite",
      price: 24.90,
      imageURL: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "entradas",
      isVegetarian: true,
    },
    {
      id: "5",
      name: "Spaghetti Carbonara",
      description: "Massa fresca com bacon, ovos, parmesão e pimenta do reino",
      price: 42.90,
      imageURL: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "massas",
    },
    {
      id: "6",
      name: "Penne all Arrabbiata",
      description: "Penne com molho de tomate picante, alho e pimenta",
      price: 35.90,
      imageURL: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      category: "massas",
      isVegetarian: true,
      isSpicy: true,
    },
    {
      id: "7",
      name: "Vinho Tinto Reserva",
      description: "Seleção especial da casa, harmoniza perfeitamente com nossas pizzas",
      price: 89.90,
      imageURL: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "bebidas",
    },
    {
      id: "8",
      name: "Tiramisù Tradicional",
      description: "Sobremesa italiana com café, mascarpone e cacau",
      price: 24.90,
      imageURL: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80",
      category: "sobremesas",
      isVegetarian: true,
    },
  ];

  const categories = [
    { id: "pizzas", name: "Pizzas Artesanais" },
    { id: "entradas", name: "Entradas" },
    { id: "massas", name: "Massas" },
    { id: "bebidas", name: "Bebidas" },
    { id: "sobremesas", name: "Sobremesas" },
  ];

  const getItemsByCategory = (categoryId: string): MenuItem[] => {
    return menuItems.filter(item => item.category === categoryId);
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    // Animation feedback
    const button = document.getElementById(`add-${item.id}`);
    if (button) {
      button.classList.add("animate-ping");
      setTimeout(() => button.classList.remove("animate-ping"), 500);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getItemQuantity = (itemId: string): number => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item?.quantity || 0;
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
    setIsCategoryDropdownOpen(false); // Close category dropdown if open
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Preço unitário: R$ ${item.price.toFixed(2)}\n`;
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `Total do pedido: R$ ${cartTotal.toFixed(2)}\n\n`;
    message += "Aguardo confirmação. Obrigado!";
    
    return encodeURIComponent(message);
  };

  const sendWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = "5549999999999";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    setCart([]);
    closeCartModal();
  };

  if (loading) {
    return (
      <div className="bg-[#0f1312] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-32 w-32 border-b-2 border-[#DE991B] mx-auto mb-4"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg"
          >
            Carregando cardápio...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1312] text-white min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:px-16 sticky top-0 bg-[#0f1312] z-50 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-[#DE991B] transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <Image
            src={Logo}
            alt="Bistrô Retrô Logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold">Cardápio</h1>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.button
            onClick={openCartModal}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 bg-[#DE991B] px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="font-semibold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} itens - R$ {cartTotal.toFixed(2)}
            </span>
          </motion.button>
        )}
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Categories Sidebar - Desktop */}
        <aside className="hidden lg:block lg:w-64 bg-[#1c1f1e] p-6 lg:min-h-screen">
          <h2 className="text-lg font-semibold mb-6">Categorias</h2>
          <nav className="space-y-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? "bg-[#DE991B] text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Mobile Category Selector */}
        <div className="lg:hidden relative mx-6 mt-4 mb-6">
          <button
            onClick={toggleCategoryDropdown}
            className="w-full flex justify-between items-center bg-[#1c1f1e] px-4 py-3 rounded-lg"
          >
            <span>
              {categories.find(cat => cat.id === activeCategory)?.name}
            </span>
            <motion.div
              animate={{ rotate: isCategoryDropdownOpen ? 180 : 0 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {isCategoryDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute z-10 w-full mt-1 bg-[#1c1f1e] rounded-lg overflow-hidden shadow-xl"
              >
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setIsCategoryDropdownOpen(false);
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#DE991B] text-white"
                        : "hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Items */}
        <main className="flex-1 p-6 md:p-16">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 hidden lg:block">
              {categories.find(cat => cat.id === activeCategory)?.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getItemsByCategory(activeCategory).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-[#1c1f1e] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.imageURL}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3} // Prioritize first 3 images
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {item.isVegetarian && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-green-500 p-1 rounded-full"
                        >
                          <Leaf size={16} className="text-white" />
                        </motion.div>
                      )}
                      {item.isSpicy && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-red-500 p-1 rounded-full"
                        >
                          <Flame size={16} className="text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[#DE991B] text-xl font-bold">
                        R$ {item.price.toFixed(2)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {getItemQuantity(item.id) > 0 ? (
                          <div className="flex items-center gap-2">
                            <motion.button
                              onClick={() => removeFromCart(item.id)}
                              whileTap={{ scale: 0.9 }}
                              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                            >
                              <Minus size={16} />
                            </motion.button>
                            <motion.span 
                              key={`quantity-${item.id}-${getItemQuantity(item.id)}`}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="font-semibold min-w-[20px] text-center"
                            >
                              {getItemQuantity(item.id)}
                            </motion.span>
                            <motion.button
                              onClick={() => addToCart(item)}
                              whileTap={{ scale: 0.9 }}
                              className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full transition-colors"
                              id={`add-${item.id}`}
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => addToCart(item)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#DE991B] hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                            id={`add-${item.id}`}
                          >
                            Adicionar
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {getItemsByCategory(activeCategory).length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-400 text-lg">
                  Nenhum item encontrado nesta categoria.
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 left-6 right-6 lg:hidden z-40"
        >
          <motion.button 
            onClick={openCartModal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#DE991B] hover:bg-yellow-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={24} />
            <span>
              Ver Carrinho ({cart.reduce((sum, item) => sum + item.quantity, 0)}) - R$ {cartTotal.toFixed(2)}
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeCartModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-[#1c1f1e] rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Seu Carrinho</h2>
                <motion.button
                  onClick={closeCartModal}
                  whileHover={{ rotate: 90 }}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <p className="text-gray-400 text-lg">Seu carrinho está vazio</p>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 p-4 bg-[#0f1312] rounded-lg"
                      >
                        <motion.div 
                          layout
                          className="relative w-16 h-16 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={item.imageURL}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                          <p className="text-[#DE991B] font-bold">R$ {item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => removeFromCart(item.id)}
                            whileTap={{ scale: 0.9 }}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <motion.span
                            key={`modal-quantity-${item.id}-${item.quantity}`}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="font-semibold min-w-[30px] text-center"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            onClick={() => addToCart(item)}
                            whileTap={{ scale: 0.9 }}
                            className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full transition-colors"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-2xl font-bold text-[#DE991B]">
                        R$ {cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <motion.button
                      onClick={sendWhatsAppOrder}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle size={24} />
                      Fazer Pedido via WhatsApp
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}