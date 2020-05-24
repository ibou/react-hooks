import React, { useState } from 'react';
import './App.css';
import Joke from './Joke';
import Stories from './Stories';


 function App(){


  const [userQuery, setUserQuery] = useState();
  const updateQuery = event => {
    setUserQuery(event.target.value);
  }

  const searchQuery = () => {
    window.open(`https://www.google.com/search?q=${userQuery}`, '_blank')
  }

  const handleKeyPressed = event => {
    if (event.key === 'Enter') {
      searchQuery();
    }

  }

  return (
    <div className="App">
      <h1>Hello Ibou</h1>
      <div className="form">
        <input
          value={userQuery}
          onChange={updateQuery}
          onKeyPress={handleKeyPressed}
        />

        <button onClick={searchQuery}>Search</button>
        <hr />
        <Joke />
        <hr />
        <Stories />
      </div>
    </div>
  );
}

export default App;
