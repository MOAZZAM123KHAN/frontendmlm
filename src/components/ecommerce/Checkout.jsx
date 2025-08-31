// import { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import {
//   QrCodeIcon,
//   ArrowLeftIcon,
//   CheckCircleIcon,
//   DevicePhoneMobileIcon,
//   ShieldCheckIcon
// } from '@heroicons/react/24/outline';
// import { useCart } from './CartContext';
// import { orderAPI } from '../../services/api';

// const Checkout = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const { cart, clearCart } = useCart();
//   const [paymentMethod, setPaymentMethod] = useState('qr');
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [upiId, setUpiId] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderId, setOrderId] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState('Pending');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     phone: ''
//   });

//   // Calculate totals from cart
//   const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const shipping = 9.99;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;
//   const totalMlmPoints = cart.reduce((sum, item) => sum + (item.mlmPoints || 0), 0);
  
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   // Simulate payment verification after order is placed
//   useEffect(() => {
//     if (orderId && paymentStatus === 'Pending') {
//       const timer = setTimeout(() => {
//         setPaymentStatus('Done');
//         // Update payment status on the server
//         orderAPI.updateOrderStatus(orderId, { paymentStatus: 'Done' })
//           .catch(err => console.error('Error updating payment status:', err));
//       }, 5000); // Simulate payment processing after 5 seconds
      
//       return () => clearTimeout(timer);
//     }
//   }, [orderId, paymentStatus]);

//   const handlePlaceOrder = async () => {
//     try {
//       setIsSubmitting(true);
      
//       // Validate shipping address
//       if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || 
//           !formData.zipCode || !formData.phone) {
//         alert('Please fill in all shipping address fields');
//         setIsSubmitting(false);
//         return;
//       }
      
//       // Validate payment method
//       if (paymentMethod === 'upi' && !upiId) {
//         alert('Please enter your UPI ID');
//         setIsSubmitting(false);
//         return;
//       }
      
//       // Create order object
//       const orderData = {
//         userId,
//         items: cart.map(item => ({
//           productId: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image,
//           mlmPoints: item.mlmPoints || 0
//         })),
//         shipping: formData,
//         payment: {
//           method: paymentMethod,
//           ...(paymentMethod === 'upi' && { upiId })
//         },
//         paymentStatus: 'Pending',
//         shippingStatus: 'Processing',
//         total,
//         subtotal,
//         tax,
//         shipping,
//         mlmPointsEarned: totalMlmPoints
//       };
      
//       // Send order to backend
//       const response = await orderAPI.createOrder(orderData);
//       setOrderId(response.id || response._id);
      
