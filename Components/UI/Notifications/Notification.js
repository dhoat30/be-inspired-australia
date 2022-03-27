import React from 'react'
import styled from 'styled-components'
import Paragraph from '../Titles/Paragraph/Paragraph'
function Notification(props) {
    return (
        <Container status={props.status}>
            <ParagraphStyle>{props.title}! </ParagraphStyle>
            <Paragraph>{props.message} </Paragraph>
        </Container>
    )
}

export default Notification
const Container = styled.div`
background:${props => props.status === "success" ? "#4BB543" : "#ff0033 "} ;
color: white;
position: fixed; 
bottom: 0;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
padding: 10px 20px;
z-index: 10;
`
const ParagraphStyle = styled(Paragraph)`
font-weight: 600;
`