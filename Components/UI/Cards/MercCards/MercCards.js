import React from 'react'
import styled from 'styled-components';
function MercCards(props) {
    return (
        <ImgStyle src={props.src}
            layout="fill"
        />
    )
}

export default MercCards

const ImgStyle = styled.img`
    border-radius: var(--cardBorderRadius);
    width: 100%;
    height: auto;
    object-fit: scale-down;
`
