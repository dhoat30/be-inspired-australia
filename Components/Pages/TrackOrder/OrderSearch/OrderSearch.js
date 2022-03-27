import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import Errors from '../../../UI/Notifications/Errors/Errors'
import MediumTitle from '../../../UI/Titles/Titles/MediumTitle'
import axios from 'axios'
import LoadingContext from '../../../../store/loading-context'
import Timeline from '../../../UI/Orders/Timeline/Timeline'
import Overlay from '../../../UI/Overlay/Overlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons'

function OrderSearch() {
    const [enteredOrderNumber, setEnteredOrderNumber] = useState('')
    const [enteredOrderNumberTouched, setEnteredOrderNumberTouched] = useState('')
    const [failureMessage, setFailureMessage] = useState(false)
    const [orderData, setOrderData] = useState('')
    const [showTimeline, setShowTimeline] = useState(false)
    // loading context
    const loadingCtx = useContext(LoadingContext)

    // validate password 
    let enteredOrderNumberIsValid = enteredOrderNumber.length > 5; //reg.test(enteredPasswordTouched)
    const orderNumberInputIsInvalid = !enteredOrderNumberIsValid && enteredOrderNumberTouched

    const submitHandler = async (e) => {
        e.preventDefault()
        setEnteredOrderNumberTouched(true)
        if (!enteredOrderNumberIsValid) {
            return
        }
        setFailureMessage(false)
        loadingCtx.getShowLoadingOverlay(true)

        // send request
        axios.post("https://inspiry.co.nz/wp-json/inspiry/v1/get-order-with-number",
            {
                // remove # from the entered order number
                orderNumber: enteredOrderNumber.replace("#", '')
            }).then(response => {
                console.log(response)
                if (response.data.length === 0) {
                    setFailureMessage(true)
                }
                else {
                    setOrderData(response.data[0])
                    setShowTimeline(true)
                }
                setEnteredOrderNumberTouched(false)
                loadingCtx.getShowLoadingOverlay(false)

            }).catch(err => {
                console.log(err)
                setEnteredOrderNumberTouched(false)
                loadingCtx.getShowLoadingOverlay(false)
            })
    }
    console.log(orderData)
    return (
        <Container>
            <MediumTitle>Order Search</MediumTitle>
            <Form onSubmit={submitHandler}>
                <Input
                    value={enteredOrderNumber}
                    type="text"
                    placeholder="Order Number*"
                    blurChange={() => setEnteredOrderNumberTouched(true)}
                    inputChange={(e) => setEnteredOrderNumber(e.target.value)}
                />
                <ButtonStyle >Track Order</ButtonStyle>

                {orderNumberInputIsInvalid && <Errors>Please enter the valid Order Number</Errors>}
                {failureMessage && <Errors>Order number not found</Errors>}
            </Form>
            {orderData && showTimeline ?
                <TimelineContainer>
                    <MediumTitle>Order Timeline</MediumTitle>
                    <Timeline orderData={orderData} />
                    <IconStyle
                        onClick={() => setShowTimeline(false)}
                        icon={faTimes}
                        size="2x"
                        color="var(--darkGrey)" />
                </TimelineContainer> : null
            }
            {orderData && showTimeline ? <Overlay onClick={() => setShowTimeline(false)} /> : null}
        </Container>
    )
}

export default OrderSearch
const Container = styled.section`
width: 100%;
max-width: 320px;
`
const Form = styled.form`
margin: 20px 0;
`
const ButtonStyle = styled(Button)`
    width: 100%;
    margin: 20px 0 10px 0;
`

const TimelineContainer = styled.section`
    position: fixed;
    background: white;
    width: 100%;
    max-width: 1000px;
    padding: 50px 50px;
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%);
    z-index: 3;
    @media (max-width: 400px){ 
        height: 450px;
        overflow: scroll;
    }

`

const IconStyle = styled(FontAwesomeIcon)`
position: absolute; 
right: 10px; 
top: 10px;
cursor: pointer; 
`