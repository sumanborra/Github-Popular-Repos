// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, activeLanguage, updateButtonWithActiveLanguage} =
    props
  const {id, language} = languageFiltersData
  const changeButton = () => {
    updateButtonWithActiveLanguage(id)
  }
  const activeButtonStyle = id === activeLanguage ? 'active-button' : ''
  return (
    <li className="list-item-lagunage-filter">
      <button
        type="button"
        className={`buttn-language ${activeButtonStyle}`}
        onClick={changeButton}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
