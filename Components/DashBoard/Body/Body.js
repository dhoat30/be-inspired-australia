import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import DesignBoards from './DesignBoards/DesignBoards'
import ViewOrders from './ViewOrders/ViewOrders'
import EditProfile from './EditProfile/EditProfile'
import { useRouter } from 'next/router'
import UserDataContext from '../../../store/user-data-context'
import BoardsDataContext from '../../../store/boards-data-context'
import SingleBoard from './SingleBoard/SingleBoard'
import AllProjects from "./AllProjects/AllProjects"

function Body({ authToken, userData }) {
    const [designBoards, setDesignBoards] = useState('')
    const router = useRouter()
    const userDataCtx = useContext(UserDataContext)
    const boardsDataCtx = useContext(BoardsDataContext)

    useEffect(() => {
        if (!userDataCtx.optionsData) {
            fetch('/home/api/select-options/select-options')
                .then(res => res.json())
                .then(res => {
                    userDataCtx.getOptionsData(res.data[0].acf)
                })
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <BodyContainer>
            {router.asPath === "/members/design-boards" ? <DesignBoards designBoards={boardsDataCtx.boardsData} /> : null}
            {router.asPath === "/members/order-history" ? <ViewOrders /> : null}
            {router.asPath === "/members/your-projects" ?
                <AllProjects />
                : null}
            {router.asPath === "/members/edit-profile" ?
                <EditProfile
                    optionsData={userDataCtx.optionsData}
                    userData={userData}
                    authToken={authToken} />
                : null}

            {router.asPath === "/members/design-boards" || router.asPath === "/members/order-history" || router.asPath === "/members/edit-profile" || router.asPath === "/members/your-projects"
                ? null
                :
                <SingleBoard />}
        </BodyContainer>
    )
}

export default Body
const BodyContainer = styled.section`
width: 100%;
min-height: 500px;
background: white;
margin: 100px 20px 100px 0;
border-radius: var(--cardBorderRadius);
@media (max-width: 1000px){ 
    margin: 100px auto;
}
`
