import '../css/base.css'
import searchLogo from '../css/icons/search.png'

function Search({ onSearch }) {

  const handleInput = (e) => {
    onSearch(e.target.value);
  };

  return(
    <div className="search">
      <img src={searchLogo}></img>
      <input 
        name="title"
        type="search"
        placeholder="Search Task"
        onChange={handleInput}
      />
    </div>
  )
}

export default Search;