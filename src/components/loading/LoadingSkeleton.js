import React from 'react';

const LoadingSkeleton = ({width, height, className}) => {
    return (
        <div className={`loading-skeleton ${className}`} style={{
            width: width,
            height: height,
        }}>
        </div>
    );
};

export default LoadingSkeleton;