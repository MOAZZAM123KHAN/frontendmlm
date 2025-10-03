// import React, { useEffect, useState } from 'react';
// import { 
//   FunnelIcon, 
//   Squares2X2Icon, 
//   ListBulletIcon,
//   MagnifyingGlassIcon,
//   PhotoIcon,
//   ShoppingCartIcon,
//   HeartIcon,
//   EyeIcon,
//   StarIcon
// } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { categories } from '../data/products';
// import { productAPI } from '../services/api';
// import { useParams } from 'react-router-dom';
// import { useCart } from '../components/ecommerce/CartContext';

// const Shop = () => {
//   const { userId } = useParams();
//   const { addToCart, itemCount } = useCart();
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('featured');
//   const [loading, setLoading] = useState(true);
//   const [wishlist, setWishlist] = useState(new Set());
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

//   // Image URL function
//   const getImageUrl = (filename) => {
//     if (!filename) return '';
    
//     let cleanFilename = filename;
//     if (filename.includes('/')) {
//       cleanFilename = filename.split('/').pop();
//     }
    
//     return `http://localhost:5001/api/images/${cleanFilename}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const data = await productAPI.getProducts(userId);
        
//         // Process products to ensure they have proper image URLs and IDs
//         const processedProducts = data.products?.map(product => ({
//           ...product,
//           id: product._id || product.id,
//           image: product.photos && product.photos.length > 0 
//             ? getImageUrl(product.photos[0]) 
//             : '/images/placeholder-product.jpg',
//           allImages: product.photos?.map(photo => getImageUrl(photo)) || []
//         })) || [];
        
//         setProducts(processedProducts);
        
//         toast.success(`${processedProducts.length} products loaded successfully!`, {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//         toast.error('Failed to load products. Please try again.', {
//           position: "top-right",
//           autoClose: 5000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchProducts();
//   }, [userId]);

//   // Filter products based on category and search
//   const filteredProducts = products.filter(product => {
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          product.about?.toLowerCase().includes(searchQuery.toLowerCase());
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
//         return (b.rating || 0) - (a.rating || 0);
//       case 'newest':
//         return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//       default:
//         return 0;
//     }
//   });

//   // Wishlist functions
//   const toggleWishlist = (productId) => {
//     setWishlist(prev => {
//       const newWishlist = new Set(prev);
//       if (newWishlist.has(productId)) {
//         newWishlist.delete(productId);
//         toast.info('Removed from wishlist', {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       } else {
//         newWishlist.add(productId);
//         toast.success('Added to wishlist!', {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       }
//       return newWishlist;
//     });
//   };

//   // Quick View functions
//   const openQuickView = (product) => {
//     setQuickViewProduct(product);
//     setIsQuickViewOpen(true);
//   };

//   const closeQuickView = () => {
//     setIsQuickViewOpen(false);
//     setQuickViewProduct(null);
//   };

//   // Enhanced Product Card Component for this page
//   const ProductCardEnhanced = ({ product, viewMode }) => {
//     const [added, setAdded] = useState(false);
//     const [imageLoading, setImageLoading] = useState(true);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     const isWishlisted = wishlist.has(product.id || product._id);
    
//     // ✅ Add to cart handler for Shop page
//     const handleAddToCart = async (e) => {
//       e.preventDefault();
//       e.stopPropagation();
      
//       try {
//         const productToAdd = {
//           id: product.id || product._id,
//           name: product.name,
//           price: Number(product.price) || 0,
//           image: product.image,
//           mlmPoints: product.mlmPoints || 0,
//           category: product.category,
//           description: product.about || product.description,
//           allImages: product.allImages || []
//         };
        
//         addToCart(productToAdd, 1);
//         setAdded(true);
        
//         toast.success(`🛒 ${product.name} added to cart!`, {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
        
//         setTimeout(() => setAdded(false), 3000);
//       } catch (error) {
//         toast.error('Failed to add product to cart', {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     };

//     const handleQuickView = (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       openQuickView(product);
//     };

