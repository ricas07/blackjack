import { values, suits } from './data';

export const buildDeck = () => {
    const deckArray = values.map(
        val => suits.map(
            suit => ({ suit: suit, value: val })
        )
    );
    let deck = [];
    deckArray.map(values => {
        values.map(val => {
            deck.push(val);
        })
    });
    return deck;
};
