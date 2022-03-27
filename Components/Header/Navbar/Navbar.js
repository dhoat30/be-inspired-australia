import React, { useState, useContext } from 'react'
import Menu from '../../UI/Menu/Menu'
import styled from 'styled-components'
import Button from '../../UI/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons'
import ModalContext from '../../../store/modal-context'
import ProfileNavbar from './ProfileNavbar/ProfileNavbar'
import UserDataContext from '../../../store/user-data-context'
import Image from 'next/image'

const menuItems = [
    {
        title: "Pins",
        url: "/pins",
        linkType: "local"
    },
    {
        title: "Shop",
        url: "https://inspiry.co.nz/products",
        linkType: "remote"
    },
    {
        title: "Professionals",
        url: "/professionals",
        linkType: "local"
    },
    {
        title: "Blog",
        url: "https://inspiry.co.nz/inspiry-blogs/",
        linkType: "remote"
    }
]

function Navbar({ registerClickButtonPass }) {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showProfileNavbar, setShowProfileNavbar] = useState(false)
    // login modal context 
    const modalCtx = useContext(ModalContext)
    const loginModal = modalCtx.loginModal
    //  user data context
    const userDataCtx = useContext(UserDataContext)

    const showMenuHandler = () => {
        setShowMobileMenu(true)
    }

    const hideMenuHandler = () => {
        setShowMobileMenu(false)
    }

    // show login modal handler with login modal Context 
    const showLoginModalHandler = () => {
        modalCtx.showLoginModal()
    }

    // show profile navbar
    const arrowDownClickHandler = () => {
        setShowProfileNavbar(showProfileNavbar ? false : true)
    }

    // hide profile navbar on link Click 
    const profileLinkClickHandler = () => {
        setShowProfileNavbar(false)
    }

    return (
        <React.Fragment>
            <FlexContainer onClick={() => setShowMobileMenu(false)}>
                {!userDataCtx.userData ?
                    null :
                    <ProfileButtonContainerMobile>
                        {userDataCtx.userData.data[0].profileImage ?
                            <ImageStyle src={userDataCtx.userData.data[0].profileImage} width="35px" height="35px" layout="fixed" alt={"Profile Image"} />
                            :
                            <ProfileButton>
                                {userDataCtx.userData.data[0].firstName ? userDataCtx.userData.data[0].firstName.charAt(0)

                                    : userDataCtx.userData.data[0].username.charAt(0)}
                            </ProfileButton>
                        }
                        <ProfileButton onClick={arrowDownClickHandler}><FontAwesomeIcon icon={showProfileNavbar ? faChevronUp : faChevronDown} /></ProfileButton>
                    </ProfileButtonContainerMobile>
                }

                <Container showMobileMenu={showMobileMenu}>
                    <Menu menuItems={menuItems} />

                    {!userDataCtx.userData ?
                        <Buttons>
                            <ButtonStyle onClick={showLoginModalHandler}>Log in</ButtonStyle>
                            <ButtonStyle bkColor="var(--beige)" onClick={() => registerClickButtonPass()}>Register</ButtonStyle>
                        </Buttons>
                        :
                        <ProfileButtonContainer>
                            {userDataCtx.userData.data[0].profileImage ?

                                <ImageStyle
                                    alt="Profile Image"
                                    src={userDataCtx.userData.data[0].profileImage} width="35px" height="35px" layout="fixed" />

                                :
                                <ProfileButton>
                                    {userDataCtx.userData.data[0].firstName ? userDataCtx.userData.data[0].firstName.charAt(0)

                                        : userDataCtx.userData.data[0].username.charAt(0)}
                                </ProfileButton>
                            }
                            <ProfileButton onClick={arrowDownClickHandler}><FontAwesomeIcon icon={showProfileNavbar ? faChevronUp : faChevronDown} /></ProfileButton>
                        </ProfileButtonContainer>
                    }

                </Container>
            </FlexContainer>

            {showMobileMenu ?
                <IconStyle icon={faTimes} onClick={hideMenuHandler} /> :
                <IconStyle icon={faBars} onClick={showMenuHandler} />
            }

            {showProfileNavbar ?
                <ProfileNavbar profileLinkClick={profileLinkClickHandler} /> :
                null
            }

        </React.Fragment>
    )
}

export default Navbar
const FlexContainer = styled.div`
display: flex;
justify-content: flex-end;

`
const Container = styled.div`
width: 500px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
background: white;
height: 50px;

@media(max-width: 1000px){ 
    box-shadow: var(--boxShadow);
    width: 250px;
    flex-direction: column ;
    position: absolute;
    top: 50px;
    right: 0;
    display: ${(props) => !props.showMobileMenu ? "none" : "block"};
    z-index: 15;
    background: white;
  
}
`
const Buttons = styled.div`

display: flex;
flex-direction: row;
width: 100%;
max-width: 230px;
justify-content: space-between;
padding-left: 20px;
background: white;
@media(max-width: 1000px){ 
    margin: 0 auto 0  0;
    flex-direction: column ;
    padding: 0 5px 10px 5px;
    max-width: 300px;

}
`

const ButtonStyle = styled(Button)`
    margin: 5px 0;
    display: block;
`

// font awesome 
const IconStyle = styled(FontAwesomeIcon)`
@media (min-width: 1000px){
    display: none;
}

margin-left: 20px;
 font-size: 35px;
 &:hover{ 
     cursor: pointer;
 }
  @media (max-width: 450px){ 
    font-size: 35px;
} 
`
const ProfileButtonContainer = styled.div`
    width: 80px;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
    background: white;
    @media (max-width: 1000px ){ 
   display: none;
}
`
const ProfileButtonContainerMobile = styled.div`
  width: 80px;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-left: 20px;
    background: white;
    display: none;
   
    @media (max-width: 1000px ){ 
   display: flex;
}
`
const ProfileButton = styled.div`
 background: var(--beige);
 border: none;
 border-radius: 50%;
cursor: pointer;
 font-size: 1.3rem;
 padding: 2px 10px;
text-transform: capitalize;
`

const ImageStyle = styled(Image)`
    object-fit: cover;
    border-radius: 50%;
`