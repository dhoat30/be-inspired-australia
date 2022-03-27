
import React, { useEffect, useContext } from 'react'
import SinglePin from '../../Components/Pins/SinglePin/SinglePin'
import AuthContext from '../../store/auth-context'
import cookie from 'cookie'
import SEO from '../../Components/SEO'
export default function SinglePinPage(props) {
    const authContext = useContext(AuthContext)
    useEffect(() => {
        if (props.token) {
            authContext.login(props.token)
        }
    }, [])
    let seo = {
        title: props.pinData.title,
        description: props.pinData.description,
        imageSrc: props.pinData.gallery[0].url
    }
    return (
        <React.Fragment>
            <SEO seo={seo} />
            <SinglePin pinData={props.pinData} />
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    let headerCookie = context.req.headers.cookie

    if (typeof headerCookie !== 'string') {
        headerCookie = '';
    }
    const cookies = cookie.parse(headerCookie)

    const { params } = context
    const pinID = params.pid
    const response = await fetch(`http://inspiry.co.nz/wp-json/inspiry/v1/get-pin?slug=${pinID}`)
    const data = await response.json()
    let pinData = {}

    if (data) {
        pinData = {
            id: data[0].id,
            title: data[0].title,
            gallery: data[0].gallery,
            website: data[0].website ? data[0].website : null,
            description: data[0].description,
            authorMeta: data[0].authorInfo,
            tradeProfessionalID: data[0].tradeProfessionalID
        }
    }

    return {
        props: {
            pinData: pinData,
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}