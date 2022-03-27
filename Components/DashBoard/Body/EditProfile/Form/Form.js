import React, { useState, useContext } from 'react'
import Input from '../../../../UI/Input/Input'
import styled from 'styled-components'
import SelectInput from '../../../../UI/SelectInput/SelectInput'
import Button from '../../../../UI/Button/Button'
import { useRouter } from 'next/router'
import UploadBox from '../UploadBox/UploadBox'
import ProfilePhoto from '../../../../UI/ProfilePhoto/ProfilePhoto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/pro-light-svg-icons'
import Paragraph from '../../../../UI/Titles/Paragraph/Paragraph'
import UserDataContext from '../../../../../store/user-data-context'
function Form({ userData, optionsData, authToken }) {
    const [enteredFirstName, setEnteredFirstName] = useState(userData.data[0].firstName)
    const [enteredLastName, setEnteredLastName] = useState(userData.data[0].lastName)
    const [enteredEmail, setEnteredEmail] = useState(userData.data[0].email)
    const [enteredPhone, setEnteredPhone] = useState(userData.data[0].phoneNumber)
    const [enteredAge, setEnteredAge] = useState(userData.data[0].ageGroup ? userData.data[0].ageGroup : "Select")
    const [enteredRegions, setEnteredRegions] = useState(userData.data[0].regionsDistrict ? userData.data[0].regionsDistrict : "Select")
    const [enteredIndustry, setEnteredIndustry] = useState(userData.data[0].industry ? userData.data[0].industry : "Select")
    const [enteredCompanyName, setEnteredCompanyName] = useState(userData.data[0].company)
    const [enteredWebsite, setEnteredWebsite] = useState(userData.data[0].website)
    const [enteredJobTitle, setEnteredJobTitle] = useState(userData.data[0].jobTitle)

    const [showUploader, setShowUploader] = useState(false)

    const [submissionError, setSubmissionError] = useState('')

    const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false)
    const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false)
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

    // validate First Name
    let enteredFirstNameIsValid = enteredFirstName.length > 2
    const firstNameInputIsInvalid = !enteredFirstNameIsValid && enteredFirstNameTouched

    //   validate last name
    let enteredLastNameIsValid = enteredLastName.length > 2
    const lastNameInputIsInvalid = !enteredLastNameIsValid && enteredLastNameTouched

    // UserData context
    const userDataCtx = useContext(UserDataContext)

    // validate email
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let enteredEmailIsValid = pattern.test(enteredEmail)
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

    // on blur handler
    const firstNameBlurHandler = () => {
        setEnteredFirstNameTouched(true)
    }
    const lastNameBlurHandler = () => {
        setEnteredLastNameTouched(true)
    }
    const emailBlurHandler = () => {
        setEnteredEmailTouched(true)
    }
    // on change handlers
    const firstNameChangeHandler = (e) => {
        setEnteredFirstName(e.target.value)
    }
    const lastNameChangeHandler = (e) => {
        setEnteredLastName(e.target.value)
    }
    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const phoneChangeHandler = (e) => {
        setEnteredPhone(e.target.value)
    }

    const websiteChangeHandler = (e) => {
        setEnteredWebsite(e.target.value)
    }
    const ageGroupChangeHandler = (e) => {

        setEnteredAge(e.target.value)
    }
    const regionChangeHandler = (e) => {
        setEnteredRegions(e.target.value)
    }
    const industryChangeHandler = (e) => {
        setEnteredIndustry(e.target.value)
    }
    const companyNameChangeHandler = (e) => {
        setEnteredCompanyName(e.target.value)
    }
    const jobTitleChangeHandler = (e) => {
        setEnteredJobTitle(e.target.value)
    }
    // input Data
    const inputData = [
        {
            title: "First Name*",
            type: "text",
            inputChange: firstNameChangeHandler,
            value: enteredFirstName,
            onBlur: firstNameBlurHandler,
            isInvalid: firstNameInputIsInvalid,
            errorMessage: "Enter first name"
        },
        {
            title: "Last Name*",
            type: "text",
            inputChange: lastNameChangeHandler,
            value: enteredLastName,
            onBlur: lastNameBlurHandler,
            isInvalid: lastNameInputIsInvalid,
            errorMessage: "Enter last name"
        },
        {
            title: "Email*",
            type: "email",
            inputChange: emailChangeHandler,
            value: enteredEmail,
            onBlur: emailBlurHandler,
            isInvalid: emailInputIsInvalid,
            errorMessage: "Enter valid email address"
        },
        {
            title: "Phone Number",
            type: "text",
            inputChange: phoneChangeHandler,
            value: enteredPhone
        },
        {
            title: "Website Url",
            type: "url",
            inputChange: websiteChangeHandler,
            value: enteredWebsite
        }
    ]

    const inputFields = inputData.map(item => {
        return (<InputContainer key={item.title}>
            <LabelStyle htmlFor={item.title}> {item.title}</LabelStyle>
            <InputStyle
                isInvalid={item.isInvalid}
                type={item.type}
                placeholder={item.title}
                value={item.value}
                inputChange={item.inputChange}
                blurChange={item.onBlur}
            />
            {item.isInvalid ?
                <div className="error left-align">{item.errorMessage} </div> : null
            }

        </InputContainer>
        )
    })

    let ageData
    let regionData
    let industryData
    if (optionsData) {
        ageData = optionsData.age_group.map(option => {
            return {
                title: option
            }
        })

        regionData = optionsData.region_district.map(option => {
            return {
                title: option
            }
        })
        industryData = optionsData.industry.map(option => {
            return {
                title: option
            }
        })
    }
    // router
    const router = useRouter()
    async function submitHandler(e) {
        e.preventDefault()

        const body = {
            first_name: enteredFirstName,
            last_name: enteredLastName,
            user_email: enteredEmail,
            phone: enteredPhone,
            website: enteredWebsite,
            age_group: enteredAge,
            regions_district: enteredRegions,
            industry: enteredIndustry,
            company: enteredCompanyName,
            job_title: enteredJobTitle,
            userID: userDataCtx.userData.data[0].userID
        }
        fetch("https://inspiry.co.nz/wp-json/inspiry/v1/update-user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken.token}`
            },
            method: "POST",
            body: JSON.stringify(body)
        }
        )
            .then(res => res.json())
            .then(res => {
                router.reload(window.location.pathname)
            })
            .catch(err => console.log(err))
    }

    return (

        <Container>
            {userData ?
                <ProfileImageContainer>
                    <ProfilePhoto profileImage={userData.data[0].profileImage} />
                    <ParagraphStyle onClick={() => setShowUploader(true)}>
                        <CameraIconStyle icon={faCamera} />
                        Change
                    </ParagraphStyle>
                </ProfileImageContainer> : null
            }


            {showUploader ? <UploadBox onClickPass={() => setShowUploader(false)} userID={authToken.userID} /> : null}
            <FormContainer onSubmit={submitHandler}>
                {inputFields}

                <InputContainer>
                    <LabelStyle htmlFor="Age Group"> Age Group</LabelStyle>
                    <SelectInput defaultValue={enteredAge} name="age-group" options={ageData} onChange={ageGroupChangeHandler} />
                </InputContainer>

                <InputContainer>
                    <LabelStyle htmlFor="Region/District"> Region/District</LabelStyle>
                    <SelectInput defaultValue={enteredRegions} name="region" options={regionData} onChange={regionChangeHandler} />
                </InputContainer>

                <InputContainer>
                    <LabelStyle htmlFor="Industry"> Industry</LabelStyle>
                    <SelectInput defaultValue={enteredIndustry} name="industry" options={industryData} onChange={industryChangeHandler} />
                </InputContainer>

                <InputContainer>
                    <LabelStyle htmlFor="company-name"> Company Name</LabelStyle>
                    <InputStyle
                        type="text"
                        placeholder="Company Name"
                        value={enteredCompanyName}
                        inputChange={companyNameChangeHandler}
                    />
                </InputContainer>
                <InputContainer>
                    <LabelStyle htmlFor="job-title"> Job Title</LabelStyle>
                    <InputStyle
                        type="text"
                        placeholder="Job Title"
                        value={enteredJobTitle}
                        inputChange={jobTitleChangeHandler}
                    />
                </InputContainer>
                <ButtonStyle disabled>Save</ButtonStyle>
            </FormContainer>
        </Container>
    )
}
export default Form
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 50px;
    @media (max-width: 550px ){ 
        flex-direction: column;
        justify-content: center;
       
    }
