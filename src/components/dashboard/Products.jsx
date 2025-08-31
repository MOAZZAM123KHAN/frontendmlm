// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   ShoppingBagIcon,
//   StarIcon,
//   ArrowPathIcon
// } from '@heroicons/react/24/outline';
// import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

// const Products = ({products}) => {
//   // Sample product data with MLM-related fields
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: 'Basic Starter Package',
//       price: 99,
//       description: 'Entry-level package to join the network',
//       image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       rating: 4.2,
//       category: 'membership',
//       mlmPoints: 100,
//       commissionRate: 0.1,
//       isPackage: true
//     },
//     {
//       id: 2,
//       name: 'Premium Business Package',
//       price: 299,
//       description: 'Advanced package with higher commissions',
//       image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       rating: 4.8,
//       category: 'membership',
//       mlmPoints: 300,
//       commissionRate: 0.2,
//       isPackage: true
//     },
//     {
//       id: 3,
//       name: 'Organic Coffee Beans',
//       price: 19.99,
//       description: 'Premium quality organic coffee beans',
//       image: 'https://images.unsplash.com/photo-1515446134809-993c501ca304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       rating: 4.5,
//       category: 'food',
//       mlmPoints: 10,
//       commissionRate: 0.05,
//       isPackage: false
//     },
//     {
//       id: 4,
//       name: 'Smartwatch Pro',
//       price: 199,
//       description: 'Latest smartwatch with health tracking',
//       image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
//       rating: 4.7,
//       category: 'electronics',
//       mlmPoints: 50,
//       commissionRate: 0.08,
//       isPackage: false
//     },
//     {
//       id: 5,
//       name: 'Elite Membership Package',
//       price: 499,
//       description: 'Highest level with maximum benefits',
//       image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       rating: 5.0,
//       category: 'membership',
//       mlmPoints: 500,
//       commissionRate: 0.25,
//       isPackage: true
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [showMLMPackages, setShowMLMPackages] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Filter products based on search, category, and MLM package filter
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     const matchesMLMFilter = !showMLMPackages || product.isPackage;
    
//     return matchesSearch && matchesCategory && matchesMLMFilter;
//   });

//   // Get unique categories for filter
//   const categories = ['all', ...new Set(products.map(product => product.category))];

//   // Simulate loading data
//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, [searchTerm, selectedCategory, showMLMPackages]);

//   return (
//     <div className="px-4 py-8 max-w-7xl mx-auto">
//       {/* Header and Filters */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
        
//         {/* Search and Filter Bar */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="flex gap-3">
//             <div className="relative">
//               <select
//                 className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>
//                     {category.charAt(0).toUpperCase() + category.slice(1)}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <FunnelIcon className="h-4 w-4 text-gray-400" />
//               </div>
//             </div>
            
//             <button
//               onClick={() => setShowMLMPackages(!showMLMPackages)}
//               className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${showMLMPackages ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
//             >
//               <ArrowPathIcon className="h-4 w-4" />
//               <span>MLM Packages</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Loading State */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         /* Products Grid */
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map(product => (
//               <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 {/* Product Image */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                   {product.isPackage && (
//                     <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
//                       MLM Package
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Product Info */}
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       <Link to={`/products/${product.id}`} className="hover:text-blue-600">
//                         {product.name}
//                       </Link>
//                     </h3>
//                     <p className="text-lg font-bold text-gray-900">${product.price}</p>
//                   </div>
                  
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
//                   {/* Rating */}
//                   <div className="flex items-center mb-3">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((rating) => (
//                         rating <= Math.floor(product.rating) ? (
//                           <SolidStarIcon key={rating} className="h-4 w-4 text-yellow-400" />
//                         ) : (
//                           <StarIcon key={rating} className="h-4 w-4 text-yellow-400" />
//                         )
//                       ))}
//                     </div>
//                     <span className="ml-1 text-xs text-gray-500">({product.rating.toFixed(1)})</span>
//                   </div>
                  
//                   {/* MLM Info */}
//                   {product.isPackage && (
//                     <div className="mb-3">
//                       <div className="flex justify-between text-xs text-gray-600">
//                         <span>Points: <span className="font-semibold">{product.mlmPoints}</span></span>
//                         <span>Commission: <span className="font-semibold">{product.commissionRate * 100}%</span></span>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Add to Cart Button */}
//                   <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
//                     <ShoppingBagIcon className="h-5 w-5 mr-2" />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <h3 className="text-lg font-medium text-gray-900">No products found</h3>
//               <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Pagination */}
//       {filteredProducts.length > 0 && (
//         <div className="mt-8 flex justify-center">
//           <nav className="flex items-center gap-1">
//             <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
//               Previous
//             </button>
//             {[1, 2, 3].map(page => (
//               <button
//                 key={page}
//                 className={`px-3 py-1 rounded-md border ${page === 1 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'}`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
//               Next
//             </button>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ShoppingBagIcon,
  StarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

const Products = () => {
  // Sample product data with MLM-related fields
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Basic Starter Package',
      price: 99,
      description: 'Entry-level package to join the network',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.2,
      category: 'membership',
      mlmPoints: 100,
      commissionRate: 0.1,
      isPackage: true
    },
    {
      id: 2,
      name: 'Premium Business Package',
      price: 299,
      description: 'Advanced package with higher commissions',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.8,
      category: 'membership',
      mlmPoints: 300,
      commissionRate: 0.2,
      isPackage: true
    },
    {
      id: 3,
      name: 'Organic Coffee Beans',
      price: 19.99,
      description: 'Premium quality organic coffee beans',
      image: 'https://images.unsplash.com/photo-1515446134809-993c501ca304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.5,
      category: 'food',
      mlmPoints: 10,
      commissionRate: 0.05,
      isPackage: false
    },
    {
      id: 4,
      name: 'Smartwatch Pro',
      price: 199,
      description: 'Latest smartwatch with health tracking',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
      rating: 4.7,
      category: 'electronics',
      mlmPoints: 50,
      commissionRate: 0.08,
      isPackage: false
    },
    {
      id: 5,
      name: 'Elite Membership Package',
      price: 499,
      description: 'Highest level with maximum benefits',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 5.0,
      category: 'membership',
      mlmPoints: 500,
      commissionRate: 0.25,
      isPackage: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMLMPackages, setShowMLMPackages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter products based on search, category, and MLM package filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesMLMFilter = !showMLMPackages || product.isPackage;
    
    return matchesSearch && matchesCategory && matchesMLMFilter;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, showMLMPackages]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Header and Filters */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FunnelIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <button
              onClick={() => setShowMLMPackages(!showMLMPackages)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${showMLMPackages ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>MLM Packages</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isPackage && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      MLM Package
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      <Link to={`/products/${product.id}`} className="hover:text-blue-600">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        rating <= Math.floor(product.rating) ? (
                          <SolidStarIcon key={rating} className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <StarIcon key={rating} className="h-4 w-4 text-yellow-400" />
                        )
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">({product.rating.toFixed(1)})</span>
                  </div>
                  
                  {/* MLM Info */}
                  {product.isPackage && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Points: <span className="font-semibold">{product.mlmPoints}</span></span>
                        <span>Commission: <span className="font-semibold">{(product.commissionRate * 100).toFixed(0)}%</span></span>
                      </div>
                    </div>
                  )}
                  
                  {/* Add to Cart Button */}
                  <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-1">
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md border ${page === 1 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Products;