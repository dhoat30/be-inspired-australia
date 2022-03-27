import React from 'react'
import styled from 'styled-components'

function MediumTitle(props) {
    const lower = props.children.toLowerCase();
    let text = lower.charAt(0).toUpperCase() + lower.slice(1);
    return (
        <Container
            dangerouslySetInnerHTML={{ __html: text }}
            fontWeight={props.fontWeight} className={props.className} align={props.align} onClick={props.onClick}>
        </Container>
    )
}

export default MediumTitle
const Container = styled.h6`
    font-size: 1.3rem;
    font-weight: ${props => props.fontWeight ? props.fontWeight : "500"};
    text-align: ${props => props.align ? props.align : "left"};
    margin: 10px 0;
    text-transform: capitalize;
`