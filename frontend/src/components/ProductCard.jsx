import React from 'react';

function ProductCard({ name, price }) {
    return (
        <div>
            <h3>{name}</h3>
            <p>Precio: ${price}</p>
        </div>
    );
}

export default ProductCard;
