// Write your code here
const SimilarProductItem = props => {
  const {hello} = props
  const {imageUrl, title, brand, price, rating} = hello
  return (
    <li>
      <img src={imageUrl} alt={`similar product ${title}`} />
      <p>{title}</p>
      <p>by {brand}</p>
      <p>Rs {price}</p>
      <p>{rating}</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
        alt="star"
      />
    </li>
  )
}

export default SimilarProductItem
