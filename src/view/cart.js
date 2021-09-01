import React, { useEffect, useState } from "react";
import * as ACTIONS from '../redux/actions';
import { connect } from "react-redux";


function Cart(props) {
  useEffect(() => {
    const markupOrder = props.favouriteCakes.map((el) => {
      return (
        <a
          href="#"
          className="cart__favorites__box-item link"
          key={el.title}
          onClick={() => {
            props.addIngredients(1);
          }}>
          <div className="cart__favorites__box-item__info">
            <p className="cart__favorites__box-item-name">{el.title}</p>
            <p className="cart__favorites__box-item-ings">100% organic</p>
            <p className="cart__favorites__box-item-weight">weight: 2kg - 2.2kg</p>
          </div>
          <img className="cart__favorites__box-item-img" src={el.image}></img>
        </a>
      );
    });

    const markupPayment = props.cart.map((el) => {
      return (
        <a className="cart__list-finalise__item link" data-title={el.title} key={el.title}>
          <img className="cart__list-finalise-img" src={el.image}></img>
          <p className="cart__list-finalise-name">{el.title}</p>
          <p className="cart__list-finalise-price">{el.price}</p>
          <p
            className="cart__list-finalise-bin"
            onClick={(e) => {
              const myEl = e.target.closest(".link");
              const newFavourites = props.cart.filter((el) => {
                return el.title !== myEl.dataset.title;
              });
              props.updateCart(newFavourites);
            }}>
            {props.bin}
          </p>
        </a>
      );
    });

    props.anyMarkup([markupOrder, markupPayment]);
  }, [props.favouriteCakes, props.cart]);

  return (
    <section className="cart">
      <div className="cart__favorites">
        <div className="cart__favorites__head">
          <h2 className="cart__favorites__head-header">Cart</h2>
          <p className="cart__favorites__head-info">payment and delivery</p>
          <p className="cart__favorites__head-features">Featured</p>
        </div>
        <div className="cart__favorites__box">{props.markup ? props.markup[0] : ""}</div>
        <div className="cart__favorites__ings">
          {props.currentIngs === 0 ? (
            ""
          ) : (
            <div className="cart__favorites__ings-grid">
              <h2 className="cart__favorites__ings-header">Ingredients</h2>
              <p className="cart__favorites__ings-ing">Flour random</p>
              <p className="cart__favorites__ings-ing">Fresh Strawberry random</p>
              <p className="cart__favorites__ings-ing">Chocolate random</p>
              <p className="cart__favorites__ings-ing">Eggs random</p>
              <p className="cart__favorites__ings-ing">Eggs random</p>
              <p className="cart__favorites__ings-ing">Eggs random</p>
              <p className="cart__favorites__ings-ing">Eggs random</p>
              <p className="cart__favorites__ings-ing">Eggs random</p>
              <p className="cart__favorites__ings-ing">Eggs random</p>
              <p className="cart__favorites__ings-ing">Eggs random</p>
            </div>
          )}
        </div>
        {<RenderDays />}
      </div>
      <div className="cart__list">
        <h2 className="cart__list-header">Cart</h2>
        <div className="cart__list-finalise">
          <h3>Order</h3>
          <div className="cart__list-finalise-container">{props.markup ? props.markup[1] : ""}</div>
        </div>
        <div className="cart__order">
          <a
            className="cart__order-button link"
            href="#"
            onClick={() => {
              props.pageChanger(2);
            }}>
            Order Now
          </a>
          <p>We will call you back to finalise the order! </p>
        </div>
      </div>
    </section>
  );
}

const RenderDays = () => {
  function date() {
    const date = new Date();
    return date.getDay();
  }

  return (
    <div className="cart__favorites__footer">
      <h3 className="cart__favorites__footer-header">Delivered on:</h3>
      <a data-day="Mon" href="#" className="cart__favorites__footer-mon link">
        Mon <span>{date()}</span>
      </a>
      <a data-day="Tue" href="#" className="cart__favorites__footer-tue link">
        Tue <span>{date() + 1}</span>
      </a>
      <a data-day="Wed" href="#" className="cart__favorites__footer-wed link">
        Wed <span>{date() + 3}</span>
      </a>
      <a data-day="Thu" href="#" className="cart__favorites__footer-thu link ">
        Thu <span>{date() + 4}</span>
      </a>
      <a data-day="Fri" href="#" className="cart__favorites__footer-fri link">
        Fri <span>{date() + 5}</span>
      </a>
      <a data-day="Sat" href="#" className="cart__favorites__footer-sat link">
        Sat <span>{date() + 6}</span>
      </a>
      <a data-day="Sun" href="#" className="cart__favorites__footer-sun link">
        Sun <span>{date() + 7}</span>
      </a>
    </div>
  );
};

//Redux
function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageChanger: (page) => dispatch(ACTIONS.pageChanger(page)),
    updateCart: (item) => dispatch(ACTIONS.updateCart(item)),
    addIngredients: (num) => dispatch(ACTIONS.addIngredients(num)),
    anyMarkup: (markup) => dispatch(ACTIONS.markup(markup)),
    clearMarkup: () => dispatch(ACTIONS.clearMarkup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
