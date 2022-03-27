import React from 'react'
import Breadcrumbs from 'nextjs-breadcrumbs';

function BreadCrumbs() {
    return (
        <Breadcrumbs useDefaultStyle rootLabel="Home" containerClassName="breadcrumb-container" inactiveItemClassName="breadcrumbs-list" activeItemClassName="active-breadcrumb-list" />
    )
}

export default BreadCrumbs
