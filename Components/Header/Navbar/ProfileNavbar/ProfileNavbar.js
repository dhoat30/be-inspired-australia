import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHistory, faUser, faSignOut, faPlus, faUserHardHat } from '@fortawesome/pro-solid-svg-icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import UserDataContext from '../../../../store/user-data-context'
function ProfileNavbar(props) {
    const router = useRouter()
    const userDataCtx = useContext(UserDataContext)
    const logoutHandler = () => {
        // signOut()
        axios.post("/home/api/logout")
            .then(res => router.reload())
            .catch(err => console.log(err.response))
    }

    const linkClickHandler = () => {
        props.profileLinkClick()
    }
    console.log(userDataCtx.userData.data[0].userRole[0])
    return (
        <Container>
            <ListStyle onClick={linkClickHandler}>
                <Link href="/members/design-boards" passHref><LinkStyle><IconStyle icon={faHeart} />Design boards</LinkStyle></Link>
            </ListStyle>
            <ListStyle onClick={linkClickHandler}>
                <Link href="/members/order-history" passHref><LinkStyle><IconStyle icon={faHistory} />Order history</LinkStyle></Link>
            </ListStyle>
            <ListStyle onClick={linkClickHandler}>
                <Link href="/projects/add-new-project" passHref><LinkStyle><IconStyle icon={faPlus} />Add project</LinkStyle></Link>
            </ListStyle>
            <ListStyle onClick={linkClickHandler}>
                <Link href="/members/edit-profile" passHref><LinkStyle><IconStyle icon={faUser} />Edit profile</LinkStyle></Link>
            </ListStyle>
            {userDataCtx.userData.data[0].userRole[0] !== "trade_professional" ?
                <ListStyle onClick={linkClickHandler}>
                    <Link href="/join-trade" passHref><LinkStyle><IconStyle icon={faUserHardHat} />Join as a professional </LinkStyle></Link>
                </ListStyle> : null
            }

            <ListStyle key="115462" onClick={logoutHandler}><IconStyle icon={faSignOut} />Log out</ListStyle>
        </Container>
    )
}

export default ProfileNavbar

const Container = styled.ul`
background: white;
display: flex;
flex-direction: column;
list-style: none;
box-shadow: var(--boxShadow);
max-width: 250px;
width: 100%;
position: absolute;
top: 35px;
right: 20px;
padding: 0;
z-index: 10;
background: white;
`

const ListStyle = styled.li`
 cursor: pointer;
 color: var(--darkGrey);
 padding: 10px 10px;
 display: block;

`
const LinkStyle = styled.a`
cursor: pointer;
 color: var(--darkGrey);
 display: block;
 text-decoration: none;
&:hover{ 
    color: black;
}
`
const IconStyle = styled(FontAwesomeIcon)`
display: inline-block;
margin-right: 10px;
`