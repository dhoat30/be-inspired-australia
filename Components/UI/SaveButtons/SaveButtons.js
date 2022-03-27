import React from 'react'
import Button from '../Button/Button'
import GetDesignBoards from './GetDesignBoards/GetDesignBoards'
import styled from 'styled-components'

function SaveButtons({ title, onClick, boardNameClick, className, bkColor, color, saveButtonClick }) {
    return (
        <Container onClick={onClick} className={className}>
            <GetDesignBoards title={title} boardNameClick={boardNameClick} color={color} />
            <ButtonStyle bkColor={bkColor} onClick={saveButtonClick}>Save</ButtonStyle>
        </Container>
    )
}

export default SaveButtons

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
max-width: 90%;
margin: 0 auto;
position: absolute;
top: 10px;
left: 50%;
transform: translate(-50%, 0);
z-index: 3;
`
const ButtonStyle = styled(Button)`
margin-left: 15px;
`