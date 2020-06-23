import React from 'react';
import './App.css';
import All from './pages/All';
import Stock from './pages/Stock';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div className='App'>
            <All />
          </div>
        </Route>
        <Route path='/:id'>
          <Stock />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
