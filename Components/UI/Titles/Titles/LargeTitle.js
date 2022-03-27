import React from 'react'
import styled from 'styled-components'
function LargeTitle(props) {

    return (
        <Container
            dangerouslySetInnerHTML={{ __html: props.children }}
            className={props.className} align={props.align}></Container>
    )
}

export default LargeTitle
const Container = styled.h1`
font-size: 3rem;
margin: 10px 0;
line-height: 4rem;
text-align: ${props => props.align ? props.align : "left"};
@media (max-width: 500px ){ 
   font-size: 1.5rem;
   line-height: 2rem;
}
`
