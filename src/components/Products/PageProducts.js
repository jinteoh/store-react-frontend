import React, { useContext } from 'react'
import ProductList from './ProductList'
import { ProductContext } from '../../contexts/ProductContext'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

const PageProducts = () => {

    const { sorted, page, changePage } = useContext(ProductContext);

    if (sorted[page]) {
        return (
            <>
                <ProductList title="our products" products={sorted[page]} />

                {sorted.length > 1 && <article className="pagination-buttons">
                    {/* prev */}
                    {page > 0 &&
                        <button className="prev-page-btn" onClick={() => {
                            changePage(page - 1)
                        }}>
                            <FaAngleDoubleLeft />
                        </button>
                    }

                    {sorted.map((_, index) => {
                        return <button
                            onClick={() => {
                                changePage(index)
                            }}
                            key={index}
                            className={`page-btn ${page === index && `page-btn-current`}`}
                        >
                            {index + 1}
                        </button>
                    })}
                    {/* next */}
                    {page < sorted.length - 1 &&
                        <button className="prev-page-btn" onClick={() => {
                            changePage(page + 1)
                        }}>
                            <FaAngleDoubleRight />
                        </button>
                    }


                </article>}


            </>
        )
    } else {
        return <h3 className="search-errors">
            unfortunately your search query did not return any products
        </h3>
    }

}

export default PageProducts
