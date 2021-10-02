import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)

  const { products, loading, error } = productList

  // everytime the component loads and the dependency is changed, useEffect will run
  useEffect(() => {
    //since were using dispatch in the dependency, we need to pass it in as the dependency
    dispatch(listProducts(keyword)) // we pass in keyword in listProducts bec thats the action that calls the products from the backend
  }, [dispatch, keyword])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col
              // className='align-items-stretch d-flex'
              key={product._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen

// HS is the parent of Product Component. In the HS all the products are displayed as per the Product comp layout
