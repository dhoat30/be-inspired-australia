import React, { useEffect, useContext } from 'react'
import JoinTrade from '../../Components/JoinTrade/JoinTrade'
import cookie from 'cookie'
import AuthContext from '../../store/auth-context'
import Head from 'next/head'
import SEO from '../../Components/SEO'

export default function Professional(props) {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if (props.token) {
            authContext.login(props.token)
        }
    }, [])

    let seo = {
        title: "Join Trade | Add Trade Listing | Inspiry",
        description: "Join trade, add your listing and publish your projects. Show your listing and projects to more than 30K visitor every month.",
        imageSrc: "/home/join-trade.jpg"
    }

    return (
        <React.Fragment>
            <SEO seo={seo} />
            <JoinTrade />

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