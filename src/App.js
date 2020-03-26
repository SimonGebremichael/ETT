import React from 'react';
import Header from './pages/Header';
import Teamlead from './pages/Teamlead/Teamlead';
import Calendar from './pages/calendar/calendarMain';
import Export from './pages/export/Export';
import Home from './pages/HomePage/Mainpage';
import Header_login from './pages/LogIn_Header';
import Create from './pages/create/create'
import er_404 from './pages/404/unfound'
import Analysis from './pages/analysis/analysis'
import OffTyper from './pages/offType/offtype_form'

import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';

function App() {

  var team = () => {
    return(
      <>
      <Header />
      <Teamlead />
      </>
    )
  }

  var cali = () => {
    return(
      <>
      <Header />
      <Calendar />
      </>
    )
  }

  var homeBound = () => {
    return(
      <>
      <Header_login />
      <Home />
      </>
    )
  }
  

  var exporter = () => {
    return(
      <>
      <Header />
      <Export />
      </>
    )
  }

  var create = () => {
    return(
      <>
      <Header />
      <Create />
      </>
    )
  }

  var analysis = () => {
    return(
      <>
      <Header />
      <Analysis />
      </>
    )
  }

  var offType = () => {
    return(
      <>
      <Header />
      <OffTyper />
      </>
    )
  }

  return (
    <>
      <Router>
        <Switch>
          <Route  path='/' exact={true} component={homeBound} />
          <Route  path='/dashboard' component={team} />
          <Route  path='/calendar' component={cali} />
          <Route  path='/export' component={exporter} />
          <Route  path='/create' component={create} />
          <Route  path='/analysis' component={analysis} />
          <Route  path='/offtype' component={offType} />
          <Route  path='*' exact={true} component={er_404} />
        </Switch>
      </Router>
    </>
  );
}
export default App;