import React from 'react'
import styled from 'styled-components'
import Paragraph from '../../../Titles/Paragraph/Paragraph'
import MediumTitle from '../../../Titles/Titles/MediumTitle'
import Image from "next/image"
import Link from 'next/link'
function Item({ title, img, link }) {
    const lower = title.toLowerCase();
    let capitalizeTitle = lower.charAt(0).toUpperCase() + lower.slice(1);
    return (
        <Link href={link} passHref>
            <Container>
                <ImageContainer>
                    <ImageStyle
                        alt={title}
                        src={img} layout="responsive" width={100} height={100} />
                </ImageContainer>
                <ParagraphStyle setDangerHtml={true}>{capitalizeTitle}</ParagraphStyle>
            </Container>
        </Link>
    )
}

export default Item
const Container = styled.a`
display: flex;
padding: 10px 20px;
text-decoration: none; 
&:hover{ 
    text-decoration: underline; 
}
@media (max-width: 400px ){ 
    padding: 10px 10px;

}
`
const ParagraphStyle = styled(Paragraph)`
text-transform: capitalize;
font-size: 1.1rem ;
margin-left: 20px;
@media (max-width: 400px ){ 
    margin-left: 10px;
}
`
const ImageContainer = styled.div`
width:100px; 
min-width: 100px ;
height: 100px;
@media (max-width: 400px ){ 
    width: 70px;
    min-width: 70px;
    height: 70px;
}
`
const ImageStyle = styled(Image)`
object-fit: cover;
`