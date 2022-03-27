import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
function OrderBottomMeta(props) {
    const image = props.orderData.products.map(item => {
        return (
            <ImageBorder key={item.productID} href={item.productLink} target="_blank">
                <ImageStyle
                    src={item.productImage[0] ? item.productImage[0] : "/home/placeholder-image.jpeg"}
                    width="100px" height="100px"
                    layout="fixed"
                    alt={item.productName} />
            </ImageBorder>
        )
    })

    const orderClickHandler = () => {
        props.orderClickPass(props.orderData.orderNumber)
    }
    console.log(props.orderData.shippingInfo)
    return (
        <Container>
            <div>
                {image}
            </div>
            <ButtonsContainer>

                <Button onClick={orderClickHandler}>View Order</Button>
                {props.orderData.shippingInfo ?

                    <Link passHref href={props.orderData.shippingInfo[0].custom_tracking_link} >
                        <Anchor target="_blank">
                            Track Order
                        </Anchor>

                    </Link>
                    : null
                }


            </ButtonsContainer>
        </Container>
    )
}

export default OrderBottomMeta
const Container = styled.div`
margin-top: 30px;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
@media (max-width: 770px ){ 
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
}
`

const ButtonsContainer = styled.div`
width: 100%;
max-width: 300px;
`
const Button = styled.button`
background: none;
display: block;
width: 100%;
max-width: 200px;
font-size: 0.9rem;
padding: 10px 0 ;
margin: 15px 0 15px auto ;
border: 1px solid var(--darkGrey);
border-radius: 8px;
cursor: pointer;
&:hover{ 
    background: var(--black);
    color: white;
}
@media (max-width: 770px ){ 
    margin: 15px 0 15px 0 ;
}
`
const ImageBorder = styled.a`
border: 2px solid var(--beige);
display: inline-block;
margin: 0 15px 15px 0;
padding: 5px;
`
const Anchor = styled.a`
text-decoration: none ;
background: none;
display: block;
width: 100%;
max-width: 200px;
text-align: center;
font-size: 0.9rem;
padding: 8px 0 ;
margin: 15px 0 15px auto ;
border: 1px solid var(--darkGrey);
border-radius: 8px;
cursor: pointer;
@media (max-width: 770px ){ 
    margin: 15px 0 15px 0 ;
}
&:hover{ 
    background: var(--black);
    color: white;
}
`

const ImageStyle = styled(Image)`
object-fit: cover;
`