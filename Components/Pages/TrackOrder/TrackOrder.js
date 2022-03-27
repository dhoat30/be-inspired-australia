import React from 'react'
import styled from 'styled-components'
import LargeTitle from '../../UI/Titles/Titles/LargeTitle'
import LoginSection from './LoginSection/LoginSection'
import OrderSearch from './OrderSearch/OrderSearch'

function TrackOrder() {
    return (
        <Container>
            <LargeTitleStyle>Track Order</LargeTitleStyle>
            <FlexContainer>
                <LoginSection />
                <Border />
                <OrderSearch />
            </FlexContainer>
        </Container>
    )
}

export default TrackOrder
const Container = styled.section`
    padding: 0 10px;
    max-width: 800px; 
    margin: 100px auto;
    position: relative;
`
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 700px){ 
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
    }
`
const Border = styled.div`
border: 1px solid var(--darkGrey);
height: 100px;
margin-top: 50px;
@media (max-width: 700px){ 
        height: 0;
        width: 100%;
        max-width: 400px;
        margin: 20px 0;
    }
`
const LargeTitleStyle = styled(LargeTitle)`
@media (max-width: 700px){ 
        text-align: center; 
    }
`