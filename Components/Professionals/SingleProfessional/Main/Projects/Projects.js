import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LoadingOverlay from '../../../../UI/LoadingOverlay/LoadingOverlay'
import Overlay from '../../../../UI/Overlay/Overlay'
import DesignBoardsCard from '../../../../UI/Cards/DesignBoardsCard/DesignBoardsCard'
import AuthContext from '../../../../../store/auth-context'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Paragraph from '../../../../UI/Titles/Paragraph/Paragraph'
import SaveButtons from '../../../../UI/SaveButtons/SaveButtons'
import NotificationContext from '../../../../../store/notification-context'
import CreateBoard from '../../../../UI/Cards/CreateBoard/CreateBoard'

function Projects({ relatedProject }) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [designBoard, setDesignBoard] = useState(false)
    const [showSaveButtons, setShowSaveButtons] = useState(-1)
    const [showDesignBoardsCard, setShowDesignBoardsCard] = useState(false)
    const [designBoardImages, setDesignBoardImages] = useState('')
    const [clickedProjectData, setClickedProjectData] = useState('')
    const [showCreateBoard, setShowCreateBoard] = useState(false)

    const authCtx = useContext(AuthContext)
    // notification context
    const notificationCtx = useContext(NotificationContext)


    // get the board name 
    useEffect(() => {
        axios.post('/home/api/boards/boards', {
            token: authCtx.token
        })
            .then(res => {
                if (!res.data.data.data) {
                    setDesignBoard(res.data)
                    // get product ids 
                    const productIDS = res.data.data.map(item => {
                        if (item.product_id) {
                            return item.product_id
                        }
                    })
                    // convert array to string 
                    let idString = productIDS.toString()
                    return axios(`https://inspiry.co.nz/wp-json/wp/v2/product?include=${idString}`)
                }
            })
            .then(res => setDesignBoardImages(res.data))
            .catch(err => console.log(err))
    }, [authCtx.token])

    // set white overlay
    const anchorClickHandler = (e) => {
        setShowOverlay(true)
    }
    // hover event handlers 
    const onMouseEnterHandler = id => {
        setShowSaveButtons(id)
    }
    const onMouseLeaveHandler = e => {
        setShowSaveButtons(-1)
    }
    // board name click handlers 
    const boardNameClickHandler = (item) => {
        setClickedProjectData(item)
        setShowDesignBoardsCard(true)
    }

    const createBoardClickHandler = () => {
        setShowCreateBoard(true)
        setShowDesignBoardsCard(false)
    }
    const overlayClickHandler = () => {
        setShowDesignBoardsCard(false)
        setShowCreateBoard(false)
    }

    const saveButtonClickHandler = (projectData) => {
        axios.post('/home/api/boards/add-to-board', {
            projectID: projectData.id,
            boardID: designBoard.data[0].id,
            postTitle: projectData.title,
            status: designBoard.data[0].status,
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
                        message: `Saved to ${designBoard.data[0].title}`,
                        status: "success"
                    })
                }
            })
            .catch(err => console.log(err))
    }


    let responsiveCards
    if (!relatedProject || relatedProject === null) {
        return null
    }
    else {
        responsiveCards = relatedProject.map(item => {
            if (item === null) {
                return null
            }
            else {
                return (
                    <React.Fragment key={item.id}>


                        {
                            item.acf.gallery ?
                                <Card key={item.id} id={item.id} onMouseLeave={onMouseLeaveHandler} onMouseEnter={() => onMouseEnterHandler(item.id)}>

                                    {showSaveButtons === item.id && designBoard ?
                                        <SaveButtons
                                            saveButtonClick={() => saveButtonClickHandler(item)}
                                            title={designBoard.data[0] ? designBoard.data[0].title : "Create a board"}
                                            boardNameClick={() => boardNameClickHandler(item)}
                                            bkColor="var(--beige)"
                                            color="white" />
                                        : null}

                                    <Link href={`/pins/${item.slug}`} passHref >
                                        <AnchorTag onClick={anchorClickHandler}>
                                            <div>
                                                <ImageStyle
                                                    alt={item.title.rendered}
                                                    src={item.acf.gallery[0].url}
                                                    layout="fill" />
                                                {showSaveButtons === item.id ? <OverlayStyle></OverlayStyle> : null}
                                            </div>
                                            <ParagraphStyle> {item.title.rendered}</ParagraphStyle>
                                        </AnchorTag>
                                    </Link>

                                </Card>
                                : null
                        }
                    </React.Fragment>

                )

            }

        })
    }

    return (
        <React.Fragment>
            <CardsContainer>
                {responsiveCards}
            </CardsContainer>

            <LoadingOverlay show={showOverlay} />

            {showCreateBoard ? <CreateBoard /> : null}
            {showDesignBoardsCard || showCreateBoard ? <Overlay onClick={overlayClickHandler} /> : null}

            {showDesignBoardsCard ?
                <DesignBoardsCard
                    createBoardClickPass={createBoardClickHandler}
                    authToken={authCtx.token}
                    clickedCardData={clickedProjectData}
                    designBoards={designBoard}
                    designBoardImages={designBoardImages}
                    cancelClick={() => setShowDesignBoardsCard(false)} />
                : null}

        </React.Fragment>

    )
}

export default Projects
const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

`
const Card = styled.div`
height: 400px;
width: calc(25% - 20px );
margin: 0 20px 70px 0;
color: var(--darkGrey);
position: relative;
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
const AnchorTag = styled.a`
    color: var(--darkGrey); 
    text-decoration: none; 
    font-weight: 500;
    font-size: 1rem;
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`
const ParagraphStyle = styled(Paragraph)`
font-weight: 600;
position: absolute;
top: calc(100% + 10px);
`

const ImageStyle = styled(Image)`
object-fit: cover;
`
const OverlayStyle = styled(Overlay)`
bottom: 8px;
position: absolute;
`