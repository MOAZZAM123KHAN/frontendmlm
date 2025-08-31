// import { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { 
//   HeartIcon, 
//   ShoppingCartIcon, 
//   StarIcon,
//   EyeIcon,
//   TagIcon
// } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
// import { useCart } from './CartContext';

// const ProductCard = ({ product }) => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [added, setAdded] = useState(false);
//   const { userId } = useParams();
//   const { addToCart } = useCart();

//   // Handle both frontend and backend product structures
//   const {
//     id,
//     _id, // MongoDB ID from backend
//     name,
//     price,
//     originalPrice,
//     image,
//     photos, // Backend field name
//     rating = 0,
//     reviewCount = 0,
//     category = 'General',
//     isNew = false,
//     isOnSale = false,
//     discountPercentage = 0,
//     commission = 0,
//     mlmPoints = 0,
//     about, // Backend description field
//     description // Frontend description field
//   } = product;

//   // Use the correct ID (MongoDB _id or regular id)
//   const productId = _id || id;
  
//   // Use the correct image (photos array from backend or single image)
//   const productImage = photos && photos.length > 0 ? photos[0] : image;
  
//   // Use the correct description
//   const productDescription = about || description || '';

//   const handleWishlistToggle = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     console.log('ProductCard: Adding product to cart:', product); // Debug log
    
//     // Ensure product has all required fields with fallbacks
//     const productToAdd = {
//       id: productId,
//       name: name || 'Unknown Product',
//       price: Number(price) || 0,
//       image: productImage || 'https://via.placeholder.com/150',
//       mlmPoints: mlmPoints || 0,
//       category: category || 'General',
//       commission: commission || 0,
//       description: productDescription
//     };
    
//     console.log('ProductCard: Processed product for cart:', productToAdd); // Debug log
    
//     addToCart(productToAdd, 1);
//     setAdded(true);
    
//     // Reset added state after 2 seconds
//     setTimeout(() => setAdded(false), 2000);
//   };

//   const handleQuickView = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('Quick view:', product);
//   };

//   return (
//     <div 
//       className="product-card group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Product Image */}
//       <div className="product-image-container relative overflow-hidden">
//         <img
//           src={productImage || 'https://via.placeholder.com/150'}
//           alt={name || 'Product'}
//           className="product-image group-hover:scale-105"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/150';
//           }}
//         />
        
//         {/* Badges */}
//         <div className="absolute top-3 left-3 flex flex-col gap-2">
//           {isNew && (
//             <span className="badge badge-primary">
//               New
//             </span>
//           )}
//           {isOnSale && (
//             <span className="badge badge-danger">
//               -{discountPercentage}%
//             </span>
//           )}
//           {commission > 0 && (
//             <span className="badge badge-gold">
//               Earn ${commission}
//             </span>
//           )}
//         </div>

//         {/* Category Badge */}
//         <div className="absolute top-3 right-3">
//           <span className="badge badge-secondary">
//             {category}
//           </span>
//         </div>

//         {/* Action Buttons */}
//         <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//           <button
//             onClick={handleQuickView}
//             className="btn btn-sm bg-white text-secondary-900 hover:bg-secondary-100 transition-all duration-200 transform scale-90 group-hover:scale-100"
//             title="Quick View"
//           >
//             <EyeIcon className="h-4 w-4" />
//           </button>
//           <button
//             onClick={handleAddToCart}
//             className="btn btn-sm bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 transform scale-90 group-hover:scale-100"
//             title="Add to Cart"
//           >
//             <ShoppingCartIcon className="h-4 w-4" />
//           </button>
//           <button
//             onClick={handleWishlistToggle}
//             className={`btn btn-sm transition-all duration-200 transform scale-90 group-hover:scale-100 ${
//               isWishlisted 
//                 ? 'bg-danger-600 text-white hover:bg-danger-700' 
//                 : 'bg-white text-secondary-900 hover:bg-secondary-100'
//             }`}
//             title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
//           >
//             {isWishlisted ? (
//               <HeartSolidIcon className="h-4 w-4" />
//             ) : (
//               <HeartIcon className="h-4 w-4" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="product-info">
//         {/* Category */}
//         <div className="flex items-center gap-2 mb-2">
//           <TagIcon className="h-3 w-3 text-secondary-400" />
//           <span className="text-xs text-secondary-500 uppercase tracking-wide">
//             {category}
//           </span>
//         </div>

//         {/* Product Title */}
//         <Link to={`/user/${userId}/products/${productId}`} className="block">
//           <h3 className="product-title group-hover:text-primary-600 transition-colors duration-200">
//             {name || 'Unknown Product'}
//           </h3>
//         </Link>

//         {/* Rating */}
//         <div className="product-rating mb-3">
//           <div className="flex items-center gap-1">
//             {[...Array(5)].map((_, index) => (
//               <StarIcon
//                 key={index}
//                 className={`h-4 w-4 ${
//                   index < Math.floor(rating || 0)
//                     ? 'text-yellow-400 fill-current'
//                     : 'text-secondary-300'
//                 }`}
//               />
//             ))}
//             <span className="text-sm text-secondary-600 ml-1">
//               ({reviewCount || 0})
//             </span>
//           </div>
//         </div>

