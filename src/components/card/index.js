import React from 'react';

const Card = ({ suit, face }) => {
    const calVal = () => {
        let value;
        switch(face) {
            case 'J':
            case 'Q':
            case 'K':
                value = 10;
                break;
            case 'A':
                value = 11;
                break;
            default:
                value = face;
        }
        return value;
    };

    return (
        <div>
            <h3>Card</h3>
            <p>Suit: {suit}</p>
            <p>Face: {face}</p>
            <p>Value: {calVal()}</p>
        </div>
    );

};

export default Card;