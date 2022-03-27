// this component is showing content for logged out user- landing page
import React, { useState } from 'react'
import LargeTitle from '../UI/Titles/Titles/LargeTitle'
import ReactTypingEffect from 'react-typing-effect'
import * as styles from './LoggedOut.module.css'
import HomeGallery from './HomeGallery/HomeGallery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/pro-light-svg-icons'
import RegisterModal from '../UI/RegisterModal/RegisterModal'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Overlay from '../UI/Overlay/Overlay'
function LoggedOut({ typewriterData, pinsData }) {
  const [showRegisterForm, setRegisterForm] = useState(false)
  const [showGradient, setGradient] = useState(true)
  // router 
  const router = useRouter()

  // typewriter title 
  const typewriterTitle = typewriterData.map(item => {
    return item.title
  })
  // onClick handler
  const onClickHandler = (props) => {
    setGradient(false)
    setRegisterForm(true)
  }

  // close the modal 
  const closeHandler = props => {
    setGradient(true)
    setRegisterForm(false)
    router.push('/', null, { scroll: true })
  }

  // for chevron down icon
  const iconClasses = showGradient ? `${styles.iconContainer} ${styles.gradient}` : `${styles.iconContainer}`;


  return (

    <TypeWriterContainer>

      <LargeTitle align="center">Get your next</LargeTitle>
      <ReactTypingEffect className="margin-auto blue"
        text={typewriterTitle}
        speed={50}
        eraseDelay={2000}
        eraseSpeed={50}
        typingDelay={1000}
        cursorRenderer={cursor => <LargeTitleStyle align="center">{cursor}</LargeTitleStyle>}
        displayTextRenderer={(text, i) => {
          return (
            <LargeTitleStyle align="center">
              {text.split('').map((char, i) => {
                const key = `${i}`;
                return (
                  <span className="center-align margin-auto"
                    key={key}
                  >{char}</span>
                );
              })}
            </LargeTitleStyle>
          );
        }}
      />



      <HomeGallery pinsData={pinsData} />
      {showGradient ? <a href="#registeration-form" className={iconClasses} onClick={onClickHandler}>
        <IconStyle icon={faChevronCircleDown} size="3x" color="white" style={{ background: "#303030", borderRadius: '50%' }} />
      </a> : null}
      {/* closeModal={closeHandler} visibleClasses={registerModalClasses} */}
      {showRegisterForm ? <RegisterModalStyle showLargeTitle={true} closeModal={closeHandler} /> : null}
      {showRegisterForm ? <Overlay /> : null}
    </TypeWriterContainer>

  )
}

export default LoggedOut
const LargeTitleStyle = styled.h1`
font-size: 3rem;
margin: 10px 0;
line-height: 4rem;
text-align: ${props => props.align ? props.align : "left"};
@media (max-width: 500px ){ 
   font-size: 1.5rem;
   line-height: 2rem;
}
`
const TypeWriterContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  max-height: 200vh;
  overflow: hidden;
  padding: 50px 20px;
`
const RegisterModalStyle = styled(RegisterModal)`
 position: absolute;
  top: 130vh;
  left: 50%;
  z-index: 10;
  display: grid;
  width: 95%;
  transform: translate(-50%, 0);
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
`
const IconStyle = styled(FontAwesomeIcon)`
  display: block;
  margin: 0 auto;
  animation: arrowDown 1s ease-in-out 0 infinite;
  animation-name: arrowDown;
  animation-timing-function: ease-in-out;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  cursor: pointer;
}
@keyframes arrowDown {
  from {
    transform: translate(-0%, 0);
  }
  to {
    transform: translate(-0%, 20px);
  }
`
