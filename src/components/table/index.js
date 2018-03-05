import React, { Component }from 'react';
import Card from '../card';
import { buildDeck } from '../../helpers/deckBuilder';

class Table extends Component {
    state = {
        cardIndex: -1,
    };

    componentDidMount() {
        const unShuffledDeck = buildDeck();
        const deck = this.shuffle(unShuffledDeck);
        this.setState({ deck });
    }

    shuffle = deck => {
        let j, x;
        for (var i = deck.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            x = deck[i];
            deck[i] = deck[j];
            deck[j] = x;
        }
        return deck;
    };

    dealCard = () => {
        const { deck, cardIndex } = this.state;
        const currIndex = cardIndex + 1;
        this.setState({ cardIndex: currIndex });
        return deck[currIndex];
    }

    dealPlayer = () => {
        const playerhand = this.state.playerhand || [];
        playerhand.push(this.dealCard());
        this.setState({ playerhand });
    }

    returnPlayerHand = () => {
        if (this.state.playerhand) {
            return this.state.playerhand.map((card) => {
                const { face, suit } = card;
                return <Card key={`${face}-${suit}`} face={face} suit={suit} />
            });
        }
        return null;
    }

    render() {
        if (this.state.deck) {
            return (
                <section>
                    <h2>Table</h2>
                    <button onClick={() => this.dealPlayer()}>
                        Deal
                    </button>
                    <h3>Dealer Cards</h3>
                    <h3>Your Cards</h3>
                    {this.returnPlayerHand()}
                </section>
            );
        }
        return null;
    }
};

export default Table;