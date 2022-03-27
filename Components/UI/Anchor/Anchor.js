import React from 'react'
import styled from 'styled-components'
function Anchor(props) {
    return (
        <AnchorStyle href={props.href} >{props.children}</AnchorStyle>
    )
}

export default Anchor
const AnchorStyle = styled.a`
    color: var(--darkGrey); 
`