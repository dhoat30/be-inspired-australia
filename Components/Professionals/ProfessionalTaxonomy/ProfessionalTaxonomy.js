import React, { useState, useContext, useEffect } from 'react'
import Taxonomy from '../../UI/Taxonomy/Taxonomy'
import ProfessionalDataContext from '../../../store/professional-context'
import { useRouter } from 'next/router'
import MediumTitle from '../../UI/Titles/Titles/MediumTitle'
import Paragraph from '../../UI/Titles/Paragraph/Paragraph'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import Button from '../../UI/Button/Button'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
function ProfessionalTaxonomy(props) {
    const router = useRouter()
    const [parentSlug, setParentSlug] = useState(false)
    const [slug, setSlug] = useState([])
    const [filterData, setFilterData] = useState()
    const [showLoading, setShowLoading] = useState(false)
    const [tagValue, setTagValue] = useState('')
    const professionalDataCtx = useContext(ProfessionalDataContext)
    const isTablet = useMediaQuery({
        query: `(max-width: 1000px)`
    })
    useEffect(() => {
        if (slug.length > 0 || tagValue) {
            const body = {
                categorySlug: slug[slug.length - 1],
                tagSlug: tagValue
            }

            setShowLoading(true)
            fetch('https://inspiry.co.nz/wp-json/inspiry/v1/trade-categories', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    setShowLoading(false)
                    let professionalData = res.map(item => {
                        return {
                            id: item.id,
                            slug: item.slug,
                            title: item.title,
                            content: item.content,
                            tradeProfessionalCategories: item.categories,
                            tradeProfessionalTags: item.tags,
                            acf: item.acf,
                        }
                    })
                    professionalDataCtx.getProfessionalData(professionalData)
                })
                .catch(err => {
                    setShowLoading(false)
                })
        }
    }, [slug, tagValue])

    if (!professionalDataCtx.professionalCategories || !professionalDataCtx.professionalTags) {
        return null
    }

    const parentCategories = professionalDataCtx.professionalCategories.map(item => {
        if (!item.parent) {
            return {
                id: item.id,
                name: item.name,
                slug: item.slug,
            }
        }
    })

    const childCategories = professionalDataCtx.professionalCategories.map(item => {
        if (item.parent && item._embedded.up[0].slug === slug[0]) {
            return {
                id: item.id,
                name: item.name,
                slug: item.slug,
            }
        }
    })

    const slugValueHandler = (value) => {
        setParentSlug(true)
        if (slug.length > 1) {
            setSlug(oldSlug => {
                oldSlug = oldSlug.slice(0, -1)
                return [...oldSlug, value]
            })
        }
        else {
            setSlug(oldSlug => [...oldSlug, value])
        }
    }
    return (
        <div>
            <LoadingOverlay show={showLoading} />
            {!parentSlug ?
                <Taxonomy
                    slugValuePass={slugValueHandler}
                    parentCategories={parentCategories}
                    title="Professional categories"
                    type="category"
                /> :
                <Taxonomy
                    showArrow={true}
                    slugValuePass={slugValueHandler}
                    parentCategories={childCategories}
                    title="Professional categories"
                    type="category"
                />
            }
            <Taxonomy
                tagsData={professionalDataCtx.professionalTags}
                title="Region Covered"
                type="tag"
                radioValuePass={(value) => setTagValue(value)}
            />
            {isTablet && <ApplyButton onClick={() => props.setShowMobileSidebar(false)}>Apply</ApplyButton>}
        </div>
    )
}

export default ProfessionalTaxonomy
const ApplyButton = styled(Button)`
display: block;
width: 100%;
`