import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import ProfilePicture from './ProfilePicture/ProfilePicture'
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay'
import styled from 'styled-components'
import SideNavbar from './SideNavbar/SideNavbar'
import Body from './Body/Body'
import UserDataContext from '../../store/user-data-context'
import AuthContext from '../../store/auth-context'
function Dashboard({ authToken }) {
    const [userData, setUserData] = useState('')
    // auth context
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        // register request
        if (!userData && authToken.token) {
            // get user data
            axios({
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken.token}`
                },
                url: `https://inspiry.co.nz/wp-json/inspiry/v1/get-user`,
                data: {
                    userID: 1
                }
            })
                .then(response => {
                    console.log(response)
                    setUserData(response)
                }).catch(err => {
                    console.log(err)
                })
        }
        authCtx.login(authToken.token)
    }, [authToken.token])

    return (
        <React.Fragment>
            {userData ?
                <Container>
                    <Sidebar>
                        <ProfilePicture userData={userData} />
                        <SideNavbar
                        />
                    </Sidebar>
                    <Body
                        userData={userData}
                        authToken={authToken}
                    />
                </Container>
                : <LoadingOverlay show={true} />}
        </React.Fragment>
    )
}

export default Dashboard
const Container = styled.section`
min-height: 100vh;
height: auto;
background: var(--offWhite);
display: flex;
`
const Sidebar = styled.div`
    padding: 100px 0;
    margin: 0 20px;
    width: 350px;
    @media (max-width: 1200px){ 
        display: none;
    }
`
