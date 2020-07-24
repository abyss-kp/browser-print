import React from 'react';
import { Route, Switch, withRouter, BrowserRouter as Router } from 'react-router-dom'
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
