import React, { useState } from 'react'
import styled from 'styled-components'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faPinterest, faTwitter, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import Paragraph from '../../Titles/Paragraph/Paragraph'

function ShareCard(props) {
    const [copyLink, setCopyLink] = useState('Copy Link')

    const mailShareUrl = `mailto:?subject=I wanted you to see this site&body=Check out this site ${props.url}`
    const clickHandler = (e) => {
        e.preventDefault()
        setCopyLink('Link Copied')
        setTimeout(() => {
            setCopyLink('Copy Link')
        }, 2000)
        navigator.clipboard.writeText(props.url)
    }
    return (
        <Container className={props.className}>
            <MediumTitle align="center">Share this pin</MediumTitle>
            <ShareButton>
                <AnchorStyle href={`https://www.facebook.com/sharer.php?u=${props.url}`} target="_blank">
                    <IconContainer>
                        <FontAwesomeIcon icon={faFacebook} color="#1977F2" size="3x" />
                        <Paragraph align="center">Facebook</Paragraph>
                    </IconContainer>
                </AnchorStyle>

                <AnchorStyle href={`https://www.pinterest.com/pin/create/button?url=${props.url}`} target="_blank">
                    <IconContainer>
                        <FontAwesomeIcon icon={faPinterest} color="#CB2027" size="3x" />
                        <Paragraph align="center">Pinterest</Paragraph>
                    </IconContainer>
                </AnchorStyle>

                <AnchorStyle href={`https://twitter.com/intent/tweet?url=${props.url}`} target="_blank">
                    <IconContainer>
                        <FontAwesomeIcon icon={faTwitter} color="#27C1FF" size="3x" />
                        <Paragraph align="center">Twitter</Paragraph>
                    </IconContainer>
                </AnchorStyle>

                <AnchorStyle href={`whatsapp://send?text=${props.url}`} data-action="share/whatsapp/share" target="_blank">
                    <IconContainer>
                        <FontAwesomeIcon icon={faWhatsappSquare} color="#29D366" size="3x" />
                        <Paragraph align="center">Whatsapp</Paragraph>
                    </IconContainer>
                </AnchorStyle>

                <AnchorStyle href={mailShareUrl} title="Share by Email" target="_blank">
                    <IconContainer>
                        <FontAwesomeIcon icon={faEnvelope} size="3x" />
                        <Paragraph align="center">Email</Paragraph>
                    </IconContainer>
                </AnchorStyle>

                <AnchorStyle href="" onClick={clickHandler}>
                    <IconContainer >
                        <FontAwesomeIcon icon={faLink} size="3x" />
                        <Paragraph align="center">{copyLink}</Paragraph>
                    </IconContainer>
                </AnchorStyle>

            </ShareButton>
        </Container>
    )
}

export default ShareCard
const Container = styled.div`
border-radius: var(--cardBorderRadius);
 box-shadow: var(--boxShadow);
 padding: 10px;
 margin-top: 10px;
 min-width: 350px;
 width:400px;
position: absolute;
z-index: 10; 
background: white;
 @media (max-width :460px){
     width: 100%;
 }
 @media (max-width :400px){
     width: 100%;
     min-width: 240px;
 }
`
const ShareButton = styled.div`
display: flex;
 justify-content: flex-start;
 flex-wrap: wrap;
`
const IconContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 95px;
margin: 15px 0 0 0;
`
const AnchorStyle = styled.a`
text-decoration: none;
color: var(--darkGrey);
cursor: pointer;
`