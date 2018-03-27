import React, { Component } from 'react';
import Card from '../card';
import buildDeck from '../../helpers/deckBuilder';

class Table extends Component {
    state = {
        cardIndex: 4,
    };

    componentWillMount() {
        const unShuffledDeck = buildDeck();
        const deck = this.shuffle(unShuffledDeck);
        this.setState({ deck });
    }

    componentDidMount() {
        this.initialDeal();
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

    stand = who => {
        this.setState({ [`${who}Done`]: true });
    }

    deal = who => {
        const currentPlayer = `${who}Hand`;
        const currentHand = this.state[currentPlayer];
        currentHand.push(this.dealCard());
        const bust = this.handValue(who) > 21;
        this.setState({ [currentPlayer]: currentHand, [`${who}Done`]: bust });
    }

    initialDeal = () => {
        const { deck } = this.state;
        const playerHand = [deck[0], deck[2]];
        const dealerHand = [deck[1], deck[3]];
        this.setState({ playerHand, dealerHand });
    }

    calVal = card => {
        const { face } = card;
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
                value = parseInt(face, 10);
        }
        return value;
    }

    dealerFirstCard = () => {
        if (this.state.dealerHand) {
            const card = this.state.dealerHand[0];
            const { face, suit } = card;
            const value = this.calVal(card);
            return <Card face={face} suit={suit} value={value} />;
        }
        return null;
    }

    returnHand = who => {
        const currPlayer = this.state[`${who}Hand`];
        if (currPlayer) {
            return currPlayer.map((card) => {
                const { face, suit } = card;
                const value = this.calVal(card);
                return <Card key={`${face}-${suit}`} face={face} suit={suit} value={value} />
            });
        }
        return null;
    }

    handValue = who => {
        if (this.state.playerHand) {
            return this.state[`${who}Hand`].reduce((a, b) => a + this.calVal(b), 0);
        }
        return 0;
    }

    handResult = () => {
        const playerHandValue = this.handValue('player');
        const dealerHandValue = this.handValue('dealer');
        if (playerHandValue > dealerHandValue || dealerHandValue > 21) {
            return 'Winner';
        } else if (playerHandValue < dealerHandValue) {
            return 'Loser!';
        } else if (playerHandValue === dealerHandValue) {
            return 'Tie';
        }
        return null;
    }

    render() {
        console.log(this.state);
        const playerHandValue = this.handValue('player');
        const dealerHandValue = this.handValue('dealer');
        const { playerDone, dealerDone } = this.state;
        const buster = (playerHandValue > 21) ?
            <p>You BUSTED!</p> : null;
        if (this.state.deck && this.state.playerHand) {
            return (
                <section>
                    <h2>Table</h2>
                    {buster}
                    {dealerDone && this.handResult()}
                    {!playerDone && <div>
                        <h3>Dealer Shows: {this.calVal(this.state.dealerHand[0])} </h3>
                        {this.dealerFirstCard()}
                    </div>}
                    {playerDone && <div>
                        <h3>Dealer has: {this.handValue('dealer')}</h3>
                        <button
                            onClick={() => this.deal('dealer')}
                            disabled={dealerDone}
                        >
                            Deal
                        </button>
                        <button
                            onClick={() => this.stand('dealer')}
                            disabled={dealerDone}
                        >
                        Stand
                        </button>
                        {this.returnHand('dealer')}
                    </div>}
                    <h3>You have: {playerHandValue}</h3>
                    <button
                        onClick={() => this.deal('player')}
                        disabled={playerDone}
                    >
                        Deal
                    </button>
                    <button
                        onClick={() => this.stand('player')}
                        disabled={playerDone}
                    >
                        Stand
                    </button>
                    {this.returnHand('player')}
                </section>
            );
        }
        return null;
    }
};

export default Table;