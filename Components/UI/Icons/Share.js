import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/pro-duotone-svg-icons'
import styled from 'styled-components'
function ShareDownloadIcons(props) {
    return (
        <Container onClick={props.clicked}>
            <IconStyle icon={faShareAlt} />
        </Container>

    )
}

export default ShareDownloadIcons
const IconStyle = styled(FontAwesomeIcon)`
font-size: 25px;
`
const Container = styled.div`
display: inline-block;
padding: 8px 12px 8px 10px;
border-radius: 50%;
&:hover{
    background: var(--beige);
    cursor: pointer;
}
`