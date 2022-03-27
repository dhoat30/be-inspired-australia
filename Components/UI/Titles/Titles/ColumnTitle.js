import React from 'react'
import styled from 'styled-components'

function ColumnTitle(props) {
    return (
        <Container fontWeight={props.fontWeight} className={props.className} align={props.align}>{props.children}</Container>
    )
}

export default ColumnTitle

const Container = styled.h3`
    font-size: 2rem;
    font-weight: ${props => props.fontWeight ? props.fontWeight : "600"};
    margin: 0;
    text-align: ${props => props.align ? props.align : "left"};
`
