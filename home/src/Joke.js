

import React from 'react'; 
import { useFetch } from './hooks';

const Joke = () => {
    const { setup, punchline } = useFetch('https://official-joke-api.appspot.com/jokes/random', {});
    console.log('...', setup);

    return (
        <div>
            <h2>Joke of the session</h2>
            <p> {setup} </p>
            <p><em> {punchline} </em></p>
        </div>
    );

};

export default Joke;