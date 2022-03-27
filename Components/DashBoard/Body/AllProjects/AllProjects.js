import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import MediumTitle from '../../../UI/Titles/Titles/MediumTitle'
import CreateBoard from '../../../UI/Cards/CreateBoard/CreateBoard'
import Overlay from '../../../UI/Overlay/Overlay'
import ResponsiveCards from '../../../UI/Cards/ResponsiveCards/ResponsiveCards'
import EditBoard from '../../../UI/Cards/EditBoard/EditBoard'
import Link from 'next/link'
import BoardsDataContext from '../../../../store/boards-data-context'
import { useRouter } from 'next/router'
function AllPins() {
    const boardsDataCtx = useContext(BoardsDataContext)
    const router = useRouter()
    let userPinCards
    const pencilClickHandler = (value) => {
        router.push(`/members/your-projects/edit-project/${value.slug}`)
    }

    if (boardsDataCtx.userPinsData) {

        userPinCards = boardsDataCtx.userPinsData.map(item => {
            let imageSrc = item.pinImage[0] ? item.pinImage[0].url : "/home/placeholder-image.jpeg"
            return (
                <ResponsiveCards
                    key={item.id}
                    id={item.id}
                    href={`/members/your-projects/edit-project/${item.slug}`}
                    title={item.title}
                    slug={item.slug}
                    imageSrc={imageSrc}
                    description={item.description}
                    status={item.status}
                    iconClick={pencilClickHandler}
                />
            )
        })
    }
    return (
        <Container>
            <SectionTitle>Your Projects</SectionTitle>
            <UserPinContainer>
                <CardContainer>
                    <Link href="/projects/add-new-project" passHref>
                        <CreateNewBoard >
                            <FontAwesomeIcon icon={faPlus} size="3x" />
                            <MediumTitleStyled>Create new project</MediumTitleStyled>
                        </CreateNewBoard>
                    </Link>

                    {boardsDataCtx.userPinsData ? userPinCards : null}
                </CardContainer>

            </UserPinContainer>
        </Container>
    )
}

export default AllPins
const Container = styled.div`
    padding: 20px 30px;
    @media (max-width: 500px ){ 
        padding: 20px 5px;
    }
`
const UserPinContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;

`
const CreateNewBoard = styled.a`
text-decoration: none; 
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
