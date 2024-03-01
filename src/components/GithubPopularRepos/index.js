import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: apiStatusValue.initial,
  }

  componentDidMount() {
    this.getRopositoryItems()
  }

  getRopositoryItems = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const {activeLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const update = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({repositoryList: update, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  updateButtonWithActiveLanguage = id => {
    this.setState({activeLanguage: id}, this.getRopositoryItems)
  }

  inProgressLoading = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  successView = () => {
    const {repositoryList} = this.state
    return (
      <ul className="list-container item">
        {repositoryList.map(each => (
          <RepositoryItem repositoryList={each} key={each.id} />
        ))}
      </ul>
    )
  }

  failureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="fialureview-image"
        />
      </div>
    )
  }

  resultPage = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.inProgressLoading()
      case apiStatusValue.success:
        return this.successView()
      case apiStatusValue.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguage, repositoryList} = this.state
    return (
      <div className="background-container-git-rpos">
        <h1 className="heading-popular">popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageFiltersData={each}
              key={each.id}
              activeLanguage={activeLanguage}
              updateButtonWithActiveLanguage={
                this.updateButtonWithActiveLanguage
              }
            />
          ))}
        </ul>
        {this.resultPage()}
      </div>
    )
  }
}
export default GithubPopularRepos
