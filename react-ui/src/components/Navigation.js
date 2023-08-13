import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="App-nav">
            <Link to="/">Home</Link>
            <Link to="/edit">Edit Exercise</Link>
            <Link to="/create">Create Exercise</Link>
        </nav>
    );
  }
  

export default Navigation;