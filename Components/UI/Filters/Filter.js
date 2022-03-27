import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/pro-solid-svg-icons'
import styled from 'styled-components'
import Paragraph from '../Titles/Paragraph/Paragraph'
function Filter({ className, onClick }) {
    return (
        <Container className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faFilter} />
            <Paragraph>Filter</Paragraph>
        </Container>
    )
}

export default Filter
const Container = styled.div`
width: 110px;
    background: var(--darkGrey);
    color: white;
    cursor: pointer;
    border-radius: 30px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover{ 
        background: var(--beige);
        color: var(--darkGrey);
    }
`