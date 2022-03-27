import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHistory, faUser, faPlus } from '@fortawesome/pro-regular-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

function SideNavbar(props) {
    // const [showDesignBoards, setShowDesignBoards] = useState(false)
    // const [showViewOrders, setShowViewOrders] = useState(false)
    // const [showEditProfile, setShowEditProfile] = useState(false)

    const router = useRouter()
    return (
        <Container>
            <Link href="/members/design-boards" passHref>
                <List >
                    <IconStyle icon={faHeart} />
                    Design Boards
                </List>
            </Link>
            <Link href="/members/your-projects" passHref>
                <List >
                    <IconStyle icon={faPlus} />
                    Your Projects
                </List>
            </Link>
            <Link href="/members/order-history" passHref>
                <List >
                    <IconStyle icon={faHistory} />
                    Order History
                </List>
            </Link>
            <Link href="/members/edit-profile" passHref>
                <List >
                    <IconStyle icon={faUser} />
                    Edit Profile
                </List>
            </Link>
        </Container>
    )
}

export default SideNavbar
const Container = styled.ul`
 list-style: none; 
 padding: 0;
 margin-top: 50px;
`

const List = styled.li`
 font-size: 1.2rem;
 font-weight: 500;
 color: var(--darkGrey);
 background: ${props => props.showBackground ? "white" : null};
 box-shadow:  ${props => props.showBackground ? "var(--boxShadow)" : null};
 padding: 25px 20px;
 margin: 10px 0;
 border-radius: var(--cardBorderRadius);
 cursor: pointer;
 &:hover{
     color: black;
     background: white;
     box-shadow: var(--boxShadow);
 }
`
const IconStyle = styled(FontAwesomeIcon)`
 margin-right: 10px;
 font-size: 1.5rem;
 
`