import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChange } from '../redux/store';

export class OneAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: this.props.asset
    };
  }
  componentDidMount() {
    const tickerSymbol = this.props.asset.tickerSymbol;
    this.props.getChange(tickerSymbol);
  }
  render() {
    let asset = this.state.asset;
    let stockChange = this.props.change;
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
            <div className='asset--right-info'>
              {asset.totalValue}
            </div>
            <hr />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    change: state.assets.change
  };
};

const mapDispatch = dispatch => {
  return {
    getChange: id => dispatch(getChange(id))
  };
};

export default connect(
  mapState,
  mapDispatch
)(OneAsset);
