import React, { Component } from 'react';
import Assets from './Assets';
import Trading from './Trading';
import { connect } from 'react-redux';
import { getSumAssets } from '../redux/store';

export class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  componentDidMount() {
    const id = this.state.user.id;
    this.props.getSumAssets(id);
  }
  render() {
    let porttotal = '$';
    let truncAssets = this.props.sumAssets.toFixed(2);
    porttotal = porttotal.concat(truncAssets);

    return (
      <div className="Portfolio__container">
        <h3>Portfolio ({porttotal})</h3>
        <div className="Portfolio__inner">
          <Assets />
          <Trading />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    sumAssets: state.sumAssets,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getSumAssets: id => dispatch(getSumAssets(id))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Portfolio);
