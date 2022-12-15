import { useState } from "react";
import PropTypes from "prop-types"
import style from "./Searchbar.module.css"
import { ReactComponent as SearchIcon } from "./search.svg";
import { Notify } from "notiflix";

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = e => {
    const { value } = e.target
    setSearchQuery(value)
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return Notify.warning("Введіть дані для запиту!")
    }
    onSubmit(searchQuery);
  };

    return (
      <header className={style.Searchbar}>
        <form className={style.form} onSubmit={handleSubmit}>
          <button type="submit" className={style.button}>
            <SearchIcon width="20" height="20" />
            <span className={style.label}>Search</span>
          </button>
          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleChange}
          />
        </form>
      </header>

    )
  
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}