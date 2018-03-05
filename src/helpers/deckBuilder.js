import { faces, suits } from './data';

export const buildDeck = () => {
    const deckArray = faces.map(
        val => suits.map(
            suit => ({ suit: suit, face: val })
        )
    );
    let deck = [];
    deckArray.map(values =>
        values.map(val =>
            deck.push(val)
        )
    );
    return deck;
};
