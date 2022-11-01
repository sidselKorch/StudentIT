import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Login from './loginpage';
import Register from './registerpage';
import './App.css';


import Button from 'react-bootstrap/Button';



function App() {
  return (
    <main  className="App">
      <Login />
      <header className="App-header">
      <h1>Hello StudentIT whats up</h1>
      <p></p>
      <p></p>
      <p></p>
      
      <Button variant="link" size="lg">Sign In</Button>{' '}
      

      </header>
    </main>
  );
}

export default App;
