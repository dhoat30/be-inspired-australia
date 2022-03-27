import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Dashboard from '../../../Components/DashBoard/Dashboard'
import axios from 'axios'
import BoardsDataContext from '../../../store/boards-data-context'
import cookie from 'cookie'
import AuthContext from '../../../store/auth-context'

export default function AllPins(props) {
    const [authToken, setAuthToken] = useState('')
    const router = useRouter()
    const authContext = useContext(AuthContext)
    const boardsDataCtx = useContext(BoardsDataContext)
    useEffect(() => {
        // get sessions
        if (!props.token) {
            router.push('/')
        }
        else {
            setAuthToken({
                token: props.token
            })
            authContext.login(props.token)
            // fetch user data
            axios.post('/home/api/projects/get-user-pins')
                .then(res => {
                    boardsDataCtx.getUserPinsData(res.data.data)
                })
                .catch(err => console.log(err))
        }
    }, [])
    return (
        <Dashboard authToken={authToken} />
    )
}

export async function getServerSideProps(context) {
    const cookies = cookie.parse(context.req.headers.cookie)
    if (!cookies.inpiryAuthToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}

