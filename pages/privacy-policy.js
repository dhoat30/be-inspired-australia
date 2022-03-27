import LoggedOut from '../Components/LoggedOut/LoggedOut'
import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import AuthContext from '../store/auth-context'


export default function PrivacyPolicy({ typewriterData, pinsData }) {
  const authContext = useContext(AuthContext)

  const router = useRouter()
  useEffect(() => {


  }, [])

  return (
    <div>policy</div>
  )
}
