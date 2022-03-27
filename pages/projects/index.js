import { useEffect } from 'react'
import { useRouter } from 'next/router'
import cookie from 'cookie'
import AuthContext from '../../store/auth-context'
export default function Home(props) {
    const router = useRouter()
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if (!props.token) {
            router.push('/')
        }
    }, [router])



    return (
        <h1>project index</h1>
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