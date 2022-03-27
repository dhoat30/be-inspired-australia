import React from 'react'
import styled from 'styled-components'
function SectionTitle(props) {
    return (
        <React.Fragment>
            {props.dangerouslySetInnerHTML ?
                <Container dangerouslySetInnerHTML={props.dangerouslySetInnerHTML} showUnderline={props.showUnderline} className={props.className}></Container>
                : <Container showUnderline={props.showUnderline} className={props.className}>{props.children}</Container>
            }
        </React.Fragment>
    )
}

export default SectionTitle
const Container = styled.h2`
font-size: 2.5rem;
margin: 10px 0;
font-weight: 600;
position: relative;
&::after{ 
    content: '';
    border-bottom: ${props => props.showUnderline ? "3px solid var(--beige)" : null} ; 
    width: 100%;
    position: absolute;
    bottom: -10px;
    left: 0;
}
`

