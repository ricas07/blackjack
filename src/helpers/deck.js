import { suits, faces } from './data';

export const buildDeck = () => suits.map((suit) => faces.map((face) => ({ suit, face }))).flat();

export const shuffleDeck = (deck) => {
  const newDeck = deck;
  let j;
  let x;
  for (let i = deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = deck[i];
    newDeck[i] = newDeck[j];
    newDeck[j] = x;
  }
  return newDeck;
};

export const cardValue = (card) => {
  const { face } = card;
  let value;
  switch (face) {
    case 'J':
    case 'Q':
    case 'K':
      value = 10;
      break;
    case 'A':
      value = 11;
      break;
    default:
      value = parseInt(face, 10);
  }
  return value;
};
