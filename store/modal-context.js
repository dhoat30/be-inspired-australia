import { createContext, useState } from "react";

const ModalContext = createContext({
    loginModal: false,
    showLoginModal: function () { },
    hideLoginModal: function () { }
})

export function ModalContextProvider(props) {
    const [loginModal, setLoginModal] = useState(false)

    function showLoginModalHandler() {
        setLoginModal(true)
    }
    function hideLoginModalHandler() {
        setLoginModal(false)
    }

    const context = {
        loginModal: loginModal,
        showLoginModal: showLoginModalHandler,
        hideLoginModal: hideLoginModalHandler
    }

    return <ModalContext.Provider value={context}>{props.children} </ModalContext.Provider>
}
export default ModalContext

