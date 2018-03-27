import React from 'react';

const Card = ({ suit, face, value }) => {
    return (
        <div>
            <p>Suit: {suit}</p>
            <p>Face: {face}</p>
            <p>Value: {value}</p>
        </div>
    );
};

export default Card;
