import React from 'react'
import styled from 'styled-components'
import Paragraph from '../Titles/Paragraph/Paragraph'
import Link from 'next/link'
function Footer() {
    return (
        <Container>
            <div>
                <Link passHref href="/join-trade">
                    <Anchor target="_blank">
                        Join Trade
                    </Anchor>
                </Link>
                <Anchor href="https://inspiry.co.nz/products" target="_blank">
                    Shop
                </Anchor>

                <Anchor href="https://inspiry.co.nz/privacy-policy-2/" target="_blank">
                    Privacy Policy
                </Anchor>
                <Anchor href="https://inspiry.co.nz/contact/" target="_blank">
                    Contact
                </Anchor>
            </div>
            <CopyrightContainer>
                <Paragraph>
                    © Copyright 2019 Inspiry NZ. All rights reserved.
                    <AnchorWebduel> Built By WebDuel</AnchorWebduel>
                </Paragraph>
            </CopyrightContainer>
        </Container>
    )
}

export default Footer
const Container = styled.section`
background: #30332E; 
padding: 10px 20px;
display : flex;
justify-content: space-between;
flex-direction: row;
flex-wrap: wrap;
`
const Anchor = styled.a`
color: white;
text-decoration: none; 
margin: 0 20px 0 0;
cursor: pointer;
&:hover{ 
    text-decoration: underline; 
}
`
const CopyrightContainer = styled.div`
color: white;
`
const AnchorWebduel = styled(Anchor)`
margin-right: 0 ;
`