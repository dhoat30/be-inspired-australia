import React from 'react'
import styled from 'styled-components'
import Paragraph from '../../Titles/Paragraph/Paragraph'

function TimelineItem({ status }) {
    let progressBar
    let backOrderDot, processedDot, shippedDot, completedDot

    if (status === "processing") {
        progressBar = "0%"

    }
    else if (status === "back-order") {
        progressBar = "25%"
        backOrderDot = true
    }
    else if (status === 'processed') {
        progressBar = '50%'
        backOrderDot = true
        processedDot = true
    }
    else if (status === 'shipped') {
        progressBar = '75%'
        backOrderDot = true
        processedDot = true
        shippedDot = true
    }
    else if (status === 'completed') {
        progressBar = '100%'
        backOrderDot = true
        processedDot = true
        shippedDot = true
        completedDot = true
    }
    return (
        <Container>
            <Line progressBar={progressBar}>  </Line>
            <ProgressLine />
            <Processing>
                <ParagraphStyle fontWeight="600">Processing</ParagraphStyle>
                <ProcessingDot ></ProcessingDot>
            </Processing>
            <BackOrder>
                <ParagraphStyle fontWeight="600">Back Order</ParagraphStyle>
                <BackOrderDot backOrderDot={backOrderDot}></BackOrderDot>
            </BackOrder>
            <Processed>
                <ParagraphStyle fontWeight="600">Processed</ParagraphStyle>
                <ProcessedDot processedDot={processedDot}></ProcessedDot>
            </Processed>
            <Shipped>
                <ParagraphStyle fontWeight="600">Shipped</ParagraphStyle>
                <ShippedDot shippedDot={shippedDot}></ShippedDot>
            </Shipped>
            <Completed>
                <ParagraphStyle fontWeight="600">Completed</ParagraphStyle>
                <CompletedDot completedDot={completedDot}></CompletedDot>
            </Completed>
        </Container>
    )
}

export default TimelineItem

const Container = styled.div`
position: relative;
margin: 70px 0 50px 0;
height: 10px;
width: 90%;

@media(max-width: 650px){ 
    transform: rotate(90deg); 
    height: 500px;
    min-width: 300px;
    width: 100%;
    right: calc(100% - 20px) ;

}
@media(max-width: 400px){ 
    width: 170%;
    right: calc(150% ) ;
}
@media(max-width: 400px){ 
    width: 200%;
    right: calc(180% ) ;
}
`
const Line = styled.div`
border-top: 10px solid var(--darkGrey);
z-index: 5; 
position: absolute;
width: ${props => props.progressBar ? props.progressBar : null};

`
const ProgressLine = styled.div`
border-top: 10px solid #F8CEA4;
position: absolute;
z-index: 1;
width: 100%;
`
const ProcessingDot = styled.div`
display: inline-block;
width: 30px;
height: 30px; 
border-radius: 50%;
background: var(--darkGrey); 
`
const BackOrderDot = styled(ProcessingDot)`
background: ${props => !props.backOrderDot ? "#F8CEA4" : "var(--darkGrey)"};
`
const ProcessedDot = styled(ProcessingDot)`
background: ${props => !props.processedDot ? "#F8CEA4" : "var(--darkGrey)"};
`
const ShippedDot = styled(ProcessingDot)`
background: ${props => !props.shippedDot ? "#F8CEA4" : "var(--darkGrey)"};
`
const CompletedDot = styled(ProcessingDot)`
background: ${props => !props.completedDot ? "#F8CEA4" : "var(--darkGrey)"};
`
const Processing = styled.div`
position: absolute;
top: -36px;
left: -1px;
z-index: 6;


`
const BackOrder = styled(Processing)`
left: 25%;
`
const Processed = styled(Processing)`
left: 50%;
`
const Shipped = styled(Processing)`
left: 75%;
`
const Completed = styled(Processing)`
left: calc(100% - 20px);
`

const ParagraphStyle = styled(Paragraph)`
@media(max-width: 650px){ 
    transform: rotate(270deg); 
    top: -50px;
    left: -30px; 
}
`