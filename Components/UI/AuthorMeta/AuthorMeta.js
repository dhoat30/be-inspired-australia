import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import MediumTitle from '../Titles/Titles/MediumTitle'
import Paragraph from '../Titles/Paragraph/Paragraph'
import Link from 'next/link'
function AuthorMeta(props) {

    let imageSrc
    if (props.tradeID) {
        imageSrc = props.profileImage.url
    }
    else {
        imageSrc = props.profileImage
    }
    return (
        <Container>
            <ImageContainer>
                {props.profileImage ? <ImageStyle
                    src={imageSrc} width="60px"
                    height="60px" layout="fixed" alt="profile image" />
                    :
                    <ProfileLetterContainer>
                        <ProfileLetter>{props.authorUserName.charAt(0)} </ProfileLetter>
                    </ProfileLetterContainer>
                }
            </ImageContainer>
            {props.tradeID ?
                <MetaInfo>
                    <Link href={`/professionals/${props.slug}`} passHref>
                        <Anchor>
                            <MediumTitleStyle fontWeight="700">{props.authorUserName}</MediumTitleStyle>
                            {props.company ? <Paragraph>{props.company} </Paragraph> : null}
                            <Paragraph>Trade Professional </Paragraph>
                        </Anchor>
                    </Link>
                </MetaInfo>
                :

                <MetaInfo>
                    <MediumTitleStyle fontWeight="700">{props.authorUserName}</MediumTitleStyle>

                    {/* <Paragraph>{props.company} </Paragraph> */}
                    {/* <Paragraph>Trade Professional </Paragraph> */}
                </MetaInfo>
            }
        </Container>
    )
}

export default AuthorMeta
const Container = styled.div`
display: flex;
align-items: center;
margin: 20px 0;
`
const ImageContainer = styled.div`
margin-right: 10px;
`
const ImageStyle = styled(Image)`
object-fit: cover;
border-radius: 50%;
`
const ProfileLetterContainer = styled.div`
width: 60px;
height: 60px;
background: var(--beige);
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border-radius: 50%;
`
const ProfileLetter = styled.div`
text-transform: capitalize;
font-size: 2.5rem;
font-weight: 700;
margin: 0;
position: relative;
left: 2px;
`
const MediumTitleStyle = styled(MediumTitle)`
margin:0;
font-size: 1rem;
line-height: 1.2rem;
`
const MetaInfo = styled.div`

`
const Anchor = styled.a`
text-decoration: none;
cursor: pointer; 
&:hover{ 
    text-decoration: underline;
}
`