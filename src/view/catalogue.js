import React, { useEffect } from "react";
import { Menu, RenderMenu } from "./menu";
import cakePreview from "../img/cake.png";
import * as ACTIONS from '../redux/actions';
import { connect } from "react-redux";


function Catalogue(props) {
  useEffect(() => {
    if (props.request) {
      setMenu(props.request);
    }
  }, [props.favouriteCakes]);

  async function setMenu(type) {
    try {
      const data = await Menu(type);
      if (!data) throw new Error("Couldn't connect to the server");
      props.setMenuRecipes(data);
      const markup = await RenderMenu(data, props);
      props.currentRequest(type);
      props.anyMarkup(markup);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="catalogue">
      <div className="catalogue__head">
        <h3 className="catalogue-header">Catalogue</h3>
        <nav className="catalogue__nav">
          <a
            href="#"
            className="link catalogue__nav-link cakes"
            onClick={() => {
              setMenu("cake");
            }}>
            Cakes
          </a>
          <a href="#" className="link catalogue__nav-link desserts" onClick={() => setMenu("cheesecake")}>
            Cheesecake
          </a>
          <a href="#" className="link catalogue__nav-link muffins" onClick={() => setMenu("brownies")}>
            Brownies
          </a>
        </nav>
      </div>
      <div className="catalogue__info">
        {props.markup ? "" : <h3 className="catalogue__intro">Please choose your desserts!</h3>}
        <div className="catalogue__main">
          <img className="catalogue__main-preview" style={!props.currentMenuItem.image ? {} : { objectFit: "cover" }} src={!props.currentMenuItem.image ? cakePreview : props.currentMenuItem.image} alt="cake preview"></img>
          <h3 className="catalogue__main-name">{!props.currentMenuItem.title ? "Select your cake!" : props.currentMenuItem.title}</h3>
          <a
            className="link catalogue__main-order"
            onClick={() => {
              if (props.cart.some((el) => el.title === props.currentMenuItem.title)) {
                return;
              }
              if (props.cart.length >= 0) {
                props.addToCart(props.currentMenuItem);
              }
            }}>
            Add To Cart
          </a>
          <div
            className="catalogue__main-info"
            onMouseEnter={() => {
              document.querySelector(".catalogue__main-info__popup").classList.remove("hidden");
            }}
            onMouseLeave={() => {
              document.querySelector(".catalogue__main-info__popup").classList.add("hidden");
            }}>
            <p>Additional Info</p>
            {props.iconInfo}
            <div className="catalogue__main-info__popup hidden">
              <h4 className="catalogue__main-info__popup-head">{props.currentMenuItem ? props.currentMenuItem.title : "My Cake"}</h4>
              <p className="catalogue__main-info__popup-ing">
                bla bla bla bla bla
                <br />
                Ings ings ings
              </p>
            </div>
          </div>
        </div>
        <div className="catalogue__menu">{props.markup ? props.markup.map((el) => el) : ""}</div>
      </div>
    </section>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
