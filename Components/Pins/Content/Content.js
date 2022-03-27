import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import ImageCards from '../ImageCards/ImageCards'
import * as styles from './AllPins.module.css'
import Link from 'next/link'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import DesignBoardsCard from '../../UI/Cards/DesignBoardsCard/DesignBoardsCard'
import SaveButtons from '../../UI/SaveButtons/SaveButtons'
import CreateBoard from '../../UI/Cards/CreateBoard/CreateBoard'
import Overlay from '../../UI/Overlay/Overlay'
import AuthContext from '../../../store/auth-context'
import NotificationContext from '../../../store/notification-context'
import axios from 'axios'
import BoardsDataContext from '../../../store/boards-data-context'
import ModalContext from '../../../store/modal-context'
import CheckTitle from '../../UI/Titles/CheckTitle'
import { useMediaQuery } from 'react-responsive'
import Filter from '../../UI/Filters/Filter'

function Content(props) {
    const [projectsData, setProjectsData] = useState(props.projectData)
    const [showOverlay, setShowOverlay] = useState(false)
    const [designBoard, setDesignBoard] = useState(false)
    const [showSaveButtons, setShowSaveButtons] = useState(-1)
    const [showDesignBoardsCard, setShowDesignBoardsCard] = useState(false)
    const [designBoardImages, setDesignBoardImages] = useState('')
    const [clickedProjectData, setClickedProjectData] = useState('')
    const [showCreateBoard, setShowCreateBoard] = useState(false)
    const [notLoggedIn, setNotLoggerIn] = useState(true)
    const [showFilterNav, setShowFilterNav] = useState(false)
    const [showTradeProjects, setShowTradeProjects] = useState(false)
    const [showPublicProjects, setShowPublicProjects] = useState(false)
    // get auth token 
    const authContext = useContext(AuthContext)
    let token = authContext.token
    // boards context
    const boardsDataCtx = useContext(BoardsDataContext)

    // notification context
    const notificationCtx = useContext(NotificationContext)
    // login context
    const modalCtx = useContext(ModalContext)


    // media query 
    const isTablet = useMediaQuery({
        query: `(max-width: 1000px)`
    })

    // get the board name 
    useEffect(() => {
        axios.post('/home/api/boards/boards', {
            token: token
        })
            .then(res => {
                console.log("get boards")

                if (!res.data.data.data) {
                    setDesignBoard(res.data)
                    boardsDataCtx.getBoardsData(res.data)
                    setNotLoggerIn(false)
                }
            })
            .catch(err => console.log(err))
        setProjectsData(props.projectData)

        // only show trade projects on state change 
        if (showTradeProjects) {
            setProjectsData(() => {
                return props.projectData.filter((item) => item.tradeProfessionalID)
            })
        }
        // only show projects of public when state changes 
        if (showPublicProjects) {
            setProjectsData(() => {
                return props.projectData.filter((item) => item.tradeProfessionalID.length === 0)
            })
        }


    }, [token, showTradeProjects, showPublicProjects])
    if (!projectsData) {
        console.log("null value")
        return null
    }
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
        setShowFilterNav(false)
    }

    const saveButtonClickHandler = (projectData) => {

        axios.post('/home/api/boards/add-to-board', {
            projectID: projectData.id,
            boardID: designBoard.data[0].id,
            postTitle: projectData.title,
            status: designBoard.data[0].status,
            token: token
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
    const card = projectsData.map((item, index) => {
        if (item.title && item.gallery[0]) {
            const lower = item.title.toLowerCase();
            let pinTitle = lower.charAt(0).toUpperCase() + lower.slice(1);
            return (
                <CardContainer key={item.id} id={item.id} onMouseLeave={onMouseLeaveHandler} onMouseEnter={() => onMouseEnterHandler(item.id)}>

                    {showSaveButtons === item.id && designBoard ?
                        <SaveButtons
                            saveButtonClick={() => saveButtonClickHandler(item)}
                            title={designBoard.data[0] ? designBoard.data[0].title : "Create a board"}
                            boardNameClick={() => boardNameClickHandler(item)}
                            bkColor="var(--beige)"
                            color="white" />
                        :
                        null
                    }

                    {showSaveButtons === item.id && notLoggedIn ?
                        <SaveButtons
                            saveButtonClick={() => modalCtx.showLoginModal()}
                            title={"Create a board"}
                            boardNameClick={() => modalCtx.showLoginModal()}
                            bkColor="var(--beige)"
                            color="white" />
                        :
                        null
                    }
                    <Link href={`/pins/${item.slug}`} passHref >
                        <AnchorTag onClick={anchorClickHandler}>
                            {item.gallery[0] ?
                                <ImageCards
                                    src={item.gallery[0].url}
                                    showOverlay={showSaveButtons === item.id}
                                    alt={item.title}
                                />
                                : null
                            }
                            <CheckTitle title={pinTitle} showTradeBadge={item.tradeProfessionalID && true} />
                        </AnchorTag>
                    </Link>

                </CardContainer>
            )
        }

    })
    return (
        <React.Fragment>
            <Container className={`${styles.mercCardsContainer}`}>
                {card}
            </Container>

            <LoadingOverlay show={showOverlay} />


            {showCreateBoard ? <CreateBoard /> : null}
            {showDesignBoardsCard || showCreateBoard || showFilterNav ? <Overlay onClick={overlayClickHandler} /> : null}

            {showDesignBoardsCard ? <DesignBoardsCard
                createBoardClickPass={createBoardClickHandler}
                authToken={token}
                clickedCardData={clickedProjectData}
                designBoards={designBoard}
                designBoardImages={designBoardImages}
                cancelClick={() => setShowDesignBoardsCard(false)} /> : null}

            <div>
                <FilterStyle onClick={() => setShowFilterNav(true)} />
                {showFilterNav &&
                    <NavContainer onClick={() => setShowFilterNav(false)}>
                        <NavItem
                            onClick={() => {
                                setShowTradeProjects(false)
                                setShowPublicProjects(false)
                            }}>All Projects</NavItem>

                        <NavItem
                            onClick={() => {
                                setShowTradeProjects(true)
                                setShowPublicProjects(false)
                            }}>Trade Projects</NavItem>

                        <NavItem
                            onClick={() => {
                                setShowTradeProjects(false)
                                setShowPublicProjects(true)
                            }}>Public Projects</NavItem>
                    </NavContainer>
                }
            </div>

        </React.Fragment>

    )
}

export default Content

const Container = styled.div`
`
const AnchorTag = styled.a`
color: var(--darkGrey); 
text-decoration: none; 
font-weight: 500;
font-size: 1rem;
`

const CardContainer = styled.div`
position: relative;
`

const FilterStyle = styled(Filter)`
position: fixed;
bottom: 100px;
right: 20px;
z-index: 10;
`

const NavContainer = styled.ul`
margin: 0;
padding: 0;
position: fixed;
bottom: 100px; 
right: 20px;
list-style: none; 
z-index: 10;
background: white;
border-radius: 8px;
`
const NavItem = styled.li`
padding: 10px 10px;
&:hover{
    background: var(--beige); 
    cursor: pointer;
    border-radius: 8px;
}
`