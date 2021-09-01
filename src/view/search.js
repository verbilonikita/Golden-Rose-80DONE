import React, { useEffect, useState } from "react";
import { markup } from "../redux/actions";
import { Menu, RenderMenu } from "./menu";
import * as ACTIONS from '../redux/actions';
import { connect } from "react-redux";

//Main Screen
function Search(props) {
  const [error, setError] = useState("");
  const [markupSearch, setMarkupSearch] = useState("");

  useEffect(() => {
    if (markupSearch) setMenu(props.state.request);
  }, [props.favouriteCakes]);

  //Set Menu

  async function setMenu(value) {
    try {
      props.currentRequest(value);
      const data = await Menu(value);
      props.setMenuRecipes(data);
      const markup = await RenderMenu(data, props);
      setMarkupSearch(markup);
      setError("");
    } catch (err) {
      const newErr = String(err).slice(7).toUpperCase();
      setMarkupSearch("");
      setError(newErr);
    }
  }

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={(e) => {
          e.preventDefault();
          const value = e.target.children[0].value;
          e.target.children[0].value = "";
          setMenu(value);
        }}>
        <input className="search__input" type="text"></input>
      </form>
      {error ? <Error error={error} /> : ""}
      {markupSearch ? <Item searchItems={markupSearch} /> : ""}
      {!error && !markupSearch ? <Initial /> : ""}
    </section>
  );
}

// Initial Screen onload
function Initial() {
  return (
    <div className="search__start">
      <h2 className="search__header">Find a cake to try!</h2>
      <div className="search__start-back"></div>
    </div>
  );
}

//Error Screen (nothing found);
function Error(state) {
  return (
    <div className="search__error">
      <h3 className="error-header">{state.error}</h3>
      <div className="error-img"></div>
    </div>
  );
}

// Items (if something is found);
function Item(props) {
  return <section className="search__preview">{props.searchItems ? props.searchItems.map((el) => el) : ""}</section>;
}


//Redux
function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currentRequest: (type) => dispatch(ACTIONS.request(type)),
    pageChanger: (page) => dispatch(ACTIONS.pageChanger(page)),
    setMenuRecipes: (query) => dispatch(ACTIONS.setMenu(query)),
    setMenuItem: (item) => dispatch(ACTIONS.currentMenuItem(item)),
    addBookmark: (item) => dispatch(ACTIONS.addBookmark(item)),
    addToCart: (items) => dispatch(ACTIONS.addToCart(items)),
    updateBookmark: (item) => dispatch(ACTIONS.updateBookmark(item)),
    updateCart: (item) => dispatch(ACTIONS.updateCart(item)),
    addIngredients: (num) => dispatch(ACTIONS.addIngredients(num)),
    anyMarkup: (markup) => dispatch(ACTIONS.markup(markup)),
    clearMarkup: () => dispatch(ACTIONS.clearMarkup()),
    clearBookmark: () => dispatch(ACTIONS.clearBookmark()),
    randomRecipe: (item) => dispatch(ACTIONS.randomRecipe(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);