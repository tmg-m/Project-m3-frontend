function Search({ onSearch }) {

  const handleInput = (e) => {
    onSearch(e.target.value);
  };

  return(
    <>
      <input
        name="title"
        type="search"
        placeholder="Search Task"
        onChange={handleInput}
      />
    </>
  )
}

export default Search;