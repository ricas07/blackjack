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
      <span>
        {face}
      </span>
      <span>
        {suitIconMap[suit]}
      </span>
    </div>
  );
}

export default Card;
