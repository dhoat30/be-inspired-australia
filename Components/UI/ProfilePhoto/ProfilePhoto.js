import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
function ProfilePhoto({ profileImage }) {

    return (

        <ImageStyle
            src={profileImage ? profileImage : '/home/profile-placeholder.png'}
            width="150"
            height="150"
            alt="Profile Image"
        />


    )
}

export default ProfilePhoto

const ImageStyle = styled(Image)`
border-radius: 50% !important;
object-fit: cover;
`
