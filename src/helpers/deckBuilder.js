import { faces, suits } from './data';

const buildDeck = () => {
    const deckArray = faces.map(val => suits.map(suit => ({ suit, face: val })));
    const deck = [];
    deckArray.map(values => values.map(val => deck.push(val)));
    return deck;
};

export default buildDeck;
