import React, { useState, useEffect } from 'react';
import Card from '../card';
import { buildDeck, shuffleDeck, cardValue } from '../../helpers/deck';

function Table() {
  const [state, setState] = useState({
    cardIndex: 0,
    deck: shuffleDeck(buildDeck()),
    won: 0,
    lost: 0,
    tie: 0,
    currentResult: '',
  });

  const newDeal = () => {
    const { cardIndex, deck } = state;
    const playerHand = [deck[cardIndex + 1], deck[cardIndex + 3]];
    const dealerHand = [deck[cardIndex + 2], deck[cardIndex + 4]];
    setState({
      ...state,
      deck,
      playerHand,
      dealerHand,
      cardIndex: cardIndex + 4,
      playerDone: false,
      dealerDone: false,
      currentResult: '',
    });
  };

  useEffect(() => {
    newDeal();
  }, []);

  const handValue = (who) => {
    if (state.playerHand) {
      return state[`${who}Hand`].reduce((a, b) => a + cardValue(b), 0);
    }
    return 0;
  };

  const stand = (who) => {
    const playerHandValue = handValue('player');
    const dealerHandValue = handValue('dealer');
    if (who === 'dealer') {
      let result;
      if (playerHandValue > 21) {
        result = { lost: state.lost + 1, currentResult: 'You busted, loser!' };
      } else if (playerHandValue < dealerHandValue && dealerHandValue < 22) {
        result = { lost: state.lost + 1, currentResult: 'You lost, loser!' };
      } else if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
        result = { won: state.won + 1, currentResult: 'You won!' };
      } else if (playerHandValue === dealerHandValue) {
        result = { tie: state.tie + 1, currentResult: 'You pushed!' };
      }

      return setState({ ...state, ...result, [`${who}Done`]: true });
    }
    return setState({ ...state, [`${who}Done`]: true });
  };

  const deal = (who) => {
    const { cardIndex, deck } = state;
    const nextIndex = cardIndex + 1;
    const currentPlayer = `${who}Hand`;
    const currentHand = state[currentPlayer];
    currentHand.push(deck[nextIndex]);
    const bust = handValue(who) > 21;
    if (bust) {
      return stand(who);
    }

    return setState({
      ...state,
      [currentPlayer]: currentHand,
      [`${who}Done`]: bust,
      cardIndex: nextIndex,
    });
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
  if (!state.deck || !state.playerHand) return null;

  const playerHandValue = handValue('player');
  const { playerDone, dealerDone } = state;
  if (state.deck && state.playerHand) {
    return (
      <>
        {state.currentResult}
        <section className="table">

          <div className="hand dealer">
            {!playerDone && (
              <>
                <h3>
                  Dealer Shows:
                  {cardValue(state.dealerHand[0])}
                </h3>
                {dealerFirstCard()}
              </>
            )}
            {playerDone && (
              <>
                <h3>
                  Dealer has:
                  {handValue('dealer')}
                </h3>
                {returnHand('dealer')}
                <button
                  onClick={() => deal('dealer')}
                  disabled={dealerDone}
                  type="button"
                >
                  Hit
                </button>
                <button
                  onClick={() => stand('dealer')}
                  disabled={dealerDone}
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
              disabled={playerDone}
              type="button"
            >
              Hit
            </button>
            <button
              onClick={() => stand('player')}
              disabled={playerDone}
              type="button"
            >
              Stand
            </button>
          </div>
          <div>
            <button
              onClick={newDeal}
              disabled={state.cardIndex > state.deck.length * 0.75}
              type="button"
            >
              New Deal
            </button>
            <div>
              Score:
              <ul>
                <li>{`Won: ${state.won}`}</li>
                <li>{`Lost: ${state.lost}`}</li>
                <li>{`Tie: ${state.tie}`}</li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Table;
