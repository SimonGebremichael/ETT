import React from 'react';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Teamlead from './pages/Teamlead/Teamlead';
import Calendar from './pages/calendar/calendarMain';
import Home from './pages/HomePage/Mainpage';
import Header_login from './pages/LogIn_Header';
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
  
  return (
    <>
      <Router>
        <Switch>
          <Route  path='/' exact component={homeBound} />
          <Route  path='/dashboard' component={team} />
          <Route  path='/calendar' component={cali} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}
export default App;