/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/GrassLocalPagination.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 27th 2022, 9:36:10 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/GrassSelect.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 20th 2022, 2:56:25 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useRef, useState, useEffect } from "react"
import Pagination from 'react-bootstrap/Pagination'

const GrassLocalPagination = ({pageStart=0, pageEnd=12, pageTotal=1, currentPage=1, limit=12, onPageChange }) => {
    // const [modulePageViewLimit, setModulePageViewLimit] = useState(12)
    // const [currentPage, setCurrentPage] = useState(1)
    // const [pageTotal, setPageTotal] = useState(1)
    // const [pageStart, setPageStart] = useState(0)
    // const [pageEnd, setPageEnd] = useState(modulePageViewLimit)
    pageEnd = pageEnd || limit

    // Change to a given page
    const changePageTo = (page) => {
        console.log("Page Change", page)
        currentPage = page
        let newStart = (page - 1) * limit
        let newEnd = newStart + limit
        console.log("New Start", newStart, "New End", newEnd)
        pageStart = newStart
        pageEnd = newEnd
    }

    // Handle Pagination
    const handlePageChange = (e) => {
        let newPage = parseInt(e.target.innerText)
        onPageChange(newPage)
    }

    // Reset Pagination when family changes via tab
    // const resetPagination = () => {
    //     setCurrentPage(1)
    //     setPageStart(0)
    //     setPageEnd(limit)
    // }

    // Go to next page
    const firstPage = () => {
        if (currentPage > 1) {
            let newPage = 1
            onPageChange(newPage)
        }
    }

    // Go to next page
    const previousPage = () => {
        if (currentPage > 1) {
            let newPage = currentPage - 1
            onPageChange(newPage)
        }
    }

    // Go to next page
    const nextPage = () => {
        if (currentPage < pageTotal) {
            let newPage = currentPage + 1
            onPageChange(newPage)
        }
    }

    // Go to last page
    const lastPage = () => {
        if (currentPage < pageTotal) {
            onPageChange(pageTotal)
        }
    }
  

  return (
    <Pagination>
        <Pagination.First onClick={firstPage} disabled={currentPage === 1}/>
            <Pagination.Prev onClick={previousPage} disabled={currentPage === 1}/>
                { 
                    Array.from(Array(pageTotal), (e, i) => {
                        return(
                            <Pagination.Item 
                                key={i +1} 
                                value={i +1}
                                active={i+1 === currentPage}
                                onClick={handlePageChange}>{i + 1}
                            </Pagination.Item>
                        )
                    })
                }
            <Pagination.Next onClick={nextPage} disabled={currentPage === pageTotal}/>
        <Pagination.Last onClick={lastPage} disabled={currentPage === pageTotal}/>
    </Pagination>
  )



}
export default GrassLocalPagination;