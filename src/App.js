import React, { component } from 'react';
import Header from './pages/Header';
import Teamlead from './pages/Teamlead/Teamlead';
import Calendar from './pages/calendar/calendarMain';
import Export from './pages/export/Export';
import Home from './pages/HomePage/Mainpage';
import Create from './pages/create/create'
import er_404 from './pages/404/unfound'
import Analysis from './pages/analysis/analysis'
import OffTyper from './pages/offType/offtype_form'
import pending from './pages/pending/pending'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default class appy extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.g = props;
  }

  componentDidMount() {
    // alert("componentDidMount");
  }

  componentDidUpdate(prevProps) {
    alert("updated");
    // console.log(propss)
    if(this.g.userID !== prevProps.userID){
      this.fetchData(this.g.userID);

      console.log(this.g);
    }
  }

  // forceUpdate() {
    // alert("forceUpdate");
  // }


  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path='/login' exact={true} component={Home} />
          <Route path='/login/pending' exact={true} component={pending} />
          <Route path='/dashboard' component={Teamlead} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/export' component={Export} />
          <Route path='/create' component={Create} />
          <Route path='/analysis' component={Analysis} />
          <Route path='/offtype' component={OffTyper} />
          <Redirect exact from="/" strict to="/login" />
          <Route path='*' exact={true} component={er_404} />
        </Switch>
      </Router>
    )
  }
}
