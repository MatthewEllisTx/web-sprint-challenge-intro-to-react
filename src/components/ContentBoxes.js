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

function getCharectorData(character){
    

    // const data =  {
    //     name: character.name,
    //     description: {
    //         birth_year: character.birth_year,
    //         eye_color: character.eye_color,
    //         gender: character.gender,
    //         hair_color: character.hair_color,
    //         height: character.height,
    //         mass: character.mass,
    //         skin_color: character.skin_color
    //     }
    // }
    //console.log(data);
    //return data;

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

    useEffect(() => {
        fetch('http://swapi.dev/api/people/?page=1')
            .then( response => response.json())
            .then( response => Promise.all(response.results.map( character => getCharectorData(character))))
            .then( characters => setCharectorList(characters))
            // .then( response => {
            //     //console.log(response.results);
            //     setCharectorList(response.results.map( character => getCharectorData(character)));
            // })

    }, [])

    return (
        <BoxStyled>
            {characterList.map( character => <Character key={character.name} content={character}/>)}
        </BoxStyled>
    )
}