import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons'
import Paragraph from '../../../UI/Titles/Paragraph/Paragraph'
import Button from '../../../UI/Button/Button'
import ColumnTitle from '../../../UI/Titles/Titles/ColumnTitle'
import Underline from '../../../UI/Underline/Underline'
import Home from './Home/Home'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import About from './About/About'


function Main({ singleData }) {
    const [showHome, setShowHome] = useState(true)
    const [showAbout, setShowAbout] = useState(false)
    const [showProjects, setShowProjects] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const singleDataNull = singleData.relatedProject.every(item => item === null)
    let services
    if (singleData.acf.services) {
        services = singleData.acf.services.map((item, index) => {
            return (
                <ParagraphStyle key={index}>{item.single_service}</ParagraphStyle>
            )
        })
    }
    const homeClickHandler = () => {
        setShowHome(true)
        setShowAbout(false)
        setShowProjects(false)
        setShowContact(false)
    }
    const aboutClickHandler = () => {
        setShowHome(false)
        setShowAbout(true)
        setShowProjects(false)
        setShowContact(false)
    }
    const projectClickHandler = () => {
        setShowHome(false)
        setShowAbout(false)
        setShowProjects(true)
        setShowContact(false)
    }
    const contactClickHandler = () => {
        setShowHome(false)
        setShowAbout(false)
        setShowProjects(false)
        setShowContact(true)
    }
    const readMoreClickHandler = () => {
        setShowHome(false)
        setShowAbout(true)
        setShowProjects(false)
        setShowContact(false)
    }
    return (
        <Container>
            <FirstRow>
                <SidebarContainer>
                    {!singleData.acf.services ? null :
                        <React.Fragment>
                            <ColumnTitle>Services</ColumnTitle>
                            <Underline />
                            <div>
                                {services}
                            </div>
                        </React.Fragment>
                    }
                </SidebarContainer>
                <MiddleSection>
                    <Nav>
                        <NavButton bkColor={`${showHome ? "var(--darkGrey)" : "var(--beige)"}`} onClick={homeClickHandler}>Home</NavButton>
                        <NavButton bkColor={`${showAbout ? "var(--darkGrey)" : "var(--beige)"}`} onClick={aboutClickHandler}>About</NavButton>
                        {!singleDataNull ? <NavButton bkColor={`${showProjects ? "var(--darkGrey)" : "var(--beige)"}`} onClick={projectClickHandler}>Projects</NavButton> : null}
                        <NavButton bkColor={`${showContact ? "var(--darkGrey)" : "var(--beige)"}`} onClick={contactClickHandler}>Contact</NavButton>
                    </Nav>

                    <Content>
                        {showHome ? <Home singleData={singleData} /> : null}
                        {showHome && !showAbout ? <ReadMore onClick={readMoreClickHandler}>Read more <FontAwesomeIcon icon={faChevronDown} /></ReadMore> : null}
                        {showAbout ? <About singleData={singleData} /> : null}
                        {!singleData.acf.services || !showHome ? null :
                            <Services>
                                <ColumnTitle>Services</ColumnTitle>
                                <div>
                                    {services}
                                </div>
                            </Services>
                        }
                        {showHome && !singleDataNull ? <FeaturedTitle>Featured Projects</FeaturedTitle> : null}
                        {showProjects || showHome ? <Projects relatedProject={singleData.relatedProject} /> : null}
                        {showContact ? <Contact singleData={singleData} /> : null}
                    </Content>
                </MiddleSection>
            </FirstRow>

        </Container>
    )
}

export default Main
const Container = styled.section`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`
const FirstRow = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
width: 100%;
@media (max-width: 1250px ){ 
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
}
`
const SidebarContainer = styled.div`
position: relative;
width: 300px;
height: auto;
margin-right: 100px;
@media (max-width: 1250px ){ 
    display: none;
}
`
// show this services container on mobile
const Services = styled.div`
display: none; 
 @media (max-width: 1250px ){ 
    display: block;
    margin: 10px 0 0 0;
    padding: 20px 0  0 0;
    border-top: 2px solid var(--beige);
}
`
const ParagraphStyle = styled(Paragraph)`
margin: 10px 0;
`
const MiddleSection = styled.div`
width: 100%;
`
const Nav = styled.div`
@media (max-width: 1250px ){ 
    margin: 30px 0 0 0;
}
`
const NavButton = styled(Button)`
margin-right: 3%;
padding: 10px 40px;
@media (max-width: 1250px ){ 
    margin: 0 5px 10px 0;
    padding: 10px 20px;
}
`

const Content = styled.div`
margin-top: 50px;
@media (max-width: 1250px){ 
    margin-top: 20px;
}
`
const ReadMore = styled.div`
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
`
const FeaturedTitle = styled(ColumnTitle)`
margin: 100px 0 20px 0;
@media (max-width: 1250px){ 
    margin-top: 50px;
}
`
