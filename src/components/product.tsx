import React from 'react';

interface ProductProps {
    image: string;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductComponent: React.FC<ProductProps> = ({ image, title, price, description, category, rating }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>Price: ${price.toFixed(2)}</p>
            <p>Description: {description}</p>
            <p>Category: {category}</p>
            <p>Rating: {rating.rate} ({rating.count} reviews)</p>
        </div>
    );
};

export default ProductComponent;
