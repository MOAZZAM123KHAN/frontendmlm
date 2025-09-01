import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  QrCodeIcon,
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { orderAPI } from '../../services/api';

const Orders = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // Mock data for testing when API fails
  const mockOrders = [
    {
      id: 'ORD001',
      userId: userId,
      status: 'processing',
      paymentStatus: 'Pending',
      date: new Date().toISOString(),
      total: 299.99,
      items: [
        {
          name: 'Premium MLM Package',
          price: 299.99,
          quantity: 1,
          mlmPoints: 100
        }
      ],
      payment: {
        method: 'qr'
      },
      mlmPointsEarned: 100,
      shipping: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    {
      id: 'ORD002',
      userId: userId,
      status: 'delivered',
      paymentStatus: 'Done',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      total: 149.99,
      items: [
        {
          name: 'Basic Product',
          price: 149.99,
          quantity: 1,
          mlmPoints: 50
        }
      ],
      payment: {
        method: 'upi',
        upiId: 'john@upi'
      },
      mlmPointsEarned: 50,
      shipping: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    }
  ];


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching orders for userId:', userId);
        const response = await orderAPI.getOrders(userId);
        
        console.log('Orders API response:', response);
        
        // Check if response has data
        if (response && response.success && Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response && Array.isArray(response)) {
          setOrders(response);
        } else {
          console.log('Using mock orders due to invalid API response');
          setOrders(mockOrders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        console.log('Using mock orders due to API error');
        setOrders(mockOrders);
        setError('Using demo data - API connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Filter orders based on active tab
  const filteredOrders = activeTab === 'all' 
    ? orders
    : orders.filter(order => order?.status === activeTab);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getPaymentStatusIcon = (status) => {
    if (!status) return <ClockIcon className="h-5 w-5 text-gray-500" />;
    
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Done':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Processing':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'Failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Refunded':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    if (!status) return 'Processing';
    
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'Delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'Shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'Processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return 'Processing';
    }
  };
  
  const getPaymentStatusText = (status) => {
    if (!status) return 'Payment Pending';
    
    switch (status) {
      case 'Completed':
        return 'Payment Successful';
      case 'Done':
        return 'Payment Successful';
      case 'Pending':
        return 'Payment Pending';
      case 'Processing':
        return 'Payment Processing';
      case 'Failed':
        return 'Payment Failed';
      case 'Refunded':
        return 'Payment Refunded';
      default:
        return 'Payment Pending';
    }
  };

  const formatDate = (dateString) => {
    try {
      return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    } catch {
      return 'N/A';
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status) {
      case 'delivered':
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status) {
      case 'Completed':
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {/* Demo Data Notice */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {error} - Showing demo order data for testing purposes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Order Status Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('processing')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'processing' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Processing ({orders.filter(o => o.status === 'processing').length})
          </button>
          <button
            onClick={() => setActiveTab('shipped')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'shipped' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Shipped ({orders.filter(o => o.status === 'shipped').length})
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'delivered' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Delivered ({orders.filter(o => o.status === 'delivered').length})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'cancelled' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Cancelled ({orders.filter(o => o.status === 'cancelled').length})
          </button>
        </nav>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order?.id || Math.random()} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(order?.status)}
                    <div className="ml-3">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order #{order?.id || 'N/A'}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Placed on {formatDate(order?.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order?.status)}`}>
                        {getStatusText(order?.status)}
                      </span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(order?.paymentStatus)}`}>
                        {getPaymentStatusText(order?.paymentStatus)}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      ${order?.total?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                {/* Order Items */}
                {order?.items && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-xs text-gray-500">IMG</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item?.name || 'Unknown Item'}</p>
                              {item?.mlmPoints > 0 && (
                                <p className="text-xs text-blue-600">Earns {item.mlmPoints} MLM points</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">
                              ${item?.price?.toFixed(2) || '0.00'} x {item?.quantity || 1}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              ${((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Shipping Information */}
                {order?.shipping && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Shipping Address</h4>
                    <div className="text-sm text-gray-600">
                      <p>{order.shipping.firstName} {order.shipping.lastName}</p>
                      <p>{order.shipping.address}</p>
                      <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                    </div>
                  </div>
                )}
                
                {/* Payment Information */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Payment Information</h4>
                  <div className="flex items-center space-x-2">
                    {order?.payment?.method === 'qr' ? (
                      <>
                        <QrCodeIcon className="h-5 w-5 text-gray-500" />
                        <p className="text-sm text-gray-700">Paid via QR Code</p>
                      </>
                    ) : order?.payment?.method === 'upi' ? (
                      <>
                        <DevicePhoneMobileIcon className="h-5 w-5 text-gray-500" />
                        <p className="text-sm text-gray-700">
                          Paid via UPI {order?.payment?.upiId && `(${order.payment.upiId})`}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-700">
                        Payment Method: {order?.payment?.method || 'Not specified'}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    {getPaymentStatusIcon(order?.paymentStatus)}
                    <span className={`ml-2 text-sm font-medium ${order?.paymentStatus === 'Done' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order?.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>
                
                {/* MLM Points Earned */}
                {order?.mlmPointsEarned > 0 && order?.status !== 'cancelled' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <ArrowPathIcon className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">MLM Points Earned</h4>
                        <p className="text-sm text-blue-700">{order.mlmPointsEarned} points added to your account</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Order Actions */}
                <div className="flex justify-end space-x-3">
                  {order?.id && (
                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </Link>
                  )}
                  {order?.status === 'delivered' && (
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Buy Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
            <ClockIcon className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'all' 
              ? "You haven't placed any orders yet."
              : `You don't have any ${activeTab} orders.`}
          </p>
          <div className="mt-6">
            <Link
              to={`/user/${userId}/shop`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;