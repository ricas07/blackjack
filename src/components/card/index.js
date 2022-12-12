import React from 'react';

const suitIconMap = {
  heart: '❤',
  club: '♣',
  diamond: '◆',
  spade: '♠',
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
