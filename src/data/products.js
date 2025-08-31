export const products = [
  {
    id: 1,
    name: "Premium Business Package",
    description: "Complete business starter kit with training materials and marketing tools",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    category: "Business",
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
    isOnSale: true,
    discountPercentage: 25,
    commission: 75,
    stock: 50,
    features: [
      "Complete training program",
      "Marketing materials",
      "Business tools",
      "24/7 support"
    ]
  },
  {
    id: 2,
    name: "Elite Membership Package",
    description: "Advanced membership with exclusive benefits and higher commission rates",
    price: 499.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    category: "Premium",
    rating: 4.9,
    reviewCount: 89,
    isNew: false,
    isOnSale: true,
    discountPercentage: 17,
    commission: 150,
    stock: 25,
    features: [
      "Premium training",
      "Exclusive access",
      "Higher commissions",
      "Priority support"
    ]
  },
  {
    id: 3,
    name: "Smartwatch Pro",
    description: "Advanced fitness and health monitoring smartwatch",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviewCount: 234,
    isNew: false,
    isOnSale: true,
    discountPercentage: 20,
    commission: 40,
    stock: 100,
    features: [
      "Heart rate monitor",
      "GPS tracking",
      "Water resistant",
      "7-day battery"
    ]
  },
  {
    id: 4,
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans from sustainable farms",
    price: 19.99,
    originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Food & Beverage",
    rating: 4.7,
    reviewCount: 567,
    isNew: false,
    isOnSale: true,
    discountPercentage: 20,
    commission: 5,
    stock: 200,
    features: [
      "100% organic",
      "Fair trade certified",
      "Rich flavor",
      "Fresh roasted"
    ]
  },
  {
    id: 5,
    name: "Basic Starter Package",
    description: "Perfect for beginners starting their MLM journey",
    price: 99.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    category: "Starter",
    rating: 4.5,
    reviewCount: 312,
    isNew: false,
    isOnSale: true,
    discountPercentage: 33,
    commission: 25,
    stock: 75,
    features: [
      "Basic training",
      "Starter materials",
      "Community access",
      "Email support"
    ]
  },
  {
    id: 6,
    name: "Wellness Supplements",
    description: "Natural health supplements for optimal wellness",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "Health",
    rating: 4.4,
    reviewCount: 189,
    isNew: true,
    isOnSale: true,
    discountPercentage: 29,
    commission: 15,
    stock: 150,
    features: [
      "Natural ingredients",
      "No artificial additives",
      "Third-party tested",
      "30-day supply"
    ]
  }
];

export const categories = [
  { id: 1, name: "Business", count: 2 },
  { id: 2, name: "Premium", count: 1 },
  { id: 3, name: "Electronics", count: 1 },
  { id: 4, name: "Food & Beverage", count: 1 },
  { id: 5, name: "Starter", count: 1 },
  { id: 6, name: "Health", count: 1 }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isNew || product.isOnSale).slice(0, 4);
}; 