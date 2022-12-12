import React, { useState, useEffect } from 'react';
import Card from '../card';
import Score from '../score';
import { buildDeck, shuffleDeck, cardValue } from '../../helpers/deck';

function Table() {
  const [state, setState] = useState({
    cardIndex: 0,
    deck: shuffleDeck(buildDeck()),
    won: 0,
    lost: 0,
    tie: 0,
    currentResult: '',
    handActive: false,
  });

  const newDeal = () => {
    const { cardIndex, deck } = state;
    const playerHand = [deck[cardIndex + 1], deck[cardIndex + 3]];
    const dealerHand = [deck[cardIndex + 2], deck[cardIndex + 4]];
    setState({
      ...state,
      playerHand,
      dealerHand,
      cardIndex: cardIndex + 4,
      playerDone: false,
      dealerDone: false,
      handActive: true,
      currentResult: '',
    });
  };

  const handValue = (who) => {
    const { playerHand } = state;
    if (playerHand) {
      return state[`${who}Hand`].reduce((a, b) => a + cardValue(b), 0);
    }
    return 0;
  };

  const calculateResult = () => {
    const playerHandValue = handValue('player');
    const dealerHandValue = handValue('dealer');

    if (dealerHandValue >= 17) {
      let result = {};
      if (playerHandValue > 21) {
        result = { lost: state.lost + 1, currentResult: 'You busted, loser!' };
      } else if (playerHandValue < dealerHandValue && dealerHandValue < 22) {
        result = { lost: state.lost + 1, currentResult: 'You lost, loser!' };
      } else if (dealerHandValue > 21) {
        result = { won: state.won + 1, currentResult: 'Dealer busted, you won!' };
      } else if (playerHandValue > dealerHandValue) {
        result = { won: state.won + 1, currentResult: 'You won! Well played.' };
      } else if (playerHandValue === dealerHandValue) {
        result = { tie: state.tie + 1, currentResult: 'You pushed!' };
      }

      setState({ ...state, playerDone: true, dealerDone: true, ...result });
    }
  };

  const stand = (who) => {
    setState({ ...state, [`${who}Done`]: true });
    calculateResult();
  };

  const deal = (who) => {
    const { cardIndex, deck } = state;
    const nextIndex = cardIndex + 1;
    const currentPlayer = `${who}Hand`;
    const currentHand = state[currentPlayer];
    currentHand.push(deck[nextIndex]);
    const currentHandValue = handValue(who);
    const whoDone = (who === 'dealer' && currentHandValue >=17 || currentHandValue > 21);

    setState({
      ...state,
      [currentPlayer]: currentHand,
      [`${who}Done`]: whoDone,
      cardIndex: nextIndex,
    });

    calculateResult();
  };

  const dealerFirstCard = () => {
    if (state.dealerHand) {
      const card = state.dealerHand[0];
      const { face, suit } = card;
      const value = cardValue(card);
      return <div className="cards_container"><Card face={face} suit={suit} value={value} /></div>;
    }
    return null;
  };

  const returnHand = (who) => {
    const currPlayer = state[`${who}Hand`];
    if (currPlayer) {
      return (
        <div className="cards_container">
          {currPlayer.map((card) => {
            const { face, suit } = card;
            const value = cardValue(card);
            return (
              <Card key={`${face}-${suit}`} face={face} suit={suit} value={value} />
            );
          })}
        </div>
      );
    }
    return null;
  };

  console.log(state);
  if (!state.deck) return null;

  const playerHandValue = handValue('player');
  const { playerDone, dealerDone, handActive } = state;
  return (
    <>
      <Score won={state.won} lost={state.lost} tie={state.tie} />
      {state.currentResult}
      <section className="table">
        <div className="hand dealer">
          {!playerDone && state.dealerHand ? (
            <>
              <h3>
                Dealer Shows:
                {cardValue(state.dealerHand[0])}
              </h3>
              {dealerFirstCard()}
            </>
          ) : (
            <>
              <h3>
                Dealer has:
                {handValue('dealer')}
              </h3>
              {returnHand('dealer')}
              <button
                onClick={() => deal('dealer')}
                disabled={!handActive || dealerDone}
                type="button"
              >
                Hit
              </button>
              <button
                onClick={() => stand('dealer')}
                disabled={!handActive || dealerDone}
                type="button"
              >
                Stand
              </button>
            </>
          )}
        </div>
        <div className="hand player">
          <h3>
            You have:
            {playerHandValue}
          </h3>
          {returnHand('player')}
          <button
            onClick={() => deal('player')}
            disabled={!handActive || playerDone}
            type="button"
          >
            Hit
          </button>
          <button
            onClick={() => stand('player')}
            disabled={!handActive || playerDone}
            type="button"
          >
            Stand
          </button>
        </div>
      </section>
      <button
        onClick={newDeal}
        disabled={state.cardIndex > state.deck.length * 0.75}
        type="button"
      >
        New Deal
      </button>
    </>
  );
}

export default Table;
