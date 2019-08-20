import React from 'react';
// import {connect} from 'react-redux';
import { /*withRouter,*/ Route, Switch } from 'react-router-dom';
import Register from './components/Register';
// /* import SignIN from './components/SignIN' */
import Portfolio from './components/Portfolio';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Register" component={Register} />
     {/* <Route exact path="/Sign-IN" component={SignIN} />
    //     <Route component={SignIN} />
    //     {isLoggedIn && (
    //       <Switch>
    //         // Routes placed here are only available after logging in        */}

        <Route exact path="/Portfolio" component={Portfolio} />
        {/* <Route exact path="/Transactions" component={Transactions} />
    //         <Route component={Portfolio}
    //       </Switch>
    //     )}
    //     <Route component={SignIN} />
    //     */}
        <Route component={Register} />
      </Switch>
    </div>
  );
};

export default Routes;
