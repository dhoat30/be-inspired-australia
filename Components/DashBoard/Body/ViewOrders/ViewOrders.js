import React, { useState } from 'react'
import styled from 'styled-components'
import BackButton from '../../../UI/Button/BackButton'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
import AllOrders from './AllOrders/AllOrders'
import { useRouter } from 'next/router'

function ViewOrders() {
    const [showBackButton, setShowBackButton] = useState(false)
    const router = useRouter()
    const backClickHandler = () => {
        router.reload(window.location.pathname)
    }

    return (
        <Container>
            {showBackButton ? <BackButton title="Back to all orders." onClick={backClickHandler} /> : null}
            <SectionTitle showUnderline="true">  Order History</SectionTitle>
            <OrderCardsSection>
                <AllOrders
                    orderClickPass={() => { setShowBackButton(true) }} />
            </OrderCardsSection>
        </Container>
    )
}
export default ViewOrders

const Container = styled.div`
    padding: 20px 30px;
    @media (max-width: 500px ){ 
        padding: 20px 5px;
    }
`
const OrderCardsSection = styled.div`
    border: 2px solid var(--beige); 
    margin: 50px 0;
`