import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productAction'

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)

  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>

              <ListGroupItem>
                {product.rating ? (
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                ) : (
                  'No rating found'
                )}
              </ListGroupItem>
              <ListGroupItem> Price: ${product.price}</ListGroupItem>
              <ListGroupItem>
                {' '}
                Description: ${product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className='d-grid gap-2'>
                  <Button
                    // className='w-100'
                    type='button'
                    className='btn btn-success'
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen

// When the image from product comp is clicked, it will go to ProductScreen.
// Rating component is also displayed in ProductScreen
