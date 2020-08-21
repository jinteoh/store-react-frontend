import React, { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Loading from '../components/Loading'
import ProductList from '../components/Products/ProductList'

const Products = () => {

  const { loading, products } = useContext(ProductContext);

  if (loading) {
    return <Loading />
  }

  return (
    <ProductList title="our products" products={products} />
  )
}

export default Products
