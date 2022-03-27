import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import AddProject from '../../../Components/Project/AddProject/AddProject'
import React from 'react'
import cookie from 'cookie'
import AuthContext from '../../../store/auth-context'
import UserDataContext from '../../../store/user-data-context'
export default function Home(props) {
    const [authToken, setAuthToken] = useState('')
    const router = useRouter()
    const authContext = useContext(AuthContext)
    const userDataCtx = useContext(UserDataContext)
    useEffect(() => {

        if (!props.token) {
            router.push('/professionals')
        }
        else {
            console.log(userDataCtx.userData)
            setAuthToken(props.token)
            authContext.login(props.token)
            if (userDataCtx.userData && userDataCtx.userData.data[0].userRole[0] !== "trade_professional") {
                router.push('/professionals')
            }
        }
    }, [router, userDataCtx.userData])
    return (
        <React.Fragment>
            {authToken ? <AddProject authToken={authToken} /> : null}
        </React.Fragment>
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