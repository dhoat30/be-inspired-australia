import React from 'react'
import styled from 'styled-components'
import SocialMedia from '../../../../UI/SocialMedia/SocialMedia'
import Paragraph from '../../../../UI/Titles/Paragraph/Paragraph'
import MediumTitle from '../../../../UI/Titles/Titles/MediumTitle'

function Contact({ singleData }) {
    console.log(singleData)
    return (
        <div>
            {singleData.acf.phone_number ?
                <Info>
                    <Key>Phone</Key>
                    <Anchor href={`tel:${singleData.acf.phone_number}`}><Value>{singleData.acf.phone_number}</Value></Anchor>
                </Info>
                : null
            }

            {singleData.acf.mobile_number ?
                <Info>
                    <Key>Mobile</Key>
                    <Anchor href={`tel:${singleData.acf.mobile_number}`}><Value>{singleData.acf.mobile_number}</Value></Anchor>
                </Info>
                : null
            }

            {singleData.acf.email_address ?
                <Info>
                    <Key>Email</Key>
                    <Anchor target="_blank" href={`mailto:${singleData.acf.email_address}`}><Value>{singleData.acf.email_address}</Value></Anchor>
                </Info>
                : null
            }

            {singleData.acf.website ?
                <Info>
                    <Key>Website</Key>
                    <Anchor target="_blank" href={`${singleData.acf.website}`}><Value>{singleData.acf.website.replace(/(^\w+:|^)\/\//, '')}</Value></Anchor>
                </Info>
                : null
            }

            <SocialMediaContainer>
                <SocialMedia
                    facebookLink={singleData.acf.facebook}
                    instagramLink={singleData.acf.instagram}
                    linkedinLink={singleData.acf.linkedin}
                    pinterestLink={singleData.acf.pinterest}
                />
            </SocialMediaContainer>
            <div>
                <Key>Address</Key>
                <Paragraph>{singleData.acf.street_address} </Paragraph>
                <Paragraph>{singleData.acf.suburb} </Paragraph>
                <Paragraph>{singleData.acf.town_city} {singleData.acf.postcode} </Paragraph>
            </div>

        </div>
    )
}

export default Contact
const Info = styled.div`
display: flex;
align-items: center; 
margin-bottom: 5px;
`
const Key = styled.h6`
    font-size: 1.2rem;
   font-weight: 600;
   color: var(--darkGrey);
   width: 100px;
`
const Value = styled(Key)`
font-weight: 400;
margin-left: 20px;
width: 100%;
`
const Anchor = styled.a`
text-decoration: none; 
&:hover{ 
    text-decoration: underline;
}
`
const SocialMediaContainer = styled.div`
margin: 30px 0;
`
