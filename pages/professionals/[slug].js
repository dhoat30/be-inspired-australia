import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import ProfessionalDataContext from '../../store/professional-context'
import SingleProfessional from '../../Components/Professionals/SingleProfessional/SingleProfessional'
import cookie from 'cookie'
import SEO from '../../Components/SEO'

function SingleProfessionalPage(props) {
    const [authToken, setAuthToken] = useState('')
    // pins data context 
    const authCtx = useContext(AuthContext)
    const professionalDataCtx = useContext(ProfessionalDataContext)
    useEffect(() => {
        if (props.token) {
            authCtx.login(props.token)
        }
        professionalDataCtx.getSingleProfessionalData(props.singleProfessionalData)
    }, [])

    let seo = {
        title: props.singleProfessionalData.title,
        description: props.singleProfessionalData.content,
        imageSrc: props.singleProfessionalData.acf.logo.url
    }

    return (
        <React.Fragment>
            <SEO seo={seo} />
            <SingleProfessional singleProfessionalData={props.singleProfessionalData} />
        </React.Fragment>

    )
}

export default SingleProfessionalPage

export async function getServerSideProps(context) {
    let headerCookie = context.req.headers.cookie

    if (typeof headerCookie !== 'string') {
        headerCookie = '';
    }
    const cookies = cookie.parse(headerCookie)

    const { params } = context
    const slug = params.slug
    const response = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/trade-professionals?slug=${slug}`)
    const data = await response.json()

    const projectResponse = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/projects`)
    const projectData = await projectResponse.json()


    let singleProfessionalData

    if (data && projectData) {
        let relatedProject = projectData.map(item => {
            if (Number(item.acf.trade_professional_id) === data[0].id) {
                return item
            }
            else {
                return null
            }
        })

        singleProfessionalData = {
            id: data[0].id,
            slug: data[0].slug,
            title: data[0].title.rendered,
            content: data[0].content.rendered,
            parent: data[0].parent,
            tradeProfessionalCategories: data[0].trade_professional_categories,
            tradeProfessionalTags: data[0].trade_professional_tags,
            acf: data[0].acf,
            relatedProject: relatedProject
        }
    }
    return {
        props: {
            singleProfessionalData: singleProfessionalData,
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}