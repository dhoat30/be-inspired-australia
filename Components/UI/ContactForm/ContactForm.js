import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../Input/Input'
import MediumTitle from '../Titles/Titles/MediumTitle'
import TextArea from '../Input/TextArea'
import Button from '../Button/Button'
import Errors from '../Notifications/Errors/Errors'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'

function TradeContactForm({ title, emailTo, emailRouteUrl, cancelPass }) {
    const [enteredName, setEnteredName] = useState('')
    const [enteredNameTouched, setEnteredNameTouched] = useState(false)
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)
    const [enteredPhone, setEnteredPhone] = useState('')
    const [enteredCompany, setEnteredCompany] = useState('')
    const [enteredWebsite, setEnteredWebsite] = useState('')
    const [enteredMessage, setEnteredMessage] = useState('')
    const [showLoading, setShowLoading] = useState('')

    // submission message
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // validate name
    const enteredNameIsValid = enteredName.length > 2
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

    // validate email
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let enteredEmailIsValid = pattern.test(enteredEmail)
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

    // submit handler
    const submitHandler = (e) => {
        e.preventDefault()
        setEnteredEmailTouched(true)
        setEnteredNameTouched(true)
        if (!enteredNameIsValid && !enteredEmailIsValid) {
            return
        }
        const body = {
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone,
            company: enteredCompany,
            website: enteredWebsite,
            message: enteredMessage,
            emailTo: emailTo
        }
        setShowLoading(true)
        setSuccessMessage('')
        setErrorMessage('')
        fetch(emailRouteUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                // check for errors
                if (res === 400) {
                    setShowLoading(false)
                    setErrorMessage('Something went wrong. Please try again.')
                }
                setEnteredName('')
                setEnteredEmail('')
                setEnteredPhone('')
                setEnteredMessage('')
                setEnteredCompany('')
                setEnteredWebsite('')
                setEnteredEmailTouched(false)
                setEnteredNameTouched(false)
                setSuccessMessage('Message Sent!')
                setShowLoading(false)
            })
            .catch(err => console.log(err))
    }
    return (
        <Form onSubmit={submitHandler}>
            <LoadingOverlay show={showLoading} />
            <Content>
                <InputContainer>
                    <Input
                        isInvalid={nameInputIsInvalid}
                        type="text"
                        placeholder="*Full name"
                        value={enteredName}
                        inputChange={(e) => setEnteredName(e.target.value)}
                        blurChange={() => setEnteredNameTouched(true)}
                    />
                    {nameInputIsInvalid ? <Errors>Please enter your name</Errors> : null}
                </InputContainer>

                <InputContainer>
                    <Input
                        isInvalid={emailInputIsInvalid}
                        type="email"
                        placeholder="*Email"
                        value={enteredEmail}
                        inputChange={(e) => setEnteredEmail(e.target.value)}
                        blurChange={() => setEnteredEmailTouched(true)}
                    />
                    {emailInputIsInvalid ? <Errors>Entered email address is not valid</Errors> : null}

                </InputContainer>
                <InputContainer>
                    <Input
                        type="text"
                        placeholder="Phone"
                        value={enteredPhone}
                        inputChange={(e) => setEnteredPhone(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        type="text"
                        placeholder="Company"
                        value={enteredCompany}
                        inputChange={(e) => setEnteredCompany(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        type="text"
                        placeholder="website"
                        value={enteredWebsite}
                        inputChange={(e) => setEnteredWebsite(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <TextArea
                        value={enteredMessage}
                        onChange={(e) => setEnteredMessage(e.target.value)}
                        placeholder="Write your message"
                    />
                </InputContainer>
                {successMessage ? <p className="success left-align" >{successMessage} </p> : null}
                {errorMessage ? <p className="error left-align" >{errorMessage} </p> : null}
            </Content>

            <ButtonContainer>
                <Button>Save</Button>
            </ButtonContainer>

        </Form>
    )
}

export default TradeContactForm

const Form = styled.form`
min-height: 200px;
width: 100%;
`
const Content = styled.div`

`
const ButtonContainer = styled.div`
margin-top: 40px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
`

const InputContainer = styled.div`
margin: 15px 0; 
width: 100%; 
`