// Write your Character component here
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function DescriptionPiece({arr}){
    const [title, content] = arr;

    return (
        <div>
            <h4>{title}</h4>
            <h4>{content}</h4>
        </div>
    )
}

export default function Character({content}){
    const [showDescription, setShowDescription] = useState(false);

    const data = {
        birth_year: content.birth_year,
        eye_color: content.eye_color,
        gender: content.gender,
        hair_color: content.hair_color,
        height: content.height,
        mass: content.mass,
        name: content.name,
        skin_color: content.skin_color
    }

    return (
        <div>
            <div>
                <h2>{data.name}</h2>
                <div onClick={() => setShowDescription(!showDescription)}>
                    {/* button to show description */}
                </div>
            </div>
            <div>
                {Object.entries(data).map( piece => <DescriptionPiece arr={piece}/>)}
            </div>
        </div>
    )
}