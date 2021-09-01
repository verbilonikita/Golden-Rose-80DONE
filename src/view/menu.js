import * as ACTIONS from '../redux/actions';
import { connect } from "react-redux";

// Fetch Data and Return array of Recipes

export async function Menu(query) {
  try {
    const fetched = await fetch(`api/${query}`);
    if (!fetched.ok) throw new Error("failed to find a recipe try again");
    const { data } = await fetched.json();
    return data;
  } catch (err) {
    throw err;
  }
}

//Render Menu
export async function RenderMenu(recipes, props) {
  let data = recipes.map((el) => createMarkup(el, props));
  return data;
}

// Create Markup
function createMarkup(recipe, props) {
  const markup = (
    <div
      href="#"
      onClick={() => {
        eventsForItems(recipe, props);
      }}
      data-id={recipe.recipe_id}
      className="catalogue__item link"
      key={recipe._id}>
      <img className="catalogue__item__image" src={recipe.image} alt="cake"></img>
      <div className="catalogue__item__info">
        <div className="catalogue__item__info-price">£ {recipe.price}</div>
        <div className="catalogue__item__info-name">{recipe.title}</div>
        <a
          href="#"
          className="catalogue__item__info-like"
          onClick={(e) => {
            e.stopPropagation();
            if (props.favouriteCakes.some((el) => el.title === recipe.title)) {
              const newBookmarks = props.favouriteCakes.filter((el) => el.title !== recipe.title);
              props.updateBookmark(newBookmarks);
            } else {
              const currentRecipe = eventsForItems(recipe, props, true);
              props.addBookmark(currentRecipe);
            }
          }}>
          {props.favouriteCakes.some((el) => el.title === recipe.title) ? props.heartFill : props.heartEmpty}
        </a>
      </div>
    </div>
  );

  return markup;
}

//Function
function eventsForItems(recipe, props, trueFalse) {
  const currentRecipe = {
    title: recipe.title,
    image: recipe.image,
    id: recipe._id,
    bookmarked: trueFalse,
    price: recipe.price,
  };
  props.setMenuItem(currentRecipe);

  return currentRecipe;
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

