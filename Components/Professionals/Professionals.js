import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import ProfessionalDataContext from '../../store/professional-context'
import LargeTitle from '../UI/Titles/Titles/LargeTitle'
import MediumTitle from '../UI/Titles/Titles/MediumTitle'
import ProfessionalCards from './ProfessionalCards/ProfessionalCards'
import ProfessionalTaxonomy from './ProfessionalTaxonomy/ProfessionalTaxonomy'
import Button from '../UI/Button/Button'
import Overlay from '../UI/Overlay/Overlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/pro-solid-svg-icons'
function Professionals() {
    const [showMobileSidebar, setShowMobileSidebar] = useState(false)
    // professional context
    const professionalCtx = useContext(ProfessionalDataContext)

    return (
        <Container>
            <Hero>
                <LargeTitle>Trade Professionals </LargeTitle>
                <MediumTitle>We&apos;ve curated New Zealand&apos;s leading professionals so you can find the best fit for your project. Browse their work, discover their services and enquire directly from Inspiry.</MediumTitle>
            </Hero>

            <BodyContainer>
                <Sidebar>
                    <ProfessionalTaxonomy />
                </Sidebar>
                <FilterButton bkColor="var(--beige)" onClick={() => setShowMobileSidebar(true)}>
                    <FilterIcon icon={faFilter} />
                    Filter
                </FilterButton>
                {showMobileSidebar &&
                    <SidebarMobile>
                        <ProfessionalTaxonomy setShowMobileSidebar={setShowMobileSidebar} />
                    </SidebarMobile>
                }
                {showMobileSidebar && <Overlay onClick={() => setShowMobileSidebar(false)} />}

                <ProfessionalCards />
            </BodyContainer>

        </Container>
    )
}

export default Professionals
const Container = styled.section`
padding: 0 20px;
@media(max-width:1000px){ 
    padding: 0 10px;
}
`
const Hero = styled.div`
padding: 50px 0;
`

const BodyContainer = styled.div`
display: flex;
flex-direction: row;
@media (max-width: 1000px ){ 
    flex-direction: column;

}
`

const Sidebar = styled.div`
width: 450px;
margin-right: 40px ; 
@media (max-width: 1000px ){ 
    display: none;
}
`
const SidebarMobile = styled(Sidebar)`
padding: 20px; 
    position: fixed; 
    display: block;
    bottom: 0%; 
    left: 0%; 
    z-index :10; 
    background: white; 
    width :100%;
 
`
const FilterButton = styled(Button)`
    display: none;
    @media (max-width: 1000px ){ 
        display: inline-block;
        width: 200px; 
        margin: 0 0 20px 0; 
    }
`
const FilterIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`