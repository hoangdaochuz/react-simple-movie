import React from 'react';

const Button = ({onClick, children,bgColor = "primary", full, className,...props}) => {
  let bgColorValue = "bg-primary"
  switch (bgColor) {
    case "primary":
      bgColorValue = "bg-primary"
      break;
    case "secondary":
      bgColorValue = "bg-secondary"
      break;
    default:
      break;
  }
  return (
    <button
        className={` px-4 py-2  rounded-lg mt-auto ${full?'w-full': ''} ${bgColorValue} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
  );
};

export default Button;