import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTurkey } from '@fortawesome/pro-light-svg-icons'
import SearchModal from './SearchModal/SearchModal'
import Overlay from '../Overlay/Overlay'

function Search(props) {
  const [showIcon, setShowIcon] = useState(true)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [enteredSearch, setEnteredSearch] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const [projectData, setProjectData] = useState([])
  const [tradeData, setTradeData] = useState()

  useEffect(() => {
    let timer
    if (enteredSearch) {
      timer = setTimeout(() => {
        // get projects search data
        fetch(`https://inspiry.co.nz/wp-json/wp/v2/projects?search=${enteredSearch}`)
          .then(res => res.json())
          .then(res => {
            setShowLoading(false)
            setProjectData(res)
          })
          .catch(err => {
            setShowLoading(false)
          })

        // get trade professional search data
        fetch(`https://inspiry.co.nz/wp-json/wp/v2/trade-professionals?search=${enteredSearch}`)
          .then(res => res.json())
          .then(res => {
            setShowLoading(false)
            console.log(res)
            setTradeData(res)
          })
          .catch(err => {
            setShowLoading(false)
            console.log(err)
          })
      }, 2000)
    }

    return () => {
      clearTimeout(timer)
    };
  }, [enteredSearch])

  // change handler
  const changeHandler = (e) => {
    setEnteredSearch(e.target.value)
    setShowLoading(enteredSearch.length > 2 && true)
  }
  // focus handler
  const focusHandler = (e) => {
    e.target.placeholder = ""
    setShowIcon(false)
    setShowSearchModal(true)
  }
  const blurHandler = (e) => {
    e.target.placeholder = "Search"
    setShowIcon(true)
  }
  if (showSearchModal) {
    document.body.style.overflow = 'hidden';
  }
  return (
    <Container className={props.className}>
      {showIcon ? <IconStyle icon={faSearch} /> : null}

      <InputStyle
        autoComplete="off"
        showIcon={showIcon}
        type='text'
        name="search"
        id="header-search"
        placeholder="Search"
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      {showSearchModal &&
        <React.Fragment>
          <SearchModal clickPass={() => setShowSearchModal(false)} showLoading={showLoading} projectData={projectData} tradeData={tradeData} />
          <OverlayStyle onClick={() => setShowSearchModal(false)} />
        </React.Fragment>
      }

    </Container>
  )
}

const Container = styled.div`
 position: relative;
  width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  z-index: 10;
  @media(max-width: 1300px){ 
    width: 100%;
    }
@media (max-width: 600px) {
    position: absolute;
    width: 90%;
    left: 50%;
    transform: translate(-50%, 0);
    top: 60px;
}
`
const IconStyle = styled(FontAwesomeIcon)`
  color: #888888;
  background: var(--beige);
  position: relative;
  box-sizing: content-box !important;
  padding: 12px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  @media(max-width: 600px){ 
    display: none;
    }
`
const InputStyle = styled.input`
  display: block;
  width: 85%;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: ${(props) => !props.showIcon ? "30px" : null};
  border-bottom-left-radius: ${(props) => !props.showIcon ? "30px" : null};
  background: #efeae5;
  border: none;
  padding: 10px 0;
  font-family: "poppins", sans-serif;
  color: #303030;
  font-weight: 500;
  @media(max-width: 1300px){ 
    width: 75%;
    }
   
   
  &:focus{
    border: 2px solid #303030 !important;
  outline-width: 0;
  padding-left: 15px; 
  }
  @media(max-width: 600px){ 
    border-radius: 30px;
    padding: 10px 10px; 
    width: 96%;
    &::placeholder{
        padding: 0 10px;
    }
    &:focus{
    border: 2px solid #303030 !important;
        outline-width: 0;
       
        }
    }
`
const OverlayStyle = styled(Overlay)`
top: 50px; 
`
export default Search
