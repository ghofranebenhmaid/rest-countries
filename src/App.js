import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Home';
import Detail from './detail-page';

function App() {
   return (
      <Router>
         <div>
            {/* <Link to='/'>Home</Link>
            <Link to='/detail-page'>Detail</Link> */}

            <Switch>
               <Route path='/' component={Home} />
               <Route path='/detail-page' component={Detail} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
