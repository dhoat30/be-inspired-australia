import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import MediumTitle from '../../UI/Titles/Titles/MediumTitle'
function ProfilePicture({ userData }) {
    return (
        <Container>
            {userData.data[0] ?
                <ImageStyle
                    src={userData.data[0].profileImage ? userData.data[0].profileImage : "/home/profile-placeholder.png"}
                    width="92"
                    height="92"
                    alt={userData.data[0].firstName}
                /> : null
            }

            <div>
                {userData.data[0].firstName || userData.data[0].lastName ?
                    <React.Fragment>
                        <MediumTitleStyle>{userData.data[0].firstName}</MediumTitleStyle>
                        <MediumTitleStyle>{userData.data[0].lastName}</MediumTitleStyle>
                    </React.Fragment>
                    :
                    <MediumTitleStyle>{userData.data[0].username}</MediumTitleStyle>
                }

            </div>
        </Container>
    )
}

export default ProfilePicture
const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
align-items: center;
width: 300px;
`
const ImageStyle = styled(Image)`
border-radius: 50% !important;
object-fit: cover;
`
const MediumTitleStyle = styled(MediumTitle)`
font-weight: 700 !important;
letter-spacing: .02rem;
margin: 0 0 0 20px;
color: var(--darkGrey);
`