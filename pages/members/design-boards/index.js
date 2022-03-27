import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Dashboard from '../../../Components/DashBoard/Dashboard'
import axios from 'axios'
import BoardsDataContext from '../../../store/boards-data-context'
import cookie from 'cookie'
import AuthContext from '../../../store/auth-context'
import LoadingOverlay from '../../../Components/UI/LoadingOverlay/LoadingOverlay'
export default function EditProfile(props) {
    const [authToken, setAuthToken] = useState('')
    const router = useRouter()
    const boardsDataCtx = useContext(BoardsDataContext)
    const authContext = useContext(AuthContext)

    useEffect(() => {
        console.log(authContext.token)
        // get sessions
        if (!props.token) {
            router.push('/')
        }
        else {
            setAuthToken({
                token: props.token
            })
            authContext.login(props.token)
            // get boards
            axios.post('/home/api/boards/boards', {
                token: props.token
            })
                .then(res => {
                    if (!res.data.data.data) {
                        boardsDataCtx.getBoardsData(res.data)
                    }
                })
                .catch(err => console.log(err))
        }
    }, [])

    if (!boardsDataCtx.boardsData) {
        return <LoadingOverlay show="true" />
    }

    return (
        <Dashboard authToken={authToken} />
    )
}

export async function getServerSideProps(context) {
    const cookies = cookie.parse(context.req.headers.cookie)
    return {
        props: {
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}

