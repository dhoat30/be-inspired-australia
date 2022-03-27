import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import ImageCard from '../../UI/Cards/ImageCard/ImageCard'
import SaveButtons from '../../UI/SaveButtons/SaveButtons'
import MainBody from './MainBody/MainBody'
import ShareDownloadIcons from './ShareDownloadIcons/ShareDownloadIcons'
import BoardsDataContext from '../../../store/boards-data-context'
import NotificationContext from '../../../store/notification-context'
import AuthContext from '../../../store/auth-context'
import axios from 'axios'
import DesignBoardsCard from '../../UI/Cards/DesignBoardsCard/DesignBoardsCard'
import CreateBoard from '../../UI/Cards/CreateBoard/CreateBoard'
import Overlay from '../../UI/Overlay/Overlay'
import ModalContext from '../../../store/modal-context'
import Gallery from './Gallery/Gallery'
import BackButton from '../../UI/Button/BackButton'
import { useRouter } from 'next/router'

function SinglePin(props) {
    const [showCreateBoard, setShowCreateBoard] = useState(false)
    const [showDesignBoardsCard, setShowDesignBoardsCard] = useState(false)
    // boards data context 
    const boardsDataCtx = useContext(BoardsDataContext)
    // notification context 
    const notificationCtx = useContext(NotificationContext)
    // auth context 
    const authCtx = useContext(AuthContext)
    // modal data context
    const modalCtx = useContext(ModalContext)
    const router = useRouter()
    const saveButtonClickHandler = () => {
        axios.post('/home/api/boards/add-to-board', {
            projectID: props.pinData.id,
            boardID: boardsDataCtx.boardsData.data[0].id,
            postTitle: props.pinData.title,
            status: boardsDataCtx.boardsData.data[0].status,
            token: authCtx.token
        })
            .then(res => {
                if (res.data.data.message) {
                    notificationCtx.showNotification({
                        title: "Error",
                        message: `${res.data.data.message}`,
                        status: "error"
                    })
                }
                else {
                    notificationCtx.showNotification({
                        title: "Success",
                        message: `Saved to ${boardsDataCtx.boardsData.data[0].title}`,
                        status: "success"
                    })
                }
            })
            .catch(err => console.log(err))
    }
    const boardNameClickHandler = () => {
        setShowDesignBoardsCard(true)
    }

    const createBoardClickHandler = () => {
        setShowCreateBoard(true)
        setShowDesignBoardsCard(false)
    }
    return (
        <React.Fragment>
            <Container>
                <BackButtonStyle onClick={() => router.back()} />
                <ImageContainer>
                    <ImageCard
                        src={props.pinData.gallery[0].url}
                        alt={props.pinData.title}
                    />
                </ImageContainer>
                <ContentContainer>
                    <TopSection>
                        <ShareDownloadIcons
                            src={props.pinData.gallery[0].url}
                            alt={props.pinData.title}
                        />
                        {/* if user is not logged in show login modal on click */}
                        {authCtx.token ?
                            <SaveButtonsStyle
                                saveButtonClick={saveButtonClickHandler}
                                boardNameClick={boardNameClickHandler}
                                title={boardsDataCtx.boardsData && boardsDataCtx.boardsData.length !== 0 ?
                                    boardsDataCtx.boardsData.data[0].title : "Create a board"} /> :

                            <SaveButtonsStyle
                                saveButtonClick={modalCtx.showLoginModal}
                                boardNameClick={modalCtx.showLoginModal}
                                title={boardsDataCtx.boardsData && boardsDataCtx.boardsData.length !== 0 ?
                                    boardsDataCtx.boardsData.data[0].title : "Create a board"} />
                        }
                    </TopSection>

                    <MainBody pinData={props.pinData} />
                </ContentContainer>

                {showCreateBoard ? <CreateBoard /> : null}
                {showCreateBoard || showDesignBoardsCard ? <Overlay onClick={() => setShowCreateBoard(false)} /> : null}
                {showDesignBoardsCard ?
                    <DesignBoardsCard
                        createBoardClickPass={createBoardClickHandler}
                        authToken={authCtx.token}
                        clickedCardData={props.pinData}
                        designBoards={boardsDataCtx.boardsData}
                        cancelClick={() => setShowDesignBoardsCard(false)}
                    /> : null
                }
            </Container>
            <Gallery pinData={props.pinData} />
        </React.Fragment>
    )
}

export default SinglePin
const Container = styled.section`
            margin: 50px auto;
            box-shadow: var(--boxShadow);
            border-radius: var(--cardBorderRadius);
            max-width: 1000px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 95%;
            @media (max-width: 1000px){
                margin: 50px auto;
}
  `
const BackButtonStyle = styled(BackButton)`
position: absolute;
left: 20px;
`
const ImageContainer = styled.div`
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            width: 50%;
            margin: 0 auto 0 0;
            position: relative;
            height: 700px;
            padding: 20px !important;
            @media (max-width: 1000px){
                width: 100%;
}
`

const ContentContainer = styled.div`
            width: 50%;
            padding: 20px 20px;
            @media (max-width: 1000px){
                width: 100%;
}
`
const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const SaveButtonsStyle = styled(SaveButtons)`
position: static !important;
justify-content: flex-end;
margin: 0;
width: 300px;
top: 0;
left: 0;
transform: translate(0,0);
`