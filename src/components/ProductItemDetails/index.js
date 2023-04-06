// Write your code here
import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import SimilarProductItem from '../SimilarProductItem'

import Header from '../Header'

class ProductItemDetails extends Component {
  state = {
    isLoading: true,
    similarProductsList: [],
    cardItem: {},
    itemValue: 1,
    failureView: false,
  }

  componentDidMount() {
    this.productDetails()
  }

  plusFunction = () => {
    this.setState(prevState => ({itemValue: prevState.itemValue + 1}))
  }

  minusFunction = () => {
    const {itemValue} = this.state
    if (itemValue > 1) {
      this.setState(prevState => ({itemValue: prevState.itemValue - 1}))
    }
  }

  redirectProducts = () => {
    const {history} = this.props
    history.replace('/products')
  }

  productDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    console.log(typeof id)
    const api = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    console.log(response.ok)
    if (response.ok === true) {
      const data = await response.json()

      const updatedCardItem = {
        id: data.id,
        imageUrl: data.image_url,
        totalReviews: data.total_reviews,
        title: data.title,
        brand: data.brand,
        rating: data.rating,
        availability: data.availability,
        price: data.price,
        description: data.description,
      }

      const updatedList = data.similar_products.map(similar => ({
        id: similar.id,
        imageUrl: similar.image_url,
        title: similar.title,
        style: similar.style,
        price: similar.price,
        description: similar.description,
        brand: similar.brand,
        totalReviews: similar.total_reviews,
        rating: similar.rating,
        availability: similar.availability,
      }))
      this.setState({
        similarProductsList: updatedList,
        isLoading: false,
        cardItem: updatedCardItem,
        failureView: false,
      })
    } else {
      this.setState({failureView: true, isLoading: false})
    }
  }

  render() {
    const {
      similarProductsList,
      isLoading,
      cardItem,
      itemValue,
      failureView,
    } = this.state

    return (
      <>
        <ul>
          <Header />
        </ul>

        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        ) : (
          <>
            {failureView ? (
              <>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                  alt="failure view"
                />
                <h1>Product Not Found</h1>
                <button type="button" onClick={this.redirectProducts}>
                  Continue Shopping
                </button>
              </>
            ) : (
              <>
                <img src={cardItem.imageUrl} alt=" product" />
                <div>
                  <h1>{cardItem.title}</h1>
                  <p>Rs {cardItem.price}</p>
                  <p>{cardItem.rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                  />
                  <p>{cardItem.totalReviews} Reviews</p>
                  <p>{cardItem.description}</p>
                  <p> Available: {cardItem.availability}</p>
                  <p>Brand: {cardItem.brand}</p>
                  <hr />
                  <button
                    type="button"
                    data-testid="plus"
                    onClick={this.plusFunction}
                  >
                    <BsPlusSquare />
                  </button>
                  <p>{itemValue}</p>
                  <button
                    type="button"
                    data-testid="minus"
                    onClick={this.minusFunction}
                  >
                    <BsDashSquare />
                  </button>
                  <button type="button">ADD TO CART</button>
                </div>
                <h1>Similar Products</h1>
                <ul>
                  {similarProductsList.map(hello => (
                    <SimilarProductItem hello={hello} key={hello.id} />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </>
    )
  }
}

export default ProductItemDetails
