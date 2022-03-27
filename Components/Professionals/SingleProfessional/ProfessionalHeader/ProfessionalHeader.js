import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import LargeTitle from '../../../UI/Titles/Titles/LargeTitle'
import BreadCrumbs from '../../../UI/BreadCrumbs/BreadCrumbs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/pro-light-svg-icons'
import Paragraph from '../../../UI/Titles/Paragraph/Paragraph'
import Button from '../../../UI/Button/Button'
import ProfessionalContactForm from '../Main/ProfessionalContactForm/ProfessionalContactForm'
import Overlay from '../../../UI/Overlay/Overlay'
import DesignBoardsCard from '../../../UI/Cards/DesignBoardsCard/DesignBoardsCard'
import CreateBoard from '../../../UI/Cards/CreateBoard/CreateBoard'
import AuthContext from '../../../../store/auth-context'
import ModalContext from '../../../../store/modal-context'
import axios from 'axios'
import Image from 'next/image'

function ProfessionalHeader({ singleData }) {
    const [showContactForm, setShowContactForm] = useState(false)
    const [designBoard, setDesignBoard] = useState(false)
    const [showDesignBoardsCard, setShowDesignBoardsCard] = useState(false)
    const [showCreateBoard, setShowCreateBoard] = useState(false)
    const [clickedProfessionalData, setClickProfessionalData] = useState('')
    const authCtx = useContext(AuthContext)
    const modalCtx = useContext(ModalContext)

    useEffect(() => {
        axios.post('/home/api/boards/boards', {
            token: authCtx.token
        })
            .then(res => {
                if (!res.data.data.data) {
                    setDesignBoard(res.data)
                }
            })
            .then(res => setDesignBoardImages(res.data))
            .catch(err => console.log(err))
    }, [authCtx.token])

    const getInTouchClickHandler = () => {
        setShowContactForm(true)
    }
    const saveClickHandler = () => {
        setShowDesignBoardsCard(true)
        const item = {
            id: singleData.id,
            title: singleData.title
        }
        setClickProfessionalData(item)
    }
    // show create board modals
    const createBoardClickHandler = () => {
        setShowCreateBoard(true)
        setShowDesignBoardsCard(false)
    }
    // hide cards on overlay click
    const overlayClickHandler = () => {
        setShowDesignBoardsCard(false)
        setShowCreateBoard(false)
    }

    return (
        <Container>
            <FirstRow>
                <LogoContainer className="professional-logo">
                    <ImageStyle
                        alt={singleData.title}
                        src={singleData.acf.logo.url}
                        layout="responsive"
                        width="100"
                        height="100" />
                </LogoContainer>
                <MiddleSection>
                    <BreadCrumbs />
                    <LargeTitleStyle>{singleData.title} </LargeTitleStyle>
                </MiddleSection>
            </FirstRow>

            <FunctionSection>
                {designBoard ?
                    <IconContainer onClick={saveClickHandler}>
                        <FontAwesomeIcon icon={faHeart} size="2x" />
                        <Paragraph>Save</Paragraph>
                    </IconContainer>
                    :
                    null
                }
                {!authCtx.token ?
                    <IconContainer onClick={() => modalCtx.showLoginModal()}>
                        <FontAwesomeIcon icon={faHeart} size="2x" />
                        <Paragraph>Save</Paragraph>
                    </IconContainer> : null
                }

                <ButtonStyle bkColor="var(--beige)" onClick={getInTouchClickHandler}>Get In Touch</ButtonStyle>
            </FunctionSection>

            {showContactForm ?
                <React.Fragment>
                    <ProfessionalContactForm singleData={singleData} cancelPass={() => setShowContactForm(false)} />
                    <Overlay onClick={() => setShowContactForm(false)} />
                </React.Fragment> : null
            }

            {showDesignBoardsCard ?
                <DesignBoardsCard
                    createBoardClickPass={createBoardClickHandler}
                    authToken={authCtx.token}
                    designBoards={designBoard}
                    clickedCardData={clickedProfessionalData}
                    cancelClick={() => setShowDesignBoardsCard(false)}
                    postType="trade"
                /> : null
            }

            {showDesignBoardsCard || showCreateBoard ? <Overlay onClick={overlayClickHandler} /> : null}
            {showCreateBoard ? <CreateBoard /> : null}
        </Container>
    )
}

export default ProfessionalHeader
const Container = styled.section`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
@media (max-width: 1250px ){ 
    align-items: flex-start;
    flex-direction: column;
}
`
const FirstRow = styled.div`
display: flex;
flex-direction: row;
align-items: center;
@media (max-width: 1250px ){ 
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
}
`
const LogoContainer = styled.div`
position: relative;
width: 250px;
height: 250px;
top: -70px;
margin-right: 100px;
border: 1px solid var(--darkGrey);
box-shadow: var(--boxShadow);
background: var(--beige);
@media (max-width: 1250px ){ 
    left: 50%;
    margin-right: 0px;
    transform: translate(-50%,0);
   
}
@media (max-width: 500px ){ 
   width: 200px; 
   height: 200px;
}
`
const MiddleSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 700px;
    @media(max-width: 1360px ){ 
        max-width: 600px;
    } 
    @media (max-width: 1250px ){ 
   max-width: 700px;
}
`
const LargeTitleStyle = styled(LargeTitle)`

`
const FunctionSection = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
align-items: center;
@media (max-width: 1250px){ 
    margin: 20px 0;
}
`
const IconContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor: pointer;
`
const ButtonStyle = styled(Button)`
padding: 15px 40px;
font-size: 1.2rem;
font-weight: 700;
margin-left: 30px;

`
const ImageStyle = styled(Image)`
object-fit: cover;
`