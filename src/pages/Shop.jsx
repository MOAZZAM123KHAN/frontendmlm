// import React, { useEffect, useState } from 'react';
// import { 
//   FunnelIcon, 
//   Squares2X2Icon, 
//   ListBulletIcon,
//   MagnifyingGlassIcon
// } from '@heroicons/react/24/outline';
// import ProductCard from '../components/ecommerce/ProductCard';
// import { categories } from '../data/products';
// import { productAPI } from '../services/api';
// import { useParams } from 'react-router-dom';

// const Shop = () => {
//   const {userId}=useParams();
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('featured');



//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await productAPI.getProducts(userId);
//         setProducts(data.products);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };
    
//     fetchProducts();
//   }, [userId]);

//   // Filter products based on category and search
//   const filteredProducts = products.filter(product => {
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case 'price-low':
//         return a.price - b.price;
//       case 'price-high':
//         return b.price - a.price;
//       case 'rating':
//         return b.rating - a.rating;
//       case 'newest':
//         return b.isNew ? 1 : -1;
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="page-container">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-secondary-900 mb-2">Shop Products</h1>
//         <p className="text-secondary-600">Discover quality products and earn commissions with every purchase</p>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
//         <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//           {/* Search */}
//           <div className="relative flex-1 max-w-md">
//             <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="flex items-center gap-2">
//             <FunnelIcon className="h-5 w-5 text-secondary-500" />
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             >
//               <option value="all">All Categories</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.name}>
//                   {category.name} ({category.count})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sort */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-secondary-600">Sort by:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             >
//               <option value="featured">Featured</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//               <option value="newest">Newest</option>
//             </select>
//           </div>

//           {/* View Mode */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
//             >
//               <Squares2X2Icon className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
//             >
//               <ListBulletIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-secondary-600">
//           Showing {sortedProducts.length} of {products.length} products
//         </p>
//       </div>

//       {/* Products Grid */}
//       {sortedProducts.length > 0 ? (
//         <div className={viewMode === 'grid' ? 'product-grid' : 'space-y-4'}>
//           {sortedProducts.map(product => (
//         <ProductCard 
//           key={product.id}  // Add this
//           product={product} 
//         />
//       ))}
          
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="text-secondary-400 mb-4">
//             <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
//           </div>
//           <h3 className="text-lg font-medium text-secondary-900 mb-2">No products found</h3>
//           <p className="text-secondary-600">Try adjusting your search or filter criteria</p>
//         </div>
//       )}

//       {/* Load More Button */}
//       {sortedProducts.length > 0 && (
//         <div className="text-center mt-12">
//           <button className="btn btn-outline btn-lg">
//             Load More Products
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Shop;




import React, { useEffect, useState } from 'react';
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  MagnifyingGlassIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import ProductCard from '../components/ecommerce/ProductCard';
import { categories } from '../data/products';
import { productAPI } from '../services/api';
import { useParams } from 'react-router-dom';

const Shop = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Image URL function (same as admin)
  const getImageUrl = (filename) => {
    if (!filename) return '';
    
    let cleanFilename = filename;
    if (filename.includes('/')) {
      cleanFilename = filename.split('/').pop();
    }
    
    return `http://localhost:5001/api/images/${cleanFilename}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getProducts(userId);
        
        // Process products to ensure they have proper image URLs
        const processedProducts = data.products?.map(product => ({
          ...product,
          // Use the first photo as main image, or placeholder if no photos
          image: product.photos && product.photos.length > 0 
            ? getImageUrl(product.photos[0]) 
            : '/images/placeholder-product.jpg',
          // Keep all photos for gallery
          allImages: product.photos?.map(photo => getImageUrl(photo)) || []
        })) || [];
        
        setProducts(processedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [userId]);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.about?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  // Enhanced Product Card Component for this page
  const ProductCardEnhanced = ({ product, viewMode }) => {
    if (viewMode === 'list') {
      return (
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {product.image && !product.image.includes('placeholder') ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-product.jpg';
                    }}
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <PhotoIcon className="h-12 w-12 mb-2" />
                    <span className="text-sm">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {product.about || product.description || 'No description available'}
              </p>

              {/* Additional Images */}
              {product.allImages && product.allImages.length > 1 && (
                <div className="flex gap-2 mb-4">
                  {product.allImages.slice(0, 4).map((img, index) => (
                    <div key={index} className="w-16 h-16 rounded border border-gray-200 overflow-hidden">
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                  {product.allImages.length > 4 && (
                    <div className="w-16 h-16 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      +{product.allImages.length - 4}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {product.category && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  )}
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span>{product.rating}</span>
                    </div>
                  )}
                </div>
                
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View
    return (
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 hover:shadow-medium hover:border-blue-200 transition-all duration-300 group">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100">
            {product.image && !product.image.includes('placeholder') ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.jpg';
                }}
              />
            ) : (
              <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400">
                <PhotoIcon className="h-16 w-16 mb-2" />
                <span className="text-sm">No Image Available</span>
              </div>
            )}
          </div>
          
          {/* Image Count Badge */}
          {product.allImages && product.allImages.length > 1 && (
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
              {product.allImages.length} photos
            </div>
          )}
          
          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.about || product.description || 'No description available'}
          </p>

          {/* Category and Rating */}
          <div className="flex items-center justify-between mb-4">
            {product.category && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {product.category}
              </span>
            )}
            {product.rating && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="text-yellow-400">⭐</span>
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-sm">
              Add to Cart
            </button>
            <button className="px-3 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
              ♡
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products and start your shopping journey with exclusive benefits
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-lg"
              />
            </div>

            {/* Controls Group */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
                <FunnelIcon className="h-5 w-5 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-gray-700 font-medium"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-600 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-gray-700"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{products.length}</span> products
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Products Display */}
        {sortedProducts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-6'
          }>
            {sortedProducts.map(product => (
              <ProductCardEnhanced 
                key={product._id || product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-soft border border-gray-200">
            <div className="text-gray-400 mb-6">
              <MagnifyingGlassIcon className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchQuery 
                ? `No products match "${searchQuery}". Try adjusting your search terms.`
                : 'No products available at the moment. Please check back later.'
              }
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Load More */}
        {sortedProducts.length > 0 && sortedProducts.length < products.length && (
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition duration-200 font-medium shadow-sm">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;