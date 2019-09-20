
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../redux/store';
import OneTransaction from './OneTransaction';

// const Transactions = props => {
export class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: this.props.transactions,
      user: this.props.user
    };
  }

  componentDidMount() {
    const id = this.state.user.id;
    this.props.getTransactions(id);
  }

  render() {
    const transactions = this.props.transactions;
    return (
      <div className="Transactions__container">
          <h3>Transactions</h3>
        {transactions.map(transaction => {
          return <OneTransaction key={transaction.tickerSymbol} transaction={transaction} />;
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
    transactions: state.transactions,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getTransactions: id => dispatch(getTransactions(id))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Transactions);
