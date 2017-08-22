import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Navigation from './components/Navigation';
import MainSection from './components/MainSection';
import {Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Route path='/' component={MainSection}/>
      </div>
    );
  }
}

export default App;
