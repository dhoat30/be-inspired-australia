import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faArrowCircleUp, faShareAlt, faEllipsisH } from '@fortawesome/pro-solid-svg-icons'
import styled from 'styled-components'
import Overlay from '../Overlay/Overlay'
function SingleBoardNavbar({ align, editClickPass, shareClickPass, showUploadOption, uploadClickPass }) {
    const [showMobileNavbar, setShowMobileNavbar] = useState(false)

    return (
        <React.Fragment>
            <Container align={align} show={showMobileNavbar}>
                <List onClick={() => editClickPass()}>
                    <IconStyle icon={faPencil} />
                    Edit
                </List>
                {showUploadOption &&
                    <List onClick={() => uploadClickPass()}>
                        <IconStyle icon={faArrowCircleUp} />
                        Upload
                    </List>
                }
                {!showUploadOption &&
                    <List onClick={() => shareClickPass()}>
                        <IconStyle icon={faShareAlt} />
                        Share
                    </List>
                }

                <CancelButton show={showMobileNavbar} onClick={() => setShowMobileNavbar(false)}>
                    Cancel
                </CancelButton>
            </Container>


            <DotsIcon icon={faEllipsisH} onClick={() => setShowMobileNavbar(true)} />
            {showMobileNavbar ? <Overlay onClick={() => setShowMobileNavbar(false)} /> : null}
        </React.Fragment>
    )
}
export default SingleBoardNavbar

const Container = styled.div`
margin: 20px 0 30px 0;
@media (max-width: 800px){
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0 0 0 0;
        border-radius: var(--cardBorderRadius);
        box-shadow: var(--boxShadow);
        background: white;
        z-index: 10;
        display: ${props => props.show ? "block" : "none"};
    }
`
const IconStyle = styled(FontAwesomeIcon)`
margin-right: 10px;
`
const List = styled.div`
    background: var(--beige);
    display: inline-block;
    padding: 10px 30px;
    border-radius:30px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    &:hover{ 
        background: var(--darkGrey);
        color: white;
    }
    margin: 0 20px 0 0;
    @media (max-width: 800px){
       display: block;
        border-radius: 0;
        background: white;
        border-bottom: 1px solid var(--beige);
        margin: 0 0 0 0;
    }
`
const CancelButton = styled(List)`
 border-bottom: none;
 text-align: center; 
 display: none; 
 @media (max-width: 800px){
    display: ${props => props.show ? "block" : "none"};
    }

`

const DotsIcon = styled(FontAwesomeIcon)`
font-size: 1.7rem;
display: none;
cursor: pointer;
@media (max-width: 800px){
        display: block;
    }
`