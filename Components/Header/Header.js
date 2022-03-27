import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from '../UI/Logo/Logo'
import Navbar from './Navbar/Navbar'
import Link from 'next/link'
import Search from '../UI/Search/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons'
import Backdrop from '../UI/Backdrop/BackdropSection'
import RegisterModal from '../UI/RegisterModal/RegisterModal'
import Overlay from '../UI/Overlay/Overlay'
import ILogo from '../UI/Logo/ILogo/ILogo'

function Header() {
    const [showSearch, setShowSearch] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)

    // show search bar
    const searchIconHandler = () => {
        setShowSearch(true)
    }
    const hideSearchIconHandler = () => {
        setShowSearch(false)
    }
    return (
        <React.Fragment>
            <Backdrop show={showSearch} clicked={hideSearchIconHandler}></Backdrop>
            <Container>
                <Link href="/" passHref>
                    <a> <LogoStyle showIcon={true} mobile="true" /></a>
                </Link>

                <SearchContainer>
                    <IconStyle icon={faSearch} onClick={searchIconHandler} />
                    <SearchStyle showSearch={showSearch} />
                </SearchContainer>

                <Navbar registerClickButtonPass={() => setShowRegisterModal(true)} />
            </Container>
            {showRegisterModal ? <RegisterModal closeModal={() => setShowRegisterModal(false)} /> : null}
            {showRegisterModal ? <Overlay /> : null}
        </React.Fragment>
    )
}

export default Header

const Container = styled.section`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0 20px;
height: 50px;
position: relative;
@media(max-width:1000px){ 
    padding: 0 10px;
}
@media (max-width: 450px){ 
    justify-content: flex-end;
}
`

const LogoStyle = styled(Logo)`
@media (max-width: 450px){ 
    width: 200px;
    position: absolute;
    top: 8px;
    z-index: -1;
    left: 10px; 
}
`
const SearchContainer = styled.div`
width: 50% !important;
@media(max-width: 600px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
`
const SearchStyle = styled(Search)`
@media(max-width: 600px) {
    display: ${(props) => !props.showSearch ? "none" : "block"};

}
`

const IconStyle = styled(FontAwesomeIcon)`
font-size: 30px;
display: none;
cursor: pointer;
@media(max-width: 600px) {
    display: block;
}
@media (max-width: 450px){ 
    font-size: 20px;
}

`