import React from 'react';
import Login from './components/Login';

function App({isAdmin}) {
  return (
    <Login isAdmin={isAdmin}/>
  );
}

export default App;
