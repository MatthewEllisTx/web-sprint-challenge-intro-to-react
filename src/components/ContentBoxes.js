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

const NextButtonStyled = styled.h1`
    color: #d1d1d1;
    text-shadow: 1px 1px 5px #fff;
`

function getCharectorData(character){

    return fetch(character.homeworld)
            .then( response => response.json())
            .then( response => {
                return {
                    name: character.name,
                    description: {
                        birth_year: character.birth_year,
                        eye_color: character.eye_color,
                        gender: character.gender,
                        hair_color: character.hair_color,
                        height: character.height,
                        homeworld: response.name, //homeworld
                        mass: character.mass,
                        skin_color: character.skin_color
                    }
                }
            })
}

export default function Characters(){
    const [characterList, setCharectorList] = useState([]);
    const [nextPage, setNextPage] = useState('http://swapi.dev/api/people/?page=1');

    useEffect(() => {
        fetch(nextPage)
            .then( response => response.json())
            .then( response => {
                setNextPage(response.next);
                return Promise.all(response.results.map( character => getCharectorData(character)));
            })
            .then( characters => setCharectorList(characters))

    }, [])

    const getNextPage = function(){
        fetch(nextPage)
            .then( response => {console.log(response); return response.json()})
            .then( response => {
                console.log(response);
                setNextPage(response.next);
                return Promise.all(response.results.map( character => getCharectorData(character)));
            })
            .then( characters => setCharectorList([...characterList, ...characters]))
    }

    return (
        <BoxStyled>
            {characterList.map( character => <Character key={character.name} content={character}/>)}
            {nextPage !== null && <NextButtonStyled onClick={getNextPage}>Next</NextButtonStyled>}
        </BoxStyled>
    )
}