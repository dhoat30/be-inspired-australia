
import { useEffect, useContext } from 'react'
import SinglePin from '../../Components/Pins/SinglePin/SinglePin'
import AuthContext from '../../store/auth-context'
import cookie from 'cookie'

export default function SinglePinPage(props) {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if (props.token) {
            authContext.login(props.token)
        }
    }, [])
    return (
        <SinglePin pinData={props.pinData} />
    )
}


export async function getServerSideProps(context) {
    const cookies = cookie.parse(context.req.headers.cookie)

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