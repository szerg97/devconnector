import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom';
import './App.css';
import {Navbar} from './components/layout/Navbar';
import {Landing} from './components/layout/Landing';
import Register from './components/auth/Register';
import {Login} from './components/auth/Login';
import Alert from './components/layout/Alert';
//Redux
import {Provider} from 'react-redux';
import store from './store';

const App = () => 
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route exact path='/' element={ <Landing /> } />
        </Routes>
        <div className='container'>
          <Routes>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  </Provider>
     
export default App;
