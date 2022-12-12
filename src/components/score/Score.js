import React from 'react';

function Score({ won, lost, tie }) {
  return (<div>
    Score:
    <ul>
      <li>{`Won: ${won}`}</li>
      <li>{`Lost: ${lost}`}</li>
      <li>{`Tie: ${tie}`}</li>
    </ul>
  </div>);
}

export default Score;
