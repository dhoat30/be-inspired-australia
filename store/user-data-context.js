import { createContext, useState, useEffect } from 'react'

const UserDataContext = createContext({
    userData: null,
    optionsData: null,
    getUserData: function (userData) { },
    getOptionsData: function (optionsData) { }
})

export function UserDataContextProvider(props) {
    const [userData, setUserData] = useState()
    const [optionsData, setOptionsData] = useState()
    // get user data
    function getUserDataHandler(userData) {
        setUserData(userData)
    }

    // get options data
    function getOptionsDataHandler(optionsData) {
        setOptionsData(optionsData)
    }
    const context = {
        userData: userData,
        optionsData: optionsData,
        getUserData: getUserDataHandler,
        getOptionsData: getOptionsDataHandler
    }

    return (<UserDataContext.Provider value={context}>
        {props.children}
    </UserDataContext.Provider>)
}

export default UserDataContext