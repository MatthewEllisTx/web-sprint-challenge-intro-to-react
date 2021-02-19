import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Character from './Character';

const BoxStyled = styled.div`
    background: black;
    border: 1px solid white;
    color: gold;
    margin: 0 auto;
    width: 50%;
`

export default function Characters(){
    const [characterList, setCharectorList] = useState([]);

    useEffect(() => {
        fetch('http://swapi.dev/api/people/?page=1')
            .then( response => response.json())
            .then( response => response.results)
            .then( results => setCharectorList(results))
    }, [])

    return (
        <BoxStyled>
            {characterList.map( character => <Character key={character.name} content={character}/>)}
        </BoxStyled>
    )
}