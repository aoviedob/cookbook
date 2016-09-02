import React, { PropTypes } from 'react';
import DropDown from './DropDown';
import IngredientManagement from './IngredientManagement';
import jQuery from 'jquery';

const AddEditRecipeForm = ({ modalId, recipes, recipe, categories, onRecipeAddEdit, onCloseModal, onFormChange}) => {
    let dropDownCategory = {id: '0', name: 'Category'};
    const modalRecipe = jQuery.extend({}, recipe);
    let input = { name: '', chef: '', preparation: '', category: ''};
    if(!recipe.id) {
        recipe.id = 0;
    }
    const addRecipe = () => {
        const recipeToAdd =  jQuery.extend({}, recipe);
        onRecipeAddEdit(recipeToAdd);
        onCloseModal(modalId, recipe);
    };
    return( <div className="row">
            <div className="row"> <div className="col l11"><h5>{recipe.modalTitle}</h5></div><div className="col l1"><div className="clickable right" onClick={() => onCloseModal(modalId, modalRecipe)}>X</div></div></div>
            <form className="col s12">
              <div className="row">
                <div className="input-field col s9">
                  <input placeholder="Enter the name of Recipe" id="name" name="name" type="text" value={recipe.name}
                    ref={node => {input.name = node;}} onChange={() => onFormChange(recipe, input.name.name, input.name.value)} />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field col s3">
                  <DropDown id="category" name="category" className="dropdown-content white grey-text" state={dropDownCategory} options={categories} labelField="name" selectedText={modalRecipe.categoryname}
                   valueField="id" onChange={() =>{onFormChange(recipe, 'category', dropDownCategory.id); onFormChange(recipe, 'categoryname', dropDownCategory.name);}} />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Enter the name of the Chef" id="chef" name="chef" type="text" value={recipe.chef}
                    ref={node => {input.chef = node;}} onChange={() => onFormChange(recipe, input.chef.name, input.chef.value)} />
                  <label htmlFor="chef">Chef</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col l12">
                  <IngredientManagement id="ingredientManagement" className="dropdown-content white grey-text"
                   labelField="name" valueField="id" recipes={recipes} recipe={recipe}/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="preparation" cols="40" rows="15" id="preparation" placeholder="Preparation" name="preparation" className="materialize-textarea" value={recipe.preparation}
                    ref={node => {input.preparation = node;}} onChange={() => onFormChange(recipe, input.preparation.name, input.preparation.value)} />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 right-align">
                  <button className="btn waves-effect" type="button" onClick={() => onCloseModal(modalId, modalRecipe)}>Cancel</button>
                  <button className="btn waves-effect normal-margin" type="button" onClick={() => addRecipe()}>Add</button>
                </div>
              </div>
            </form>
          </div>);
};

AddEditRecipeForm.propTypes = {
    recipes: PropTypes.array,
    recipe: PropTypes.object,
    categories: PropTypes.array,
    onRecipeAddEdit: PropTypes.func,
    onCloseModal: PropTypes.func,
    modalId: PropTypes.string,
    onFormChange: PropTypes.func
};

export default AddEditRecipeForm;
