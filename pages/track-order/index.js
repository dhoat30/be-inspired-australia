
import cookie from 'cookie'
import React, { useEffect, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import TrackOrder from '../../Components/Pages/TrackOrder/TrackOrder'

export default function TrackOrderPage(props) {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if (props.token) {
            authContext.login(props.token)
        }
    }, [])

    return (

        < React.Fragment >
            <TrackOrder />
        </React.Fragment >

    )
}

export async function getServerSideProps(context) {
    let headerCookie = context.req.headers.cookie

    if (typeof headerCookie !== 'string') {
        headerCookie = '';
    }
    // check if user is login 
    const cookies = cookie.parse(headerCookie)
    if (cookies.inpiryAuthToken) {
        return {
            redirect: {
                destination: "/members/order-history",
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