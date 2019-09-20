import React, { Component } from 'react';
import { publicIEXtoken } from '../redux/store';
import axios from 'axios';

export class OneAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: this.props.asset,
      change: 0
    };
  }
  async componentDidMount() {
    const tickerSymbol = this.props.asset.tickerSymbol;
    let stockChange = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote/change?token=${publicIEXtoken}`
    );
    this.setState({
      change: stockChange.data
    });
  }
  render() {
    let asset = this.state.asset;
    let stockChange = this.state.change;
    let newColor = '';
    if (stockChange > 0) {
      newColor = '#008000';
    } else if (stockChange < 0) {
      newColor = '#FF0000';
    } else if (stockChange === 0) {
      newColor = '#CCCCCC';
    }
    return (
      <div>
        {asset.qty > 0 ? (
          <div className='asset__row-container' style={{ color: newColor }}>
            <div className='asset--left-info'>
              {asset.tickerSymbol} - {asset.qty} Shares
            </div>
            <div className='asset--right-info'>{asset.totalValue}</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default OneAsset;
