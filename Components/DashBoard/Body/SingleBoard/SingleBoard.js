import React, { useState, useEffect, useContext } from 'react'
import BoardsDataContext from '../../../../store/boards-data-context'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/pro-solid-svg-icons'
import SingleBoardNavbar from '../../../UI/Navbars/SingleBoardNavbar'
import ResponsiveCards from '../../../UI/Cards/ResponsiveCards/ResponsiveCards'
import EditBoard from '../../../UI/Cards/EditBoard/EditBoard'
import { useRouter } from 'next/router'
import LoadingOverlay from '../../../UI/LoadingOverlay/LoadingOverlay'
import ShareCard from '../../../UI/Cards/ShareCard/ShareCard'
import Overlay from '../../../UI/Overlay/Overlay'
import BackButton from '../../../UI/Button/BackButton'
import UploadImage from './UploadImage/UploadImage'
import NotificationContext from '../../../../store/notification-context'

function SingleBoard() {
    const [clickedPinData, setClickedPinData] = useState()
    const [showEditBoard, setShowEditBoard] = useState(false)
    const [showShareCard, setShowShareCard] = useState(false)
    const [showUploader, setShowUploader] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const router = useRouter()
    // context
    const boardDataCtx = useContext(BoardsDataContext)
    //notification context
    const notificationCtx = useContext(NotificationContext)

    const responsiveCardEditClickHandler = (value) => {
        setClickedPinData(value)
    }

    // delete pin 
    const deletePinHandler = (value) => {
        setShowLoading(true)
        const formData = {
            id: clickedPinData.id
        }

        fetch("/home/api/boards/delete-pin", {
            method: "DELETE",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                setShowLoading(false)
                if (res.data === 200) {
                    router.reload()
                }
                else {
                    notificationCtx.showNotification({
                        title: "Failed",
                        message: "Something went wrong. Please try again."
                    })
                }

            })
            .catch(err => {
                setShowLoading(false)
                console.log(err)
                notificationCtx.showNotification({
                    title: "Failed",
                    message: "Something went wrong. Please reload and try again."
                })
            })
    }
    if (!boardDataCtx.boardsData) {
        return <LoadingOverlay show={true} />
    }

    // get single board data from the array 
    const singleBoardData = boardDataCtx.boardsData.data.filter(item => item.slug === router.query.slug)
    let cards
    if (boardDataCtx.pinsData && boardDataCtx.pinsData[0].pins) {
        cards = boardDataCtx.pinsData.map(item => {
            let image
            let href
            if (item.projectID) {
                image = item.pinImage[0].url
                href = `${process.env.url}/pins/${item.slug}`
            }
            else if (item.tradeID) {
                image = item.pinImage.url
                href = `${process.env.url}/professionals/${item.slug}`
            }
            else if (item.productImage) {
                image = item.productImage
                href = item.slug
            }

            return (
                <ResponsiveCards key={item.id}
                    href={href}
                    imageSrc={image}
                    title={item.title}
                    id={item.id}
                    slug={item.slug}
                    iconClick={responsiveCardEditClickHandler}
                    singleBoard={true}
                    deletePin={deletePinHandler}
                />
            )
        })
    }
    // show uploaded images 
    let uploadedImages
    if (boardDataCtx.pinsData && boardDataCtx.pinsData[0].gallery) {
        console.log(boardDataCtx.pinsData[0].gallery)
        uploadedImages = boardDataCtx.pinsData[0].gallery.map(item => {
            return (
                <ResponsiveCards key={item.ID}
                    href={item.url}
                    imageSrc={item.url}
                    title={item.title}
                    id={item.id}
                    slug={item.url}
                    iconClick={responsiveCardEditClickHandler}
                    uploadedImages={true}
                    singleBoard={true}
                    deletePin={deletePinHandler}
                />
            )
        })
    }

    // share url 
    const shareUrl = `${process.env.url}${router.asPath}`

    let lock
    if (!boardDataCtx.pinsData || (!boardDataCtx.pinsData[0])) {
        lock = null
    }
    else {
        lock = (<LockIconContainer>{(boardDataCtx.pinsData[0].status === "private") || !boardDataCtx.pinsData[0] ?
            <FontAwesomeIcon icon={faLock} /> :
            <FontAwesomeIcon icon={faUnlock} />
        }</LockIconContainer>)
    }
    return (
        <React.Fragment>

            <SingleBoardContainer>
                <FlexContainer>
                    <BackButton onClick={() => router.back()} />
                    {!boardDataCtx.pinsData ? null :
                        <SectionTitleStyle >{!boardDataCtx.pinsData[0] ? "Design Board" : boardDataCtx.pinsData[0].parentName}
                            {lock}
                        </SectionTitleStyle>
                    }
                    <SingleBoardNavbar
                        align="right"
                        showUploadOption={boardDataCtx.pinsData && boardDataCtx.pinsData[0].status === "private"}
                        editClickPass={() => setShowEditBoard(true)}
                        shareClickPass={() => setShowShareCard(showShareCard ? false : true)}
                        uploadClickPass={() => setShowUploader(true)}
                    />

                </FlexContainer>
                <Container>
                    {cards}
                    {uploadedImages}
                </Container>

            </SingleBoardContainer>
            {showEditBoard ? <EditBoard data={singleBoardData[0]} closeHandlerPass={() => setShowEditBoard(false)} /> : null}

            {showShareCard ? <ShareCardStyle url={shareUrl} /> : null}

            {showShareCard || showUploader ? <Overlay
                onClick={() => {
                    setShowShareCard(false)
                    setShowUploader(false)
                }} /> : null}

            {showUploader &&
                <UploadImage
                    parentSlug={boardDataCtx.pinsData[0].parentSlug}
                    parentBoardID={boardDataCtx.pinsData[0].parentID}
                />
            }

            <LoadingOverlay show={showLoading} />
        </React.Fragment>
    )
}

export default SingleBoard
const SingleBoardContainer = styled.section`
padding: 20px 30px; 

@media (max-width: 500px ){ 
        padding: 20px 5px;
    }

@media (max-width: 650px ) { 
    padding: 50px 10px;
}
`
const Container = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
`

const SectionTitleStyle = styled(SectionTitle)`
color: var(--lightGrey);
@media (max-width: 650px ) { 
   font-size: 1.2rem;
}
`
const LockIconContainer = styled.div`
font-size: 18px;
display: inline-block;
margin-left: 10px;
`
const FlexContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
margin-bottom: 30px;
@media (max-width: 800px){ 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
`

const ShareCardStyle = styled(ShareCard)`
 position: absolute !important;
 top: 50% !important;
 left: 50% !important;  
transform: translate(-50%, -50%);
`