import { useState } from 'react';
import { StarIcon, ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: 1,
    name: 'Premium Organic Coffee Beans',
    price: 19.99,
    description: 'Sourced from the finest farms, our organic coffee beans offer a rich, aromatic experience. Perfect for brewing your favorite coffee at home.',
    rating: 4.5,
    features: [
      'Organic Certified',
      'Sustainably Sourced',
      'Rich Aroma',
      'Smooth Flavor'
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe1-H-lVjg_iEOO1Lsjya6L-g-iRc3HREWjB2cswGHk4kaArAhQdrgCSiBAuanFewrZ3RcY_V6N76Zy-0pcxkkAOvK97kzNpVAXJQ-FV949Ac_kxv9J4WS70anwQQIH6d0dxyBfMvPmh2CntI8h0ZPnBORcI2y40uZP3G2cnTAa5D4qtAYVW3RSyfvY16DY-txXIZgUN7N_Qsr-o0-YIKuUuzLBeEIIeZSGFmusKvgPpa0x5h0P3khGBObtAqk8nNm-PLV_aSshqoN'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/shop" className="flex items-center text-blue-600 mb-4">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Shop
      </Link>
      
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Product Image */}
        <div className="mb-8 lg:mb-0">
          <div 
            className="w-full h-96 bg-gray-100 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`h-5 w-5 ${rating < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">{product.rating} stars</span>
          </div>
          
          <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
            <div className="flex border border-gray-300 rounded-md">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center border-x border-gray-300"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
          
          <button className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700">
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            Add to Cart (${(product.price * quantity).toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;