import React, { useState, useEffect, useContext } from 'react'
import cookie from 'cookie'
import EditProject from '../../../../Components/DashBoard/Body/AllProjects/EditProject'
import AuthContext from '../../../../store/auth-context'
import { useRouter } from 'next/router'

function EditProjects(props) {
    const [authToken, setAuthToken] = useState('')
    const authContext = useContext(AuthContext)
    const router = useRouter()

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
        <EditProject singleProjectData={props.singleProjectData} />
    )
}

export default EditProjects

export async function getServerSideProps(context) {
    const cookies = cookie.parse(context.req.headers.cookie)

    const { params } = context
    const slug = params.slug

    let body = {
        slug: params.slug
    }
    const response = await fetch('https://inspiry.co.nz/wp-json/inspiry/v1/get-single-user-pin', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.inpiryAuthToken}`
        },
        redirect: 'follow'
    })

    const data = await response.json()
    let singleProjectData
    if (data) {
        singleProjectData = {
            title: data[0].title,
            projectCategories: data[0].postCategory,
            tradeProfessional: data[0].tradeProfessional,
            tradeProfessionalID: data[0].tradeProfessionalID,
            websiteLink: data[0].websiteLink,
            description: data[0].description,
            id: data[0].id,
            pinImage: data[0].pinImage,
            slug: data[0].slug
        }
    }
    return {
        props: {
            singleProjectData: singleProjectData,
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}