import React from 'react';

const OneTransaction = props => {
  const { transaction } = props;
  return (
    <div className='transaction__row-container'>
      {/* {transaction.createdAt} |  */}
      {transaction.tickerSymbol} - {transaction.qty}{' '}
      Shares - $ {transaction.qty * transaction.price}
      <hr />
    </div>
  );
};

export default OneTransaction;
