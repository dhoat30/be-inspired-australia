import React from 'react'
import Button from '../Button/Button'
import styled from 'styled-components'
import MediumTitle from '../Titles/Titles/MediumTitle'
import Paragraph from '../Titles/Paragraph/Paragraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
function SaveBoard() {
    return (
        <Container>
            <ChooseBoard>
                <ParagraphStyle>Bedroom...</ParagraphStyle>
                <FontAwesomeIcon icon={faChevronDown} />
            </ChooseBoard>
            <Button>Save</Button>
        </Container>
    )
}

export default SaveBoard
const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 220px;
`
const ChooseBoard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 120px;
`
const ParagraphStyle = styled(Paragraph)`
    font-weight: 600;
`
