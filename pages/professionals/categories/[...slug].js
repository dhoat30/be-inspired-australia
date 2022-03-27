import React, { useEffect, useContext } from 'react'
import AuthContext from '../../../store/auth-context'
import Professionals from '../../../Components/Professionals/Professionals'
import ProfessionalDataContext from '../../../store/professional-context'
import { useRouter } from 'next/router'
import cookie from 'cookie'


export default function Professional(props) {
    const authContext = useContext(AuthContext)
    const professionalCtx = useContext(ProfessionalDataContext)
    const { query } = useRouter()
    useEffect(() => {
        if (props.token) {
            authContext.login(props.token)
        }
        professionalCtx.getProfessionalData(props.tradeData)
        fetch('https://inspiry.co.nz/wp-json/wp/v2/trade_professional_categories?_embed')
            .then(res => res.json())
            .then(res => professionalCtx.getProfessionalCategories(res))
            .catch(err => console.log(err))
        fetch('https://inspiry.co.nz/wp-json/wp/v2/trade_professional_tags')
            .then(res => res.json())
            .then(res => {
                professionalCtx.getProfessionalTags(res)
            })
            .catch(err => console.log(err))
    }, [props.tradeData])

    return (

        <Professionals />

    )
}

export async function getServerSideProps(context) {
    const cookies = cookie.parse(context.req.headers.cookie)

    const { params } = context
    const slug = params.slug

    let slugParam
    // select one slug 
    if (slug.length > 1) {
        slugParam = slug[1]

    }
    else {
        slugParam = slug[0]

    }
    const categoryPostResponse = await fetch(`https://inspiry.co.nz/wp-json/inspiry/v1/trade-categories?slug=${slugParam}`)
    const categoryPosts = await categoryPostResponse.json()


    const tradeData = categoryPosts.map(item => {
        return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            // content: item.content.rendered,
            // parent: item.parent,
            // tradeProfessionalCategories: item.trade_professional_categories,
            // tradeProfessionalTags: item.trade_professional_tags,
            acf: item.acf,
        }
    })

    return {
        props: {
            tradeData: tradeData,
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken
        }
    }
}

