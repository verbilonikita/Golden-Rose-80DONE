import * as ACTIONS from '../redux/actions';
import { connect } from "react-redux";

function Pay(props) {
  return (
    <section className="pay">
      <div className="pay__main">
        <h3 className="pay__main-header">Order now!</h3>
        <form className="form">
          <label>Full Name</label>
          <input type="text" placeholder="Type your name" name="name" required></input>
          <label>Phone</label>
          <input type="tel" placeholder="0754941423" name="phone"></input>
          <div>
            <input type="radio" className="radio" name="delivery-type" required></input>
            <label className="radio-label">Delivery</label>
            <input type="radio" className="radio" name="delivery-type" required></input>
            <label className="radio-label">Collection</label>
          </div>
          <label>Address</label>
          <input type="text" className="address-input street" placeholder="Street" required></input>
          <input type="text" className="address-input house" placeholder="House"></input>
          <label>Delivery Date</label>
          <input type="date" required></input>
          <div>
            <input type="radio" className="radio" name="pay-type" required></input>
            <label className="radio-label">Cash</label>
            <input type="radio" className="radio" name="pay-type" required></input>
            <label className="radio-label">Card</label>
          </div>
          <p>Delivery charge: £5 within town, £10 outside town.</p>
          <h4>
            Total:{" will be updated later"}
            <span className="price">{/* {props.markup[1].length > 0 ? getPrice() : "£0.0"} */}</span>
          </h4>
          <button type="submit" className="form-order link" href="#">
            Order now!
          </button>
        </form>
      </div>
      <div className="cart__list">
        <h2 className="cart__list-header">Cart</h2>
        <div className="cart__list-finalise">
          <h3>Order</h3>
          <div className="cart__list-finalise-container">{props.markup.length === 2 ? props.markup[1] : ""}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pay);