import React, { PropTypes } from 'react';
import IngredientInfo from './IngredientInfo';
import Rating from './Rating';
import RatingForm from './RatingForm';

const RecipeInfo = ({ modalId, recipe, onCloseModal}) => {
    let ingredients;
    if(recipe.ingredients && recipe.ingredients.length > 0) {
        ingredients = recipe.ingredients.map(function iterate(ingredient) {
            return <IngredientInfo  key={ingredient.id} data={ingredient} />;
        });
    }
    return(<div>
            <div className="row"><div className="right"><div className="clickable" onClick={() => onCloseModal(modalId, recipe)}>X</div></div></div>
            <div className="row">
              <div className="col s6 card gray-text">
                <div className="row">
                  <div className="col l12 card blue lighten-1">
                      <div className="col l9"><h5 className="white-text center-align"><i className="material-icons left normal-margin">visibility</i>{recipe.name}</h5></div>
                      <div className="col l3 center-align">
                        <Rating stars={recipe.stars} maxStars="5" ratingAverage={recipe.rating} color="white-text" ratingClass="white-text rating-stars"/>
                      </div>
                  </div>
                  <div className="col l12">
                    <h6><b>Category: </b>{recipe.categoryName}</h6>
                    <h6><b>Chef: </b>{recipe.chef}</h6>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                  <div className="col s8">
                    <h6><b>Ingredients: </b></h6>
                  </div>
                  <div className="col s8">
                    <ul className="collection">
                      {ingredients}
                    </ul>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                  <div className="col s12">
                    <h6><b>Preparation: </b>{recipe.preparation}</h6>
                  </div>
                </div>
              </div>
              <div className="col s6 card">
                <div className="card-content">
                  <span className="card-title">Rate This Recipe</span>
                  <RatingForm recipe={recipe}  modalId={modalId} onCloseModal={onCloseModal}/></div>
              </div>
            </div>
          </div>);
};

RecipeInfo.propTypes = {
    recipe: PropTypes.object,
    modalId: PropTypes.string,
    onCloseModal: PropTypes.func,
};

export default RecipeInfo;
