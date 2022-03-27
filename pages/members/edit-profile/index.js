import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Dashboard from '../../../Components/DashBoard/Dashboard'
import cookie from 'cookie'
import AuthContext from '../../../store/auth-context'

export default function EditProfile(props) {
    const [authToken, setAuthToken] = useState('')
    const router = useRouter()
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if (!props.token) {
            router.push('/')
        }
        else {
            setAuthToken({
                token: props.token
            })
        }

    }, [router])

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