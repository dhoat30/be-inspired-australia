import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons'

function LoadingOverlay(props) {

    return (
        <Container>
            {props.show ?
                <Overlay>
                    <IconStyle icon={faSpinner} spin className={props.className} size="5x" />
                </Overlay> :
                null
            }
        </Container>
    )
}

export default LoadingOverlay

const Container = styled.div`
position: absolute;
z-index: 10; 
width: 100%; 
`

const Overlay = styled.div`
position: fixed;
width: 100%; 
height: 100%; 
background: rgba(255,255,255, 0.7);
left: 0; 
top: 0; 
z-index: 10;
display: flex;
justify-content: center;
align-items: center;
`
const IconStyle = styled(FontAwesomeIcon)`
color: var(--darkGrey);
position: absolute;
`