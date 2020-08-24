import React, { useContext } from 'react'
import ProductList from './ProductList'
import { ProductContext } from '../../contexts/ProductContext'
import Loading from '../Loading'

const FeaturedProducts = () => {
  const { loading, featured } = useContext(ProductContext);

  if (loading) {
    return <Loading />
  }

  return (
    <ProductList title="featured products" products={featured} />
  )
}

export default FeaturedProducts
