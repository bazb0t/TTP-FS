import React from 'react';

const OneTransaction = props => {
  const { transaction } = props;
  let sharesTotal = transaction.qty * transaction.price
  let sharesTotalDisplay = '$';
  sharesTotalDisplay = sharesTotalDisplay.concat(sharesTotal);
  return (
    <div className='transaction__row-container'>
      {/* {transaction.createdAt} |  */}
      {transaction.tickerSymbol} - {transaction.qty} Shares - {sharesTotalDisplay}
      <hr />
    </div>
  );
};

export default OneTransaction;
