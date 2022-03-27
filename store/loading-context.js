import { createContext, useState } from 'react'

const LoadingContext = createContext({
    showLoadingOverlay: true,
    getShowLoadingOverlay: function (showLoadingOverlay) { },
})

export function LoadingContextProvider(props) {
    const [showLoadingOverlay, setShowLoadingOverlay] = useState()

    // get boards data
    function getShowLoadingOverlayHandler(loadingOverlay) {
        setShowLoadingOverlay(loadingOverlay)
    }

    // set context
    const context = {
        showLoadingOverlay: showLoadingOverlay,
        getShowLoadingOverlay: getShowLoadingOverlayHandler,
    }

    return (<LoadingContext.Provider value={context}>
        {props.children}
    </LoadingContext.Provider>)
}

export default LoadingContext