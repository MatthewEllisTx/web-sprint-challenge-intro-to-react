import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Character from './Character';
import axios from 'axios';

export default function Characters(){
    const [characterList, setCharectorList] = useState([]);

    useEffect(() => {
        fetch('http://swapi.dev/api/people/?page=1')
            .then( response => response.json())
            .then( response => response.results)
            .then( results => setCharectorList(results))
        // axios.get('http://swapi.dev/api/people/?page=1')
        //     .then( response => setCharectorList(response.data.results.slice(0, 5)))
        //     .catch( err => console.log(err))
    }, [])

    return (
        <div>
            {/* {characterList.map( character => <p>Test {character.name}</p>)} */}
            {characterList.map( character => <Character content={character}/>)}
        </div>
    )
}