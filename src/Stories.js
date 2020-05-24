import React, { useState, useEffect } from 'react';
import { useFetch } from './hooks';

const Stories = () => {

    const stories = useFetch('https://news-proxy-server.appspot.com/topstories', []);
    console.log('===stories===',stories); 
    return (
        <div className="Stories">
            <h3>Stories</h3>
            {
                stories.map(story => {
                    const { by, id, title, time, url } = story;
                    return (
                        <div key={id}>
                            <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                            <div>{by} - {new Date(time).toLocaleTimeString()}</div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Stories;