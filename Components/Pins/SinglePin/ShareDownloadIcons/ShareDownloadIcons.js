import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/pro-duotone-svg-icons'
import Share from '../../../UI/Icons/Share'
import styled from 'styled-components'
import ShareCard from '../../../UI/Cards/ShareCard/ShareCard'
import { useRouter } from 'next/router'

function ShareDownloadIcons(props) {
    const [showShareCard, setShowShareCard] = useState(false)
    const router = useRouter()

    const shareClickHandler = () => {
        setShowShareCard(showShareCard ? false : true)
    }
    const downloadClickHandler = e => {
        e.preventDefault()
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.jpg"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // share url 
    const shareUrl = `${process.env.url}${router.asPath}`
    return (
        <Container>
            <Share clicked={shareClickHandler} />
            <IconContainer>
                <Anchor
                    href={props.src}
                    download
                    onClick={downloadClickHandler}
                >
                    <IconStyle icon={faDownload} />
                </Anchor>

            </IconContainer>

            {showShareCard ? <ShareCard url={shareUrl} /> : null}
        </Container>
    )
}

export default ShareDownloadIcons
const Container = styled.div`
position: relative;

`
const IconStyle = styled(FontAwesomeIcon)`
font-size: 25px;

`
const IconContainer = styled.div`
display: inline-block;
padding: 8px 12px 8px 10px;
border-radius: 50%;
&:hover{
    background: var(--beige);
    cursor: pointer;
}
`

const Anchor = styled.a`
color: var(--darkGrey);
`