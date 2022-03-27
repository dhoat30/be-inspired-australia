import { createContext, useState } from 'react'

const ProfessionalDataContext = createContext({
    professionalData: null,
    singleProfessionalData: null,
    professionalCategories: null,
    filterCategoriesData: null,
    professionalTags: null,
    getProfessionalData: function (professionalData) { },
    getProfessionalCategories: function (professionalCategories) { },
    getSingleProfessionalData: function (singleProfessionalData) { },
    getProfessionalTags: function (professionalTags) { },
    getFilterCategoriesData: function (filterCategoriesData) { }
})

export function ProfessionalDataContextProvider(props) {
    const [professionalData, setProfessionalData] = useState()
    const [singleProfessionalData, setSingleProfessionalData] = useState()
    const [filterCategoriesData, setFilterCategoriesData] = useState()
    const [professionalCategories, setProfessionalCategories] = useState()
    const [professionalTags, setProfessionalTags] = useState()

    // get all professional data
    function getProfessionalDataHandler(professionalData) {
        setProfessionalData(professionalData)
    }

    // get single professional data
    function getSingleProfessionalDataHandler(singleProfessionalData) {
        setSingleProfessionalData(singleProfessionalData)
    }

    // get single categories  data
    function getFilterCategoriesDataHandler(filterCategoriesData) {
        setFilterCategoriesData(filterCategoriesData)
    }
    // get all categories
    function getProfessionalCategoriesHandler(categoriesData) {
        setProfessionalCategories(categoriesData)
    }

    // get all tags
    function getProfessionalTagsHandler(tagsData) {
        setProfessionalTags(tagsData)
    }
    // set context
    const context = {
        professionalData: professionalData,
        singleProfessionalData: singleProfessionalData,
        professionalCategories: professionalCategories,
        filterCategoriesData: filterCategoriesData,
        professionalTags: professionalTags,
        getProfessionalData: getProfessionalDataHandler,
        getProfessionalCategories: getProfessionalCategoriesHandler,
        getSingleProfessionalData: getSingleProfessionalDataHandler,
        getFilterCategoriesData: getFilterCategoriesDataHandler,
        getProfessionalTags: getProfessionalTagsHandler
    }

    return (<ProfessionalDataContext.Provider value={context}>
        {props.children}
    </ProfessionalDataContext.Provider>)
}

export default ProfessionalDataContext