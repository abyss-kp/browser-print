import React from 'react';
import { Route, Switch, withRouter, BrowserRouter as Router } from 'react-router-dom'
// import './BrowserPrint-Zebra-1.0.216.min'
// import './BrowserPrint-3.0.216.min.js'
import Print from './BrowserPrint/Print';
import Tabs from './Tabs'
class App extends React.Component {
  parentPath = this.props.match.path;
  render() {
    return (
      <Router>
        <Switch>
          <Route component={Tabs} path={[this.parentPath]} />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
