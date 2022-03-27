import React from 'react'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/pro-light-svg-icons'
function GetDesignBoards(props) {
    return (
        <Container onClick={props.boardNameClick}>
            <ParagraphStyle color={props.color}>{props.title}
            </ParagraphStyle>
            <IconStyle icon={faChevronDown} color={props.color} />
        </Container>
    )
}

export default GetDesignBoards
const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
`
const ParagraphStyle = styled(Paragraph)`
max-width: 150px;
color: var(--darkGrey);
color: ${props => props.color ? props.color : "var(--darkGrey) "};
`
const IconStyle = styled(FontAwesomeIcon)`
margin-left: 10px;
color: ${props => props.color ? props.color : "var(--darkGrey) "};
`