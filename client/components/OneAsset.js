import React from 'react';

const OneAsset = props => {
  const { asset } = props;
  return (
    <div className='asset__row-container'>
      <div className='asset--left-info'>
        {asset.tickerSymbol} - {asset.qty} Shares
      </div>
      <div className='asset--right-info'>{asset.totalValue}</div>
      <hr />
    </div>
  );
};

export default OneAsset;
