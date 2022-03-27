import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faChevronRight, faArrowLeft } from '@fortawesome/pro-light-svg-icons'
import MediumTitle from '../Titles/Titles/MediumTitle'
import Paragraph from '../Titles/Paragraph/Paragraph'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'


function Taxonomy({ title, taxonomyData, showArrow, showBackButton, type, checkboxValuePass, parentCategories, slugValuePass, query, tagsData, radioValuePass }) {
    const [showCategories, setShowCategories] = useState(false)
    const categoryChangeHandler = e => {
        slugValuePass(e.target.value)
    }
    const router = useRouter()
    const isTablet = useMediaQuery({
        query: `(max-width: 1000px)`
    })

    let taxList
    if (type === "category") {
        taxList = parentCategories.map(item => {
            if (item) {
                return (
                    <InputContainer passHref href={item.slug} key={item.id} >
                        <Input type="radio" name="professional_categories" value={item.slug} onChange={categoryChangeHandler} />
                        <CategoryName >
                            <span>
                                {item.name}
                            </span>
                            <IconStyle icon={faChevronRight} />
                        </CategoryName>
                    </InputContainer>
                )
            }
        })
    }
    else if (type === "tag") {
        taxList = tagsData.map(item => {
            if (item) {
                return (
                    <RadioContainer passHref href={item.slug} key={item.id} >
                        <TagName className="radio-container">{item.name}
                            <input type="radio" name="professional_categories" value={item.slug} onChange={(e) => radioValuePass(e.target.value)} />
                            <span className="checkmark"></span>
                        </TagName>
                    </RadioContainer>
                )
            }
        })
    }


    return (
        <Container>
            <TaxTitle onClick={() => setShowCategories(showCategories ? false : true)}>{title} <FontAwesomeIcon icon={faMinus} /></TaxTitle>
            {showArrow &&
                <BackArrowContainer onClick={() => router.reload()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <Paragraph fontWeight="300">All Categories</Paragraph>
                </BackArrowContainer>
            }
            {!isTablet || showCategories ?
                <form>
                    <ListContainer>
                        {taxList}
                    </ListContainer>
                </form> : null
            }

        </Container >
    )
}


Taxonomy.getInitialProps = ({ query }) => {
    return { query }
}


export default Taxonomy
const Container = styled.div`
                    margin-bottom: 50px;
                    `
const TaxTitle = styled.h3`
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer; 

                    `
const ListContainer = styled.div`
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    margin-left: 20px;
                    @media (max-width: 1000px ){ 
                        align-items: flex-start;
                    }
                    `
const InputContainer = styled.div`
position: relative; 
`
const Input = styled.input`
                    color:var(--darkGrey);
                    cursor: pointer;
                    font-weight:500;
                    margin: 20px 20px 0 0;
                    /* display: flex;
                    justify-content: space-between;
                    align-items: center; */
                    width: 260px;
                    visibility: collapse;
                    position: relative;
                    display: block;
                    border: none;
                    z-index: 10; 
                    &:hover{
                        color: black;
}
&::after{ 
    width: 100%;
    height: 15px;
        border-radius: 15px;
        top: -5px;
        left: -1px;
        position: relative;
        background-color: rgba(0,0,0,0);
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid rgba(0,0,0,0);
}

                    `
const CategoryName = styled.label`
                    max-width: 240px;
                  display: flex;
                  align-items: center; 
                  justify-content: space-between;
                   margin: 10px 0; 
                   position: absolute; 
                   top: 0;
                   z-index: 0;
                    `
const BackAnchor = styled(Input)`
                    margin-left: 10px;
                    align-self: flex-start;
                    width: 170px;
                    `

const IconStyle = styled(FontAwesomeIcon)`
margin-left: 10px ;
`
const BackArrowContainer = styled.div`
display: flex; 
align-items: center;
color: var(--grey);
justify-content: space-between;
width: 130px ; 
margin-left: 20px;
margin-top:10px;
cursor: pointer; 
`

const RadioContainer = styled.div`
align-self: flex-start; 
width: 100%;
display: flex; 
align-items: center; 
flex-direction: row; 
`

const TagName = styled.label`
font-size: 1rem; 
margin: 20px 0 0 0 ; 
`
