import React from 'react'
// --------------- React ----------------------

import './PaginationCards.css'
// ---------- CSS -----------

const PaginationCards = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {

    let pages = [];

    for ( let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => {
                return (
                    <button id='BtnPageNum'
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? "active" : ""}
                    >{page}</button>
                )
            })}
        </div>
    )
}

export default PaginationCards;