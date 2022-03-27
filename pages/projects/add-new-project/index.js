import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import AddProject from '../../../Components/Project/AddProject/AddProject'
import React from 'react'
import cookie from 'cookie'
import AuthContext from '../../../store/auth-context'

export default function Home(props) {
    const [authToken, setAuthToken] = useState('')
    const router = useRouter()
    const authContext = useContext(AuthContext)

    useEffect(() => {

        if (!props.token) {
            router.push('/')
        }
        else {
            setAuthToken(props.token)
            authContext.login(props.token)
        }
    }, [router])
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