import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../Input/Input'
import MediumTitle from '../Titles/Titles/MediumTitle'
import TextArea from '../Input/TextArea'
import Button from '../Button/Button'
import Paragraph from '../Titles/Paragraph/Paragraph'
import Errors from '../Notifications/Errors/Errors'
import Loading from '../Loading/Loading'

function TradeContactForm({ title, emailTo, emailRouteUrl, cancelPass }) {
    const [enteredName, setEnteredName] = useState('')
    const [enteredNameTouched, setEnteredNameTouched] = useState(false)
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)
    const [enteredPhone, setEnteredPhone] = useState('')
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

    // change handlers
    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value)
    }
    const emailChangeHandler = e => {
        setEnteredEmail(e.target.value)
    }
    const phoneChangeHandler = e => {
        setEnteredPhone(e.target.value)
    }
    const messageChangeHandler = e => {
        setEnteredMessage(e.target.value)
    }
    // blur handler 
    const nameBlurHandler = e => {
        setEnteredNameTouched(true)
    }
    const emailBlurHandler = e => {
        setEnteredEmailTouched(true)
    }
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
                if (res === 400) {
                    setShowLoading(false)
                    setErrorMessage('Something went wrong. Please try again.')
                }
                setEnteredName('')
                setEnteredEmail('')
                setEnteredPhone('')
                setEnteredMessage('')
                setEnteredEmailTouched(false)
                setEnteredNameTouched(false)
                setSuccessMessage('Message Sent!')
                setShowLoading(false)
            })
            .catch(err => console.log(err))
    }
    return (
        <Form onSubmit={submitHandler}>
            <MediumTitle>{title}</MediumTitle>

            {showLoading ? <Loading />
                :
                <React.Fragment>
                    <Content>
                        <Line></Line>
                        <InputContainer>
                            <Input
                                isInvalid={nameInputIsInvalid}
                                type="text"
                                placeholder="*Full name"
                                value={enteredName}
                                inputChange={nameChangeHandler}
                                blurChange={nameBlurHandler}
                            />
                            {nameInputIsInvalid ? <Errors>Please enter your name</Errors> : null}
                        </InputContainer>

                        <InputContainer>
                            <Input
                                isInvalid={emailInputIsInvalid}
                                type="email"
                                placeholder="*Email"
                                value={enteredEmail}
                                inputChange={emailChangeHandler}
                                blurChange={emailBlurHandler}
                            />
                            {emailInputIsInvalid ? <Errors>Entered email address is not valid</Errors> : null}

                        </InputContainer>
                        <InputContainer>
                            <Input
                                type="text"
                                placeholder="Phone number"
                                value={enteredPhone}
                                inputChange={phoneChangeHandler}
                            />
                        </InputContainer>
                        <InputContainer>
                            <TextArea
                                value={enteredMessage}
                                onChange={messageChangeHandler}
                                placeholder="Write your message"
                            />
                        </InputContainer>
                        {successMessage ? <p className="success left-align" >{successMessage} </p> : null}
                        {errorMessage ? <p className="error left-align" >{errorMessage} </p> : null}
                        <BottomLine></BottomLine>
                    </Content>

                    <ButtonContainer>
                        {cancelPass ? <ParagraphStyle onClick={() => cancelPass()}>Cancel</ParagraphStyle> : null}

                        <Button>Save</Button>
                    </ButtonContainer>
                </React.Fragment>
            }
        </Form>


    )
}

export default TradeContactForm

const Form = styled.form`
padding: 20px;
position:relative; 
min-height: 200px;
`
const Content = styled.div`
position: relative;
`
const Line = styled.div`
    position: relative;
    width: calc(100% + 40px); 
    height: 2px; 
    background: var(--beige);
    left: 0;
    top: 0;
    margin: 20px 0 20px -20px;
`
const BottomLine = styled.div`
    width: calc(100% + 40px); 
    position: relative;
    height: 2px; 
    background: var(--beige);
    left: 0;
    bottom: 0;
    margin: 20px 0 20px -20px;
`
const ButtonContainer = styled.div`
margin-top: 40px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
`
const ParagraphStyle = styled(Paragraph)`
margin-right: 15px;
cursor: pointer; 
&:hover{ 
    color: black;
    text-decoration: underline; 
}
`
const InputContainer = styled.div`
margin: 15px 0; 
`