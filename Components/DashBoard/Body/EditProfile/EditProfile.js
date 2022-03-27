import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
import Form from './Form/Form'
function EditProfile({ userData, authToken, optionsData }) {
    return (
        <Container>
            <SectionTitle showUnderline="true"> Edit Profile</SectionTitle>
            {optionsData ?
                <Form userData={userData} optionsData={optionsData} authToken={authToken} />
                : null
            }
        </Container>
    )
}
export default EditProfile

const Container = styled.div`
    padding: 20px 30px;
    @media (max-width: 500px ){ 
        padding: 20px 5px;
    }
`