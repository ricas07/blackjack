import React from 'react';

const suitIconMap = {
  hearts: '❤',
  clubs: '♣',
  diamonds: '◆',
  spades: '♠',
};

function Card({ suit, face, }) {
  return (
    <div className={`card ${suit}`}>
      <p>
        {face}
      </p>
      <p>
        {suitIconMap[suit]}
      </p>
    </div>
  );
}

export default Card;
