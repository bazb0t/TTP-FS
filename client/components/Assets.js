import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssets } from '../redux/store';
import OneAsset from './OneAsset';

export class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: this.props.assets,
      user: this.props.user,
    };
  }

  componentDidMount() {
    const id = this.state.user.id;
    this.props.getAssets(id);
  }

  render() {
    const assets = this.props.assets['assets'];
    return (
      <div className='Assets__container'>
        {assets.map(asset => {
          return <OneAsset key={asset.tickerSymbol} asset={asset} />;
        })}
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    assets: state.assets,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getAssets: id => dispatch(getAssets(id))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Assets);