//         {/* Price */}
//         <div className="product-price-container">
//           <div className="flex items-center gap-2">
//             <span className="product-price">
//               ${(price || 0).toFixed(2)}
//             </span>
//             {originalPrice && originalPrice > price && (
//               <span className="product-old-price">
//                 ${originalPrice.toFixed(2)}
//               </span>
//             )}
//           </div>
          
//           {/* Commission Info */}
//           {commission > 0 && (
//             <div className="text-sm text-success-600 font-medium">
//               Earn ${commission}
//             </div>
//           )}
          
//           {/* MLM Points Info */}
//           {mlmPoints > 0 && (
//             <div className="text-sm text-blue-600 font-medium">
//               {mlmPoints} MLM Points
//             </div>
//           )}
//         </div>

//         {/* Add to Cart Button */}
//         <button
//           onClick={handleAddToCart}
//           className={`btn btn-primary w-full mt-3 group-hover:bg-primary-700 transition-colors duration-200 ${
//             added ? 'bg-green-600 hover:bg-green-700' : ''
//           }`}
//           disabled={added}
//         >
//           <ShoppingCartIcon className="h-4 w-4 mr-2" />
//           {added ? 'Added to Cart!' : 'Add to Cart'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  StarIcon,
  EyeIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from './CartContext';

// ✅ Define fallback image
const FALLBACK_IMAGE = "https://placehold.co/150x150?text=No+Image";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { userId } = useParams();
  const { addToCart } = useCart();

  // Handle both frontend and backend product structures
  const {
    id,
    _id, // MongoDB ID from backend
    name,
    price,
    originalPrice,
    image,
    photos, // Backend field name
    rating = 0,
    reviewCount = 0,
    category = 'General',
    isNew = false,
    isOnSale = false,
    discountPercentage = 0,
    commission = 0,
    mlmPoints = 0,
    about, // Backend description field
    description // Frontend description field
  } = product;

  // Use the correct ID (MongoDB _id or regular id)
  const productId = _id || id;
  
  // ✅ Use safe fallback image
  const productImage = (photos && photos.length > 0 ? photos[0] : image) || FALLBACK_IMAGE;
  
  // Use the correct description
  const productDescription = about || description || '';

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('ProductCard: Adding product to cart:', product); // Debug log
    
    const productToAdd = {
      id: productId,
      name: name || 'Unknown Product',
      price: Number(price) || 0,
      image: productImage,
      mlmPoints: mlmPoints || 0,
      category: category || 'General',
      commission: commission || 0,
      description: productDescription
    };
    
    console.log('ProductCard: Processed product for cart:', productToAdd); // Debug log
    
    addToCart(productToAdd, 1);
    setAdded(true);
    
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Quick view:', product);
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="product-image-container relative overflow-hidden">
        <img
          src={productImage}
          alt={name || 'Product'}
          className="product-image group-hover:scale-105"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="badge badge-primary">New</span>
          )}
          {isOnSale && (
            <span className="badge badge-danger">-{discountPercentage}%</span>
          )}
          {commission > 0 && (
            <span className="badge badge-gold">Earn ${commission}</span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="badge badge-secondary">{category}</span>
        </div>

        {/* Action Buttons */}
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleQuickView}
            className="btn btn-sm bg-white text-secondary-900 hover:bg-secondary-100 transition-all duration-200 transform scale-90 group-hover:scale-100"
            title="Quick View"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="btn btn-sm bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 transform scale-90 group-hover:scale-100"
            title="Add to Cart"
          >
            <ShoppingCartIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`btn btn-sm transition-all duration-200 transform scale-90 group-hover:scale-100 ${
              isWishlisted 
                ? 'bg-danger-600 text-white hover:bg-danger-700' 
                : 'bg-white text-secondary-900 hover:bg-secondary-100'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isWishlisted ? (
              <HeartSolidIcon className="h-4 w-4" />
            ) : (
              <HeartIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <TagIcon className="h-3 w-3 text-secondary-400" />
          <span className="text-xs text-secondary-500 uppercase tracking-wide">
            {category}
          </span>
        </div>

        {/* Product Title */}
        <Link to={`/user/${userId}/products/${productId}`} className="block">
          <h3 className="product-title group-hover:text-primary-600 transition-colors duration-200">
            {name || 'Unknown Product'}
          </h3>
        </Link>

        {/* Rating */}
        <div className="product-rating mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`h-4 w-4 ${
                  index < Math.floor(rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-secondary-300'
                }`}
              />
            ))}
            <span className="text-sm text-secondary-600 ml-1">
              ({reviewCount || 0})
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="product-price-container">
          <div className="flex items-center gap-2">
            <span className="product-price">
              ${(price || 0).toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="product-old-price">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {commission > 0 && (
            <div className="text-sm text-success-600 font-medium">
              Earn ${commission}
            </div>
          )}
          
          {mlmPoints > 0 && (
            <div className="text-sm text-blue-600 font-medium">
              {mlmPoints} MLM Points
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`btn btn-primary w-full mt-3 group-hover:bg-primary-700 transition-colors duration-200 ${
            added ? 'bg-green-600 hover:bg-green-700' : ''
          }`}
          disabled={added}
        >
          <ShoppingCartIcon className="h-4 w-4 mr-2" />
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
