import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentBox from './ContentBox';

const BoxStyled = styled.div`
    background: black;
    border: 1px solid white;
    color: gold;
    margin: 0 auto;
    width: 50%;
`

const SelectorButtonsStyled = styled.div`
    display: flex;
    justify-content: space-between;
    text-shadow: 1px 1px 5px #fff;

    .characters {
        color: ${props => props.display === 'characters' ? 'grey' : '#d1d1d1'};
    }
    
    .planets {
        color: ${props => props.display === 'planets' ? 'grey' : '#d1d1d1'};
    }
`

const NextButtonStyled = styled.h1`
    color: #d1d1d1;
    text-shadow: 1px 1px 5px #fff;
`

function getCharacterData(character){
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

function getPlanetData(planet){
    return {
        name: planet.name,
        description: {
            climate: planet.climate,
            diameter: `${planet.diameter} km`,
            gravity: planet.gravity,
            orbital_period: planet.orbital_period,
            population: planet.population,
            rotation_period: planet.rotation_period,
            terrain: planet.terrain
        }
    }
}

export default function Characters(){
    const [display, setDisplay] = useState('characters');
    const [characterList, setCharacterList] = useState([]);
    const [nextCharacters, setNextCharacters] = useState('http://swapi.dev/api/people/?page=1');
    const [planetList, setPlanetList] = useState([]);
    const [nextPlanets, setNextPlanets] = useState('http://swapi.dev/api/planets/?page=1');

    useEffect(() => {
        getnextPage(nextCharacters, setNextCharacters, getCharacterData, setCharacterList, characterList)
        getnextPage(nextPlanets, setNextPlanets, getPlanetData, setPlanetList, planetList)
    }, [])


    const getnextPage = function(nextPage, setNextPage, getData, setList, oldList){
        fetch(nextPage)
            .then( response => response.json())
            .then( response => {
                setNextPage(response.next);
                return Promise.all(response.results.map( content => getData(content)));
            })
            .then( list => setList([...oldList, ...list]))
    }

    return (
        <BoxStyled>
            <SelectorButtonsStyled display={display}>
                <h1 className='characters' onClick={() => setDisplay('characters')}>Show Characters</h1>
                <h1 className='planets' onClick={() => setDisplay('planets')}>Show Planets</h1>
            </SelectorButtonsStyled>
            {display === 'characters' && characterList.map( character => <ContentBox key={character.name} content={character}/>)}
            {(display === 'characters' && nextCharacters !== null) && <NextButtonStyled onClick={() => getnextPage(nextCharacters, setNextCharacters, getCharacterData, setCharacterList, characterList)}>Next</NextButtonStyled>}

            {display === 'planets' && planetList.map( planet => <ContentBox key={planet.name} content={planet}/>)}
            {(display === 'planets' && nextPlanets !== null) && <NextButtonStyled onClick={() => getnextPage(nextPlanets, setNextPlanets, getPlanetData, setPlanetList, planetList)}>Next</NextButtonStyled>}
        </BoxStyled>
    )
}