`
const FormContainer = styled.form`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
max-width: 640px;
margin-left: 50px;
@media (max-width: 550px ){ 
        margin: 30px 0;
    }
`
const InputContainer = styled.div`
width: 50%;
max-width: 300px;
margin-bottom: 30px;
@media (max-width: 1050px){ 
    width: 100%;
    max-width: 100%;
}
`
const InputStyle = styled(Input)`
 margin: 5px 0;
 border-radius: 10px;
 background: var(--offWhite);

`
const LabelStyle = styled.label`
font-weight: 600;
color: var(--darkGrey);
margin-left: 3px;
`
const ButtonStyle = styled(Button)`
margin: 0 0 0 auto;
padding: 10px 50px !important;
font-size: 1.2rem;
`
const Border = styled.div`
border-bottom: 2px solid var(--beige);

`
const ProfileImageContainer = styled.div`
width: 150px;
min-width: 150px;
`
const ParagraphStyle = styled(Paragraph)`
background: var(--beige);
display: block;
padding: 10px 20px;
border-radius: 40px;
margin: 10px auto !important;
text-align: center;
cursor: pointer;
&:hover{ 
    color: #fff;
    background: var(--darkGrey); 

}
`

const CameraIconStyle = styled(FontAwesomeIcon)`
margin-right: 5px;
`