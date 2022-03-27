import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import AuthContext from '../../../../store/auth-context'
import UserDataContext from '../../../../store/user-data-context'
import { useRouter } from 'next/router'
import LoadingOverlay from '../../../UI/LoadingOverlay/LoadingOverlay'
import Paragraph from '../../../UI/Titles/Paragraph/Paragraph'
function DetailForm(props) {
    const [enteredTitle, setEnteredTitle] = useState(props.singleProjectData ? props.singleProjectData.title : "")
    const [enteredCategory, setEnteredCategory] = useState(props.existingParentCategory && props.existingParentCategory[0] ? props.existingParentCategory[0].term_id : "")
    const [enteredSubCategory, setEnteredSubCategory] = useState(props.existingChildCategory && props.existingChildCategory[0] ? props.existingChildCategory[0].term_id : "")
    const [enteredTradeProfessional, setEnteredTradeProfessional] = useState(props.singleProjectData ? props.singleProjectData.tradeProfessionalID : "")
    const [enteredWebsite, setEnteredWebsite] = useState(props.singleProjectData ? props.singleProjectData.websiteLink : "")
    const [enteredDesc, setEnteredDesc] = useState(props.singleProjectData ? props.singleProjectData.description : "")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState('')
    const router = useRouter()
    // auth context 
    const authCtx = useContext(AuthContext)
    // user context
    const userDataCtx = useContext(UserDataContext)

    if (!props.categories) {
        return <LoadingOverlay show={true}></LoadingOverlay>
    }
    // change handlers  
    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value)
    }
    const categoryChangeHandler = (e) => {
        setEnteredCategory(e.target.value)

    }
    const subCategoryChangeHandler = (e) => {
        setEnteredSubCategory(e.target.value)
    }
    const tradeChangeHandler = (e) => {
        setEnteredTradeProfessional(e.target.value)
    }
    const websiteChangeHandler = (e) => {
        setEnteredWebsite(e.target.value)
    }
    const descChangeHandler = (e) => {
        setEnteredDesc(e.target.value)
    }

    // Parent Categories values
    let selectParentCategories
    // child categories values
    let selectChildCategories

    // trade professional names
    let tradeName
    if (props.categories && props.trade) {
        selectParentCategories = props.categories.map(item => {
            if (item.parent === 0) {

                return (
                    <React.Fragment key={item.id}>
                        <option value={item.id}>{item.name}</option>
                    </React.Fragment>
                )
            }
        })

        selectChildCategories = props.categories.map(item => {
            if (item.parent !== 0) {
                return (
                    <React.Fragment key={item.id}>
                        <option value={item.id}>{item.name}</option>
                    </React.Fragment>
                )
            }
        })
        tradeName = props.trade.map(item => {
            const lower = item.name.toLowerCase();
            let text = lower.charAt(0).toUpperCase() + lower.slice(1);
            return (
                <React.Fragment key={item.id}>
                    <option value={item.id} dangerouslySetInnerHTML={{ __html: text }}></option>
                </React.Fragment>
            )
        })
    }



    const submitHandler = (e) => {
        e.preventDefault()
        if (props.galleryData.length === 0 && !props.singleProjectData) {
            setError("Please upload at least one image!!!")
            return
        }
        const galleryData = props.galleryData.map(item => {
            return {
                ID: item.id
            }
        })

        let formData
        if (props.singleProjectData) {
            let parentCategory = props.categories.filter(item => item.id === parseInt(enteredCategory))
            let childCategory = props.categories.filter(item => item.id === parseInt(enteredSubCategory))
            formData = {
                id: props.singleProjectData.id,
                title: enteredTitle,
                parentCategory: parentCategory[0].slug,
                subCategory: childCategory[0].slug,
                trade_professional_id: enteredTradeProfessional,
                website_link: enteredWebsite,
                description: enteredDesc,
                gallery: galleryData.length > 0 ? galleryData : props.singleProjectData.pinImage,
                slug: props.singleProjectData.slug,
                status: userDataCtx.userData.data[0].userRole[0] == "trade_professional" ? "publish" : "private"
            }
        }
        else {
            formData = {
                title: enteredTitle,
                "project-categories": [
                    enteredCategory,
                    enteredSubCategory
                ],
                fields: {
                    trade_professional_id: enteredTradeProfessional,
                    website_link: enteredWebsite,
                    description: enteredDesc,
                    gallery: galleryData,
                    defaultValue: enteredTradeProfessional
                },
                status: userDataCtx.userData.data[0].userRole[0] == "trade_professional" ? "publish" : "private"
            }
        }
        console.log(formData)
        let url = props.singleProjectData ? "https://inspiry.co.nz/wp-json/inspiry/v1/update-single-user-pin" : "/home/api/projects/add-project"
        setError('')
        setLoading(true)
        fetch(url, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false)
                // clear image uploader 
                if (res.data.code) {
                    setError(res.data.message)
                    console.log(res)
                }
                else if (res === 200) {
                    setSuccessMessage("Project has been updated successfully ")
                }
                else {
                    props.clearImageUploader()
                    router.reload()
                    // clear data
                    document.getElementById("detail-form").reset();
                    setEnteredTitle('')
                    setEnteredCategory('')
                    setEnteredSubCategory('')
                    setEnteredTradeProfessional('')
                    setEnteredWebsite('')
                    setEnteredDesc('')
                    setSuccessMessage("Project has been added successfully")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    // delete a project 
    const deleteProjectHandler = () => {
        let formData = {
            id: props.singleProjectData.id,
            slug: props.singleProjectData.slug
        }
        setError('')
        setLoading(true)
        fetch("https://inspiry.co.nz/wp-json/inspiry/v1/delete-single-user-pin", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setLoading(false)
                if (!res.data) {
                    console.log(res)
                    router.push('/members/your-projects')
                    setSuccessMessage("Project has been deleted successfully ")
                }
                else {
                    setError(res.message)
                    console.log(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <React.Fragment>
            <Container onSubmit={submitHandler} id="detail-form">
                <TitleInput
                    type="text"
                    placeholder="Add project title"
                    inputChange={titleChangeHandler}
                    value={enteredTitle}
                />
                <InputBox>
                    <SelectStyle value={enteredCategory} id="categories" name="categories" onChange={categoryChangeHandler}>
                        <option value="category">Select Project Category</option>
                        {selectParentCategories}
                    </SelectStyle>

                    <SelectStyle value={enteredSubCategory} id="sub-categories" name="sub-categories" onChange={subCategoryChangeHandler}>
                        <option value="sub-category">Select Project Sub-Category</option>
                        {selectChildCategories}
                    </SelectStyle>
                    {/* show tradeprofessional input if the logged in user is tradeprofessional */}
                    {
                        userDataCtx.userData && userDataCtx.userData.data[0].userRole[0] == "trade_professional" ?
                            <SelectStyle value={enteredTradeProfessional} id="trade-proffessional" name="trade-proffessional" onChange={tradeChangeHandler}>
                                <option value="trade-professional"> Trade Proffesional</option>
                                {tradeName}
                            </SelectStyle> : null
                    }


                    <InputStyle
                        type="url"
                        placeholder="Add website link"
                        inputChange={websiteChangeHandler}
                        value={enteredWebsite}
                    />
                    <TextAreaStyle placeholder="Add description" value={enteredDesc} onChange={descChangeHandler} />

                </InputBox>
                {error ? <div className="error left-align"> {error} </div> : null}
                {successMessage ? <div className="success left-align">{successMessage} </div> : null}
                <ButtonsContainer>
                    {props.singleProjectData ? <DeleteButton onClick={deleteProjectHandler}>Delete</DeleteButton> : null}
                    <Button>Save</Button>

                </ButtonsContainer>

            </Container>
            <LoadingOverlay show={loading} />
        </React.Fragment>
    )
}

export default DetailForm

const Container = styled.form`
            width: 55%;
            min-width: 300px;
            @media(max-width: 1000px){ 
                margin: 50px 0px;
                width :100%
            }
            `
const InputBox = styled.div`
            margin-top: 50px;
            `
const InputStyle = styled(Input)`
            font-size: 1rem;
            border: none;
            height: auto;
            border-bottom:${props => props.focus ? "3px solid #4a85c9" : "1px solid var(--lightGrey)"};
            border-radius: 0;
            color: var(--darkGrey);
            padding: 0 0 10px 0;
            background: white; 
            `
const TitleInput = styled(InputStyle)`
            font-size: 2rem;
            font-weight: 600;
            `

const SelectStyle = styled.select`
            width: 100%;
            display: block;
            padding: 10px 0;
            font-size: 1rem;
            margin-bottom: 20px;
            color: var(--lightGrey);
            border:none;
            border-bottom: 1px solid var(--lightGrey);
            `

const TextAreaStyle = styled.textarea`
            width: 100%;
            border: none;
            border-bottom: 1px solid var(--lightGrey);
            color: var(--darkGrey);
            height: 40px;
            margin: 20px 0 0 0;
            font-size: 1rem;
            `



const ButtonsContainer = styled.div`
display:flex; 
justify-content: flex-end;
align-items: center;
margin: 10px 0;
`
const DeleteButton = styled(Paragraph)`
margin-right: 15px;
cursor: pointer; 
&:hover{ 
    text-decoration: underline; 
}
`