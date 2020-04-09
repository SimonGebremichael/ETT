import React, { component } from 'react';
import Header from './pages/Header';
import Teamlead from './pages/Teamlead/Teamlead';
import Teamlead2 from './pages/Teamlead/employee';
import Calendar from './pages/calendar/calendarMain';
import Export from './pages/export/Export';
import Home from './pages/HomePage/Mainpage';
import Create from './pages/create/create';
import er_404 from './pages/404/unfound';
import Analysis from './pages/analysis/analysis';
import Analysis2 from './pages/analysis/analysis2';
import OffTyper from './pages/offType/offtype_form';
import pending from './pages/pending/pending';
import Modify from './pages/modify/modify';
import { GoogleLogin } from 'react-google-login';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default class appy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "_",
      headType: false
    };
  }
  componentDidMount = () => { }

  render() {
    return (
        <Router>
          <Header>{this.state}</Header>
          <Switch>
            <Route path='/login' exact={true} component={Home} />
            <Route path='/login/pending/:id' exact={true} component={pending} />
            <Route path='/dashboard/2/:id' exact component={Teamlead2} />
            <Route path='/dashboard/:id' exact component={Teamlead} />
            <Route path='/calendar/:id' component={Calendar} />
            <Route path='/export/:id' component={Export} />
            <Route path='/create/:id' component={Create} />
            <Route path='/analysis/2/:id' component={Analysis2} />
            <Route path='/analysis/:id' component={Analysis} />
            <Route path='/offtype/:id' component={OffTyper} />
            <Route path='/profile/modify/:id' component={Modify} />
            <Redirect exact from="/" strict to="/login" />
            <Route path='*' exact={true} component={er_404} />
          </Switch>
        </Router>
    )
  }
}
