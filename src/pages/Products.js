import React, { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Loading from '../components/Loading'
import Filters from '../components/Products/Filters'
import PageProducts from '../components/Products/PageProducts'

const Products = () => {

  const { loading, sorted } = useContext(ProductContext);
  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Filters />
      <PageProducts />
    </>
  )
}

export default Products
