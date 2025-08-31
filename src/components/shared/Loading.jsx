import React from 'react';

const Loading = ({ 
  type = 'spinner', 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (type === 'spinner') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`spinner ${sizeClasses[size]}`}></div>
        {text && (
          <span className={`ml-3 ${textSizes[size]} text-secondary-600`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        {text && (
          <span className={`ml-3 ${textSizes[size]} text-secondary-600`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-secondary-200 rounded-lg h-4 mb-2"></div>
        <div className="bg-secondary-200 rounded-lg h-4 mb-2 w-3/4"></div>
        <div className="bg-secondary-200 rounded-lg h-4 w-1/2"></div>
      </div>
    );
  }

  if (type === 'product-skeleton') {
    return (
      <div className="card animate-pulse">
        <div className="loading-image mb-4"></div>
        <div className="space-y-2">
          <div className="loading-text w-3/4"></div>
          <div className="loading-text w-1/2"></div>
          <div className="loading-text w-1/4"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default Loading; 