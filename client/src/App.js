import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
//Redux
import {Provider} from 'react-redux';
import store from './store';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => 
  {
    useEffect(() => {
      store.dispatch(loadUser());
    }, []);
    
    return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={ <Landing /> } />
        </Routes>
        <div className='container'>
          <Alert/>
          <Routes>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route exact path='/create-profile' element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            } />
            <Route exact path='/edit-profile' element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Fragment>
    </Router>
  </Provider>)};
     
export default App;
