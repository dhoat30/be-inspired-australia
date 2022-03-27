import React from 'react'
import TimelineItem from './TimelineItem'

function Timeline({ orderData }) {

    return (
        <TimelineItem status={orderData.postStatus} />
    )
}

export default Timeline
