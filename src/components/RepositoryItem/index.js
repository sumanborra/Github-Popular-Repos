// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryList} = props
  const {avatarUrl, forksCount, id, issuesCount, name, starsCount} =
    repositoryList

  return (
    <li className="card-container-repository-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="title-text">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image-stars"
        />
        <p className="starsCount-text">{starsCount} stars</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image-stars"
        />
        <p className="starsCount-text">{forksCount} forks</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image-stars"
        />
        <p className="starsCount-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
