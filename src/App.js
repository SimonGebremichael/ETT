import React from 'react';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Teamlead from './pages/Teamlead/Teamlead';
import Calendar from './pages/calendar/calendarMain';
import Home from './pages/HomePage/Mainpage';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';

function App() {

  var meme = () => {
    return(<Teamlead />)
  }

  var meme2 = () => {
    return(<Calendar />)
  }
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route  path='/' exact component={Home} />
          <Route  path='/dashboard' component={meme} />
          <Route  path='/calendar' component={meme2} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
export default App;