//     const handleImageLoad = () => {
//       setImageLoading(false);
//     };

//     const handleImageError = (e) => {
//       setImageLoading(false);
//       e.target.src = '/images/placeholder-product.jpg';
//     };

//     const nextImage = () => {
//       setCurrentImageIndex(prev => 
//         prev < product.allImages.length - 1 ? prev + 1 : 0
//       );
//     };

//     const prevImage = () => {
//       setCurrentImageIndex(prev => 
//         prev > 0 ? prev - 1 : product.allImages.length - 1
//       );
//     };

//     if (viewMode === 'list') {
//       return (
//         <div className="bg-white rounded-xl shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 p-6 group">
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Product Image */}
//             <div className="flex-shrink-0 relative">
//               <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center relative">
//                 {imageLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   </div>
//                 )}
//                 {product.image && !product.image.includes('placeholder') ? (
//                   <img
//                     src={product.allImages?.[currentImageIndex] || product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                     onLoad={handleImageLoad}
//                     onError={handleImageError}
//                   />
//                 ) : (
//                   <div className="text-gray-400 flex flex-col items-center">
//                     <PhotoIcon className="h-12 w-12 mb-2" />
//                     <span className="text-sm">No Image</span>
//                   </div>
//                 )}
                
//                 {/* Image Navigation */}
//                 {product.allImages && product.allImages.length > 1 && (
//                   <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
//                     {product.allImages.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setCurrentImageIndex(index);
//                         }}
//                         className={`w-2 h-2 rounded-full transition-all ${
//                           index === currentImageIndex 
//                             ? 'bg-white scale-125' 
//                             : 'bg-white bg-opacity-50'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="flex-1">
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                     {product.name}
//                   </h3>
//                   <div className="flex items-center gap-2 mt-1">
//                     {product.rating && (
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, index) => (
//                           <StarIcon
//                             key={index}
//                             className={`h-4 w-4 ${
//                               index < Math.floor(product.rating)
//                                 ? 'text-yellow-400 fill-current'
//                                 : 'text-gray-300'
//                             }`}
//                           />
//                         ))}
//                         <span className="text-sm text-gray-600 ml-1">
//                           ({product.rating})
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
//               </div>
              
//               <p className="text-gray-600 mb-4 line-clamp-3">
//                 {product.about || product.description || 'No description available'}
//               </p>

//               {/* Additional Images */}
//               {product.allImages && product.allImages.length > 1 && (
//                 <div className="flex gap-2 mb-4">
//                   {product.allImages.slice(0, 4).map((img, index) => (
//                     <div 
//                       key={index} 
//                       className={`w-16 h-16 rounded border overflow-hidden cursor-pointer transition-all ${
//                         index === currentImageIndex 
//                           ? 'border-blue-500 ring-2 ring-blue-200' 
//                           : 'border-gray-200'
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCurrentImageIndex(index);
//                       }}
//                     >
//                       <img
//                         src={img}
//                         alt={`${product.name} ${index + 1}`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   ))}
//                   {product.allImages.length > 4 && (
//                     <div className="w-16 h-16 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
//                       +{product.allImages.length - 4}
//                     </div>
//                   )}
//                 </div>
//               )}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4 text-sm text-gray-500">
//                   {product.category && (
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//                       {product.category}
//                     </span>
//                   )}
//                   {product.mlmPoints > 0 && (
//                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
//                       {product.mlmPoints} Points
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={handleQuickView}
//                     className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 tooltip"
//                     title="Quick View"
//                   >
//                     <EyeIcon className="h-5 w-5 text-gray-600" />
//                   </button>
                  
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleWishlist(product.id || product._id);
//                     }}
//                     className={`p-2 border rounded-lg transition-all duration-200 tooltip ${
//                       isWishlisted
//                         ? 'border-red-300 bg-red-50 text-red-600'
//                         : 'border-gray-300 hover:bg-gray-50 text-gray-600'
//                     }`}
//                     title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
//                   >
//                     {isWishlisted ? (
//                       <HeartSolidIcon className="h-5 w-5" />
//                     ) : (
//                       <HeartIcon className="h-5 w-5" />
//                     )}
//                   </button>
                  
//                   <button 
//                     onClick={handleAddToCart}
//                     className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm ${
//                       added 
//                         ? 'bg-green-600 text-white hover:bg-green-700' 
//                         : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
//                     }`}
//                   >
//                     <ShoppingCartIcon className="h-4 w-4" />
//                     {added ? 'Added!' : 'Add to Cart'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     // Grid View
//     return (
//       <div className="bg-white rounded-xl shadow-soft border border-gray-100 hover:shadow-medium hover:border-blue-200 transition-all duration-300 group">
//         {/* Product Image */}
//         <div className="relative overflow-hidden rounded-t-xl">
//           <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative">
//             {imageLoading && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               </div>
//             )}
//             {product.image && !product.image.includes('placeholder') ? (
//               <img
//                 src={product.allImages?.[currentImageIndex] || product.image}
//                 alt={product.name}
//                 className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//                 onLoad={handleImageLoad}
//                 onError={handleImageError}
//               />
//             ) : (
//               <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400">
//                 <PhotoIcon className="h-16 w-16 mb-2" />
//                 <span className="text-sm">No Image Available</span>
//               </div>
//             )}
            
//             {/* Image Navigation Dots */}
//             {product.allImages && product.allImages.length > 1 && (
//               <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
//                 {product.allImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setCurrentImageIndex(index);
//                     }}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       index === currentImageIndex 
//                         ? 'bg-white scale-125' 
//                         : 'bg-white bg-opacity-50'
//                     }`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
          
//           {/* Image Count Badge */}
//           {product.allImages && product.allImages.length > 1 && (
//             <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
//               {product.allImages.length} photos
//             </div>
//           )}
          
//           {/* Wishlist Button */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleWishlist(product.id || product._id);
//             }}
//             className={`absolute top-3 left-3 p-2 rounded-full transition-all duration-200 ${
//               isWishlisted
//                 ? 'bg-red-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-gray-100'
//             }`}
//           >
//             {isWishlisted ? (
//               <HeartSolidIcon className="h-5 w-5" />
//             ) : (
//               <HeartIcon className="h-5 w-5" />
//             )}
//           </button>

//           {/* Quick Actions Overlay */}
//           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//             <div className="flex gap-2">
//               <button
//                 onClick={handleQuickView}
//                 className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg flex items-center gap-2 hover:bg-gray-50"
//               >
//                 <EyeIcon className="h-4 w-4" />
//                 Quick View
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="p-5">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
//               {product.name}
//             </h3>
//             <span className="text-xl font-bold text-green-600">₹{product.price}</span>
//           </div>
          
//           <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//             {product.about || product.description || 'No description available'}
//           </p>

//           {/* Rating */}
//           {product.rating && (
//             <div className="flex items-center gap-1 mb-3">
//               {[...Array(5)].map((_, index) => (
//                 <StarIcon
//                   key={index}
//                   className={`h-4 w-4 ${
//                     index < Math.floor(product.rating)
//                       ? 'text-yellow-400 fill-current'
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//               <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
//             </div>
//           )}

//           {/* Category and Points */}
//           <div className="flex items-center justify-between mb-4">
//             {product.category && (
//               <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
//                 {product.category}
//               </span>
//             )}
//             {product.mlmPoints > 0 && (
//               <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
//                 {product.mlmPoints} Points
//               </span>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <button 
//               onClick={handleAddToCart}
//               className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm ${
//                 added 
//                   ? 'bg-green-600 text-white hover:bg-green-700' 
//                   : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
//               }`}
//             >
//               <ShoppingCartIcon className="h-4 w-4" />
//               {added ? 'Added!' : 'Add to Cart'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Quick View Modal
//   const QuickViewModal = () => {
//     if (!isQuickViewOpen || !quickViewProduct) return null;

//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [quantity, setQuantity] = useState(1);

//     const handleAddToCartFromModal = () => {
//       const productToAdd = {
//         id: quickViewProduct.id || quickViewProduct._id,
//         name: quickViewProduct.name,
//         price: Number(quickViewProduct.price) || 0,
//         image: quickViewProduct.image,
//         mlmPoints: quickViewProduct.mlmPoints || 0,
//         category: quickViewProduct.category,
//         description: quickViewProduct.about || quickViewProduct.description,
//         allImages: quickViewProduct.allImages || []
//       };
      
//       addToCart(productToAdd, quantity);
      
//       toast.success(`🛒 ${quantity} x ${quickViewProduct.name} added to cart!`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
      
//       closeQuickView();
//     };

//     const nextImage = () => {
//       setCurrentImageIndex(prev => 
//         prev < quickViewProduct.allImages.length - 1 ? prev + 1 : 0
//       );
//     };

//     const prevImage = () => {
//       setCurrentImageIndex(prev => 
//         prev > 0 ? prev - 1 : quickViewProduct.allImages.length - 1
//       );
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="flex flex-col lg:flex-row">
//             {/* Product Images */}
//             <div className="lg:w-1/2 p-6">
//               <div className="relative">
//                 <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src={quickViewProduct.allImages?.[currentImageIndex] || quickViewProduct.image}
//                     alt={quickViewProduct.name}
//                     className="w-full h-80 object-cover"
//                   />
//                 </div>
                
//                 {/* Image Navigation */}
//                 {quickViewProduct.allImages && quickViewProduct.allImages.length > 1 && (
//                   <>
//                     <button
//                       onClick={prevImage}
//                       className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
//                     >
//                       ←
//                     </button>
//                     <button
//                       onClick={nextImage}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
//                     >
//                       →
//                     </button>
                    
//                     <div className="flex gap-2 mt-4 overflow-x-auto">
//                       {quickViewProduct.allImages.map((img, index) => (
//                         <img
//                           key={index}
//                           src={img}
//                           alt={`${quickViewProduct.name} ${index + 1}`}
//                           className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                             index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
//                           }`}
//                           onClick={() => setCurrentImageIndex(index)}
//                         />
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="lg:w-1/2 p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900">{quickViewProduct.name}</h2>
//                 <button
//                   onClick={closeQuickView}
//                   className="text-gray-400 hover:text-gray-600 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <span className="text-3xl font-bold text-green-600">₹{quickViewProduct.price}</span>
//                 {quickViewProduct.mlmPoints > 0 && (
//                   <div className="text-sm text-green-600 mt-1">
//                     Earn {quickViewProduct.mlmPoints} MLM Points
//                   </div>
//                 )}
//               </div>

//               {quickViewProduct.rating && (
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, index) => (
//                       <StarIcon
//                         key={index}
//                         className={`h-5 w-5 ${
//                           index < Math.floor(quickViewProduct.rating)
//                             ? 'text-yellow-400 fill-current'
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-gray-600">({quickViewProduct.rating})</span>
//                 </div>
//               )}

//               <p className="text-gray-600 mb-6">
//                 {quickViewProduct.about || quickViewProduct.description || 'No description available'}
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <span className="text-gray-700 font-medium">Quantity:</span>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//                       className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
//                     >
//                       -
//                     </button>
//                     <span className="w-12 text-center font-medium">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(prev => prev + 1)}
//                       className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleAddToCartFromModal}
//                     className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center gap-2"
//                   >
//                     <ShoppingCartIcon className="h-5 w-5" />
//                     Add to Cart
//                   </button>
//                   <button
//                     onClick={() => toggleWishlist(quickViewProduct.id || quickViewProduct._id)}
//                     className={`p-3 border rounded-lg transition duration-200 ${
//                       wishlist.has(quickViewProduct.id || quickViewProduct._id)
//                         ? 'border-red-300 bg-red-50 text-red-600'
//                         : 'border-gray-300 hover:bg-gray-50 text-gray-600'
//                     }`}
//                   >
//                     {wishlist.has(quickViewProduct.id || quickViewProduct._id) ? (
//                       <HeartSolidIcon className="h-5 w-5" />
//                     ) : (
//                       <HeartIcon className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ✅ Debug component - temporary (remove after testing)
//   const CartDebug = () => {
//     return (
//       <div className="fixed top-4 right-4 bg-yellow-100 p-3 rounded-lg shadow-lg border border-yellow-300 z-40">
//         <div className="text-sm font-medium text-yellow-800">
//           🛒 Cart Items: <span className="font-bold">{itemCount}</span>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading amazing products...</p>
//           <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your shopping experience</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
//       {/* Toast Notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//       {/* ✅ Add debug component */}
//       <CartDebug />
      
//       {/* Quick View Modal */}
//       <QuickViewModal />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Products</h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Discover amazing products and start your shopping journey with exclusive benefits
//           </p>
//         </div>

//         {/* Filters and Controls */}
//         <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-gray-200">
//           <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
//             {/* Search */}
//             <div className="relative flex-1 max-w-lg">
//               <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products by name or description..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-lg"
//               />
//             </div>

//             {/* Controls Group */}
//             <div className="flex flex-wrap items-center gap-4">
//               {/* Category Filter */}
//               <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
//                 <FunnelIcon className="h-5 w-5 text-gray-600" />
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="bg-transparent border-none focus:ring-0 text-gray-700 font-medium"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map(category => (
//                     <option key={category.id} value={category.name}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Sort */}
//               <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
//                 <span className="text-sm text-gray-600 font-medium">Sort:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="bg-transparent border-none focus:ring-0 text-gray-700"
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="rating">Highest Rated</option>
//                   <option value="newest">Newest</option>
//                 </select>
//               </div>

//               {/* View Mode */}
//               <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-all duration-200 ${
//                     viewMode === 'grid' 
//                       ? 'bg-white text-blue-600 shadow-sm' 
//                       : 'text-gray-400 hover:text-gray-600'
//                   }`}
//                 >
//                   <Squares2X2Icon className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg transition-all duration-200 ${
//                     viewMode === 'list' 
//                       ? 'bg-white text-blue-600 shadow-sm' 
//                       : 'text-gray-400 hover:text-gray-600'
//                   }`}
//                 >
//                   <ListBulletIcon className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span> of{' '}
//             <span className="font-semibold text-gray-900">{products.length}</span> products
//           </p>
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery('')}
//               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//             >
//               Clear search
//             </button>
//           )}
//         </div>

//         {/* Products Display */}
//         {sortedProducts.length > 0 ? (
//           <div className={
//             viewMode === 'grid' 
//               ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
//               : 'space-y-6'
//           }>
//             {sortedProducts.map(product => (
//               <ProductCardEnhanced 
//                 key={product._id || product.id} 
//                 product={product} 
//                 viewMode={viewMode}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-soft border border-gray-200">
//             <div className="text-gray-400 mb-6">
//               <MagnifyingGlassIcon className="h-20 w-20 mx-auto" />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
//             <p className="text-gray-600 max-w-md mx-auto mb-6">
//               {searchQuery 
//                 ? `No products match "${searchQuery}". Try adjusting your search terms.`
//                 : 'No products available at the moment. Please check back later.'
//               }
//             </p>
//             {(searchQuery || selectedCategory !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchQuery('');
//                   setSelectedCategory('all');
//                 }}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
//               >
//                 Clear all filters
//               </button>
//             )}
//           </div>
//         )}

//         {/* Load More */}
//         {sortedProducts.length > 0 && sortedProducts.length < products.length && (
//           <div className="text-center mt-12">
//             <button className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition duration-200 font-medium shadow-sm">
//               Load More Products
//             </button>
//           </div>
//         )}
//       </div>
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
  PhotoIcon,
  ShoppingCartIcon,
  HeartIcon,
  EyeIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { categories } from '../data/products';
import { productAPI } from '../services/api';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/ecommerce/CartContext';

const Shop = () => {
  const { userId } = useParams();
  const { addToCart, itemCount } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Image URL function
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
        
        // Process products to ensure they have proper image URLs and IDs
        const processedProducts = data.products?.map(product => ({
          ...product,
          id: product._id || product.id,
          image: product.photos && product.photos.length > 0 
            ? getImageUrl(product.photos[0]) 
            : '/images/placeholder-product.jpg',
          allImages: product.photos?.map(photo => getImageUrl(photo)) || []
        })) || [];
        
        setProducts(processedProducts);
        
        toast.success(`${processedProducts.length} products loaded successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products. Please try again.', {
          position: "top-right",
          autoClose: 5000,
        });
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

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        toast.info('Removed from wishlist', {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        newWishlist.add(productId);
        toast.success('Added to wishlist!', {
          position: "top-right",
          autoClose: 2000,
        });
      }
      return newWishlist;
    });
  };

  // Quick View functions
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  // Quick View Modal Component - FIXED: Hooks at top level
  const QuickViewModal = () => {
    // ✅ FIXED: Hooks at top level before any conditional returns
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // ✅ Conditional return after hooks
    if (!isQuickViewOpen || !quickViewProduct) return null;

    const handleAddToCartFromModal = () => {
      const productToAdd = {
        id: quickViewProduct.id || quickViewProduct._id,
        name: quickViewProduct.name,
        price: Number(quickViewProduct.price) || 0,
        image: quickViewProduct.image,
        mlmPoints: quickViewProduct.mlmPoints || 0,
        category: quickViewProduct.category,
        description: quickViewProduct.about || quickViewProduct.description,
        allImages: quickViewProduct.allImages || []
      };
      
      addToCart(productToAdd, quantity);
      
      toast.success(`🛒 ${quantity} x ${quickViewProduct.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
      });
      
      closeQuickView();
    };

    const nextImage = () => {
      setCurrentImageIndex(prev => 
        prev < quickViewProduct.allImages.length - 1 ? prev + 1 : 0
      );
    };

    const prevImage = () => {
      setCurrentImageIndex(prev => 
        prev > 0 ? prev - 1 : quickViewProduct.allImages.length - 1
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Product Images */}
            <div className="lg:w-1/2 p-6">
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={quickViewProduct.allImages?.[currentImageIndex] || quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                
                {/* Image Navigation */}
                {quickViewProduct.allImages && quickViewProduct.allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                    >
                      →
                    </button>
                    
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                      {quickViewProduct.allImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${quickViewProduct.name} ${index + 1}`}
                          className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                            index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{quickViewProduct.name}</h2>
                <button
                  onClick={closeQuickView}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-green-600">₹{quickViewProduct.price}</span>
                {quickViewProduct.mlmPoints > 0 && (
                  <div className="text-sm text-green-600 mt-1">
                    Earn {quickViewProduct.mlmPoints} MLM Points
                  </div>
                )}
              </div>

              {quickViewProduct.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.floor(quickViewProduct.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({quickViewProduct.rating})</span>
                </div>
              )}

              <p className="text-gray-600 mb-6">
                {quickViewProduct.about || quickViewProduct.description || 'No description available'}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCartFromModal}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id || quickViewProduct._id)}
                    className={`p-3 border rounded-lg transition duration-200 ${
                      wishlist.has(quickViewProduct.id || quickViewProduct._id)
                        ? 'border-red-300 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {wishlist.has(quickViewProduct.id || quickViewProduct._id) ? (
                      <HeartSolidIcon className="h-5 w-5" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Product Card Component for this page
  const ProductCardEnhanced = ({ product, viewMode }) => {
    const [added, setAdded] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const isWishlisted = wishlist.has(product.id || product._id);
    
    // ✅ Add to cart handler for Shop page
    const handleAddToCart = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      try {
        const productToAdd = {
          id: product.id || product._id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.image,
          mlmPoints: product.mlmPoints || 0,
          category: product.category,
          description: product.about || product.description,
          allImages: product.allImages || []
        };
        
        addToCart(productToAdd, 1);
        setAdded(true);
        
        toast.success(`🛒 ${product.name} added to cart!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        setTimeout(() => setAdded(false), 3000);
      } catch (error) {
        toast.error('Failed to add product to cart', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    const handleQuickView = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openQuickView(product);
    };

    const handleImageLoad = () => {
      setImageLoading(false);
    };

    const handleImageError = (e) => {
      setImageLoading(false);
      e.target.src = '/images/placeholder-product.jpg';
    };

    const nextImage = () => {
      setCurrentImageIndex(prev => 
        prev < product.allImages.length - 1 ? prev + 1 : 0
      );
    };

    const prevImage = () => {
      setCurrentImageIndex(prev => 
        prev > 0 ? prev - 1 : product.allImages.length - 1
      );
    };

    if (viewMode === 'list') {
      return (
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 p-6 group">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0 relative">
              <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                {product.image && !product.image.includes('placeholder') ? (
                  <img
                    src={product.allImages?.[currentImageIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <PhotoIcon className="h-12 w-12 mb-2" />
                    <span className="text-sm">No Image</span>
                  </div>
                )}
                
                {/* Image Navigation */}
                {product.allImages && product.allImages.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {product.allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`h-4 w-4 ${
                              index < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          ({product.rating})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {product.about || product.description || 'No description available'}
              </p>

              {/* Additional Images */}
              {product.allImages && product.allImages.length > 1 && (
                <div className="flex gap-2 mb-4">
                  {product.allImages.slice(0, 4).map((img, index) => (
                    <div 
                      key={index} 
                      className={`w-16 h-16 rounded border overflow-hidden cursor-pointer transition-all ${
                        index === currentImageIndex 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                    >
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
                  {product.mlmPoints > 0 && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {product.mlmPoints} Points
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleQuickView}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    title="Quick View"
                  >
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id || product._id);
                    }}
                    className={`p-2 border rounded-lg transition-all duration-200 ${
                      isWishlisted
                        ? 'border-red-300 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    {isWishlisted ? (
                      <HeartSolidIcon className="h-5 w-5" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                  
                  <button 
                    onClick={handleAddToCart}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm ${
                      added 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    }`}
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    {added ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
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
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            {product.image && !product.image.includes('placeholder') ? (
              <img
                src={product.allImages?.[currentImageIndex] || product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400">
                <PhotoIcon className="h-16 w-16 mb-2" />
                <span className="text-sm">No Image Available</span>
              </div>
            )}
            
            {/* Image Navigation Dots */}
            {product.allImages && product.allImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Image Count Badge */}
          {product.allImages && product.allImages.length > 1 && (
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
              {product.allImages.length} photos
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id || product._id);
            }}
            className={`absolute top-3 left-3 p-2 rounded-full transition-all duration-200 ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isWishlisted ? (
              <HeartSolidIcon className="h-5 w-5" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={handleQuickView}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <EyeIcon className="h-4 w-4" />
                Quick View
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.about || product.description || 'No description available'}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
            </div>
          )}

          {/* Category and Points */}
          <div className="flex items-center justify-between mb-4">
            {product.category && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {product.category}
              </span>
            )}
            {product.mlmPoints > 0 && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                {product.mlmPoints} Points
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm ${
                added 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              <ShoppingCartIcon className="h-4 w-4" />
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ✅ Debug component - temporary (remove after testing)
  const CartDebug = () => {
    return (
      <div className="fixed top-4 right-4 bg-yellow-100 p-3 rounded-lg shadow-lg border border-yellow-300 z-40">
        <div className="text-sm font-medium text-yellow-800">
          🛒 Cart Items: <span className="font-bold">{itemCount}</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing products...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your shopping experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* ✅ Add debug component */}
      <CartDebug />
      
      {/* Quick View Modal */}
      <QuickViewModal />
      
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