import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faFacebookSquare, faPinterestSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
function SocialMedia({ facebookLink, instagramLink, linkedinLink, pinterestLink }) {
    console.log(facebookLink)
    return (
        <React.Fragment>
            {facebookLink ?
                <Anchor target="_blank" href={facebookLink}> <SocialMediaIcon icon={faFacebookSquare} /></Anchor>
                : null
            }
            {instagramLink ?
                <Anchor target="_blank" href={instagramLink}> <SocialMediaIcon icon={faInstagramSquare} /></Anchor>
                : null
            }
            {linkedinLink ?
                <Anchor target="_blank" href={linkedinLink}> <SocialMediaIcon icon={faLinkedin} /></Anchor>
                : null
            }
            {pinterestLink ?
                <Anchor target="_blank" href={pinterestLink}> <SocialMediaIcon icon={faPinterestSquare} /></Anchor>
                : null
            }

        </React.Fragment>
    )
}

export default SocialMedia
const SocialMediaIcon = styled(FontAwesomeIcon)`
font-size: 2.5rem; 
cursor: pointer; 
&:hover{
    color: black; 
}
margin-right: 5px;
`
const Anchor = styled.a`
text-decoration: none; 
`