import React, { useState, useContext, useEffect } from 'react'
import ProfessionalDataContext from '../../../store/professional-context'
import styled from 'styled-components'
import WideImage from '../../UI/Hero/WideImage'
import ProfessionalHeader from './ProfessionalHeader/ProfessionalHeader'
import Main from './Main/Main'
function SingleProfessional({ singleProfessionalData }) {
    const professionalDataCtx = useContext(ProfessionalDataContext)
    const singleData = professionalDataCtx.singleProfessionalData
    console.log(singleProfessionalData)
    return (
        <Container>
            <HeroSection>
                {singleProfessionalData.acf.hero_image ?
                    <WideImage src={singleProfessionalData.acf.hero_image.url} />
                    : null
                }

            </HeroSection>
            <Body>
                <ProfessionalHeader singleData={singleProfessionalData} />
                <Main singleData={singleProfessionalData} />
            </Body>
        </Container>
    )
}

export default SingleProfessional
const Container = styled.div`
height: auto;
padding-bottom: 100px;
`
const HeroSection = styled.section`
position: relative;
width: 100%;
padding-bottom: 35%;
@media (max-width: 600px){ 
    padding-bottom: 50%;
}
@media (max-width: 400px){ 
    padding-bottom: 80%;
}
`
const Body = styled.section`
max-width: 1500px;
margin-left: 100px;
@media (max-width: 1650px){ 
    max-width: 100%;
    margin: 0 10px;

}
`