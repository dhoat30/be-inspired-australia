import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Paragraph from '../../../UI/Titles/Paragraph/Paragraph'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faLock, faUnlock } from '@fortawesome/pro-solid-svg-icons'
import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal'
import Overlay from '../../Overlay/Overlay'
import EditModal from '../../Modals/EditModal'
import ShareCard from '../ShareCard/ShareCard'
import { useMediaQuery } from 'react-responsive'

function ResponsiveCards({ deletePin, singleBoard, showPadlock, href, imageSrc, title, iconClick, id, description, status, slug, uploadedImages }) {
    const [showIcon, setShowIcon] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentBoardID, setCurrentBoardID] = useState()
    const [showShareModal, setShowShareModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [clickedPinUrl, setClickedPinUrl] = useState('')

    const isTablet = useMediaQuery({
        query: `(max-width: 1000px)`
    })
    // define card ref 
    let cardRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                console.log("card clicked")
                setShowEditModal(false)
            }
        })
    }, [])

    const iconClickHandler = (e) => {
        e.preventDefault()
        let clickedBoardData = {
            id: id,
            title: title,
            description: description,
            status: status,
            slug: slug,
            url: href,
            uploadedImages: uploadedImages
        }
        iconClick(clickedBoardData)
        setCurrentBoardID(clickedBoardData.id)
        setShowEditModal(true)
        // set sharable url 
        setClickedPinUrl(href)
    }

    // share handler
    const shareClickHandler = (e) => {
        e.preventDefault()
        setShowShareModal(true)

    }
    // delete handler 
    const deleteClickHandler = (e) => {
        e.preventDefault()
        setShowDeleteModal(true)
    }

    // delete confirmation
    const deleteConfirmationClickHandler = () => {
        deletePin(currentBoardID)
    }

    return (
        <React.Fragment>
            {uploadedImages ?
                // don't use if the link is external for example image url
                <PinCard ref={cardRef} href={href} onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
                    {imageSrc ?
                        <ImageStyle src={imageSrc} alt={title} layout="fill" /> :
                        <ImageStyle src="https://inspiry.co.nz/wp-content/uploads/2020/12/icon-card@2x.jpg" alt={title} layout="fill" />
                    }
                    <ParagraphStyle>
                        {showPadlock ? <PadlockIcon icon={status === "publish" ? faUnlock : faLock} /> : null}
                        {title.length > 30 ? title.substring(0, 30) + "..." : title} </ParagraphStyle>

                    {showIcon || isTablet ?
                        <IconContainer onClick={iconClickHandler} >
                            <FontAwesomeIcon icon={faPencil} />
                        </IconContainer> : null
                    }
                    {showEditModal && singleBoard ?
                        <EditModal
                            image={true}
                            onClickDelete={deleteClickHandler}
                        /> :
                        null}
                </PinCard>
                :
                <Link passHref href={href}>
                    <PinCard ref={cardRef} onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
                        {imageSrc ?
                            <ImageStyle src={imageSrc} alt={title} layout="fill" /> :
                            <ImageStyle src="https://inspiry.co.nz/wp-content/uploads/2020/12/icon-card@2x.jpg" alt={title} layout="fill" />
                        }

                        <ParagraphStyle>
                            {showPadlock ? <PadlockIcon icon={status === "publish" ? faUnlock : faLock} /> : null}
                            {title.length > 30 ? title.substring(0, 30) + "..." : title} </ParagraphStyle>

                        {showIcon || isTablet ?
                            <IconContainer onClick={iconClickHandler} >
                                <FontAwesomeIcon icon={faPencil} />
                            </IconContainer> : null
                        }

                        {showEditModal && singleBoard ?
                            <EditModal
                                onClickShare={shareClickHandler}
                                onClickDelete={deleteClickHandler}
                            /> : null}
                    </PinCard>
                </Link>
            }

            {showShareModal ? <ShareCardStyle url={clickedPinUrl} /> : null}
            {/* delete a pin on confirmation  */}
            {showDeleteModal ? <DeleteConfirmationModal
                cancelClick={() => setShowDeleteModal(false)}
                deleteClick={deleteConfirmationClickHandler}
            /> : null}

            {showShareModal || showDeleteModal ? <Overlay
                onClick={() => {
                    setShowShareModal(false)
                    setShowDeleteModal(false)
                }}
            /> : null}

        </React.Fragment>
    )
}

export default ResponsiveCards
const PinCard = styled.a`
position: relative;
height: 400px;
width: calc(25% - 20px );
margin: 20px 20px 70px 0;
color: var(--darkGrey);
box-shadow: var(--boxShadow);
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
const ImageStyle = styled(Image)`
object-fit: cover;
`
const ParagraphStyle = styled(Paragraph)`
font-weight: 600;
position: absolute;
top: calc(100% + 10px);
`
const IconContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    background: var(--beige);
    display: inline-block;
    padding: 10px 15px;
`
const PadlockIcon = styled(FontAwesomeIcon)`
margin-right: 10px;
color: var(--lightGrey);
`
const ShareCardStyle = styled(ShareCard)`
position: fixed;
top: 50%; 
left: 50%; 
transform: translate(-50%, -50%);
`
