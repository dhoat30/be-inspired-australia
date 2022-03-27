import { useEffect, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import Professionals from '../../Components/Professionals/Professionals'
import ProfessionalDataContext from '../../store/professional-context'
import { useRouter } from 'next/router'
import cookie from 'cookie'

export default function Professional(props) {
    const authContext = useContext(AuthContext)
    const professionalCtx = useContext(ProfessionalDataContext)
    const { query } = useRouter()

    useEffect(() => {
        professionalCtx.getProfessionalData(props.tradeData)
        professionalCtx.getProfessionalCategories(props.categoryData)
        professionalCtx.getProfessionalTags(props.tagsData)
        if (props.token) {
            authContext.login(props.token)
        }
    }, [])

    return (
        <Professionals />
    )
}

export async function getServerSideProps(context) {
    let headerCookie = context.req.headers.cookie

    if (typeof headerCookie !== 'string') {
        headerCookie = '';
    }
    const cookies = cookie.parse(headerCookie)
    const response = await fetch("https://inspiry.co.nz/wp-json/inspiry/v1/trade-professionals")
    const data = await response.json()

    // get categories data
    const categoryResponse = await fetch("https://inspiry.co.nz/wp-json/wp/v2/trade_professional_categories?_embed")
    const categoryData = await categoryResponse.json()

    // get categories data
    const tagsResponse = await fetch("https://inspiry.co.nz/wp-json/wp/v2/trade_professional_tags")
    const tagsData = await tagsResponse.json()

    const tradeData = data.map(item => {
        return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            content: item.content,
            tradeProfessionalCategories: item.categories,
            tradeProfessionalTags: item.tags,
            acf: item.acf,
        }
    })

    return {
        props: {
            tradeData: tradeData,
            categoryData: categoryData,
            tagsData: tagsData,
            token: !cookies.inpiryAuthToken ? null : cookies.inpiryAuthToken

        }
    }
}