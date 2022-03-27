import { createContext, useState } from 'react'

const BoardsDataContext = createContext({
    boardsData: null,
    pinsData: false,
    userPinsData: null,
    getBoardsData: function (boardsData) { },
    getPinsData: function (pinsData) { },
    getUserPinsData: function (userPinsData) { }
})

export function BoardsDataContextProvider(props) {
    const [boardsData, setBoardsData] = useState()
    const [pinsData, setPinsData] = useState()
    const [userPinsData, setUserPinsData] = useState('')
    // get boards data
    function getBoardsDataHandler(boardsData) {
        setBoardsData(boardsData)
    }
    // get pins data 
    function getPinsDataHandler(pinsData) {
        setPinsData(pinsData)
    }
    // get user pins data
    function getUserPinsDataHandler(userPinsData) {
        setUserPinsData(userPinsData)
    }
    // set context
    const context = {
        boardsData: boardsData,
        pinsData: pinsData,
        userPinsData: userPinsData,
        getBoardsData: getBoardsDataHandler,
        getPinsData: getPinsDataHandler,
        getUserPinsData: getUserPinsDataHandler
    }

    return (<BoardsDataContext.Provider value={context}>
        {props.children}
    </BoardsDataContext.Provider>)
}

export default BoardsDataContext