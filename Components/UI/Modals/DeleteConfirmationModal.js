import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import Overlay from '../Overlay/Overlay'
import Paragraph from '../Titles/Paragraph/Paragraph'
import MediumTitle from '../Titles/Titles/MediumTitle'
import SectionTitle from '../Titles/Titles/SectionTitle'

function DeleteConfirmationModal({ cancelClick, deleteClick }) {
    return (
        <React.Fragment>
            <Container>
                <MediumTitle align="center">Are you sure?</MediumTitle>
                <Paragraph align="center">Once you delete a Pin, you can&apos;t undo it!</Paragraph>
                <ButtonContainer>
                    <ButtonStyle onClick={cancelClick} bkColor="var(--beige)">Cancel</ButtonStyle>
                    <ButtonStyle onClick={deleteClick}>Delete</ButtonStyle>
                </ButtonContainer>
            </Container>
        </React.Fragment>

    )
}

export default DeleteConfirmationModal
const Container = styled.section`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    width: 100%;
    max-width: 500px;
    z-index: 10; 
    padding: 20px 10px; 
    border-radius: var(--cardBorderRadius);
`

const ButtonContainer = styled.div`
display: flex; 
justify-content: center;
margin: 20px 0 0 0 ;
`
const ButtonStyle = styled(Button)`
margin: 0 5px; 
`