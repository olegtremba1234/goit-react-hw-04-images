import React, { Component } from "react";
import PropTypes from "prop-types"
import style from "./Searchbar.module.css"
import { ReactComponent as SearchIcon } from "./search.svg";
import { Notify } from "notiflix";

export default class Searchbar extends Component {
  state = { searchQuery: '' }

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() })
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.searchQuery.trim();

    if (query === '') {
      return Notify.warning("Введіть дані для запиту!")
    }

    this.props.onSubmit(query);
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
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
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>

    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}