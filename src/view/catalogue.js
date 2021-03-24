import React, { useEffect } from "react";
import { Menu, RenderMenu } from "./menu";
import cakePreview from "../img/cake.png";

export function Catalogue(props) {
  useEffect(() => {
    if (props.state.request) {
      setMenu(props.state.request);
    }
  }, [props.state.favouriteCakes]);

  async function setMenu(type) {
    try {
      const data = await Menu(type);
      if (!data) throw new Error("Couldn't connect to the server");
      props.state.setMenuRecipes(data);
      const markup = await RenderMenu(data, props);
      props.state.currentRequest(type);
      props.state.anyMarkup(markup);
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
        {props.state.markup ? "" : <h3 className="catalogue__intro">Please choose your desserts!</h3>}
        <div className="catalogue__main">
          <img className="catalogue__main-preview" style={!props.state.currentMenuItem.image ? {} : { objectFit: "cover" }} src={!props.state.currentMenuItem.image ? cakePreview : props.state.currentMenuItem.image} alt="cake preview"></img>
          <h3 className="catalogue__main-name">{!props.state.currentMenuItem.title ? "Select your cake!" : props.state.currentMenuItem.title}</h3>
          <a
            className="link catalogue__main-order"
            onClick={() => {
              if (props.state.cart.some((el) => el.title === props.state.currentMenuItem.title)) {
                return;
              }
              if (props.state.cart.length >= 0) {
                props.state.addToCart(props.state.currentMenuItem);
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
              <h4 className="catalogue__main-info__popup-head">{props.state.currentMenuItem ? props.state.currentMenuItem.title : "My Cake"}</h4>
              <p className="catalogue__main-info__popup-ing">
                bla bla bla bla bla
                <br />
                Ings ings ings
              </p>
            </div>
          </div>
        </div>
        <div className="catalogue__menu">{props.state.markup ? props.state.markup.map((el) => el) : ""}</div>
      </div>
    </section>
  );
}
