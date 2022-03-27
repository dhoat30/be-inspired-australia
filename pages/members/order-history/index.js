import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Dashboard from '../../../Components/DashBoard/Dashboard'
import OrdersDataContext from '../../../store/orders-context'
import cookie from 'cookie'
import AuthContext from '../../../store/auth-context'
export default function EditProfile(props) {
    const router = useRouter()
    const ordersDataCtx = useContext(OrdersDataContext)
    const [authToken, setAuthToken] = useState('')
    const authContext = useContext(AuthContext)


    useEffect(() => {
        if (!props.token) {
            router.push('/')
        }
        else {
            // set auth token for dashboard
            setAuthToken({
                token: props.token
            })
            authContext.login(props.token)
            // get orders data
            const body = {
                token: props.token
            }
            fetch("https://inspiry.co.nz/wp-json/inspiry/v1/get-orders", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.token}`
                },
                method: "POST",
                body: JSON.stringify(body)
            }
            )
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    ordersDataCtx.getOrdersData(res)
                })
                .catch(err => console.log(err))
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