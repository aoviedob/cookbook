import React, { PropTypes } from 'react';

const AddIngredientForm = ({ingredients, onAddIngredient, recipe, handleToggle }) => {
    let input = {name: '', amount: ''};
    const ingredient = {name: '', amount: ''};
    const handleChange = (property, value) => {
        ingredient[property] = value;
    };
    const addToIngredients = () => {
        ingredient.recipeid = 0;
        recipe.ingredients.push(ingredient);// Until api is ready
        handleToggle();
        onAddIngredient(ingredients, ingredient);
    };
    return( <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Enter the name of Ingredient" id="ingredientName" name="name" type="text" className="validate"
                   ref={node => {input.name = node;}} onChange={() => handleChange(input.name.name, input.name.value)} />
                  <label htmlFor="ingredientName">Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Enter the amount of the Ingredient" id="ingredientAmount" name="amount" type="text" className="validate"
                    ref={node => {input.amount = node;}} onChange={() => handleChange(input.amount.name, input.amount.value)} />
                  <label htmlFor="ingredientAmount">Amount</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <button type="button" className="btn" onClick={() => addToIngredients()} >Add</button>
                </div>
              </div>
            </div>
          </div>);
};

AddIngredientForm.propTypes = {
    ingredients: PropTypes.array,
    onAddIngredient: PropTypes.func,
    recipe: PropTypes.object,
    handleToggle: PropTypes.func
};

export default AddIngredientForm;
