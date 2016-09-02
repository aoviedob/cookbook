import React, { PropTypes } from 'react';
import AddIngredientForm from './AddIngredientForm';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updateHotRecipe } from '../../actions';
import Ingredient from './Ingredient';
import jQuery from 'jquery';

const IngredientManagement = ({ id, className, ingredients, recipes, recipe, onAddIngredient, onRemoveIngredient }) => {
    const recipeIngredients = ingredients.slice(0);
    const removeOfIngredients = (ingredientToRemove) => {
        recipe.ingredients = ingredients.filter(function iterate(obj) {
            return obj.id !== ingredientToRemove.id;
        });
        onRemoveIngredient(recipe.ingredients, ingredientToRemove);
        updateHotRecipe(recipes, recipe);
    };
    let mappedOptions = recipeIngredients.map(function iterate(ingredient) {
        return <Ingredient  key={ingredient.id} data={ingredient} onRemove={() => removeOfIngredients(ingredient)}/>;
    });
    const handleToggle = () => {
        jQuery('#toggleAddIngredient').trigger('click');
        jQuery('#AddIngredientForm').find('input:text, input:password, select, textarea').val('');
        jQuery('#toggleIngredients').dropdown('open');
    };
    return (
        <div className="row">
            <div className="col l1">
                <ul className="collapsible add-collapsable" data-collapsible="accordion">
                    <li>
                        <div className="collapsible-header none-padding" id="toggleAddIngredient"><i className="material-icons">add</i></div>
                        <div className="collapsible-body floating-collapsable card" id="AddIngredientForm">
                            <AddIngredientForm recipe={recipe}
                            onAddIngredient={onAddIngredient} ingredients={recipeIngredients} handleToggle={() => handleToggle()}/>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="col l11">
                <a id="toggleIngredients" className="dropdown-button btn white grey-text full-width" data-beloworigin="true" href="#" data-activates={id}>Ingredients</a>
                <ul id={id}
                    className={className}>
            		{mappedOptions}
            	</ul>
            </div>
        </div>);
};

IngredientManagement.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    state: PropTypes.object,
    ingredients: PropTypes.array,
    recipes: PropTypes.array,
    recipe: PropTypes.object,
    onAddIngredient: PropTypes.func,
    onRemoveIngredient: PropTypes.func,
    // onFetchIngredients: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredients, ingredient) => dispatch(addIngredient(ingredients, ingredient)),
        onRemoveIngredient: (ingredients, ingredient) => dispatch(removeIngredient(ingredients, ingredient)),
        // onFetchIngredients: (recipeId) => dispatch(fetchIngredients(recipeId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientManagement);

