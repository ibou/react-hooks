import React, { useState } from 'react';
import './App.css';
import Joke from './Joke';
import Stories from './Stories';
import Tasks from './Tasks';
import Gallery from './Gallery';
import Matrix from './Matrix';


function App() {


  const [userQuery, setUserQuery] = useState();
  const [showGallery, setShowGallery] = useState(true)
  const updateQuery = event => {
    setUserQuery(event.target.value);
  }

  const searchQuery = () => {
    console.log(userQuery);
  }

  const handleKeyPressed = event => {
    if (event.key === 'Enter') {
      searchQuery();
    }

  }

  const toggleShowGallery = () => {
    setShowGallery(!showGallery);
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
        <div>

        {showGallery ? <Gallery /> : null}
        <button onClick={toggleShowGallery}> {showGallery ? 'Hide' : 'Show'} Gallery</button>
        </div>
        <hr />
        <div>
          <Matrix />
        </div>
        <Tasks />
        <hr />
        <Joke />

        <hr />
        <Stories />


      </div>
    </div>
  );
}

export default App;
