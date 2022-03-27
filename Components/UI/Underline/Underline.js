import React from 'react'
import styled from 'styled-components'
function Underline() {
    return (
        <UnderlineStyle></UnderlineStyle>

    )
}

export default Underline
const UnderlineStyle = styled.div`
width: 200px;
height: 2px; 
background: var(--beige);
margin: 3px 0;
`