//       // Clear cart and show success
//       clearCart();
//       setOrderPlaced(true);
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('There was an error placing your order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (orderPlaced) {
//     return (
//       <div className="max-w-2xl mx-auto px-4 py-12 text-center">
//         <div className="bg-white rounded-lg shadow-md p-8">
//           <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
//           <p className="text-gray-600 mb-6">
//             Your order has been placed and is being processed. You'll receive a confirmation email shortly.
//           </p>
          
//           {/* Payment Status */}
//           <div className={`mb-6 p-4 rounded-lg ${paymentStatus === 'Done' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
//             <div className="flex items-center justify-center mb-2">
//               {paymentStatus === 'Done' ? (
//                 <ShieldCheckIcon className="h-8 w-8 text-green-500 mr-2" />
//               ) : (
//                 <div className="animate-pulse flex items-center">
//                   <div className="h-8 w-8 bg-yellow-200 rounded-full mr-2"></div>
//                   <div className="h-2 w-24 bg-yellow-200 rounded"></div>
//                 </div>
//               )}
//             </div>
//             <h3 className={`font-medium ${paymentStatus === 'Done' ? 'text-green-800' : 'text-yellow-800'} mb-1`}>
//               Payment Status: {paymentStatus}
//             </h3>
//             <p className={`text-sm ${paymentStatus === 'Done' ? 'text-green-700' : 'text-yellow-700'}`}>
//               {paymentStatus === 'Done' 
//                 ? 'Your payment has been successfully processed.'
//                 : 'Your payment is being processed. Please wait...'}
//             </p>
//           </div>
          
//           {totalMlmPoints > 0 && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//               <h3 className="font-medium text-blue-800 mb-1">MLM Points Earned</h3>
//               <p className="text-2xl font-bold text-blue-600">{totalMlmPoints} Points</p>
//               <p className="text-sm text-blue-700 mt-1">
//                 These points have been added to your account and will be reflected in your wallet shortly.
//               </p>
//             </div>
//           )}
//           <div className="flex justify-center gap-4">
//             <Link
//               to={`/user/${userId}/orders`}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//             >
//               View My Orders
//             </Link>
//             <Link
//               to={`/user/${userId}/shop`}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex items-center mb-6">
//         <Link to={`/user/${userId}/cart`} className="flex items-center text-blue-600">
//           <ArrowLeftIcon className="h-5 w-5 mr-1" />
//           Back to Cart
//         </Link>
//       </div>

//       <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

//       <div className="lg:grid lg:grid-cols-2 lg:gap-12">
//         {/* Left Column - Shipping and Payment */}
//         <div>
//           {/* Shipping Address */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                     First name
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                     Last name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     id="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     id="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
//                     ZIP / Postal code
//                   </label>
//                   <input
//                     type="text"
//                     id="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <input
//                   id="qr-code"
//                   name="payment-method"
//                   type="radio"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   checked={paymentMethod === 'qr'}
//                   onChange={() => setPaymentMethod('qr')}
//                 />
//                 <label htmlFor="qr-code" className="ml-3 flex items-center">
//                   <QrCodeIcon className="h-5 w-5 text-gray-400 mr-2" />
//                   <span className="block text-sm font-medium text-gray-700">QR Code Payment</span>
//                 </label>
//               </div>

//               {paymentMethod === 'qr' && (
//                 <div className="ml-7 space-y-4">
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <p className="text-sm text-blue-700 mb-2">
//                       Scan the QR code below to make your payment of ${total.toFixed(2)}
//                     </p>
//                     <div className="bg-white p-4 rounded-lg flex justify-center">
//                       <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
//                         <QrCodeIcon className="h-24 w-24 text-gray-400" />
//                         <span className="sr-only">QR Code for payment</span>
//                       </div>
//                     </div>
//                     <p className="text-xs text-blue-700 mt-2 text-center">
//                       After scanning, please enter the transaction reference in the order notes
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-center">
//                 <input
//                   id="upi"
//                   name="payment-method"
//                   type="radio"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   checked={paymentMethod === 'upi'}
//                   onChange={() => setPaymentMethod('upi')}
//                 />
//                 <label htmlFor="upi" className="ml-3 flex items-center">
//                   <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-2" />
//                   <span className="block text-sm font-medium text-gray-700">UPI Payment</span>
//                 </label>
//               </div>

//               {paymentMethod === 'upi' && (
//                 <div className="ml-7 space-y-4">
//                   <div>
//                     <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700">
//                       UPI ID
//                     </label>
//                     <input
//                       type="text"
//                       id="upi-id"
//                       placeholder="yourname@upi"
//                       value={upiId}
//                       onChange={(e) => setUpiId(e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <p className="text-sm text-blue-700">
//                       Please enter your UPI ID. You will receive payment instructions after placing the order.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Order Summary */}
//         <div className="mt-8 lg:mt-0">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

//             <div className="divide-y divide-gray-200">
//               {cart.map((item) => (
//                 <div key={item.id} className="py-4 flex">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 rounded-md object-cover"
//                     />
//                   </div>
//                   <div className="ml-4 flex-1 flex flex-col">
//                     <div>
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         <h3>{item.name}</h3>
//                         <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
//                       </div>
//                       {item.isPackage && (
//                         <p className="mt-1 text-sm text-blue-600">MLM Package - {item.mlmPoints} Points</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex items-end justify-between text-sm">
//                       <p className="text-gray-500">Qty {item.quantity}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-200 py-4 space-y-2">
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>Shipping</span>
//                 <span>${shipping.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>Tax</span>
//                 <span>${tax.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="border-t border-gray-200 py-4 flex justify-between">
//               <span className="text-base font-medium text-gray-900">Total</span>
//               <span className="text-base font-bold text-gray-900">${total.toFixed(2)}</span>
//             </div>

//             {totalMlmPoints > 0 && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
//                 <h3 className="font-medium text-blue-800 mb-1">MLM Points to Earn</h3>
//                 <p className="text-2xl font-bold text-blue-600">{totalMlmPoints} Points</p>
//                 <p className="text-sm text-blue-700 mt-1">
//                   You'll receive these points after your order is completed.
//                 </p>
//               </div>
//             )}

//             <button
//               onClick={handlePlaceOrder}
//               disabled={isSubmitting}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md shadow-sm text-sm font-medium mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Processing...' : 'Place Order'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  QrCodeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { useCart } from './CartContext';
import { orderAPI } from '../../services/api';

const Checkout = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  
  // State management
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [error, setError] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: ''
  });

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const totalMlmPoints = cart.reduce((sum, item) => sum + (item.mlmPoints || 0), 0);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Simulate payment processing
  useEffect(() => {
    if (orderId && paymentStatus === 'Pending') {
      const timer = setTimeout(() => {
        setPaymentStatus('Done');
        orderAPI.updateOrderStatus(orderId, { paymentStatus: 'Done' })
          .catch(err => console.error('Error updating payment status:', err));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [orderId, paymentStatus]);

  // Handle order placement
  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.address || 
          !formData.city || !formData.zipCode || !formData.phone || !formData.email) {
        throw new Error('Please fill in all required fields');
      }
      
      if (paymentMethod === 'upi' && !upiId) {
        throw new Error('Please enter your UPI ID');
      }
      
      // Create order object
      const orderData = {
        userId,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          mlmPoints: item.mlmPoints || 0
        })),
        shipping: formData,
        payment: {
          method: paymentMethod,
          ...(paymentMethod === 'upi' && { upiId })
        },
        totals: {
          subtotal,
          shipping,
          tax,
          total
        },
        paymentStatus: 'Pending',
        shippingStatus: 'Processing',
        mlmPointsEarned: totalMlmPoints,
        createdAt: new Date().toISOString()
      };
      
      // Submit order
      const response = await orderAPI.createOrder(orderData);
      setOrderId(response.id || response._id);
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.message || 'There was an error placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order confirmation view
  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-3 text-lg font-medium text-gray-900">Order Placed Successfully!</h2>
            <p className="mt-2 text-sm text-gray-500">
              Your order #{orderId} has been confirmed. We've sent a confirmation email to {formData.email}.
            </p>
            
            {/* Payment Status */}
            <div className={`mt-6 p-4 rounded-md ${paymentStatus === 'Done' ? 'bg-green-50' : 'bg-yellow-50'}`}>
              <div className="flex items-center justify-center">
                {paymentStatus === 'Done' ? (
                  <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <div className="animate-pulse flex items-center">
                    <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                  </div>
                )}
                <span className={`text-sm font-medium ${paymentStatus === 'Done' ? 'text-green-800' : 'text-yellow-800'}`}>
                  Payment Status: {paymentStatus}
                </span>
              </div>
            </div>
            
            {/* MLM Points */}
            {totalMlmPoints > 0 && (
              <div className="mt-4 bg-blue-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-blue-800">MLM Points Earned</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">{totalMlmPoints} Points</p>
                <p className="text-xs text-blue-700 mt-1">
                  These points will be available in your account within 24 hours.
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                to={`/user/${userId}/orders`}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                View Order Details
              </Link>
              <Link
                to={`/user/${userId}/shop`}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart handling
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <XCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-3 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            There are no items in your cart to checkout.
          </p>
          <div className="mt-6">
            <Link
              to={`/user/${userId}/shop`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main checkout form
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center mb-6">
        <Link 
          to={`/user/${userId}/cart`} 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Left Column - Shipping and Payment */}
        <div>
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Street address *
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-4">
              {/* QR Code Payment */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="qr-code"
                    name="payment-method"
                    type="radio"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="qr-code" className="flex items-center font-medium text-gray-700">
                    <QrCodeIcon className="h-5 w-5 text-gray-400 mr-2" />
                    QR Code Payment
                  </label>
                  {paymentMethod === 'qr' && (
                    <div className="mt-2">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-600 mb-3">
                          Scan the QR code below to complete your payment of <span className="font-bold">${total.toFixed(2)}</span>
                        </p>
                        <div className="bg-white p-4 rounded-md border border-gray-200 flex justify-center">
                          <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
                            <QrCodeIcon className="h-24 w-24 text-gray-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          Payment processing may take a few moments after scanning
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* UPI Payment */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="upi"
                    name="payment-method"
                    type="radio"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="upi" className="flex items-center font-medium text-gray-700">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-2" />
                    UPI Payment
                  </label>
                  {paymentMethod === 'upi' && (
                    <div className="mt-2">
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700">
                            UPI ID *
                          </label>
                          <input
                            type="text"
                            id="upi-id"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-xs text-blue-700">
                            After placing your order, you'll receive payment instructions on your registered mobile number.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="py-4 flex">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      {item.mlmPoints > 0 && (
                        <p className="mt-1 text-xs text-blue-600">
                          Earns {item.mlmPoints} MLM points
                        </p>
                      )}
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between">
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-base font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>

            {totalMlmPoints > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h3 className="text-sm font-medium text-blue-800">MLM Points to Earn</h3>
                <p className="text-xl font-bold text-blue-600 mt-1">{totalMlmPoints} Points</p>
                <p className="text-xs text-blue-700 mt-1">
                  These points will be credited to your account after order completion.
                </p>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md shadow-sm text-sm font-medium mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;