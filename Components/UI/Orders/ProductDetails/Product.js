import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Paragraph from '../../Titles/Paragraph/Paragraph'
function Product({ src, productName, quantity, productLink, total }) {

    return (
        <ProductCard>
            <ImageCard>
                <ImageStyle
                    alt={productName}
                    src={src ? src : "/home/placeholder-image.jpeg"} width="70px"
                    height="70px"
                    layout="fixed" />
            </ImageCard>
            <NameCard>
                <Paragraph>{productName}</Paragraph>
                <Paragraph fontWeight={600}>{quantity} X ${total}</Paragraph>
            </NameCard>
            <Anchor target="_blank" href={productLink}>View Product</Anchor>
        </ProductCard>
    )
}

export default Product
const ProductCard = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media (max-width: 700px){ 
    flex-wrap: wrap;
}
`
const ImageCard = styled.div`
border: 2px solid var(--beige);
display: inline-block;
margin: 0 15px 15px 0;
padding: 5px;
`
const NameCard = styled.div`
max-width: 300px;
width: 100%;
`
const Anchor = styled.a`
width: 150px;
display: inline-block;
text-align: center;
border: 1px solid var(--darkGrey);
border-radius: 8px;
padding: 7px;
text-decoration: none;
&:hover{ 
    background: var(--black);
    color: white; 
}
@media (max-width: 700px){ 
    margin: 10px 0 50px 0;
}
`
const ImageStyle = styled(Image)`
object-fit: cover;
`