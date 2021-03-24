import React, { useEffect, useState } from "react";

function Cart(props) {
  useEffect(() => {
    const markupOrder = props.state.favouriteCakes.map((el) => {
      return (
        <a
          href="#"
          className="cart__favorites__box-item link"
          key={el.title}
          onClick={() => {
            props.state.addIngredients(1);
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

    const markupPayment = props.state.cart.map((el) => {
      return (
        <a className="cart__list-finalise__item link" data-title={el.title} key={el.title}>
          <img className="cart__list-finalise-img" src={el.image}></img>
          <p className="cart__list-finalise-name">{el.title}</p>
          <p className="cart__list-finalise-price">{el.price}</p>
          <p
            className="cart__list-finalise-bin"
            onClick={(e) => {
              const myEl = e.target.closest(".link");
              const newFavourites = props.state.cart.filter((el) => {
                return el.title !== myEl.dataset.title;
              });
              props.state.updateCart(newFavourites);
            }}>
            {props.bin}
          </p>
        </a>
      );
    });

    props.state.anyMarkup([markupOrder, markupPayment]);
  }, [props.state.favouriteCakes, props.state.cart]);

  return (
    <section className="cart">
      <div className="cart__favorites">
        <div className="cart__favorites__head">
          <h2 className="cart__favorites__head-header">Cart</h2>
          <p className="cart__favorites__head-info">payment and delivery</p>
          <p className="cart__favorites__head-features">Featured</p>
        </div>
        <div className="cart__favorites__box">{props.state.markup ? props.state.markup[0] : ""}</div>
        <div className="cart__favorites__ings">
          {props.state.currentIngs === 0 ? (
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
          <div className="cart__list-finalise-container">{props.state.markup ? props.state.markup[1] : ""}</div>
        </div>
        <div className="cart__order">
          <a
            className="cart__order-button link"
            href="#"
            onClick={() => {
              props.state.pageChanger(2);
            }}>
            Order Now
          </a>
          <p>We will call you back to finalise the order! </p>
        </div>
      </div>
    </section>
  );
}

export default Cart;

const RenderDays = (props) => {
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
