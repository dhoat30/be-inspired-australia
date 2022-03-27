import AllPins from '../../Components/Pins/AllPins'
import React, { useEffect, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import cookie from 'cookie'

export default function Pins(props) {
    const authContext = useContext(AuthContext)
    useEffect(() => {
        if (props.token) {
            authContext.login(props.token)
        }
    }, [])

    return (
        <React.Fragment>
            <AllPins projectData={props.projectData} />
        </React.Fragment>
    )
}

export async function getServerSideProps(context) {
    let headerCookie = context.req.headers.cookie

    if (typeof headerCookie !== 'string') {
        headerCookie = '';
    }
    const cookies = cookie.parse(headerCookie)

    const response = await fetch("http://inspiry.co.nz/wp-json/inspiry/v1/get-all-pins")
    const data = await response.json()
    const projectData = data.map(item => {
        return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            gallery: item.pinImage,
            tradeProfessional: item.tradeProfessional,
            tradeProfessionalID: item.tradeProfessionalID
        }
    })

    return {
        props: {
            projectData: projectData,
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}