import React from 'react'
import Image from 'next/image'
import styled from 'styled-components';

function ImageCard(props) {
    return (
        <ImgStyle src={props.src}
            layout="fill"
            alt={props.alt}
        />
    )
}

export default ImageCard
const ImgStyle = styled(Image)`
    object-fit: cover;
    border-radius: var(--cardBorderRadius);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    @media (max-width: 1000px ){ 
        border-top-right-radius: var(--cardBorderRadius);;
    border-bottom-left-radius: 0;
    }
`