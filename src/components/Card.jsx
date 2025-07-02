import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Optional card title
 * @param {React.ReactNode} props.footer - Optional card footer
 * @param {boolean} props.hover - Whether to show hover effects
 * @param {function} props.onClick - Click handler for the card
 * @returns {JSX.Element} - Card component
 */
const Card = ({ 
  children, 
  className = '', 
  title, 
  footer, 
  hover = false,
  onClick,
  ...rest 
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer transform hover:scale-105' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const cardClasses = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`;
  
  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      {...rest}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  footer: PropTypes.node,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
