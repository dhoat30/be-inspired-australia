import React, { useState, useContext, useEffect } from 'react'
import Input from '../../Input/Input';
import Errors from '../../Notifications/Errors/Errors';
import Button from '../../Button/Button'
import axios from 'axios'
import Paragraph from '../../Titles/Paragraph/Paragraph';
import styled from 'styled-components';
import Link from 'next/link'
// import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router';
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookButton from '../../Button/SocialButtons/FacebookButton';
import GoogleButton from '../../Button/SocialButtons/GoogleButton';


function RegisterForm(props) {
    // register state
    const [isRegistered, setIsRegistered] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
    const [submissionError, setSubmissionError] = useState('')
    const [loading, setLoading] = useState(false)

    // username states 
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false)

    // email states
    const [email, setEmail] = useState('')
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

    // password states 
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

    // validate username
    var usernamePattern = /^[a-zA-Z0-9]+$/;
    let enteredUsernameIsValid = usernamePattern.test(enteredUsername) && enteredUsername.length > 3
    const usernameInputIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched

    // validate email
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let enteredEmailIsValid = pattern.test(email)
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

    // validate password 
    let enteredPasswordIsValid = enteredPassword.length >= 8; //reg.test(enteredPasswordTouched)
    const passwordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value)
    }
    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    // input blur change handler
    // const usernameBlurHandler = (event) => {
    //     setEnteredUsernameTouched(true)
    // }
    const usernameBlurHandler = () => {
        setEnteredUsernameTouched(true)
    }
    const emailBlurHandler = (event) => {
        setEnteredEmailTouched(true)
    }
    const passwordBlurHandler = (event) => {
        setEnteredPasswordTouched(true)
    }

    const router = useRouter()
    // form submission
    async function formSubmissionHandler(event) {
        event.preventDefault()
        setEnteredEmailTouched(true)
        setEnteredPasswordTouched(true)
        setShowOverlay(true)
        setSubmissionError('')
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            return
        }
        axios.post('https://inspiry.co.nz/wp-json/wp/v2/users/register',
            {
                username: enteredUsername,
                email: email,
                password: enteredPassword
            }).then(response => {
                logInUser(email, enteredPassword)

            }).catch(err => {
                setSubmissionError(err.response.data.message)
                setShowOverlay(false)
            })
    }

    async function logInUser(emailID, password) {

        axios.post("/home/api/login",
            {
                username: email,
                password: enteredPassword
            }).then(response => {
                console.log(response)
                router.reload()
                router.push('/pins')
                setShowOverlay(false)
            }).catch(err => {
                setSubmissionError(err.response.data.message)
                setShowOverlay(false)
            })
    }

    const responseGoogle = (response) => {
        console.log(response)
        axios.post("/home/api/socialLogin",
            {
                userLogin: response.profileObj.googleId,
                email: response.profileObj.email,
                givenName: response.profileObj.givenName,
                familyName: response.profileObj.familyName,
                imageUrl: response.profileObj.imageUrl
            }).then(response => {
                console.log(response.data.data)
                setLoading(true)
                if (response.status === 201) {
                    console.log("sending log in request")
                    loginApiHandler(response.data.data.email, response.data.data.password)

                }
                // router.push('/pins')

            }).catch(err => {
                setSubmissionError(err.response.data.message)
                setLoading(false)
            })
    }

    // facebook login 
    const responseFacebook = (response) => {
        console.log(response)
        axios.post("/home/api/socialLogin",
            {
                userLogin: response.id,
                email: response.email,
                name: response.name
            }).then(response => {
                console.log(response.data.data)
                setLoading(true)
                if (response.status === 201) {
                    console.log("sending log in request")
                    loginApiHandler(response.data.data.email, response.data.data.password)
                }
                // router.push('/pins')
            }).catch(err => {
                setSubmissionError("Something went wrong. Please try again.")
                setLoading(false)
            })
    }


    const loginApiHandler = (email, password) => {
        axios.post("/home/api/login",
            {
                username: email,
                password: password
            }).then(response => {
                console.log(response)
                setLoading(false)
                router.reload()
                // router.push('/pins')
            }).catch(err => {
                setSubmissionError(err.response.data.message)
                setLoading(false)
            })
    }


    return (
        <React.Fragment>
            <LoadingOverlay show={loading} />
            <Form onSubmit={formSubmissionHandler}>
                <Input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    blurChange={usernameBlurHandler}
                    inputChange={usernameChangeHandler}
                    isInvalid={usernameInputIsInvalid}
                    value={enteredUsername} />
                {usernameInputIsInvalid ? <Errors>Your username must be at least 4 characters long.</Errors> : null}

                <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    blurChange={emailBlurHandler}
                    inputChange={emailChangeHandler}
                    isInvalid={emailInputIsInvalid}
                    value={email} />
                {emailInputIsInvalid ? <Errors>Entered email address is not valid</Errors> : null}

                <Input
                    type="password"
                    placeholder="Create a password"
                    id="password" name="password"
                    inputChange={passwordChangeHandler}
                    blurChange={passwordBlurHandler}
                    isInvalid={passwordInputIsInvalid}
                    value={enteredPassword}
                />
                {passwordInputIsInvalid ? <Errors>Your password must be at least 8 characters long. </Errors> : null}


                <ButtonsContainer>
                    <Button width="fullWidth">Submit</Button>
                </ButtonsContainer>

            </Form>
            <div>
                <GoogleLogin
                    clientId={process.env.googleClientId}
                    buttonText="Log in with Google"
                    render={renderProps => (
                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</GoogleButton>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <FacebookLogin
                    appId={process.env.facebookAppID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    render={renderProps => (
                        <FacebookButton onClick={renderProps.onClick} />
                    )}
                />
                <ParagraphStyle onClick={() => props.closeModal()} align="center">Cancel</ParagraphStyle>

                {submissionError ? <Errors align="center">{submissionError} </Errors> : null}
            </div>

            <Policy>By continuing, you agree to Inspiry&apos;s Terms of Service and acknowledge you&apos;ve read our
                <Link passHref href="/privacy-policy"><a> Privacy Policy</a></Link>
            </Policy>

            <LoadingOverlay show={showOverlay} />
        </React.Fragment >
    )
}

export default RegisterForm
const Form = styled.form`
  width: 95%;
  max-width: 300px;
`
const Policy = styled(Paragraph)`
font-size: 0.9rem;
text-align: center;
line-height: 1.3rem;
width: 95%;
  max-width: 300px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

`
const ParagraphStyle = styled(Paragraph)`
margin: 10px 0; 
cursor: pointer;
&:hover{
text-decoration: underline; 
}
`