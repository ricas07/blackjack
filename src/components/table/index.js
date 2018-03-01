import React from 'react';
import Card from '../card';
import { buildDeck } from '../../helpers/deckBuilder';

const Table = () => {
    console.log(buildDeck());
    return (
        <section>
            <h2>Table</h2>
            <Card
                suit="A"
                value="spade"

            />
        </section>
    );
};

export default Table;