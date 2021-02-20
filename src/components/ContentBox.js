// Write your Character component here
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ContentBoxStyled = styled.div`
    background: black;
    margin: 0 auto;
    width: 80%;
`

const TitleStyled = styled.div`
    display: flex;
    justify-content: space-between;
`

const ButtonStyled = styled.h2`
    transform: rotate(${props => props.flipButton ? '180deg' : '0deg'});
    transition: transform 0.5s;
`

const DescriptionBoxStyled = styled.div`
    height: auto;
    max-height: ${props => {
        // console.log(props.showDescription)
        // console.log(props.showDescription ? '1000px' : 0)
        return props.showDescription ? '1000px' : 0
    }};
    transition: max-height 0.5s;
`

const DescriptionPieceStyled = styled.div`
    color: ${props => props.showDescription ? 'gold' : 'black'};
    display: flex;
    justify-content: space-between;
    transition: color 0.5s, visibility 0.3s ${props => props.showDescription ? 'ease' : 'ease-in'};
    visibility: ${props => props.showDescription ? 'visible' : 'hidden'};
`

function DescriptionPiece({arr, showDescription}){
    const [title, content] = arr;

    return (
        <DescriptionPieceStyled showDescription={showDescription}>
            <h4>{`${title}:`}</h4>
            <h4>{content}</h4>
        </DescriptionPieceStyled>
    )
}

export default function ContentBox({content}){
    const [showDescription, setShowDescription] = useState(false);
    const {name, description} = content;

    return (
        <ContentBoxStyled>
            <TitleStyled>
                <h2>{name}</h2>
                <div onClick={() => setShowDescription(!showDescription)}>
                    <ButtonStyled flipButton={showDescription}>V</ButtonStyled>
                    {/* button to show description */}
                </div>
            </TitleStyled>
            <DescriptionBoxStyled showDescription={showDescription}>
                {/* {showDescription && Object.entries(data).map( piece => <DescriptionPiece key={piece[0]} arr={piece}/>)} */}
                {Object.entries(description).map( piece => <DescriptionPiece showDescription={showDescription} key={piece[0]} arr={piece}/>)}
            </DescriptionBoxStyled>
        </ContentBoxStyled>
    )
}