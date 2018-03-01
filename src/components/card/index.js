import React from 'react';

const Card = ({ suit, value }) => {
    return (
        <div>
            <h3>Card</h3>
            <p>Suit: {suit}</p>
            <p>Value: {value}</p>
        </div>
    );

};

export default Card;