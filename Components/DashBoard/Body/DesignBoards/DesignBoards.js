import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import MediumTitle from '../../../UI/Titles/Titles/MediumTitle'
import CreateBoard from '../../../UI/Cards/CreateBoard/CreateBoard'
import Overlay from '../../../UI/Overlay/Overlay'
import ResponsiveCards from '../../../UI/Cards/ResponsiveCards/ResponsiveCards'
import EditBoard from '../../../UI/Cards/EditBoard/EditBoard'
function DesignBoards({ designBoards }) {
    const [showCreateBoard, setShowCreateBoard] = useState(false)
    const [showEditBoard, setShowEditBoard] = useState(false)
    const [clickedBoardData, setClickedBoardData] = useState()

    const iconClickPass = (data) => {
        setClickedBoardData(data)
        setShowEditBoard(true)
    }

    let designBoardCards = designBoards.data.map(board => {
        let image
        if (board.pinImage) {
            image = board.pinImage[0].url
        }
        if (board.tradeImage) {
            image = board.tradeImage.url
        }
        else if (board.productImage) {
            image = board.productImage
        }
        return (
            <ResponsiveCards
                iconClick={iconClickPass}
                key={board.id}
                id={board.id}
                href={`/members/design-boards/${board.slug}`}
                title={board.title}
                imageSrc={image}
                description={board.description}
                status={board.status}
                showPadlock={true}
            />
        )
    })


    return (
        <Container>
            <SectionTitle showUnderline="true"> Design Boards</SectionTitle>
            <DesignBoardContainer>
                <CardContainer>
                    <CreateNewBoard onClick={() => setShowCreateBoard(true)}>
                        <FontAwesomeIcon icon={faPlus} size="3x" />
                        <MediumTitleStyled>Create new board</MediumTitleStyled>
                    </CreateNewBoard>
                    {designBoards ? designBoardCards : null}
                </CardContainer>

            </DesignBoardContainer>

            {showCreateBoard ? <Overlay onClick={() => setShowCreateBoard(false)} /> : null}
            {showCreateBoard ? <CreateBoard /> : null}
            {showEditBoard ? <EditBoard data={clickedBoardData} closeHandlerPass={() => setShowEditBoard(false)} /> : null}
        </Container>
    )
}
export default DesignBoards

const Container = styled.div`
    padding: 20px 30px;
    @media (max-width: 500px ){ 
        padding: 20px 5px;
    }
`
const DesignBoardContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;

`
const CreateNewBoard = styled.div`
position: relative;
cursor: pointer; 
height: 400px;
width: calc(25% - 20px );
margin: 20px 20px 70px 0;
color: var(--darkGrey);
background: #fafafa;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
@media (max-width: 1600px ) { 
    width: calc(33.33% - 20px );
}
@media (max-width: 1300px ) { 
    width: calc(50% - 20px );
}
@media (max-width: 1200px ) { 
    width: calc(33.33% - 20px );
}
@media (max-width: 1000px ) { 
    width: calc(50% - 20px );
}
@media (max-width: 650px ) { 
    width: calc(100% - 20px );
    margin: 20px auto 70px auto;
}
`
const MediumTitleStyled = styled(MediumTitle)`
font-weight: 700;
`
const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
position: relative;
`
