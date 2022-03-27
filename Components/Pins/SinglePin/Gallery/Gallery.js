import React from 'react'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import styled from 'styled-components';
import Image from 'next/image'
import Link from 'next/link'
function Gallery({ pinData }) {
    const images = pinData.gallery.map(item => {
        return (
            <Link passHref href={item.url} key={item.ID}>
                <ImageAnchor href={item.url}>
                    <ImageStyle
                        src={item.url}
                        alt={item.title}
                        layout="fill" />
                </ImageAnchor>
            </Link>
        )
    })
    return (
        <Container>
            <SimpleReactLightbox>
                <SRLWrapper>
                    {images}
                </SRLWrapper>
            </SimpleReactLightbox>
        </Container>
    )
}

export default Gallery
const Container = styled.section`
    width: 95%;
    max-width: 1000px;
    margin: 0 auto;
`
const ImageAnchor = styled.a`
    width: 100%;
    height: 600px;
    position: relative;
    display: block;
    margin: 30px 0;
    
`
const ImageStyle = styled(Image)`
 object-fit: cover;
`