import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import BoardsDataContext from '../../../store/boards-data-context'
import AuthContext from '../../../store/auth-context'
import Dashboard from '../../../Components/DashBoard/Dashboard'
import LoadingOverlay from '../../../Components/UI/LoadingOverlay/LoadingOverlay'
import cookie from 'cookie'

function SingleDesignBoard(props) {
    const [authToken, setAuthToken] = useState('')

    // pins data context 
    const boardsDataCtx = useContext(BoardsDataContext)
    const authCtx = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if (!props.token) {
            router.push('/')
        }
        else {
            setAuthToken({
                token: props.token
            })
            authCtx.login(props.token)
            // get boards
            // clear pins data
            boardsDataCtx.getPinsData('')
            axios.post('/home/api/boards/get-pins', {
                token: props.token,
                slug: props.singleBoardData.slug
            })
                .then(res => {
                    if (!res.data.data.data) {
                        boardsDataCtx.getPinsData(res.data.data)
                    }
                    else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }

    }, [])

    return (
        <div>
            <Dashboard authToken={authToken} />
            <LoadingOverlay show={!boardsDataCtx.pinsData} />
        </div>
    )
}

export default SingleDesignBoard

export async function getServerSideProps(context) {
    const cookies = cookie.parse(context.req.headers.cookie)

    const { params } = context
    const slug = params.slug

    const singleBoardData = {
        slug: slug
    }
    return {
        props: {
            singleBoardData: singleBoardData,
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}