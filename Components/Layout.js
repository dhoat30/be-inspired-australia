import React, { useContext, useEffect } from 'react'
import Header from './Header/Header'
import Notification from './UI/Notifications/Notification'
import NotificationContext from '../store/notification-context'
import UserDataContext from '../store/user-data-context'
import AuthContext from '../store/auth-context'
import axios from 'axios'
import BoardsDataContext from '../store/boards-data-context'
import { useRouter } from 'next/router'
import Router from 'next/router'
import ModalContext from '../store/modal-context'
import Login from "./UI/LoginModal/LoginModal"
import Overlay from './UI/Overlay/Overlay'
import Footer from './UI/Footer/Footer'
import styled from 'styled-components'
import LoadingOverlay from './UI/LoadingOverlay/LoadingOverlay'
import LoadingContext from '../store/loading-context'

function Layout(props) {
    const notificationCtx = useContext(NotificationContext)
    const activeNotification = notificationCtx.notification
    const userDataCtx = useContext(UserDataContext)
    const authCtx = useContext(AuthContext)
    const loginCtx = useContext(ModalContext)
    const loadingCtx = useContext(LoadingContext)

    // boards data context 
    const router = useRouter()
    const boardsDataCtx = useContext(BoardsDataContext)



    // loading overlay context
    useEffect(() => {
        if (!userDataCtx.userData && authCtx.token) {
            // get user data
            axios({
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authCtx.token}`
                },
                url: `https://inspiry.co.nz/wp-json/inspiry/v1/get-user`,
                data: {
                    userID: 1
                }
            })
                .then(response => {
                    userDataCtx.getUserData(response)

                }).catch(err => {
                    console.log(err.response)
                })

            // get boards
            axios.post('/home/api/boards/boards', {
                token: authCtx.token
            })
                .then(res => {
                    if (!res.data.data.data) {
                        boardsDataCtx.getBoardsData(res.data)
                        if (res.data.data.length === 0) {
                            createBoard()
                        }
                    }
                })
                .catch(err => console.log(err))
        }
        // authCtx.login(authToken.token)
    }, [userDataCtx.userData, authCtx.token])


    function createBoard() {

        const body = {
            boardName: "Demo",
            status: "private",
            token: authCtx.token
        }
        fetch('/home/api/boards/create-board', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {

                if (!res.data.code) {
                    router.reload()
                }
                else {
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    // show loading overlay
    Router.events.on('routeChangeStart', (url) => {
        console.log(url)
        loadingCtx.getShowLoadingOverlay(true)
    })

    // hide  loading overlay 
    Router.events.on('routeChangeComplete', (url) => {
        console.log(url)
        loadingCtx.getShowLoadingOverlay(false)
    })

    return (
        <div>
            <Header></Header>
            <Main>{props.children}</Main>
            <LoadingOverlay show={loadingCtx.showLoadingOverlay} />
            <Footer />
            {activeNotification ? <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} /> : null}
            {loginCtx.loginModal ?
                <React.Fragment>
                    <Login />
                    <Overlay show={loginCtx.loginModal} />
                </React.Fragment> : null
            }
        </div>
    )
}

export default Layout
const Main = styled.section`
min-height: 90vh;
`