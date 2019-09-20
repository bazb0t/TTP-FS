import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, Portfolio, Transactions} from './components'
import {me} from './redux/store'

// Component
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Pre Login */}
        <div className="authParent">
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        </div>
        {isLoggedIn && (
          <Switch>
            {/* Post Login */}
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route path="/" component={Portfolio} />
          </Switch>
        )}
        {/* Fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

// Container
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
